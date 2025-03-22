# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Sentinel.Repo.insert!(%Sentinel.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Sentinel.Accounts
alias Sentinel.Monitors

# Create the Sentinel account
# sentinel_account = %Sentinel.Accounts.Account{
#   name: "Sentinel",
# }
#
# {:ok, sentinel_account} = Sentinel.Repo.insert(sentinel_account)

Accounts.register_user(%{
  account: %{name: "Sentinel"},
  email: "full@mail.com",
  password: "Password12345",
})

sentinel_account = Sentinel.Repo.get_by(Accounts.Account, name: "Sentinel")
# # Создаем администратора
# Accounts.create_user(%{
#   account: %{name: "Admin Account"},
#   email: "admin@example.com",
#   password: "AdminPassword123!",
#   role: :admin,
#   state: :confirmed
# })

# # Создаем обычного пользователя
# Accounts.create_user(%{
#   account: %{name: "User Account"},
#   email: "user@example.com",
#   password: "UserPassword123!",
#   role: :user,
#   state: :confirmed
# })

# # Создаем пользователя в ожидании подтверждения
# Accounts.create_user(%{
#   account: %{name: "Pending Account"},
#   email: "pending@example.com",
#   password: "PendingPassword123!",
#   role: :user,
#   state: :waiting_confirmation
# })

# # Создаем заблокированного пользователя
# Accounts.create_user(%{
#   account: %{name: "Blocked Account"},
#   email: "blocked@example.com",
#   password: "BlockedPassword123!",
#   role: :user,
#   state: :blocked
# })

# Создаем монитор для проверки доступности сайта
Monitors.create_monitor(%{
  name: "Google Status",
  description: "Проверка доступности Google",
  url: "https://www.google.com",
  method: :GET,
  interval_seconds: 300,
  timeout_seconds: 10,
  headers: %{
    "User-Agent" => "Sentinel Monitor"
  },
  is_active: true,
  account_id: sentinel_account.id
})

# Создаем монитор для API эндпоинта
Monitors.create_monitor(%{
  name: "API Health Check",
  description: "Проверка работоспособности API",
  url: "https://api.example.com/health",
  method: :POST,
  interval_seconds: 60,
  timeout_seconds: 5,
  headers: %{
    "Content-Type" => "application/json",
    "Authorization" => "Bearer test-token"
  },
  body: Jason.encode!(%{check: "health"}),
  is_active: true,
  account_id: sentinel_account.id
})

# Создаем монитор с расширенными настройками
Monitors.create_monitor(%{
  name: "Critical Service",
  description: "Мониторинг критического сервиса",
  url: "https://critical-service.example.com/status",
  method: :GET,
  interval_seconds: 30,
  timeout_seconds: 3,
  headers: %{
    "Accept" => "application/json"
  },
  is_active: true,
  retry_count: 5,
  retry_interval_seconds: 30,
  account_id: sentinel_account.id
})
# Создаем неактивный монитор
Monitors.create_monitor(%{
  name: "Inactive Monitor",
  description: "Тестовый неактивный монитор",
  url: "https://test.example.com",
  method: :HEAD,
  interval_seconds: 600,
  timeout_seconds: 15,
  is_active: false,
  account_id: sentinel_account.id
})
