defmodule Sentinel.Monitors.Monitor do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :description, :url, :method, :interval_seconds, :timeout_seconds, :expected_status_code, :headers, :body, :is_active, :last_check_at, :last_status, :last_response_time_ms, :failure_count, :success_count, :retry_count, :retry_interval_seconds]}
  @http_methods ~w[GET POST PUT DELETE HEAD OPTIONS]a
  @status_codes [
    ok: 200,
    created: 201,
    accepted: 202,
    no_content: 204,
    moved_permanently: 301,
    found: 302,
    temporary_redirect: 307,
    permanent_redirect: 308,
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    internal_server_error: 500,
    bad_gateway: 502,
    service_unavailable: 503,
    gateway_timeout: 504
  ]

  schema "monitors" do
    field :name, :string
    field :description, :string
    field :url, :string
    field :method, Ecto.Enum, values: @http_methods, default: :GET
    field :interval_seconds, :integer, default: 300
    field :timeout_seconds, :integer, default: 10
    field :expected_status_code, Ecto.Enum, values: @status_codes, default: :ok
    field :headers, :map, default: %{}
    field :body, :string
    field :is_active, :boolean, default: true
    field :last_check_at, :utc_datetime
    field :last_status, :string
    field :last_response_time_ms, :integer
    field :failure_count, :integer, default: 0
    field :success_count, :integer, default: 0
    field :retry_count, :integer, default: 3
    field :retry_interval_seconds, :integer, default: 60

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(monitor, attrs) do
    monitor
    |> cast(attrs, [
      :name,
      :description,
      :url,
      :method,
      :interval_seconds,
      :timeout_seconds,
      :expected_status_code,
      :headers,
      :body,
      :is_active,
      :last_check_at,
      :last_status,
      :last_response_time_ms,
      :failure_count,
      :success_count,
      :retry_count,
      :retry_interval_seconds
    ])
    |> validate_required([:name, :url])
    |> validate_number(:interval_seconds, greater_than: 0)
    |> validate_number(:timeout_seconds, greater_than: 0)
    |> validate_number(:retry_count, greater_than_or_equal_to: 0)
    |> validate_number(:retry_interval_seconds, greater_than: 0)
  end
end
