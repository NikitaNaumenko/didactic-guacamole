defmodule Sentinel.Factories.MonitorFactory do
  @moduledoc false
  defmacro __using__(_opts) do
    quote do
      def monitor_factory do
        %Sentinel.Monitors.Monitor{
          name: sequence(:name, &"Monitor #{&1}"),
          description: "Test monitor",
          url: "https://example.com",
          method: :GET,
          interval_seconds: 300,
          timeout_seconds: 10,
          expected_status_code: :ok,
          headers: %{},
          is_active: true,
          failure_count: 0,
          success_count: 0,
          retry_count: 3,
          retry_interval_seconds: 60
        }
      end
    end
  end
end
