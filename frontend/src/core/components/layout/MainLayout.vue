<script setup lang="ts">
    import { ref } from 'vue';
    import { useAuth } from '@/modules/auth/composables/useAuth';
    import { useRouter } from 'vue-router';

    const { handleLogout } = useAuth();
    const router = useRouter();

    const drawer = ref(false);

    const onLogout = async () => {
        await handleLogout();
        router.push('/login');
    };

    const menuItems = [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        { title: 'Alunos', icon: 'mdi-account-multiple', route: '/students' },
        { title: 'Perfil', icon: 'mdi-account', route: '/profile' }
    ];

    const navigateTo = (route: string) => {
        router.push(route);
    };
</script>

<template>
    <v-app>
        <v-app-bar color="primary" density="compact">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title>
                <v-icon class="mr-2">mdi-school</v-icon>
                Sistema Acadêmico
            </v-app-bar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app>
            <v-list density="default" nav>
                <v-list-item
                    v-for="item in menuItems"
                    :key="item.title"
                    :prepend-icon="item.icon"
                    :title="item.title"
                    @click="navigateTo(item.route)"
                ></v-list-item>
            </v-list>

            <template #append>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item
                        prepend-icon="mdi-logout"
                        title="Sair"
                        @click="onLogout"
                    ></v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
