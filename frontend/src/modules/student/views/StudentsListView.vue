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
    <v-container fluid class="pa-4 pa-md-6">
        <div class="d-flex justify-center mb-4">
            <h1 class="text-h5 text-md-h4">Consulta de Alunos</h1>
        </div>

        <v-row class="mb-4" align="center">
            <v-col cols="12" sm="8" md="9">
                <v-text-field
                    v-model="filters.name"
                    label="Pesquisar"
                    variant="outlined"
                    density="compact"
                    append-inner-icon="mdi-magnify"
                    hide-details
                    clearable
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <v-btn
                    color="primary"
                    prepend-icon="mdi-plus"
                    block
                    @click="handleCreate"
                >
                    Cadastrar Aluno
                </v-btn>
            </v-col>
        </v-row>

        <v-card :loading="isLoading">
            <StudentList
                :students="students"
                :is-loading="isLoading"
                @edit="handleEdit"
                @delete="handleDeleteClick"
            />
        </v-card>

        <StudentDeleteDialog
            v-model="showDeleteDialog"
            :student-name="studentToDelete?.name || ''"
            @confirm="handleConfirmDelete"
        />
    </v-container>
</template>
