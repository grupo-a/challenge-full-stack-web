import { onMounted, ref, watch } from 'vue';
import type { Student, StudentFilters } from '../types/student.types';
import { useNotification } from '@/core/composables/useNotification';
import { studentsService } from '../services/students.service';

export function useStudents() {
    const notification = useNotification();

    const students = ref<Student[]>([]);
    const totalItems = ref(0);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const filters = ref<StudentFilters>({
        page: 1,
        limit: 10,
        name: ''
    });

    const itemsPerPageOptions = [
        { value: 5, title: '5' },
        { value: 10, title: '10' },
        { value: 25, title: '25' },
        { value: 50, title: '50' }
    ];

    const fetchStudents = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await studentsService.list(filters.value);
            students.value = response.data;
            totalItems.value = response.meta.total;
        } catch (e) {
            const errorMessage =
                e instanceof Error ? e.message : 'Erro desconhecido';
            error.value = errorMessage;
            notification.error(`Erro ao buscar alunos: ${errorMessage}`);
        } finally {
            isLoading.value = false;
        }
    };

    const deleteStudent = async (id: string) => {
        isLoading.value = true;

        try {
            await studentsService.delete(id);
            notification.info('Aluno excluído com sucesso');
            await fetchStudents();
        } catch (e) {
            const err = e as { message: string };
            notification.error(`Erro ao excluir aluno: ${err.message}`);
        } finally {
            isLoading.value = false;
        }
    };

    const handlePageChange = (page: number) => {
        filters.value.page = page;
    };

    const handleItemsPerPageChange = (itemsPerPage: number) => {
        filters.value.limit = itemsPerPage;
        filters.value.page = 1;
    };

    watch(
        () => filters.value.name,
        () => {
            filters.value.page = 1;
            fetchStudents();
        }
    );

    watch(
        () => [filters.value.page, filters.value.limit],
        () => {
            fetchStudents();
        }
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
        itemsPerPageOptions,
        fetchStudents,
        deleteStudent,
        handlePageChange,
        handleItemsPerPageChange
    };
}
