<script setup lang="ts">
    import type { Student } from '../types/student.types';

    interface Props {
        students: Student[];
        isLoading: boolean;
    }

    interface Emits {
        (e: 'edit', id: string): void;
        (e: 'delete', student: Student): void;
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
    <v-data-table
        :headers="headers"
        :items="students"
        :loading="isLoading"
        class="elevation-1"
        hover
        :mobile-breakpoint="600"
        :style="{ minHeight: '400px' }"
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
    </v-data-table>
</template>
