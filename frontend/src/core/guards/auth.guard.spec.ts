/**
 * Testes unitários para os guards de autenticação
 *
 * Este arquivo testa os route guards (authGuard e guestGuard)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { authGuard, guestGuard } from '@/core/guards/auth.guard';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

// Mock das rotas
const createMockRoute = (overrides = {}): RouteLocationNormalized => ({
    path: '/test',
    name: 'test',
    params: {},
    query: {},
    hash: '',
    fullPath: '/test',
    matched: [],
    meta: {},
    redirectedFrom: undefined,
    ...overrides
});

describe('Auth Guards', () => {
    let mockNext: NavigationGuardNext;

    beforeEach(() => {
        setActivePinia(createPinia());
        mockNext = vi.fn() as unknown as NavigationGuardNext;
    });

    describe('authGuard', () => {
        it('should allow access if user is authenticated', () => {
            const store = useAuthStore();
            // Simula usuário autenticado definindo o token diretamente
            store.$patch({ token: 'valid-token' });

            const toRoute = createMockRoute({
                path: '/students',
                name: 'students'
            });
            const fromRoute = createMockRoute({
                path: '/login',
                name: 'login'
            });

            authGuard(toRoute, fromRoute, mockNext);

            expect(mockNext).toHaveBeenCalledWith();
        });

        it('should redirect to login if user is not authenticated', () => {
            const store = useAuthStore();
            // Garante que não há token
            store.$patch({ token: null });

            const toRoute = createMockRoute({
                path: '/students',
                fullPath: '/students',
                name: 'students'
            });
            const fromRoute = createMockRoute({ path: '/', name: 'home' });

            authGuard(toRoute, fromRoute, mockNext);

            expect(mockNext).toHaveBeenCalledWith({
                name: 'login',
                query: { redirect: '/students' }
            });
        });

        it('should preserve redirect URL after login', () => {
            const store = useAuthStore();
            store.$patch({ token: null });

            const toRoute = createMockRoute({
                path: '/students/edit/123',
                fullPath: '/students/edit/123',
                name: 'student-edit'
            });
            const fromRoute = createMockRoute();

            authGuard(toRoute, fromRoute, mockNext);

            expect(mockNext).toHaveBeenCalledWith({
                name: 'login',
                query: { redirect: '/students/edit/123' }
            });
        });
    });

    describe('guestGuard', () => {
        it('should allow access if user is not authenticated', () => {
            const store = useAuthStore();
            store.$patch({ token: null });

            const toRoute = createMockRoute({ path: '/login', name: 'login' });
            const fromRoute = createMockRoute();

            guestGuard(toRoute, fromRoute, mockNext);

            expect(mockNext).toHaveBeenCalledWith();
        });

        it('should redirect to students if user is authenticated', () => {
            const store = useAuthStore();
            store.$patch({ token: 'valid-token' });

            const toRoute = createMockRoute({ path: '/login', name: 'login' });
            const fromRoute = createMockRoute();

            guestGuard(toRoute, fromRoute, mockNext);

            expect(mockNext).toHaveBeenCalledWith({ name: 'students' });
        });

        it('should block access to register page if already logged in', () => {
            const store = useAuthStore();
            store.$patch({ token: 'valid-token' });

            const toRoute = createMockRoute({
                path: '/register',
                name: 'register'
            });
            const fromRoute = createMockRoute();

            guestGuard(toRoute, fromRoute, mockNext);

            expect(mockNext).toHaveBeenCalledWith({ name: 'students' });
        });
    });
});
