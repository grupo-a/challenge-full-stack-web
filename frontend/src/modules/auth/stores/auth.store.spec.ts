import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../stores/auth.store';
import { authService } from '../services/auth.service';
import type { AuthResponse, User } from '../types/auth.types';
import { UserRole } from '../types/auth.types';

vi.mock('../services/auth.service', () => ({
    authService: {
        login: vi.fn(),
        register: vi.fn(),
        getProfile: vi.fn(),
        logout: vi.fn(),
        setToken: vi.fn(),
        getToken: vi.fn(),
        hasToken: vi.fn()
    }
}));

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

describe('useAuthStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks();
    });

    describe('Estado inicial', () => {
        it('should start with user null', () => {
            const store = useAuthStore();
            expect(store.user).toBeNull();
        });

        it('should start with isAuthenticated false', () => {
            vi.mocked(authService.getToken).mockReturnValue(null);
            const store = useAuthStore();
            expect(store.isAuthenticated).toBe(false);
        });

        it('should start with isLoading false', () => {
            const store = useAuthStore();
            expect(store.isLoading).toBe(false);
        });

        it('should start with error null', () => {
            const store = useAuthStore();
            expect(store.error).toBeNull();
        });
    });

    describe('login', () => {
        it('should login successfully', async () => {
            vi.mocked(authService.login).mockResolvedValue(mockAuthResponse);

            const store = useAuthStore();
            await store.login({
                email: 'test@example.com',
                password: 'password123'
            });

            expect(authService.login).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123'
            });
            expect(authService.setToken).toHaveBeenCalledWith('mock-jwt-token');
            expect(store.user).toEqual(mockUser);
            expect(store.token).toBe('mock-jwt-token');
            expect(store.isAuthenticated).toBe(true);
        });

        it('should set isLoading during login', async () => {
            let resolveLogin: (value: AuthResponse) => void;
            const loginPromise = new Promise<AuthResponse>((resolve) => {
                resolveLogin = resolve;
            });
            vi.mocked(authService.login).mockReturnValue(loginPromise);

            const store = useAuthStore();
            const loginCall = store.login({
                email: 'test@example.com',
                password: 'password123'
            });

            expect(store.isLoading).toBe(true);

            resolveLogin!(mockAuthResponse);
            await loginCall;

            expect(store.isLoading).toBe(false);
        });

        it('should handle login error', async () => {
            const errorMessage = 'Credenciais inválidas';
            vi.mocked(authService.login).mockRejectedValue({
                message: errorMessage
            });

            const store = useAuthStore();

            await expect(
                store.login({ email: 'test@example.com', password: 'wrong' })
            ).rejects.toEqual({ message: errorMessage });

            expect(store.error).toBe(errorMessage);
            expect(store.user).toBeNull();
            expect(store.isLoading).toBe(false);
        });
    });

    describe('register', () => {
        it('should register user successfully', async () => {
            vi.mocked(authService.register).mockResolvedValue(mockAuthResponse);

            const store = useAuthStore();
            await store.register({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                confirmPassword: 'password123'
            });

            expect(authService.register).toHaveBeenCalled();
            expect(authService.setToken).toHaveBeenCalledWith('mock-jwt-token');
            expect(store.user).toEqual(mockUser);
            expect(store.token).toBe('mock-jwt-token');
        });

        it('should handle register error', async () => {
            const errorMessage = 'Email já cadastrado';
            vi.mocked(authService.register).mockRejectedValue({
                message: errorMessage
            });

            const store = useAuthStore();

            await expect(
                store.register({
                    name: 'Test',
                    email: 'test@example.com',
                    password: 'password123',
                    confirmPassword: 'password123'
                })
            ).rejects.toEqual({ message: errorMessage });

            expect(store.error).toBe(errorMessage);
        });
    });

    describe('logout', () => {
        it('should logout correctly', async () => {
            vi.mocked(authService.login).mockResolvedValue(mockAuthResponse);

            const store = useAuthStore();
            await store.login({
                email: 'test@example.com',
                password: 'password123'
            });

            expect(store.isAuthenticated).toBe(true);

            store.logout();

            expect(authService.logout).toHaveBeenCalled();
            expect(store.user).toBeNull();
            expect(store.token).toBeNull();
            expect(store.isAuthenticated).toBe(false);
        });
    });

    describe('initialize', () => {
        it('should fetch profile if token exists', async () => {
            vi.mocked(authService.hasToken).mockReturnValue(true);
            vi.mocked(authService.getToken).mockReturnValue('valid-token');
            vi.mocked(authService.getProfile).mockResolvedValue(mockUser);

            setActivePinia(createPinia());
            const store = useAuthStore();
            await store.initialize();

            expect(authService.getProfile).toHaveBeenCalled();
            expect(store.user).toEqual(mockUser);
        });

        it('should not fetch profile if no token', async () => {
            vi.mocked(authService.hasToken).mockReturnValue(false);
            vi.mocked(authService.getToken).mockReturnValue(null);

            setActivePinia(createPinia());
            const store = useAuthStore();
            await store.initialize();

            expect(authService.getProfile).not.toHaveBeenCalled();
        });

        it('should logout if fetch profile fails', async () => {
            vi.mocked(authService.hasToken).mockReturnValue(true);
            vi.mocked(authService.getToken).mockReturnValue('invalid-token');
            vi.mocked(authService.getProfile).mockRejectedValue(
                new Error('Token inválido')
            );

            setActivePinia(createPinia());
            const store = useAuthStore();
            await store.initialize();

            expect(authService.logout).toHaveBeenCalled();
            expect(store.user).toBeNull();
        });
    });

    describe('getters', () => {
        it('should return userName', async () => {
            vi.mocked(authService.login).mockResolvedValue(mockAuthResponse);

            const store = useAuthStore();
            await store.login({
                email: 'test@example.com',
                password: 'password123'
            });

            expect(store.userName).toBe('Test User');
        });

        it('should return empty string if no user', () => {
            const store = useAuthStore();
            expect(store.userName).toBe('');
        });

        it('should return isAdmin true for admin users', async () => {
            vi.mocked(authService.login).mockResolvedValue(mockAuthResponse);

            const store = useAuthStore();
            await store.login({
                email: 'test@example.com',
                password: 'password123'
            });

            expect(store.isAdmin).toBe(true);
        });
    });

    describe('$reset', () => {
        it('should reset store state', async () => {
            vi.mocked(authService.login).mockResolvedValue(mockAuthResponse);

            const store = useAuthStore();
            await store.login({
                email: 'test@example.com',
                password: 'password123'
            });

            store.$reset();

            expect(store.user).toBeNull();
            expect(store.token).toBeNull();
            expect(store.isLoading).toBe(false);
            expect(store.error).toBeNull();
        });
    });
});
