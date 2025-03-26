import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/user";

interface Props {
    user: User;
}

export default function Show({ user }: Props) {
    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {user.first_name} {user.last_name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p>{user.email}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Роль</h3>
                        <p className="capitalize">{user.role}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Дата создания
                        </h3>
                        <p>
                            {new Date(user.inserted_at).toLocaleDateString("ru-RU", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Последнее обновление
                        </h3>
                        <p>
                            {new Date(user.updated_at).toLocaleDateString("ru-RU", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 