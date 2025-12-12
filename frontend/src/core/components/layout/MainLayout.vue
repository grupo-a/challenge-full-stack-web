<script setup lang="ts">
    import { useAuth } from '@/modules/auth/composables/useAuth';
    import { useRouter } from 'vue-router';

    const { user, handleLogout } = useAuth();
    const router = useRouter();

    const onLogout = async () => {
        await handleLogout();
        router.push('/login');
    };
</script>

<template>
    <v-app>
        <v-app-bar color="primary">
            <v-app-bar-title>
                <v-icon class="mr-2">mdi-school</v-icon>
                Sistema Acadêmico
            </v-app-bar-title>
            <template #append>
                <span class="mr-4" v-if="user">Olá, {{ user.name }}</span>
                <v-btn icon="mdi-logout" @click="onLogout" title="Sair"></v-btn>
            </template>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
