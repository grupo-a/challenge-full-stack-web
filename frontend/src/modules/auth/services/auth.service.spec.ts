/**
 * Testes unitários para auth.service.ts
 *
 * Este arquivo testa o serviço de autenticação
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../services/auth.service';
import { api, AUTH_TOKEN_KEY } from '@/core/services/api.service';
import type { AuthResponse, User } from '../types/auth.types';
import { UserRole } from '../types/auth.types';

// Mock do módulo api
vi.mock('@/core/services/api.service', () => ({
    api: {
        post: vi.fn(),
        get: vi.fn()
    },
    AUTH_TOKEN_KEY: 'auth_token'
}));

// Dados mock para os testes
const mockUser: User = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: UserRole.ADMIN,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
};

const mockAuthResponse: AuthResponse = {
    user: mockUser,
    token: 'mock-jwt-token'
};

describe('authService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock do localStorage já configurado no setup.ts
    });

    describe('login', () => {
        it('should call API with correct credentials', async () => {
            vi.mocked(api.post).mockResolvedValue({ data: mockAuthResponse });

            const credentials = {
                email: 'test@example.com',
                password: 'password123'
            };
            const result = await authService.login(credentials);

            expect(api.post).toHaveBeenCalledWith('/auth/login', credentials);
            expect(result).toEqual(mockAuthResponse);
        });

        it('should propagate API errors', async () => {
            const error = new Error('Erro de rede');
            vi.mocked(api.post).mockRejectedValue(error);

            await expect(
                authService.login({
                    email: 'test@example.com',
                    password: 'wrong'
                })
            ).rejects.toThrow('Erro de rede');
        });
    });

    describe('register', () => {
        it('should call API with register data', async () => {
            vi.mocked(api.post).mockResolvedValue({ data: mockAuthResponse });

            const registerData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };
            const result = await authService.register(registerData);

            expect(api.post).toHaveBeenCalledWith(
                '/auth/register',
                registerData
            );
            expect(result).toEqual(mockAuthResponse);
        });
    });

    describe('getProfile', () => {
        it('should fetch logged user profile', async () => {
            vi.mocked(api.get).mockResolvedValue({ data: mockUser });

            const result = await authService.getProfile();

            expect(api.get).toHaveBeenCalledWith('/auth/me');
            expect(result).toEqual(mockUser);
        });
    });

    describe('token management', () => {
        it('should save token in localStorage with setToken', () => {
            authService.setToken('new-token');
            expect(localStorage.setItem).toHaveBeenCalledWith(
                AUTH_TOKEN_KEY,
                'new-token'
            );
        });

        it('should get token from localStorage with getToken', () => {
            vi.mocked(localStorage.getItem).mockReturnValue('stored-token');

            const token = authService.getToken();

            expect(localStorage.getItem).toHaveBeenCalledWith(AUTH_TOKEN_KEY);
            expect(token).toBe('stored-token');
        });

        it('should remove token from localStorage with logout', () => {
            authService.logout();
            expect(localStorage.removeItem).toHaveBeenCalledWith(
                AUTH_TOKEN_KEY
            );
        });

        it('should return true from hasToken if token exists', () => {
            vi.mocked(localStorage.getItem).mockReturnValue('some-token');

            expect(authService.hasToken()).toBe(true);
        });

        it('should return false from hasToken if token does not exist', () => {
            vi.mocked(localStorage.getItem).mockReturnValue(null);

            expect(authService.hasToken()).toBe(false);
        });
    });
});
