import * as React from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { HomeIcon, SettingsIcon, LogOutIcon } from "lucide-react";
import { Link } from "@inertiajs/react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  const user = useCurrentUser();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar variant="inset">
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-2">
              <h2 className="text-xl font-bold">Sentinel</h2>
              <SidebarTrigger className="md:hidden" />
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Dashboard"
                  isActive={window.location.pathname === "/dashboard"}
                >
                  <Link href="/dashboard">
                    <HomeIcon />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Settings"
                  isActive={window.location.pathname.startsWith("/settings")}
                >
                  <Link href="/settings">
                    <SettingsIcon />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-full bg-slate-100 w-8 h-8 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate">
                    {user.email}
                  </span>
                </div>
              </div>

              <SidebarMenuButton asChild tooltip="Logout" variant="outline">
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="w-full"
                >
                  <LogOutIcon />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarRail />

        <SidebarInset>
          <div className="flex-1 p-6">
            {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
