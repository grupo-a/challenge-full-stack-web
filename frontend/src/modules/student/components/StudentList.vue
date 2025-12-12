<script setup lang="ts">
    import type { Student } from '../types/student.types';

    interface Props {
        students: Student[];
        isLoading: boolean;
        totalItems: number;
        page: number;
        itemsPerPage: number;
        itemsPerPageOptions: { value: number; title: string }[];
    }

    interface Emits {
        (e: 'edit', id: string): void;
        (e: 'delete', student: Student): void;
        (e: 'update:page', page: number): void;
        (e: 'update:itemsPerPage', itemsPerPage: number): void;
    }

    defineProps<Props>();
    const emit = defineEmits<Emits>();

    const headers = [
        { title: 'Registro Acadêmico', key: 'ra', align: 'start' },
        { title: 'Nome', key: 'name', align: 'start' },
        { title: 'CPF', key: 'cpf', align: 'start' },
        { title: 'Ações', key: 'actions', align: 'end', sortable: false }
    ] as const;
</script>

<template>
    <v-data-table-server
        :headers="headers"
        :items="students"
        :items-length="totalItems"
        :loading="isLoading"
        :page="page"
        :items-per-page="itemsPerPage"
        :items-per-page-options="itemsPerPageOptions"
        class="elevation-1"
        hover
        :mobile-breakpoint="600"
        :style="{ minHeight: '400px' }"
        @update:page="emit('update:page', $event)"
        @update:items-per-page="emit('update:itemsPerPage', $event)"
    >
        <template #[`item.actions`]="{ item }">
            <v-btn
                icon="mdi-pencil"
                size="small"
                color="primary"
                variant="text"
                class="mr-2"
                @click="emit('edit', item.id)"
            ></v-btn>

            <v-btn
                icon="mdi-delete"
                size="small"
                color="error"
                variant="text"
                @click="emit('delete', item)"
            ></v-btn>
        </template>

        <template #no-data>
            <div class="pa-4 text-center">Nenhum aluno encontrado</div>
        </template>
    </v-data-table-server>
</template>
