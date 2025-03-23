defmodule Sentinel.MonitorsTest do
  use Sentinel.DataCase

  alias Sentinel.Monitors
  alias Sentinel.Monitors.Monitor

  describe "list_monitors/1" do
    setup do
      # Create two different accounts
      account_1 = insert(:account)
      account_2 = insert(:account)

      insert_list(5, :monitor, account_id: account_1.id)
      insert_list(5, :monitor, account_id: account_2.id)

      {:ok, account_1: account_1, account_2: account_2}
    end

    test "returns all monitors for the given account", %{account_1: account_1} do
      monitors = Monitors.list_monitors(account_1.id)

      assert length(monitors) == 5

      assert Enum.all?(monitors, &(&1.account_id == account_1.id))
    end

    test "returns an empty list if no monitors exist for the account" do
      # Create a new account with no monitors
      account = insert(:account)

      assert Monitors.list_monitors(account.id) == []
    end

    test "handles non-existent account IDs" do
      # A very large ID that likely doesn't exist
      non_existent_id = 999_999

      assert Monitors.list_monitors(non_existent_id) == []
    end
  end

  describe "create_monitor/1" do
    setup do
      account = insert(:account)

      {:ok, account: account}
    end

    test "creates a new monitor for the given account", %{account: account} do
      attrs = %{name: "New Monitor", url: "http://example.com", account_id: account.id}

      {:ok, monitor} = Monitors.create_monitor(attrs)

      assert monitor.name == attrs.name
      assert monitor.url == attrs.url
      assert monitor.account_id == account.id
    end

    test "returns an error if the account does not exist" do
      attrs = %{name: "New Monitor", url: "http://example.com", account_id: 999_999}

      assert_raise(Ecto.ConstraintError, fn -> Monitors.create_monitor(attrs) end)
    end
  end
end
