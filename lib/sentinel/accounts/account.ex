defmodule Sentinel.Accounts.Account do
  @moduledoc false
  use Ecto.Schema

  import Ecto.Changeset


  schema "accounts" do
    field :name, :string
    timestamps(type: :utc_datetime)

    has_many :users, Sentinel.Accounts.User
  end

  @doc false
  def changeset(account, attrs) do
    account
    |> cast(attrs, [:name])
    |> cast_assoc(:users)
    |> validate_required([:name])
    |> unsafe_validate_unique(:name, Sentinel.Repo)
    |> unique_constraint(:name)
  end
end
