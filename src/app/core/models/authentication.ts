export interface LoginResponseDTO {
    token: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        role_id: number;
        status: number;
        profile_completed: boolean;
    }
}