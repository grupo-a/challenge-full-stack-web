import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { useNotification } from '@/core/composables/useNotification';
import { formatApiValidationErrors } from '@/core/utils';
import type { RegisterSchemaType, LoginSchemaType } from '../schema';

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
    const validationErrors = ref<Record<string, string[]> | null>(null);

    async function handleLogin(credentials: LoginSchemaType): Promise<boolean> {
        validationErrors.value = null;

        try {
            await authStore.login(credentials);

            notification.success('Login realizado com sucesso!');

            const redirectPath =
                (route.query.redirect as string) || '/students';
            await router.push(redirectPath);

            return true;
        } catch (err) {
            const formattedApiErrors = formatApiValidationErrors(err);

            if (formattedApiErrors) {
                validationErrors.value = formattedApiErrors;
            }

            notification.error(authStore.error || 'Falha ao realizar login');
            return false;
        }
    }

    async function handleRegister(data: RegisterSchemaType): Promise<boolean> {
        validationErrors.value = null;

        try {
            await authStore.register(data);

            notification.success('Conta criada com sucesso!');

            await router.push('/students');

            return true;
        } catch (err) {
            const formattedApiErrors = formatApiValidationErrors(err);

            if (formattedApiErrors) {
                validationErrors.value = formattedApiErrors;
            }

            notification.error(authStore.error || 'Falha ao criar conta');
            return false;
        }
    }

    async function handleLogout(): Promise<void> {
        authStore.logout();
        notification.info('Você saiu da sua conta');
        await router.push('/login');
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
        validationErrors
    };
};
