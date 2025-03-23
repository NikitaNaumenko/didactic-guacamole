import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Monitor } from "@/types";
import AuthLayout from "@/pages/layouts/AuthLayout";
import { Activity, Clock, Globe, RefreshCw, Shield, Timer, Bell, Settings, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  monitor: Monitor;
}

export default function Show({ monitor }: Props) {
  const { t } = useTranslation();

  return (
    <AuthLayout>
      <Head title={t("monitors.show")} />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{monitor.name}</h2>
          <Badge variant={monitor.is_active ? "success" : "destructive"}>
            {monitor.is_active ? t("monitors.active") : t("monitors.inactive")}
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("monitors.interval")}
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monitor.interval_seconds}s</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("monitors.timeout")}
                  </CardTitle>
                  <Timer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monitor.timeout_seconds}s</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("monitors.retry_count")}
                  </CardTitle>
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monitor.retry_count}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("monitors.expected_status")}
                  </CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monitor.expected_status_code}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>{t("monitors.details")}</CardTitle>
                  <CardDescription>{t("monitors.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {t("monitors.url")}
                      </h3>
                      <p className="mt-1 text-sm">{monitor.url}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {t("monitors.method")}
                      </h3>
                      <p className="mt-1 text-sm">{monitor.method}</p>
                    </div>

                    {monitor.body && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          {t("monitors.body")}
                        </h3>
                        <pre className="mt-1 text-sm bg-muted p-4 rounded-md overflow-x-auto">
                          {monitor.body}
                        </pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>{t("monitors.headers")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(monitor.headers).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{key}</span>
                        <span className="text-sm text-muted-foreground">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you want to be notified when this monitor fails.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Здесь будет форма настройки уведомлений */}
                  <p className="text-sm text-muted-foreground">Notification settings coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Monitor Settings</CardTitle>
                <CardDescription>Update your monitor configuration.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Здесь будет форма настройки монитора */}
                  <p className="text-sm text-muted-foreground">Monitor settings form coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger">
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Careful, these actions cannot be undone.</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Deleting this monitor will permanently remove it and all associated data.
                  </AlertDescription>
                </Alert>
                <div className="mt-4">
                  <Button variant="destructive">Delete Monitor</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
  );
}
