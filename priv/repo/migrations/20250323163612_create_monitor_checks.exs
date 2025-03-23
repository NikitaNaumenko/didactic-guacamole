defmodule Sentinel.Repo.Migrations.CreateMonitorChecks do
  use Ecto.Migration

  def change do
    create table(:monitor_checks) do
      add :status, :string, null: false
      add :response_time_ms, :integer
      add :status_code, :integer
      add :error_message, :text
      add :monitor_id, references(:monitors, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:monitor_checks, [:monitor_id])
    create index(:monitor_checks, [:inserted_at])
  end
end
