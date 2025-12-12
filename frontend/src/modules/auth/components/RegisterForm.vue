<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { registerSchema, type RegisterSchemaType } from '../schema';

    interface Props {
        loading?: boolean;
        validationErrors?: Record<string, string[]> | null;
    }

    interface Emits {
        submit: [data: RegisterSchemaType];
        login: [];
    }

    const props = withDefaults(defineProps<Props>(), {
        loading: false,
        validationErrors: null
    });

    const emit = defineEmits<Emits>();

    const registerForm = ref({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const errors = ref<Record<string, string[]>>({});

    watch(
        () => props.validationErrors,
        (newErrors) => {
            if (newErrors) {
                errors.value = newErrors;
            }
        }
    );

    const validateForm = (): RegisterSchemaType | null => {
        errors.value = {};

        const result = registerSchema.safeParse(registerForm.value);

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as
                    | 'email'
                    | 'password'
                    | 'confirmPassword';
                errors.value[field] = errors.value[field] || [];
                errors.value[field]?.push(issue.message);
            });

            return null;
        }

        return result.data;
    };

    const handleSubmit = async () => {
        if (props.validationErrors) {
            errors.value = {};
        }

        if (!validateForm()) return;

        emit('submit', registerForm.value);
    };

    const handleLoginClick = () => {
        emit('login');
    };
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
                v-model="registerForm.email"
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
                v-model="registerForm.password"
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="errors.password"
                variant="outlined"
                class="mb-4"
                autocomplete="new-password"
                data-testid="password-input"
                @click:append-inner="showPassword = !showPassword"
            />

            <v-text-field
                v-model="registerForm.confirmPassword"
                label="Confirmar senha"
                :type="showConfirmPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-check"
                :append-inner-icon="
                    showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                "
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
                :disabled="loading"
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
