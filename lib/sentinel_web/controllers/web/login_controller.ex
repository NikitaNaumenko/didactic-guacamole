defmodule SentinelWeb.Web.SignInController do
  use SentinelWeb, :controller

  alias Sentinel.Accounts
  alias SentinelWeb.UserAuth

  def new(conn, _params) do
    render_inertia(conn, "web/auth/SignIn")
  end

  def create(conn, params) do
    %{"email" => email, "password" => password} = params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> put_flash(:info, "Welcome back!")
      |> UserAuth.log_in_user(user, params)
    else
      # In order to prevent user enumeration attacks, don't disclose whether the email is registered.
      conn
      |> put_flash(:error, "You have entered an invalid email or password.")
      |> redirect(to: ~p"/users/log_in")
        end
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "Logged out successfully.")
    |> UserAuth.log_out_user()
  end
end
