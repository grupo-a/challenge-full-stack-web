import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { useNotification } from '@/core/composables/useNotification';
import type { LoginCredentials, RegisterData } from '../types/auth.types';

export const useAuth = () => {
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const notification = useNotification();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const isLoading = computed(() => authStore.isLoading);
    const user = computed(() => authStore.user);
    const error = computed(() => authStore.error);
    const isAdmin = computed(() => authStore.isAdmin);

    async function handleLogin(
        credentials: LoginCredentials
    ): Promise<boolean> {
        try {
            await authStore.login(credentials);

            notification.success('Login realizado com sucesso!');

            const redirectPath =
                (route.query.redirect as string) || '/students';
            await router.push(redirectPath);

            return true;
        } catch {
            notification.error(authStore.error || 'Falha ao realizar login');
            return false;
        }
    }

    async function handleRegister(data: RegisterData): Promise<boolean> {
        try {
            await authStore.register(data);

            notification.success('Conta criada com sucesso!');

            await router.push('/students');

            return true;
        } catch {
            notification.error(authStore.error || 'Falha ao criar conta');
            return false;
        }
    }

    async function handleLogout(): Promise<void> {
        authStore.logout();
        notification.info('Você saiu da sua conta');
        await router.push('/login');
    }

    async function initializeAuth(): Promise<void> {
        await authStore.initialize();
    }

    return {
        isAuthenticated,
        isLoading,
        user,
        error,
        isAdmin,
        handleLogin,
        handleRegister,
        handleLogout,
        initializeAuth
    };
};
