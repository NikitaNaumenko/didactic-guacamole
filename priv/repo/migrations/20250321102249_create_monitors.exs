defmodule Sentinel.Repo.Migrations.CreateMonitors do
  use Ecto.Migration

  def change do
    create table(:monitors) do
      add :name, :string, null: false
      add :description, :text
      add :url, :string, null: false
      add :method, :string, null: false, default: "GET"
      add :interval_seconds, :integer, null: false, default: 300
      add :timeout_seconds, :integer, null: false, default: 10
      add :expected_status_code, :integer, null: false, default: 200
      add :headers, :map, default: %{}
      add :body, :text
      add :is_active, :boolean, null: false, default: true
      add :last_check_at, :utc_datetime
      add :last_status, :string
      add :last_response_time_ms, :integer
      add :failure_count, :integer, default: 0
      add :success_count, :integer, default: 0
      add :retry_count, :integer, default: 3
      add :retry_interval_seconds, :integer, default: 60
      add :account_id, references(:accounts, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:monitors, [:is_active])
  end
end
