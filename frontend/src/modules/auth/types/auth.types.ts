/**
 * Tipos do módulo de autenticação
 */

// Dados do usuário autenticado
export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

// Roles do usuário
export const UserRole = {
    ADMIN: 'admin',
    USER: 'user'
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// Credenciais para login
export interface LoginCredentials {
    email: string;
    password: string;
}

// Dados para registro de novo usuário
export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

// Resposta do endpoint de login
export interface AuthResponse {
    user: User;
    token: string;
}

// Estado da store de autenticação
export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}
