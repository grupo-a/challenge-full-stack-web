<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { loginSchema, type LoginSchemaType } from '../schema';

    interface Props {
        loading?: boolean;
        validationErrors?: Record<string, string[]> | null;
    }

    interface Emits {
        submit: [credentials: LoginSchemaType];
        register: [];
    }

    const props = withDefaults(defineProps<Props>(), {
        loading: false,
        validationErrors: null
    });

    const emit = defineEmits<Emits>();

    const loginForm = ref({
        email: '',
        password: ''
    });

    const showPassword = ref(false);
    const errors = ref<{ email?: string[]; password?: string[] }>({});

    watch(
        () => props.validationErrors,
        (newErrors) => {
            if (newErrors) {
                errors.value = newErrors;
            }
        }
    );

    const validateForm = (): LoginSchemaType | null => {
        errors.value = {};

        const result = loginSchema.safeParse(loginForm.value);

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as 'email' | 'password';
                errors.value[field] = errors.value[field] || [];
                errors.value[field]?.push(issue.message);
            });

            return null;
        }

        return result.data;
    };

    const handleSubmit = async () => {
        const validData = validateForm();

        if (validData) {
            emit('submit', loginForm.value);
        }
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
                v-model="loginForm.email"
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
                v-model="loginForm.password"
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
                :disabled="loading"
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
