import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types/auth.types';
import { authService } from '../services/auth.service';
import type { LoginSchemaType, RegisterSchemaType } from '../schema';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(authService.getToken());
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => !!token.value);
    const userName = computed(() => user.value?.name ?? '');
    const userEmail = computed(() => user.value?.email ?? '');
    const isAdmin = computed(() => user.value?.role === 'admin');

    async function login(credentials: LoginSchemaType): Promise<void> {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await authService.login(credentials);

            authService.setToken(response.token);

            user.value = response.user;
            token.value = response.token;
        } catch (e) {
            const err = e as { message: string };
            error.value = err.message || 'Erro ao realizar login';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function register(data: RegisterSchemaType): Promise<void> {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await authService.register(data);

            authService.setToken(response.token);

            user.value = response.user;
            token.value = response.token;
        } catch (e) {
            const err = e as { message: string };
            error.value = err.message || 'Erro ao realizar registro';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchProfile(): Promise<void> {
        if (!token.value) return;

        isLoading.value = true;
        error.value = null;

        try {
            const userData = await authService.getProfile();
            user.value = userData;
        } catch (e) {
            const err = e as { message: string };
            error.value = err.message || 'Erro ao buscar perfil do usuário';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    function logout(): void {
        authService.logout();
        user.value = null;
        token.value = null;
        error.value = null;
    }

    async function initialize(): Promise<void> {
        if (authService.hasToken()) {
            try {
                await fetchProfile();
            } catch {
                logout();
            }
        }
    }

    function $reset(): void {
        user.value = null;
        token.value = null;
        isLoading.value = false;
        error.value = null;
    }

    return {
        user,
        token,
        isLoading,
        error,

        isAuthenticated,
        userName,
        userEmail,
        isAdmin,

        login,
        register,
        fetchProfile,
        logout,
        initialize,
        $reset
    };
});
