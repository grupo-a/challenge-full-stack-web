<!--
  StudentsView.vue
  Placeholder para a página de alunos (será implementada posteriormente)
-->
<script setup lang="ts">
    import { useAuth } from '@/modules/auth/composables/useAuth';

    const { user, handleLogout } = useAuth();
</script>

<template>
    <v-app>
        <v-app-bar color="primary" density="default">
            <v-app-bar-title>
                <v-icon class="mr-2">mdi-school</v-icon>
                Sistema de Gestão de Alunos
            </v-app-bar-title>

            <template #append>
                <span class="mr-4 text-body-2">
                    <v-icon class="mr-1">mdi-account</v-icon>
                    {{ user?.name || 'Usuário' }}
                </span>
                <v-btn
                    icon
                    variant="text"
                    data-testid="logout-button"
                    @click="handleLogout"
                >
                    <v-icon>mdi-logout</v-icon>
                    <v-tooltip activator="parent" location="bottom">
                        Sair
                    </v-tooltip>
                </v-btn>
            </template>
        </v-app-bar>

        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title
                                class="d-flex justify-space-between align-center"
                            >
                                <span>
                                    <v-icon class="mr-2"
                                        >mdi-account-group</v-icon
                                    >
                                    Lista de Alunos
                                </span>
                                <v-btn
                                    color="primary"
                                    prepend-icon="mdi-plus"
                                    data-testid="add-student-button"
                                >
                                    Cadastrar Aluno
                                </v-btn>
                            </v-card-title>

                            <v-card-text>
                                <v-alert
                                    type="info"
                                    variant="tonal"
                                    class="mb-4"
                                >
                                    <v-icon class="mr-2"
                                        >mdi-information</v-icon
                                    >
                                    Módulo de alunos será implementado em breve.
                                </v-alert>

                                <!-- Placeholder da tabela de alunos -->
                                <v-data-table
                                    :headers="[
                                        { title: 'RA', key: 'ra' },
                                        { title: 'Nome', key: 'name' },
                                        { title: 'Email', key: 'email' },
                                        { title: 'CPF', key: 'cpf' },
                                        {
                                            title: 'Ações',
                                            key: 'actions',
                                            sortable: false
                                        }
                                    ]"
                                    :items="[]"
                                    :loading="false"
                                    loading-text="Carregando alunos..."
                                    no-data-text="Nenhum aluno cadastrado"
                                />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
    /* Estilos específicos */
</style>
