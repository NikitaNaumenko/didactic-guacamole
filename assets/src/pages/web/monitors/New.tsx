import { Head, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/pages/layouts/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms";
import { Monitor } from "@/types";

type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

type MonitorFormData = {
  name: string;
  description: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS";
  is_active: boolean;
  interval_seconds: number;
  timeout_seconds: number;
  expected_status_code: string;
  retry_count: number;
  retry_interval_seconds: number;
  headers: Record<string, string>;
  body: string;
};

export default function New() {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors } = useForm<MonitorFormData>({
    name: "",
    description: "",
    url: "",
    method: "GET",
    is_active: true,
    interval_seconds: 300,
    timeout_seconds: 10,
    expected_status_code: "ok",
    retry_count: 3,
    retry_interval_seconds: 60,
    headers: {},
    body: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post("/monitors");
  };

  return (
    <AuthLayout>
      <Head title={t("monitors.new")} />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("monitors.create")}
          </h2>
        </div>

        <Form handleSubmit={handleSubmit} initialValues={data}>
          <Card>
            <CardHeader>
              <CardTitle>{t("monitors.basic_info")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField name="name">
                  <FormItem>
                    <FormLabel
                      className={errors.name && "text-red-500"}
                      htmlFor="name"
                    >
                      {t("monitors.name")}
                    </FormLabel>
                    <Input
                      id="name"
                      placeholder={"Awesome Monitor"}
                      value={data.name}
                      className={errors.name && "border-red-500"}
                      onChange={(e: InputEvent) => setData("name", e.target.value)}
                      disabled={processing}
                    />
                    <FormMessage error={errors.name} />
                  </FormItem>
                </FormField>

                <FormField name="url">
                  <FormItem>
                    <FormLabel
                      className={errors.url && "text-red-500"}
                      htmlFor="url"
                    >
                      {t("monitors.url")}
                    </FormLabel>
                    <Input
                      id="url"
                      placeholder={"https://example.com"}
                      value={data.url}
                      className={errors.url && "border-red-500"}
                      onChange={(e: InputEvent) => setData("url", e.target.value)}
                      disabled={processing}
                    />
                    <FormMessage error={errors.url} />
                  </FormItem>
                </FormField>

                <FormField name="method">
                  <FormItem>
                    <FormLabel
                      className={errors.method && "text-red-500"}
                      htmlFor="method"
                    >
                      {t("monitors.method")}
                    </FormLabel>
                    <Select
                      value={data.method}
                      onValueChange={(value) => setData("method", value as MonitorFormData["method"])}
                      disabled={processing}
                    >
                      <SelectTrigger
                        id="method"
                        className={errors.method && "border-red-500"}
                      >
                        <SelectValue placeholder={t("monitors.method_placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                        <SelectItem value="HEAD">HEAD</SelectItem>
                        <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage error={errors.method} />
                  </FormItem>
                </FormField>

                {/* <FormField name="description">
                  <FormItem>
                    <FormLabel
                      className={errors.description && "text-red-500"}
                      htmlFor="description"
                    >
                      {t("monitors.description")}
                    </FormLabel>
                    <textarea
                      id="description"
                      placeholder={t("monitors.description_placeholder")}
                      value={data.description}
                      className={`w-full rounded-md border p-2 ${errors.description ? "border-red-500" : ""}`}
                      onChange={(e: InputEvent) => setData("description", e.target.value)}
                      disabled={processing}
                    />
                    <FormMessage error={errors.description} />
                  </FormItem>
                </FormField> */}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{t("monitors.advanced_settings")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField name="interval_seconds">
                  <FormItem>
                    <FormLabel
                      className={errors.interval_seconds && "text-red-500"}
                      htmlFor="interval_seconds"
                    >
                      {t("monitors.interval")}
                    </FormLabel>
                    <Input
                      id="interval_seconds"
                      type="number"
                      min="1"
                      value={data.interval_seconds}
                      className={errors.interval_seconds && "border-red-500"}
                      onChange={(e: InputEvent) => setData("interval_seconds", parseInt(e.target.value))}
                      disabled={processing}
                    />
                    <FormMessage error={errors.interval_seconds} />
                  </FormItem>
                </FormField>

                <FormField name="timeout_seconds">
                  <FormItem>
                    <FormLabel
                      className={errors.timeout_seconds && "text-red-500"}
                      htmlFor="timeout_seconds"
                    >
                      {t("monitors.timeout")}
                    </FormLabel>
                    <Input
                      id="timeout_seconds"
                      type="number"
                      min="1"
                      value={data.timeout_seconds}
                      className={errors.timeout_seconds && "border-red-500"}
                      onChange={(e: InputEvent) => setData("timeout_seconds", parseInt(e.target.value))}
                      disabled={processing}
                    />
                    <FormMessage error={errors.timeout_seconds} />
                  </FormItem>
                </FormField>

                <FormField name="expected_status_code">
                  <FormItem>
                    <FormLabel
                      className={errors.expected_status_code && "text-red-500"}
                      htmlFor="expected_status_code"
                    >
                      {t("monitors.expected_status")}
                    </FormLabel>
                    <Select
                      value={data.expected_status_code}
                      onValueChange={(value) => setData("expected_status_code", value)}
                      disabled={processing}
                    >
                      <SelectTrigger
                        id="expected_status_code"
                        className={errors.expected_status_code && "border-red-500"}
                      >
                        <SelectValue placeholder={t("monitors.expected_status_placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ok">200 OK</SelectItem>
                        <SelectItem value="created">201 Created</SelectItem>
                        <SelectItem value="accepted">202 Accepted</SelectItem>
                        <SelectItem value="no_content">204 No Content</SelectItem>
                        <SelectItem value="bad_request">400 Bad Request</SelectItem>
                        <SelectItem value="unauthorized">401 Unauthorized</SelectItem>
                        <SelectItem value="forbidden">403 Forbidden</SelectItem>
                        <SelectItem value="not_found">404 Not Found</SelectItem>
                        <SelectItem value="internal_server_error">500 Internal Server Error</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage error={errors.expected_status_code} />
                  </FormItem>
                </FormField>

                <FormField name="retry_count">
                  <FormItem>
                    <FormLabel
                      className={errors.retry_count && "text-red-500"}
                      htmlFor="retry_count"
                    >
                      {t("monitors.retry_count")}
                    </FormLabel>
                    <Input
                      id="retry_count"
                      type="number"
                      min="0"
                      value={data.retry_count}
                      className={errors.retry_count && "border-red-500"}
                      onChange={(e: InputEvent) => setData("retry_count", parseInt(e.target.value))}
                      disabled={processing}
                    />
                    <FormMessage error={errors.retry_count} />
                  </FormItem>
                </FormField>

                <FormField name="retry_interval_seconds">
                  <FormItem>
                    <FormLabel
                      className={errors.retry_interval_seconds && "text-red-500"}
                      htmlFor="retry_interval_seconds"
                    >
                      {t("monitors.retry_interval")}
                    </FormLabel>
                    <Input
                      id="retry_interval_seconds"
                      type="number"
                      min="1"
                      value={data.retry_interval_seconds}
                      className={errors.retry_interval_seconds && "border-red-500"}
                      onChange={(e: InputEvent) => setData("retry_interval_seconds", parseInt(e.target.value))}
                      disabled={processing}
                    />
                    <FormMessage error={errors.retry_interval_seconds} />
                  </FormItem>
                </FormField>

                {/* <FormField name="body">
                  <FormItem>
                    <FormLabel
                      className={errors.body && "text-red-500"}
                      htmlFor="body"
                    >
                      {t("monitors.body")}
                    </FormLabel>
                    <textarea
                      id="body"
                      placeholder={t("monitors.body_placeholder")}
                      value={data.body}
                      className={`w-full rounded-md border p-2 ${errors.body ? "border-red-500" : ""}`}
                      onChange={(e: InputEvent) => setData("body", e.target.value)}
                      disabled={processing}
                    />
                    <FormMessage error={errors.body} />
                  </FormItem>
                </FormField> */}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Button type="submit" disabled={processing}>
              {processing ? t("common.processing") : t("monitors.create")}
            </Button>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
}
