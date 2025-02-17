defmodule SentinelWeb.Web.RegistrationController do
  use SentinelWeb, :controller

  alias Sentinel.Accounts
  alias Sentinel.Accounts.User
  alias SentinelWeb.UserAuth

  def new(conn, _params) do
    # changeset = Accounts.change_user_registration(%User{})
    render_inertia(conn, "Registration")
  end

  def create(conn, %{"user" => user_params}) do
    case Accounts.register_user(user_params) do
      {:ok, user} ->
        {:ok, _} =
          Accounts.deliver_user_confirmation_instructions(
            user,
            &url(~p"/users/confirm/#{&1}")
          )

        conn
        |> put_flash(:info, "User created successfully.")
        |> UserAuth.log_in_user(user)

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :new, changeset: changeset)
    end
  end
end
