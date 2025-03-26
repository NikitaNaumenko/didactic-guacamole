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

  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Пользователь успешно создан")
        |> redirect(to: ~p"/users/#{user}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render_inertia(conn, "Web/Users/New", props: %{changeset: changeset})
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render_inertia(conn, "web/users/Show", props: %{user: user})
  end
end
