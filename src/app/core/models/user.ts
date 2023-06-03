export interface User {
    id?: number;
    role_id?: number;
    username?: string;
    last_name?: string;
    first_name?: string;
    nickname?: string;
}

export interface MyUser extends User {
    created_at?: number;
    email?: string;
    email_verified?: boolean;
    phone?: string | null;
    phone_verified?: boolean;
    profile_completed?: boolean;
    status?: number;
    updated_at?: number;
}