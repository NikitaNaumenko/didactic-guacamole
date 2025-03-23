defmodule Sentinel.Factory do
  use ExMachina.Ecto, repo: Sentinel.Repo
  use Sentinel.Factories.AccountFactory
  use Sentinel.Factories.UserFactory
  use Sentinel.Factories.MonitorFactory
end
