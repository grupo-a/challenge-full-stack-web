<!--
  RegisterForm.vue
  Componente de formulário de registro de usuário
-->
<script setup lang="ts">
    // 1. Imports
    import { ref, computed } from 'vue';
    import { z } from 'zod';
    import type { RegisterData } from '../types/auth.types';

    // 2. Props & Emits
    interface Props {
        loading?: boolean;
    }

    withDefaults(defineProps<Props>(), {
        loading: false
    });

    const emit = defineEmits<{
        submit: [data: RegisterData];
        login: [];
    }>();

    // 3. Schema de validação com Zod
    const registerSchema = z
        .object({
            name: z
                .string()
                .min(1, 'Nome é obrigatório')
                .min(3, 'Nome deve ter no mínimo 3 caracteres'),
            email: z
                .string()
                .min(1, 'Email é obrigatório')
                .email('Email inválido'),
            password: z
                .string()
                .min(1, 'Senha é obrigatória')
                .min(6, 'Senha deve ter no mínimo 6 caracteres'),
            confirmPassword: z
                .string()
                .min(1, 'Confirmação de senha é obrigatória')
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'As senhas não coincidem',
            path: ['confirmPassword']
        });

    // 4. Reactive state
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const errors = ref<Record<string, string>>({});

    // 5. Computed properties
    const isFormValid = computed(() => {
        return (
            name.value.length >= 3 &&
            email.value.includes('@') &&
            password.value.length >= 6 &&
            password.value === confirmPassword.value
        );
    });

    // 6. Methods

    /**
     * Valida o formulário usando Zod
     */
    const validateForm = (): boolean => {
        const result = registerSchema.safeParse({
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
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

    /**
     * Handler do submit do formulário
     */
    const handleSubmit = async () => {
        if (!validateForm()) return;

        emit('submit', {
            name: name.value,
            email: email.value,
            password: password.value
        });
    };

    /**
     * Navega para a página de login
     */
    const handleLoginClick = () => {
        emit('login');
    };

    /**
     * Regras de validação para Vuetify
     */
    const nameRules = [
        (v: string) => !!v || 'Nome é obrigatório',
        (v: string) => v.length >= 3 || 'Nome deve ter no mínimo 3 caracteres'
    ];

    const emailRules = [
        (v: string) => !!v || 'Email é obrigatório',
        (v: string) => /.+@.+\..+/.test(v) || 'Email inválido'
    ];

    const passwordRules = [
        (v: string) => !!v || 'Senha é obrigatória',
        (v: string) => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres'
    ];

    const confirmPasswordRules = [
        (v: string) => !!v || 'Confirmação de senha é obrigatória',
        (v: string) => v === password.value || 'As senhas não coincidem'
    ];
</script>

<template>
    <v-card class="mx-auto pa-6" max-width="450" elevation="8">
        <v-card-title class="text-h4 text-center mb-4">
            <v-icon size="48" color="primary" class="mr-2">
                mdi-account-plus
            </v-icon>
            Cadastro
        </v-card-title>

        <v-card-subtitle class="text-center mb-6">
            Crie sua conta no sistema
        </v-card-subtitle>

        <v-form @submit.prevent="handleSubmit">
            <v-text-field
                v-model="name"
                label="Nome completo"
                prepend-inner-icon="mdi-account"
                :rules="nameRules"
                :error-messages="errors.name"
                variant="outlined"
                class="mb-4"
                autocomplete="name"
                data-testid="name-input"
            />

            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                :rules="emailRules"
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
                :rules="passwordRules"
                :error-messages="errors.password"
                variant="outlined"
                class="mb-4"
                autocomplete="new-password"
                data-testid="password-input"
                @click:append-inner="showPassword = !showPassword"
            />

            <v-text-field
                v-model="confirmPassword"
                label="Confirmar senha"
                :type="showConfirmPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-check"
                :append-inner-icon="
                    showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                "
                :rules="confirmPasswordRules"
                :error-messages="errors.confirmPassword"
                variant="outlined"
                class="mb-6"
                autocomplete="new-password"
                data-testid="confirm-password-input"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
            />

            <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="loading"
                :disabled="!isFormValid || loading"
                data-testid="register-button"
            >
                <v-icon left class="mr-2">mdi-account-plus</v-icon>
                Criar conta
            </v-btn>
        </v-form>

        <v-divider class="my-6" />

        <div class="text-center">
            <span class="text-body-2">Já tem uma conta?</span>
            <v-btn
                variant="text"
                color="primary"
                data-testid="login-link"
                @click="handleLoginClick"
            >
                Faça login
            </v-btn>
        </div>
    </v-card>
</template>

<style scoped>
    /* Estilos específicos do componente */
</style>
