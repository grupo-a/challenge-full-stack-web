export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export const UserRole = {
    ADMIN: 'admin',
    USER: 'user'
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export interface AuthResponse {
    user: User;
    token: string;
}
