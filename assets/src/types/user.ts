export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    inserted_at: string;
    updated_at: string;
};

export type UserFormData = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
}; 