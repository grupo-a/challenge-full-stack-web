<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import LoginForm from '../components/LoginForm.vue';
    import { useAuth } from '../composables/useAuth';
    import type { LoginCredentials } from '../types/auth.types';

    const { handleLogin, isLoading } = useAuth();
    const router = useRouter();

    const onSubmit = async (credentials: LoginCredentials) => {
        await handleLogin(credentials);
    };

    const goToRegister = () => {
        router.push({ name: 'register' });
    };
</script>

<template>
    <v-container fluid class="fill-height bg-grey-lighten-4">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <LoginForm
                    :loading="isLoading"
                    @submit="onSubmit"
                    @register="goToRegister"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    .fill-height {
        min-height: 100vh;
    }
</style>
