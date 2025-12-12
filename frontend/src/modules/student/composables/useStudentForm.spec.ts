/**
 * Testes unitários para useStudentForm.ts
 *
 * Valida os requisitos do README.md:
 * - Cadastrar novo aluno
 * - Editar cadastro de aluno
 * - Retorna mensagem de sucesso
 * - Retorna para tela de Consulta de Alunos
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { useStudentForm } from './useStudentForm';
import { studentsService } from '../services/students.service';
import type { Student } from '../types/student.types';

const mockPush = vi.fn();

// Mock vue-router
vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: mockPush
    }),
    useRoute: () => ({
        params: { id: '1' }
    })
}));

// Mock notifications
const mockNotification = {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn()
};

vi.mock('@/core/composables/useNotification', () => ({
    useNotification: () => mockNotification
}));

// Mock service
vi.mock('../services/students.service', () => ({
    studentsService: {
        list: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
    }
}));

// Mock formatApiValidationErrors
vi.mock('@/core/utils', () => ({
    formatApiValidationErrors: vi.fn((err) => {
        if (err?.response?.data?.errors) {
            return err.response.data.errors;
        }
        return null;
    })
}));

const mockStudent: Student = {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    ra: 'RA001',
    cpf: '12345678901'
};

describe('useStudentForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Estado inicial', () => {
        it('should have isLoading as false initially', () => {
            const { isLoading } = useStudentForm();
            expect(isLoading.value).toBe(false);
        });

        it('should have validationErrors as null initially', () => {
            const { validationErrors } = useStudentForm();
            expect(validationErrors.value).toBeNull();
        });
    });

    describe('handleCreateStudent', () => {
        it('should create student successfully', async () => {
            vi.mocked(studentsService.create).mockResolvedValue(mockStudent);

            const { handleCreateStudent, isLoading } = useStudentForm();

            const createData = {
                name: 'João Silva',
                email: 'joao@email.com',
                cpf: '12345678901'
            };

            await handleCreateStudent(createData);
            await flushPromises();

            expect(studentsService.create).toHaveBeenCalledWith(createData);
            expect(mockNotification.success).toHaveBeenCalledWith(
                'Aluno criado com sucesso!'
            );
            expect(mockPush).toHaveBeenCalledWith('/students');
            expect(isLoading.value).toBe(false);
        });

        it('should handle create error and show notification', async () => {
            const error = new Error('Erro ao criar aluno');
            vi.mocked(studentsService.create).mockRejectedValue(error);

            const { handleCreateStudent } = useStudentForm();

            await handleCreateStudent({
                name: 'Test',
                email: 'test@email.com',
                cpf: '12345678901'
            });
            await flushPromises();

            expect(mockNotification.error).toHaveBeenCalled();
            expect(mockPush).not.toHaveBeenCalledWith('/students');
        });

        it('should set validation errors from API response', async () => {
            const error = {
                response: {
                    data: {
                        errors: {
                            cpf: ['CPF já está em uso']
                        }
                    }
                }
            };
            vi.mocked(studentsService.create).mockRejectedValue(error);

            const { handleCreateStudent, validationErrors } = useStudentForm();

            await handleCreateStudent({
                name: 'Test',
                email: 'test@email.com',
                cpf: '12345678901'
            });
            await flushPromises();

            expect(validationErrors.value).toEqual({
                cpf: ['CPF já está em uso']
            });
        });
    });

    describe('handleUpdateStudent', () => {
        it('should update student successfully', async () => {
            vi.mocked(studentsService.update).mockResolvedValue({
                ...mockStudent,
                name: 'João Santos'
            });

            const { handleUpdateStudent, isLoading } = useStudentForm();

            const updateData = {
                name: 'João Santos',
                email: 'joao@email.com',
                cpf: '12345678901'
            };

            await handleUpdateStudent('1', updateData);
            await flushPromises();

            expect(studentsService.update).toHaveBeenCalledWith(
                '1',
                updateData
            );
            expect(mockNotification.success).toHaveBeenCalledWith(
                'Aluno atualizado com sucesso!'
            );
            expect(mockPush).toHaveBeenCalledWith('/students');
            expect(isLoading.value).toBe(false);
        });

        it('should handle update error', async () => {
            const error = new Error('Erro ao atualizar');
            vi.mocked(studentsService.update).mockRejectedValue(error);

            const { handleUpdateStudent } = useStudentForm();

            await handleUpdateStudent('1', {
                name: 'Test',
                email: 'test@email.com',
                cpf: '12345678901'
            });
            await flushPromises();

            expect(mockNotification.error).toHaveBeenCalled();
        });
    });

    describe('getStudent', () => {
        it('should get student by id', async () => {
            vi.mocked(studentsService.getById).mockResolvedValue(mockStudent);

            const { getStudent, isLoading } = useStudentForm();

            const result = await getStudent('1');
            await flushPromises();

            expect(studentsService.getById).toHaveBeenCalledWith('1');
            expect(result).toEqual(mockStudent);
            expect(isLoading.value).toBe(false);
        });

        it('should handle getStudent error and redirect', async () => {
            const error = new Error('Aluno não encontrado');
            vi.mocked(studentsService.getById).mockRejectedValue(error);

            const { getStudent } = useStudentForm();

            await getStudent('999');
            await flushPromises();

            expect(mockNotification.error).toHaveBeenCalled();
            expect(mockPush).toHaveBeenCalledWith('/students');
        });
    });

    describe('Loading state', () => {
        it('should set isLoading to true during create operation', async () => {
            let resolvePromise: (value: Student) => void;
            const pendingPromise = new Promise<Student>((resolve) => {
                resolvePromise = resolve;
            });

            vi.mocked(studentsService.create).mockReturnValue(pendingPromise);

            const { handleCreateStudent, isLoading } = useStudentForm();

            const createPromise = handleCreateStudent({
                name: 'Test',
                email: 'test@email.com',
                cpf: '12345678901'
            });

            expect(isLoading.value).toBe(true);

            resolvePromise!(mockStudent);
            await createPromise;

            expect(isLoading.value).toBe(false);
        });
    });
});
