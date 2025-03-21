import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import AuthLayout from "@/pages/layouts/AuthLayout";
// import { route } from '@/lib/route';

interface Props {
  monitors: Monitor[];
}

export default function Index({ monitors }: Props) {
  const { t } = useTranslation();
  // const currentUser = useCurrentUser();

  // if (!currentUser) {
  //   return null;
  // }

  return (
    <AuthLayout title={t("monitors.title")}>
      <Head title={t("monitors.title")} />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {t("monitors.list")}
          </h3>
          {/* <Link href={route('monitors.create')}> */}
          <Button>{t("monitors.create")}</Button>
          {/* </Link> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monitors.map((monitor) => (
            <Card key={monitor.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{monitor.name}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      monitor.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {monitor.is_active
                      ? t("monitors.active")
                      : t("monitors.inactive")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{monitor.description}</p>
                  <p className="text-sm">
                    <span className="font-medium">{t("monitors.url")}:</span>{" "}
                    {monitor.url}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">{t("monitors.method")}:</span>{" "}
                    {monitor.method}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">
                      {t("monitors.interval")}:
                    </span>{" "}
                    {monitor.interval_seconds}s
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">
                      {t("monitors.timeout")}:
                    </span>{" "}
                    {monitor.timeout_seconds}s
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">
                      {t("monitors.expected_status")}:
                    </span>{" "}
                    {monitor.expected_status_code}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">
                      {t("monitors.retry_count")}:
                    </span>{" "}
                    {monitor.retry_count}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">
                      {t("monitors.retry_interval")}:
                    </span>{" "}
                    {monitor.retry_interval_seconds}s
                  </p>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  {/* <Link href={route('monitors.edit', monitor.id)}>
                    <Button variant="outline" size="sm">{t('monitors.edit')}</Button>
                  </Link>
                  <Link href={route('monitors.show', monitor.id)}>
                    <Button variant="outline" size="sm">{t('monitors.view')}</Button>
                  </Link> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthLayout>
  );
}
