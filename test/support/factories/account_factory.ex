defmodule Sentinel.Factories.AccountFactory do
  @moduledoc false
  defmacro __using__(_opts) do
    quote do
      def account_factory do
        %Sentinel.Accounts.Account{
          name: Faker.Company.name()
        }
      end
    end
  end
end
