defmodule SentinelWeb.MonitorControllerTest do
  use SentinelWeb.ConnCase

  @invalid_monitor_params %{name: "", url: ""}

  setup %{conn: conn} do
    account = insert(:account)
    user = insert(:user, account: account)

    %{conn: log_in_user(conn, user), account: account, user: user}
  end

  describe "index/2" do
    test "lists all monitors for the account", %{conn: conn, account: account} do
      monitor1 = insert(:monitor, account: account)
      monitor2 = insert(:monitor, account: account)
      other_account = insert(:account)
      _other_monitor = insert(:monitor, account: other_account)

      conn = get(conn, ~p"/monitors")
      dbg(conn)
      response = html_response(conn, 200)
      assert response =~ monitor1.name
      assert response =~ monitor2.name
      refute response =~ _other_monitor.name
    end
  end

  describe "create/2" do
    test "creates a monitor and redirects when data is valid", %{conn: conn} do
      valid_monitor_params = :monitor |> params_for() |> Map.take([:name, :url])
      conn = post(conn, ~p"/monitors", monitor: valid_monitor_params)

      assert redirected_to(conn) =~ "/monitors/"
      assert get_flash(conn, :info) == "Monitor created successfully."
    end

    test "does not create monitor and renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/monitors", monitor: @invalid_monitor_params)

      assert redirected_to(conn) == ~p"/monitors/new"
      assert get_flash(conn, :error) == "There was an error creating the monitor."
    end
  end
end
