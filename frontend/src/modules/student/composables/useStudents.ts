import { storeToRefs } from 'pinia';
import { useStudentsStore } from '../stores/students.store';
import { onMounted, ref, watch } from 'vue';
import type { StudentFilters } from '../types/student.types';
import { useNotification } from '@/core/composables/useNotification';

export function useStudents() {
    const store = useStudentsStore();
    const notification = useNotification();

    const { students, totalItems, isLoading, error } = storeToRefs(store);

    const filters = ref<StudentFilters>({
        page: 1,
        limit: 10,
        name: ''
    });

    const fetchStudents = async () => {
        isLoading.value = true;

        try {
            await store.fetchStudents(filters.value);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Erro desconhecido';
            notification.error(`Erro ao buscar alunos: ${errorMessage}`);
        } finally {
            isLoading.value = false;
        }
    };

    const deleteStudent = async (id: string) => {
        isLoading.value = true;

        try {
            await store.deleteStudent(id);
            notification.info('Aluno excluído com sucesso');
            await fetchStudents();
        } catch (error) {
            const err = error as { message: string };

            notification.error(`Erro ao excluir aluno: ${err.message}`);
        } finally {
            isLoading.value = false;
        }
    };

    watch(
        filters,
        () => {
            fetchStudents();
        },
        { deep: true }
    );

    onMounted(() => {
        fetchStudents();
    });

    return {
        students,
        totalItems,
        isLoading,
        error,
        filters,
        fetchStudents,
        deleteStudent
    };
}
