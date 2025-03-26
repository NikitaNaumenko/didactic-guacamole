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
import { HomeIcon, SettingsIcon, ActivityIcon, LogOutIcon, UsersIcon } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Toaster, toast } from "sonner";
import { PageProps } from "@inertiajs/core";
import Routes from "@/routes/routes";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

interface CustomPageProps extends Record<string, unknown> {
  flash: {
    error?: string;
    info?: string;
    success?: string;
  };
}

type Props = PageProps & CustomPageProps;

interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive: (path: string) => boolean;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const currentPath = window.location.pathname;
  const { flash } = usePage<Props>().props;

  React.useEffect(() => {
    if (flash.error) {
      toast.error(flash.error);
    }
    if (flash.success) {
      toast.success(flash.success);
    }
    if (flash.info) {
      toast.info(flash.info);
    }
  }, [flash]);

  const menuItems: MenuItem[] = [
    {
      title: t("sidebar.monitors"),
      href: Routes.path("monitors.index"),
      icon: <ActivityIcon />,
      isActive: (path) => path.startsWith("/monitors"),
    },
    {
      title: t("sidebar.users"),
      href: "/users",
      icon: <UsersIcon />,
      isActive: (path) => path.startsWith("/users"),
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <Toaster richColors position="top-right" />
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
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={item.isActive(currentPath)}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
      </div>

      <SidebarInset>
        <div className="flex-1 p-6">
          {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
          <main>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
