defmodule SentinelWeb.Web.RegistrationController do
  use SentinelWeb, :controller

  alias Sentinel.Accounts
  alias Sentinel.Accounts.User
  alias SentinelWeb.UserAuth

  def new(conn, _params) do
    render_inertia(conn, "web/auth/Registration")
  end

  def create(conn, user_params) do
    case Accounts.create_account(user_params) do
      {:ok, account} ->
      dbg(account)
        # {:ok, _} =
        #   Accounts.deliver_user_confirmation_instructions(
        #     user,
        #     &url(~p"/users/confirm/#{&1}")
        #   )

        conn
        # conn
        # |> put_flash(:info, "User created successfully.")
        # |> UserAuth.log_in_user(user)

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> assign_errors(changeset)
        |> redirect(to: ~p"/registration")
    end
  end
end
