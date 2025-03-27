import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/user";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/pages/layouts/AuthLayout";

interface Props {
    user: User;
}

export default function Show({ user }: Props) {
    const { t } = useTranslation();
    console.log(user)
    const formatDate = (dateString: string) => {
        console.log(dateString)
        const date = new Date(dateString);
        console.log(date)
        if (isNaN(date.getTime())) {
            return t("common.not_available");
        }
        return date.toLocaleString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <AuthLayout title={`${user.first_name} ${user.last_name}`}>
            <div className="max-w-3xl mx-auto py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {user.first_name} {user.last_name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                                {t("users.email")}
                            </h3>
                            <p>{user.email}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                                {t("users.role")}
                            </h3>
                            <p className="capitalize">{t(`users.form.role.${user.role}`)}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                                {t("users.created_at")}
                            </h3>
                            <p>{formatDate(user.inserted_at)}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">
                                {t("users.updated_at")}
                            </h3>
                            <p>{formatDate(user.updated_at)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthLayout>
    );
} 