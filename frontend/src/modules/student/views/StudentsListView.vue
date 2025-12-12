<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStudents } from '../composables/useStudents';
    import StudentList from '../components/StudentList.vue';
    import StudentDeleteDialog from '../components/StudentDeleteDialog.vue';
    import type { Student } from '../types/student.types';

    const router = useRouter();
    const { students, isLoading, filters, deleteStudent } = useStudents();

    const showDeleteDialog = ref(false);
    const studentToDelete = ref<Student | null>(null);

    const handleEdit = (id: string) => {
        router.push(`/students/${id}/edit`);
    };

    const handleDeleteClick = (student: Student) => {
        studentToDelete.value = student;
        showDeleteDialog.value = true;
    };

    const handleConfirmDelete = async () => {
        if (!studentToDelete.value) return;

        await deleteStudent(studentToDelete.value.id);
    };

    const handleCreate = () => {
        router.push('/students/create');
    };
</script>

<template>
    <v-container>
        <div class="d-flex justify-space-between align-center mb-4">
            <h1 class="text-h4">Consulta de Alunos</h1>
            <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                @click="handleCreate"
            >
                Cadastrar Aluno
            </v-btn>
        </div>

        <v-text-field
            v-model="filters.search"
            label="Pesquisar"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            class="mb-4"
            hide-details
        ></v-text-field>

        <StudentList
            :students="students"
            :is-loading="isLoading"
            @edit="handleEdit"
            @delete="handleDeleteClick"
        />

        <StudentDeleteDialog
            v-model="showDeleteDialog"
            :student-name="studentToDelete?.name || ''"
            @confirm="handleConfirmDelete"
        />
    </v-container>
</template>
