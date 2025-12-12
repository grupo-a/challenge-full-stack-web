import { describe, it, expect, vi, beforeEach } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { useStudents } from './useStudents';
import { studentsService } from '../services/students.service';
import type { Student } from '../types/student.types';
import type { PaginatedResponse } from '@/core/types/common.types';

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: vi.fn()
    }),
    useRoute: () => ({
        query: {}
    })
}));

vi.mock('@/core/composables/useNotification', () => ({
    useNotification: () => ({
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn()
    })
}));

vi.mock('../services/students.service', () => ({
    studentsService: {
        list: vi.fn(),
        getById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
    }
}));

const mockStudents: Student[] = [
    {
        id: '1',
        name: 'João Silva',
        email: 'joao@email.com',
        ra: 'RA001',
        cpf: '12345678901'
    },
    {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@email.com',
        ra: 'RA002',
        cpf: '98765432100'
    }
];

const mockPaginatedResponse: PaginatedResponse<Student> = {
    data: mockStudents,
    meta: {
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1
    }
};

vi.mock('vue', async () => {
    const actual = await vi.importActual('vue');
    return {
        ...actual,
        onMounted: vi.fn(() => {})
    };
});

describe('useStudents', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Estado inicial', () => {
        it('should have empty students array initially', () => {
            const { students } = useStudents();
            expect(students.value).toEqual([]);
        });

        it('should have totalItems as 0 initially', () => {
            const { totalItems } = useStudents();
            expect(totalItems.value).toBe(0);
        });

        it('should have isLoading as false initially', () => {
            const { isLoading } = useStudents();
            expect(isLoading.value).toBe(false);
        });

        it('should have default filter values', () => {
            const { filters } = useStudents();
            expect(filters.value).toEqual({
                page: 1,
                limit: 10,
                name: ''
            });
        });

        it('should have itemsPerPageOptions', () => {
            const { itemsPerPageOptions } = useStudents();
            expect(itemsPerPageOptions).toEqual([
                { value: 5, title: '5' },
                { value: 10, title: '10' },
                { value: 25, title: '25' },
                { value: 50, title: '50' }
            ]);
        });
    });

    describe('fetchStudents', () => {
        it('should fetch students and update state', async () => {
            vi.mocked(studentsService.list).mockResolvedValue(
                mockPaginatedResponse
            );

            const { students, totalItems, fetchStudents, isLoading } =
                useStudents();

            await fetchStudents();
            await flushPromises();

            expect(studentsService.list).toHaveBeenCalled();
            expect(students.value).toEqual(mockStudents);
            expect(totalItems.value).toBe(2);
            expect(isLoading.value).toBe(false);
        });

        it('should set error on fetch failure', async () => {
            const error = new Error('Network error');
            vi.mocked(studentsService.list).mockRejectedValue(error);

            const { fetchStudents, error: errorRef } = useStudents();

            await fetchStudents();
            await flushPromises();

            expect(errorRef.value).toBe('Network error');
        });

        it('should pass filters to service', async () => {
            vi.mocked(studentsService.list).mockResolvedValue(
                mockPaginatedResponse
            );

            const {
                fetchStudents,
                handlePageChange,
                handleItemsPerPageChange
            } = useStudents();

            handleItemsPerPageChange(25);
            handlePageChange(2);

            await fetchStudents();

            expect(studentsService.list).toHaveBeenCalledWith({
                page: 2,
                limit: 25,
                name: ''
            });
        });
    });

    describe('deleteStudent', () => {
        it('should delete student and refresh list', async () => {
            vi.mocked(studentsService.delete).mockResolvedValue(undefined);
            vi.mocked(studentsService.list).mockResolvedValue(
                mockPaginatedResponse
            );

            const { deleteStudent } = useStudents();

            await deleteStudent('1');
            await flushPromises();

            expect(studentsService.delete).toHaveBeenCalledWith('1');
            expect(studentsService.list).toHaveBeenCalled();
        });

        it('should handle delete error', async () => {
            const error = { message: 'Delete failed' };
            vi.mocked(studentsService.delete).mockRejectedValue(error);

            const { deleteStudent } = useStudents();

            await deleteStudent('1');
            await flushPromises();

            expect(studentsService.delete).toHaveBeenCalledWith('1');
        });
    });

    describe('Pagination handlers', () => {
        it('should update page on handlePageChange', () => {
            const { handlePageChange, filters } = useStudents();

            handlePageChange(3);

            expect(filters.value.page).toBe(3);
        });

        it('should update limit and reset page on handleItemsPerPageChange', () => {
            const { handleItemsPerPageChange, filters } = useStudents();
            filters.value.page = 5;

            handleItemsPerPageChange(25);

            expect(filters.value.limit).toBe(25);
            expect(filters.value.page).toBe(1);
        });
    });
});
