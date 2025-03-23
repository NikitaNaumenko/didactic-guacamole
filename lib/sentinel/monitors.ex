defmodule Sentinel.Monitors do
  alias Sentinel.Repo
  alias Sentinel.Monitors.Monitor

  import Ecto.Query

  @doc """
  Returns the list of monitors.
  """

  def list_monitors(account_id) do
    Repo.all(from m in Monitor, where: m.account_id == ^account_id)
  end

  @doc """
  Gets a single monitor.
  Raises if the monitor does not exist.
  """
  def get_monitor!(id), do: Repo.get!(Monitor, id)

  @doc """
  Creates a monitor.
  """
  def create_monitor(attrs \\ %{}) do
    %Monitor{}
    |> Monitor.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a monitor.
  """
  def update_monitor(%Monitor{} = monitor, attrs) do
    monitor
    |> Monitor.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a monitor.
  """
  def delete_monitor(%Monitor{} = monitor) do
    Repo.delete(monitor)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking monitor changes.
  """
  def change_monitor(%Monitor{} = monitor, attrs \\ %{}) do
    Monitor.changeset(monitor, attrs)
  end
end
