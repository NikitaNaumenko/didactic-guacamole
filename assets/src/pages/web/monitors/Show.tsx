import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Monitor, Certificate, Check } from "@/types";
import AuthLayout from "@/pages/layouts/AuthLayout";
import { Activity, Clock, Globe, RefreshCw, Shield, Timer, Bell, Settings, AlertTriangle, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Incident {
  id: string;
  inserted_at: string;
  resolved_at: string | null;
  status: string;
  monitor_id: string;
}

interface Props {
  monitor: Monitor;
  certificate: Certificate;
  uptime: number;
  avgResponseTime: number;
  incidentsCount: number;
  lastFiveChecks: Check[];
  lastFiveIncidents: Incident[];
}

export default function Show({
  monitor,
  certificate,
  uptime,
  avgResponseTime,
  incidentsCount,
  lastFiveChecks,
  lastFiveIncidents,
}: Props) {
  const { t } = useTranslation();

  console.log(lastFiveChecks);
  return (
    <AuthLayout>
      <Head title={t("monitors.show")} />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">{monitor.name}</h2>
            <Badge
              variant={monitor.state === 'active' ? "success" : "destructive"}
              className={`
                ${monitor.state === 'active' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'} 
                text-white font-medium px-3 py-1
              `}
            >
              {monitor.state === 'active' ? t("monitors.active") : t("monitors.inactive")}
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{t("monitors.checking_interval", { interval: monitor.interval })}</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-5 mb-6">
              <div className="md:col-span-3">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("monitors.uptime")}
                      </CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{uptime}%</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("monitors.avg_response_time")}
                      </CardTitle>
                      <Timer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{avgResponseTime}ms</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("monitors.incidents_count")}
                      </CardTitle>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{incidentsCount}</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4 md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>SSL Certificate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {certificate ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Lock className="h-4 w-4" />
                          <span>{certificate.issuer}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Valid From</p>
                            <p>{new Date(certificate.not_before).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Valid Until</p>
                            <p>{new Date(certificate.not_after).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>No SSL certificate found for this monitor</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Last 5 Checks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lastFiveChecks.map((check) => (
                        <div key={check.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant={check.result === 'success' ? "success" : "destructive"}>
                              {check.result}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(check.inserted_at).toLocaleString()}
                            </span>
                          </div>
                          <span>{check.duration}ms</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("monitors.incidents.title")}</CardTitle>
                <CardDescription>{t("monitors.incidents.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("monitors.incidents.id")}</TableHead>
                      <TableHead>{t("monitors.incidents.status")}</TableHead>
                      <TableHead>{t("monitors.incidents.created_at")}</TableHead>
                      <TableHead>{t("monitors.incidents.resolved_at")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lastFiveIncidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell>#{incident.id}</TableCell>
                        <TableCell>
                          <Badge variant={incident.status === 'resolved' ? 'success' : 'destructive'}>
                            {incident.status === 'resolved'
                              ? t("monitors.incidents.status_resolved")
                              : t("monitors.incidents.status_active")}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(incident.inserted_at).toLocaleString()}</TableCell>
                        <TableCell>
                          {incident.resolved_at
                            ? new Date(incident.resolved_at).toLocaleString()
                            : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you want to be notified when this monitor fails.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monitor.escalation_policy_id ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t("monitors.escalation_policy")}</span>
                      <span className="text-sm text-muted-foreground">#{monitor.escalation_policy_id}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t("monitors.no_escalation_policy")}</p>
                  )}
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
