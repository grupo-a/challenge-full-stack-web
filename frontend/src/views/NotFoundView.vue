<script setup lang="ts">
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const goHome = () => {
        router.push('/');
    };
</script>

<template>
    <v-container fluid class="fill-height bg-grey-lighten-4">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
                <v-icon size="120" color="grey-lighten-1" class="mb-6">
                    mdi-alert-circle-outline
                </v-icon>

                <h1 class="text-h2 mb-4">404</h1>

                <h2 class="text-h5 mb-4 text-grey-darken-1">
                    Página não encontrada
                </h2>

                <p class="text-body-1 mb-8 text-grey">
                    A página que você está procurando não existe ou foi movida.
                </p>

                <v-btn color="primary" size="large" @click="goHome">
                    <v-icon left class="mr-2">mdi-home</v-icon>
                    Voltar ao início
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    .fill-height {
        min-height: 100vh;
    }
</style>
