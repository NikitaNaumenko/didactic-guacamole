defmodule SentinelWeb.Web.MonitorController do
  use SentinelWeb, :controller

  alias Sentinel.Monitors

  def index(conn, _params) do
    account_id = get_account_id(conn)
    dbg(account_id)
    monitors = Monitors.list_monitors(account_id)

    conn
    |> assign_prop(:monitors, monitors)
    |> render_inertia("web/monitors/Index")
  end

  def new(conn, _params) do
    render_inertia(conn, "web/monitors/New")
  end

  def create(conn, monitor_params) do
    account_id = get_account_id(conn)
    monitor_params = Map.put(monitor_params, "account_id", account_id)

    case Monitors.create_monitor(monitor_params) do
      {:ok, monitor} ->
        conn
        |> put_flash(:info, dgettext("monitors", "Monitor created successfully."))
        |> redirect(to: ~p"/monitors/#{monitor}")

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign_errors(changeset)
        |> redirect(to: ~p"/monitors/new")
    end
  end

  def show(conn, %{"id" => id}) do
    monitor = Monitors.get_monitor!(id)

    conn
    |> assign_prop(:monitor, monitor)
    |> render_inertia("web/monitors/Show")
  end

  def update(conn, %{"id" => id, "monitor" => monitor_params}) do
    monitor = Monitors.get_monitor!(id)

    case Monitors.update_monitor(monitor, monitor_params) do
      {:ok, monitor} ->
        conn
        |> put_flash(:info, dgettext("monitors", "Monitor updated successfully."))
        |> redirect(to: ~p"/monitors/#{monitor}")

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign_prop(:monitor, monitor)
        |> assign_prop(:changeset, changeset)
        |> render_inertia("web/monitors/Edit")
    end
  end

  def delete(conn, %{"id" => id}) do
    monitor = Monitors.get_monitor!(id)
    {:ok, _monitor} = Monitors.delete_monitor(monitor)

    conn
    |> put_flash(:info, dgettext("monitors", "Monitor deleted successfully."))
    |> redirect(to: ~p"/monitors")
  end
end
