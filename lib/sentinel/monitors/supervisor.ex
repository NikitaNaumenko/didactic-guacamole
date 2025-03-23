defmodule Sentinel.Monitors.Supervisor do
  @moduledoc """
  Супервизор для процессов мониторинга
  """

  use Supervisor

  alias Sentinel.Monitors
  alias Sentinel.Monitors.MonitorWorker

  def start_link(init_arg) do
    Supervisor.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  @impl true
  def init(_init_arg) do
    children = [
      {Registry, keys: :unique, name: Sentinel.Monitors.Registry},
      {DynamicSupervisor, name: Sentinel.Monitors.WorkerSupervisor, strategy: :one_for_one}
    ]

    Supervisor.init(children, strategy: :one_for_all)
  end

  @doc """
  Запускает процесс мониторинга для указанного монитора
  """
  def start_monitor(monitor) do
    DynamicSupervisor.start_child(
      Sentinel.Monitors.WorkerSupervisor,
      {MonitorWorker, monitor}
    )
  end

  @doc """
  Останавливает процесс мониторинга для указанного монитора
  """
  def stop_monitor(monitor_id) do
    case Registry.lookup(Sentinel.Monitors.Registry, monitor_id) do
      [{pid, _}] ->
        DynamicSupervisor.terminate_child(Sentinel.Monitors.WorkerSupervisor, pid)
      [] ->
        {:error, :not_found}
    end
  end

  @doc """
  Перезапускает все процессы мониторинга
  """
  def restart_all_monitors do
    # Останавливаем все текущие процессы
    DynamicSupervisor.which_children(Sentinel.Monitors.WorkerSupervisor)
    |> Enum.each(fn {_, pid, _, _} ->
      DynamicSupervisor.terminate_child(Sentinel.Monitors.WorkerSupervisor, pid)
    end)

    # Запускаем процессы для всех активных мониторов
    Monitors.list_active_monitors()
    |> Enum.each(&start_monitor/1)
  end
end
