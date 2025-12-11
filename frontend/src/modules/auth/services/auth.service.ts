import { api, AUTH_TOKEN_KEY } from '@/core/services/api.service';
import type { AuthResponse, User } from '../types/auth.types';
import type { LoginSchemaType, RegisterSchemaType } from '../schema';

export const authService = {
    async login(credentials: LoginSchemaType): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>(
            '/auth/login',
            credentials
        );
        return data;
    },

    async register(registerData: RegisterSchemaType): Promise<AuthResponse> {
        const { data } = await api.post<AuthResponse>(
            '/auth/register',
            registerData
        );
        return data;
    },

    async getProfile(): Promise<User> {
        const { data } = await api.get<User>('/auth/me');
        return data;
    },

    logout(): void {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    },

    setToken(token: string): void {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    },

    getToken(): string | null {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    },

    hasToken(): boolean {
        return !!localStorage.getItem(AUTH_TOKEN_KEY);
    }
};
