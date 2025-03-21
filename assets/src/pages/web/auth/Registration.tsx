import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms";

import { useForm } from "@inertiajs/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    users: { email: "", password: "" },
  });
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.registration",
  });

  console.log(errors);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post("/register");
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form handleSubmit={onSubmit} initialValues={data}>
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="grid gap-3">
            <FormField name="name">
              <FormItem>
                <FormLabel
                  className={errors.name && "text-red-500"}
                  htmlFor="name"
                >
                  {t("accountName")}
                </FormLabel>
                <Input
                  id="accountName"
                  placeholder="Acme Inc."
                  value={data.account.name}
                  className={errors.name && "border-red-500"}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  disabled={processing}
                />
                <FormMessage error={errors.name} />
              </FormItem>
            </FormField>
          </div>

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
      <div className="text-slate-500 *:[a]:hover:text-slate-900 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 dark:text-slate-400 dark:*:[a]:hover:text-slate-50">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>
        {""}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
export default function Registration() {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.registration",
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
        <div className="text-center text-sm">
          {t("have_account")}{" "}
          <a href="/login" className="underline underline-offset-4">
            {t("sign_in")}
          </a>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
