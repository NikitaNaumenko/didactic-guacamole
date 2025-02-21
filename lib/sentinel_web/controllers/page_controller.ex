defmodule SentinelWeb.PageController do
  use SentinelWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    conn
      |> assign(:page_title, "test")
      |> render_inertia("Home")
  end
end
