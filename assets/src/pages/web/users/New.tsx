import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/pages/layouts/AuthLayout";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/forms";

interface Props {
    errors: Record<string, string[]>;
}

export default function New({ errors }: Props) {
    const { t } = useTranslation();
    const { data, setData, post, processing } = useForm({
        email: "",
        first_name: "",
        last_name: "",
        role: "user",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/users");
    }

    return (
        <AuthLayout title={t("users.form.title")}>
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>{t("users.form.title")}</CardTitle>
                    <CardDescription>{t("users.form.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form handleSubmit={handleSubmit} initialValues={data}>
                        <div className="grid gap-6">
                            <FormField name="first_name">
                                <FormItem>
                                    <FormLabel htmlFor="first_name">
                                        {t("users.first_name")}
                                    </FormLabel>
                                    <Input
                                        id="first_name"
                                        value={data.first_name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setData("first_name", e.target.value)
                                        }
                                    />
                                    <FormMessage error={errors.first_name} />
                                </FormItem>
                            </FormField>

                            <FormField name="last_name">
                                <FormItem>
                                    <FormLabel htmlFor="last_name">
                                        {t("users.last_name")}
                                    </FormLabel>
                                    <Input
                                        id="last_name"
                                        value={data.last_name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setData("last_name", e.target.value)
                                        }
                                    />
                                    <FormMessage error={errors.last_name} />
                                </FormItem>
                            </FormField>

                            <FormField name="email">
                                <FormItem>
                                    <FormLabel htmlFor="email">{t("users.email")}</FormLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <FormMessage error={errors.email} />
                                </FormItem>
                            </FormField>

                            <FormField name="role">
                                <FormItem>
                                    <FormLabel htmlFor="role">{t("users.role")}</FormLabel>
                                    <Select
                                        value={data.role}
                                        onValueChange={(value: string) => setData("role", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("users.form.role.placeholder")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">
                                                {t("users.form.role.user")}
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                {t("users.form.role.admin")}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage error={errors.role} />
                                </FormItem>
                            </FormField>
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button type="submit" disabled={processing}>
                                {t("users.form.submit")}
                            </Button>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </AuthLayout>
    );
} 