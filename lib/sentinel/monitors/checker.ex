defmodule Sentinel.Monitors.Checker do
  @moduledoc """
  Модуль для выполнения HTTP проверок мониторов
  """

  require Logger

  def check(monitor) do
    start_time = System.monotonic_time(:millisecond)

    result =
      monitor.url
      |> build_request(monitor)
      |> perform_request()
      |> validate_response(monitor)

    end_time = System.monotonic_time(:millisecond)
    response_time = end_time - start_time

    Map.put(result, :response_time_ms, response_time)
  end

  defp build_request(url, monitor) do
    %{
      method: monitor.method,
      url: url,
      headers: monitor.headers || %{},
      body: monitor.body,
      timeout: monitor.timeout_seconds * 1000
    }
  end

  defp perform_request(%{method: method, url: url, headers: headers, body: body, timeout: timeout}) do
    try do
      Finch.build(method, url, headers, body)
      |> Finch.request(Sentinel.Finch, receive_timeout: timeout)
      |> case do
        {:ok, response} -> {:ok, response}
        {:error, reason} -> {:error, reason}
      end
    rescue
      e -> {:error, e}
    end
  end

  defp validate_response({:ok, response}, monitor) do
    status_matches = response.status == monitor.expected_status_code

    %{
      success: status_matches,
      status_code: response.status,
      error: unless(status_matches, do: "Unexpected status code: #{response.status}")
    }
  end

  defp validate_response({:error, reason}, _monitor) do
    error_message =
      case reason do
        %Mint.TransportError{reason: :timeout} -> "Request timed out"
        %Mint.TransportError{reason: :econnrefused} -> "Connection refused"
        %Mint.TransportError{reason: :nxdomain} -> "Could not resolve domain"
        _ -> "Request failed: #{inspect(reason)}"
      end

    %{
      success: false,
      status_code: nil,
      error: error_message
    }
  end
end
