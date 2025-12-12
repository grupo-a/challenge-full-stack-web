import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Student, StudentFilters } from '../types/student.types';
import { studentsService } from '../services/students.service';
import type {
    createStudentSchemaType,
    updateStudentSchemaType
} from '../schema';

export const useStudentsStore = defineStore('students', () => {
    const students = ref<Student[]>([]);
    const totalItems = ref(0);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    async function fetchStudents(params?: StudentFilters) {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await studentsService.list(params);
            students.value = response.data;
            totalItems.value = response.meta.total;
        } catch (e) {
            const err = e as { message: string };
            error.value = err.message || 'Erro ao buscar alunos';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function createStudent(student: createStudentSchemaType) {
        isLoading.value = true;
        error.value = null;

        try {
            await studentsService.create(student);
            await fetchStudents();
        } catch (e) {
            const err = e as { message: string };
            error.value = err.message || 'Erro ao criar aluno';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function updateStudent(id: string, student: updateStudentSchemaType) {
        isLoading.value = true;
        error.value = null;

        try {
            await studentsService.update(id, student);
            await fetchStudents();
        } catch (e) {
            const err = e as { message: string };
            error.value = err.message || 'Erro ao atualizar aluno';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function deleteStudent(id: string) {
        isLoading.value = true;
        error.value = null;

        try {
            await studentsService.delete(id);
            await fetchStudents();
        } catch (e) {
            const err = e as { message: string };
            error.value = err.message || 'Erro ao excluir aluno';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    async function getStudentById(id: string) {
        isLoading.value = true;
        error.value = null;

        try {
            return await studentsService.getById(id);
        } catch (e) {
            const err = e as { message: string };
            error.value = err.message || 'Erro ao buscar aluno';
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        students,
        totalItems,
        isLoading,
        error,
        fetchStudents,
        createStudent,
        updateStudent,
        deleteStudent,
        getStudentById
    };
});
