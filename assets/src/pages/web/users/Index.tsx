import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { User } from "@/types/user";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/pages/layouts/AuthLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Routes from "@/routes/routes";

interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    const { t } = useTranslation();

    return (
        <AuthLayout title={t("users.title")}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{t("users.title")}</h1>
                <Link href="/users/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        {t("users.create")}
                    </Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t("users.first_name")}</TableHead>
                        <TableHead>{t("users.last_name")}</TableHead>
                        <TableHead>{t("users.email")}</TableHead>
                        <TableHead>{t("users.role")}</TableHead>
                        <TableHead>{t("users.created_at")}</TableHead>
                        <TableHead className="text-right">{t("users.actions")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="capitalize">{user.role}</TableCell>
                            <TableCell>
                                {new Date(user.inserted_at).toLocaleDateString("ru-RU", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </TableCell>
                            <TableCell className="text-right">
                                <Link href={Routes.path("users.show", { id: user.id })}>
                                    <Button variant="ghost" size="sm">
                                        {t("monitors.view")}
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AuthLayout>
    );
} 