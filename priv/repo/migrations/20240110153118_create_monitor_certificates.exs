defmodule Sentinel.Repo.Migrations.CreateMonitorCertificates do
  use Ecto.Migration

  def change do
    create table(:monitor_certificates) do
      add :issuer, :string
      add :state, :string
      add :not_after, :utc_datetime_usec
      add :not_before, :utc_datetime_usec
      add :subject, :string
      add :monitor_id, references(:monitors, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime_usec)
    end
  end
end
