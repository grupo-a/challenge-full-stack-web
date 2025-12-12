import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStudentsStore } from '../stores/students.store';
import { useNotification } from '@/core/composables/useNotification';
import { type createStudentSchemaType } from '../schema';
import { formatApiValidationErrors } from '@/core/utils';

export function useStudentForm() {
    const studentStore = useStudentsStore();
    const router = useRouter();
    const notification = useNotification();

    const isLoading = ref(false);
    const validationErrors = ref<Record<string, string[]> | null>(null);

    const handleCreateStudent = async (data: createStudentSchemaType) => {
        validationErrors.value = null;
        isLoading.value = true;

        try {
            await studentStore.createStudent(data);

            notification.success('Aluno criado com sucesso!');

            await router.push('/students');
        } catch (err) {
            const formattedApiErrors = formatApiValidationErrors(err);

            if (formattedApiErrors) {
                validationErrors.value = formattedApiErrors;
            }

            notification.error(studentStore.error || 'Falha ao criar aluno');
        } finally {
            isLoading.value = false;
        }
    };

    const handleUpdateStudent = async (
        id: string,
        data: createStudentSchemaType
    ) => {
        validationErrors.value = null;
        isLoading.value = true;

        try {
            await studentStore.updateStudent(id, data);

            notification.success('Aluno atualizado com sucesso!');

            await router.push('/students');
        } catch (err) {
            const formattedApiErrors = formatApiValidationErrors(err);

            if (formattedApiErrors) {
                validationErrors.value = formattedApiErrors;
            }

            notification.error(
                studentStore.error || 'Falha ao atualizar aluno'
            );
        } finally {
            isLoading.value = false;
        }
    };

    const getStudent = async (id: string) => {
        isLoading.value = true;
        try {
            return await studentStore.getStudentById(id);
        } catch (err) {
            const errorMessage =
                typeof err === 'object' && err !== null && 'message' in err
                    ? (err as { message?: string }).message
                    : undefined;

            notification.error(errorMessage || 'Falha ao obter dados do aluno');
            router.push('/students');
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoading,
        validationErrors,
        handleCreateStudent,
        handleUpdateStudent,
        getStudent
    };
}
