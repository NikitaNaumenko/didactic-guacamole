defmodule Sentinel.Monitors.MonitorWorker do
  @moduledoc """
  GenServer для выполнения проверок отдельного монитора
  """

  use GenServer
  require Logger

  alias Sentinel.Monitors
  alias Sentinel.Monitors.{Monitor, Checker}

  def start_link(%Monitor{} = monitor) do
    GenServer.start_link(__MODULE__, monitor, name: via_tuple(monitor.id))
  end

  def init(monitor) do
    schedule_check(monitor.interval_seconds)
    {:ok, monitor}
  end

  def handle_info(:check, monitor) do
    Logger.info("Checking monitor #{monitor.id} - #{monitor.name}")

    result = Checker.check(monitor)
    {:ok, check} = Monitors.create_check(monitor, result)
    {:ok, updated_monitor} = update_monitor(monitor, check)

    schedule_check(updated_monitor.interval_seconds)
    {:noreply, updated_monitor}
  end

  defp schedule_check(interval_seconds) do
    Process.send_after(self(), :check, :timer.seconds(interval_seconds))
  end

  defp update_monitor(monitor, check) do
    attrs = %{
      last_check_at: check.inserted_at,
      last_status: check.status,
      last_response_time_ms: check.response_time_ms,
      failure_count: if(check.status == "up", do: 0, else: monitor.failure_count + 1),
      success_count: if(check.status == "up", do: monitor.success_count + 1, else: 0)
    }

    Monitors.update_monitor(monitor, attrs)
  end

  defp via_tuple(monitor_id) do
    {:via, Registry, {Sentinel.Monitors.Registry, monitor_id}}
  end
end
