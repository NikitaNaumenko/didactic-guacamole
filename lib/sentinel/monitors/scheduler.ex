defmodule Sentinel.Monitors.Scheduler do
  @moduledoc """
  GenServer для планирования и выполнения проверок мониторов
  """

  use GenServer
  require Logger

  alias Sentinel.Monitors
  alias Sentinel.Monitors.{Monitor, Checker}

  def start_link(_opts) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def init(state) do
    schedule_checks()
    {:ok, state}
  end

  def handle_info(:check_monitors, state) do
    run_checks()
    schedule_checks()
    {:noreply, state}
  end

  defp schedule_checks do
    Process.send_after(self(), :check_monitors, :timer.seconds(10))
  end

  defp run_checks do
    Monitors.list_active_monitors()
    |> Enum.each(&check_monitor/1)
  end

  defp check_monitor(%Monitor{} = monitor) do
    if should_check?(monitor) do
      Logger.info("Checking monitor #{monitor.id} - #{monitor.name}")

      result = Checker.check(monitor)
      update_monitor(monitor, result)
    end
  end

  defp should_check?(monitor) do
    case monitor.last_check_at do
      nil -> true
      last_check_at ->
        next_check_at = DateTime.add(last_check_at, monitor.interval_seconds, :second)
        DateTime.compare(DateTime.utc_now(), next_check_at) in [:eq, :gt]
    end
  end

  defp update_monitor(monitor, result) do
    attrs = %{
      last_check_at: DateTime.utc_now(),
      last_status: if(result.success, do: "up", else: "down"),
      last_response_time_ms: result.response_time_ms,
      failure_count: if(result.success, do: 0, else: monitor.failure_count + 1),
      success_count: if(result.success, do: monitor.success_count + 1, else: 0)
    }

    Monitors.update_monitor(monitor, attrs)
  end
end
