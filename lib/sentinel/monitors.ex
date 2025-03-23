defmodule Sentinel.Monitors do
  alias Sentinel.Repo
  alias Sentinel.Monitors.{Monitor, Supervisor, Check}

  import Ecto.Query

  @doc """
  Returns the list of monitors.
  """

  def list_monitors(account_id) do
    Repo.all(from m in Monitor, where: m.account_id == ^account_id)
  end

  @doc """
  Returns the list of active monitors.
  """
  def list_active_monitors do
    Repo.all(from m in Monitor, where: m.is_active == true)
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
    result =
      %Monitor{}
      |> Monitor.changeset(attrs)
      |> Repo.insert()

    case result do
      {:ok, monitor} ->
        if monitor.is_active do
          Supervisor.start_monitor(monitor)
        end
        result
      error ->
        error
    end
  end

  @doc """
  Updates a monitor.
  """
  def update_monitor(%Monitor{} = monitor, attrs) do
    was_active = monitor.is_active

    result =
      monitor
      |> Monitor.changeset(attrs)
      |> Repo.update()

    case result do
      {:ok, updated_monitor} ->
        handle_monitor_status_change(was_active, updated_monitor)
        result
      error ->
        error
    end
  end

  @doc """
  Deletes a monitor.
  """
  def delete_monitor(%Monitor{} = monitor) do
    if monitor.is_active do
      Supervisor.stop_monitor(monitor.id)
    end

    Repo.delete(monitor)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking monitor changes.
  """
  def change_monitor(%Monitor{} = monitor, attrs \\ %{}) do
    Monitor.changeset(monitor, attrs)
  end

  @doc """
  Creates a check for a monitor.
  """
  def create_check(monitor, result) do
    attrs = Check.create_from_result(monitor, result)

    %Check{}
    |> Check.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Returns the list of checks for a monitor.
  """
  def list_monitor_checks(monitor_id, limit \\ 100) do
    Check
    |> where([c], c.monitor_id == ^monitor_id)
    |> order_by([c], [desc: c.inserted_at])
    |> limit(^limit)
    |> Repo.all()
  end

  @doc """
  Returns the success rate for a monitor over the given period.
  Period should be in seconds.
  """
  def get_monitor_success_rate(monitor_id, period) do
    since = DateTime.utc_now() |> DateTime.add(-period, :second)

    total_query =
      from c in Check,
        where: c.monitor_id == ^monitor_id and c.inserted_at >= ^since,
        select: count(c.id)

    success_query =
      from c in Check,
        where: c.monitor_id == ^monitor_id and c.inserted_at >= ^since and c.status == "up",
        select: count(c.id)

    total = Repo.one(total_query)
    successes = Repo.one(success_query)

    case total do
      0 -> 0.0
      _ -> (successes / total) * 100
    end
  end

  defp handle_monitor_status_change(was_active, %Monitor{is_active: is_active} = monitor) do
    cond do
      not was_active and is_active ->
        Supervisor.start_monitor(monitor)
      was_active and not is_active ->
        Supervisor.stop_monitor(monitor.id)
      true ->
        :ok
    end
  end
end
