import { describe, it, expect, vi, beforeEach } from 'vitest';
import { studentsService } from './students.service';
import { api } from '@/core/services/api.service';
import type { Student } from '../types/student.types';
import type { PaginatedResponse } from '@/core/types/common.types';

vi.mock('@/core/services/api.service', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn()
    }
}));

const mockStudent: Student = {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    ra: 'RA001',
    cpf: '12345678901'
};

const mockPaginatedResponse: PaginatedResponse<Student> = {
    data: [mockStudent],
    meta: {
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1
    }
};

describe('studentsService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('list', () => {
        it('should list students without params', async () => {
            vi.mocked(api.get).mockResolvedValue({
                data: mockPaginatedResponse
            });

            const result = await studentsService.list();

            expect(api.get).toHaveBeenCalledWith('/students', {
                params: undefined
            });
            expect(result).toEqual(mockPaginatedResponse);
        });

        it('should list students with filter params', async () => {
            vi.mocked(api.get).mockResolvedValue({
                data: mockPaginatedResponse
            });

            const params = { page: 1, limit: 10, name: 'João' };
            const result = await studentsService.list(params);

            expect(api.get).toHaveBeenCalledWith('/students', { params });
            expect(result).toEqual(mockPaginatedResponse);
        });

        it('should handle list error', async () => {
            const error = new Error('Network error');
            vi.mocked(api.get).mockRejectedValue(error);

            await expect(studentsService.list()).rejects.toThrow(
                'Network error'
            );
        });
    });

    describe('getById', () => {
        it('should get student by id', async () => {
            vi.mocked(api.get).mockResolvedValue({ data: mockStudent });

            const result = await studentsService.getById('1');

            expect(api.get).toHaveBeenCalledWith('/students/1');
            expect(result).toEqual(mockStudent);
        });

        it('should handle getById error', async () => {
            const error = new Error('Student not found');
            vi.mocked(api.get).mockRejectedValue(error);

            await expect(studentsService.getById('999')).rejects.toThrow(
                'Student not found'
            );
        });
    });

    describe('create', () => {
        it('should create a new student', async () => {
            vi.mocked(api.post).mockResolvedValue({ data: mockStudent });

            const newStudent = {
                name: 'João Silva',
                email: 'joao@email.com',
                cpf: '12345678901'
            };

            const result = await studentsService.create(newStudent);

            expect(api.post).toHaveBeenCalledWith('/students', newStudent);
            expect(result).toEqual(mockStudent);
        });

        it('should handle create validation error', async () => {
            const error = {
                response: {
                    status: 422,
                    data: { message: 'CPF já está em uso' }
                }
            };
            vi.mocked(api.post).mockRejectedValue(error);

            await expect(
                studentsService.create({
                    name: 'Test',
                    email: 'test@email.com',
                    cpf: '12345678901'
                })
            ).rejects.toEqual(error);
        });
    });

    describe('update', () => {
        it('should update an existing student', async () => {
            const updatedStudent = { ...mockStudent, name: 'João Santos' };
            vi.mocked(api.put).mockResolvedValue({ data: updatedStudent });

            const updateData = {
                name: 'João Santos',
                email: 'joao@email.com',
                cpf: '12345678901'
            };
            const result = await studentsService.update('1', updateData);

            expect(api.put).toHaveBeenCalledWith('/students/1', updateData);
            expect(result).toEqual(updatedStudent);
        });

        it('should handle update error', async () => {
            const error = new Error('Update failed');
            vi.mocked(api.put).mockRejectedValue(error);

            await expect(
                studentsService.update('1', {
                    name: 'Test',
                    email: 'test@email.com',
                    cpf: '12345678901'
                })
            ).rejects.toThrow('Update failed');
        });
    });

    describe('delete', () => {
        it('should delete a student', async () => {
            vi.mocked(api.delete).mockResolvedValue({});

            await studentsService.delete('1');

            expect(api.delete).toHaveBeenCalledWith('/students/1');
        });

        it('should handle delete error', async () => {
            const error = new Error('Delete failed');
            vi.mocked(api.delete).mockRejectedValue(error);

            await expect(studentsService.delete('999')).rejects.toThrow(
                'Delete failed'
            );
        });
    });
});
