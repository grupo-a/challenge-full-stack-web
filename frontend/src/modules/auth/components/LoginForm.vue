<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { z } from 'zod';
    import type { LoginCredentials } from '../types/auth.types';

    interface Props {
        loading?: boolean;
    }

    withDefaults(defineProps<Props>(), {
        loading: false
    });

    const emit = defineEmits<{
        submit: [credentials: LoginCredentials];
        register: [];
    }>();

    const loginSchema = z.object({
        email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
        password: z
            .string()
            .min(1, 'Senha é obrigatória')
            .min(6, 'Senha deve ter no mínimo 6 caracteres')
    });

    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const errors = ref<Record<string, string>>({});

    const isFormValid = computed(() => {
        const result = loginSchema.safeParse({
            email: email.value,
            password: password.value
        });
        return result.success;
    });

    const validateForm = (): boolean => {
        const result = loginSchema.safeParse({
            email: email.value,
            password: password.value
        });

        if (!result.success) {
            errors.value = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                errors.value[field] = issue.message;
            });
            return false;
        }

        errors.value = {};
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        emit('submit', {
            email: email.value,
            password: password.value
        });
    };

    const handleRegisterClick = () => {
        emit('register');
    };
</script>

<template>
    <v-card class="mx-auto pa-6" max-width="450" elevation="8">
        <v-card-title class="text-h4 text-center mb-4">
            <v-icon size="48" color="primary" class="mr-2"> mdi-school </v-icon>
            Login
        </v-card-title>

        <v-card-subtitle class="text-center mb-6">
            Sistema de Gestão de Alunos
        </v-card-subtitle>

        <v-form @submit.prevent="handleSubmit">
            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                :error-messages="errors.email"
                variant="outlined"
                class="mb-4"
                autocomplete="email"
                data-testid="email-input"
            />

            <v-text-field
                v-model="password"
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="errors.password"
                variant="outlined"
                class="mb-6"
                autocomplete="current-password"
                data-testid="password-input"
                @click:append-inner="showPassword = !showPassword"
            />

            <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                :disabled="!isFormValid || loading"
                data-testid="login-button"
            >
                <v-icon left class="mr-2">mdi-login</v-icon>
                Entrar
            </v-btn>
        </v-form>

        <v-divider class="my-6" />

        <div class="text-center">
            <span class="text-body-2">Não tem uma conta?</span>
            <v-btn
                variant="text"
                color="primary"
                data-testid="register-link"
                @click="handleRegisterClick"
            >
                Cadastre-se
            </v-btn>
        </div>
    </v-card>
</template>

<style scoped>
    /* Estilos específicos do componente */
</style>
