defmodule SentinelWeb.Web.MonitorController do
  use SentinelWeb, :controller

  alias Sentinel.Monitors
  alias Sentinel.Monitors.Monitor

  def index(conn, _params) do
    monitors = Monitors.list_monitors()
    conn
    |> assign_prop(:monitors, monitors)
    |> render_inertia("web/monitors/Index")
  end

  def new(conn, _params) do
    conn
    |> render_inertia("web/monitors/New")
  end

  def create(conn, %{"monitor" => monitor_params}) do
    case Monitors.create_monitor(monitor_params) do
      {:ok, monitor} ->
        conn
        |> put_flash(:info, gettext("Monitor created successfully."))
        |> redirect(to: ~p"/monitors/#{monitor}")

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign_errors(changeset)
        |> render_inertia("web/monitors/New")
    end
  end

  def show(conn, %{"id" => id}) do
    monitor = Monitors.get_monitor!(id)
    conn
    |> assign_prop(:monitor, monitor)
    |> render_inertia("web/monitors/Show")
  end

  def edit(conn, %{"id" => id}) do
    monitor = Monitors.get_monitor!(id)
    changeset = Monitors.change_monitor(monitor)
    conn
    |> assign_prop(:monitor, monitor)
    |> assign_prop(:changeset, changeset)
    |> render_inertia("web/monitors/Edit")
  end

  def update(conn, %{"id" => id, "monitor" => monitor_params}) do
    monitor = Monitors.get_monitor!(id)

    case Monitors.update_monitor(monitor, monitor_params) do
      {:ok, monitor} ->
        conn
        |> put_flash(:info, gettext("Monitor updated successfully."))
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
    |> put_flash(:info, gettext("Monitor deleted successfully."))
    |> redirect(to: ~p"/monitors")
  end
end
