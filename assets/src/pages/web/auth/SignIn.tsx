import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms";

import { useForm, usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";

interface CustomPageProps extends Record<string, unknown> {
  flash: {
    error?: string;
    info?: string;
  };
}

type PageProps = InertiaPageProps & CustomPageProps;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: ""
  });
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.sign_in",
  });
  const { flash } = usePage<PageProps>().props;

  console.log(errors);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/sign_in");
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {flash.error && (
        <Alert variant="destructive">
          <AlertDescription>{flash.error}</AlertDescription>
        </Alert>
      )}
      {flash.info && (
        <Alert>
          <AlertDescription>{flash.info}</AlertDescription>
        </Alert>
      )}
      <Form handleSubmit={onSubmit} initialValues={data}>
        <div className={cn("flex flex-col gap-6", className)} {...props}>

          <div className="grid gap-3">
            <FormField name="email">
              <FormItem>
                <FormLabel
                  className={errors.email && "text-red-500"}
                  htmlFor="email"
                >
                  {t("email")}
                </FormLabel>
                <Input
                  id="email"
                  placeholder="email@example.com"
                  value={data.email}
                  className={errors.email && "border-red-500"}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  disabled={processing}
                />{" "}
                <FormMessage error={errors.email} />
              </FormItem>
            </FormField>
          </div>

          <div className="grid gap-3">
            <FormField name="password">
              <FormItem>
                <FormLabel
                  className={errors.password && "text-red-500"}
                  htmlFor="password"
                >
                  {t("password")}
                </FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={data.password}
                  className={errors.password && "border-red-500"}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  disabled={processing}
                />{" "}
                <FormMessage error={errors.password} />
              </FormItem>
            </FormField>
          </div>
          <Button type="submit" className="w-full">
            {t("submit")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default function Registration() {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.sign_in",
  });
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Sentinel
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
