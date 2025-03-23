defmodule Sentinel.Factories.UserFactory do
  defmacro __using__(_opts) do
    quote do
      def user_factory do
        %Sentinel.Accounts.User{
          email: sequence(:email, &"user-#{&1}@example.com"),
          hashed_password: Bcrypt.hash_pwd_salt("Password123456"),
          role: Enum.random(Ecto.Enum.values(Sentinel.Accounts.User, :role)),
          state: Enum.random(Ecto.Enum.values(Sentinel.Accounts.User, :state)),
          confirmed_at: DateTime.utc_now()
        }
      end
    end
  end
end
