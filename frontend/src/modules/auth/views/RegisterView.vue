<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import RegisterForm from '../components/RegisterForm.vue';
    import { useAuth } from '../composables/useAuth';
    import type { RegisterSchemaType } from '../schema';

    const { handleRegister, isLoading, validationErrors } = useAuth();
    const router = useRouter();

    const onSubmit = async (data: RegisterSchemaType) => {
        await handleRegister(data);
    };

    const goToLogin = () => {
        router.push({ name: 'login' });
    };
</script>

<template>
    <v-container fluid class="fill-height bg-grey-lighten-4">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <RegisterForm
                    :loading="isLoading"
                    :validation-errors="validationErrors"
                    @submit="onSubmit"
                    @login="goToLogin"
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
