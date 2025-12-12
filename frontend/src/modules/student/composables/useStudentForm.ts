import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotification } from '@/core/composables/useNotification';
import { type createStudentSchemaType } from '../schema';
import { formatApiValidationErrors } from '@/core/utils';
import { studentsService } from '../services/students.service';

export function useStudentForm() {
    const router = useRouter();
    const notification = useNotification();

    const isLoading = ref(false);
    const validationErrors = ref<Record<string, string[]> | null>(null);

    const handleCreateStudent = async (data: createStudentSchemaType) => {
        validationErrors.value = null;
        isLoading.value = true;

        try {
            await studentsService.create(data);

            notification.success('Aluno criado com sucesso!');

            await router.push('/students');
        } catch (err) {
            const formattedApiErrors = formatApiValidationErrors(err);

            if (formattedApiErrors) {
                validationErrors.value = formattedApiErrors;
            }

            const errorMessage =
                err instanceof Error ? err.message : 'Falha ao criar aluno';
            notification.error(errorMessage);
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
            await studentsService.update(id, data);

            notification.success('Aluno atualizado com sucesso!');

            await router.push('/students');
        } catch (err) {
            const formattedApiErrors = formatApiValidationErrors(err);

            if (formattedApiErrors) {
                validationErrors.value = formattedApiErrors;
            }

            const errorMessage =
                err instanceof Error ? err.message : 'Falha ao atualizar aluno';
            notification.error(errorMessage);
        } finally {
            isLoading.value = false;
        }
    };

    const getStudent = async (id: string) => {
        isLoading.value = true;
        try {
            return await studentsService.getById(id);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : 'Falha ao obter dados do aluno';

            notification.error(errorMessage);
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
