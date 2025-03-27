defmodule SentinelWeb.Web.UserController do
  use SentinelWeb, :controller

  alias Sentinel.Accounts
  alias Sentinel.Accounts.User

  def index(conn, _params) do
    users = Accounts.list_users()

    conn
    |> assign_prop(:users, users)
    |> render_inertia("web/users/Index")
  end

  def new(conn, _params) do
    render_inertia(conn, "web/users/New")
  end

  def create(conn, user_params) do
    account_id = get_account_id(conn)
    user_params = Map.put(user_params, "account_id", account_id)

    case Accounts.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, dgettext("users", "User created successfully."))
        |> redirect(to: ~p"/users/#{user}")

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign_errors(changeset)
        |> render_inertia("web/users/New")
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    conn
    |> assign_prop(:user, user)
    |> render_inertia("web/users/Show")
  end
end
