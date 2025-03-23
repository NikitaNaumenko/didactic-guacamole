defmodule Sentinel.Monitors.Check do
  use Ecto.Schema
  import Ecto.Changeset

  schema "monitor_checks" do
    field :status, :string
    field :response_time_ms, :integer
    field :status_code, :integer
    field :error_message, :string

    belongs_to :monitor, Sentinel.Monitors.Monitor

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(check, attrs) do
    check
    |> cast(attrs, [:status, :response_time_ms, :status_code, :error_message, :monitor_id])
    |> validate_required([:status, :monitor_id])
    |> foreign_key_constraint(:monitor_id)
  end

  def create_from_result(monitor, result) do
    %{
      monitor_id: monitor.id,
      status: if(result.success, do: "up", else: "down"),
      response_time_ms: result.response_time_ms,
      status_code: result.status_code,
      error_message: result.error
    }
  end
end
