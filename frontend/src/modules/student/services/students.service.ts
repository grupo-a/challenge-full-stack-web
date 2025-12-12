import { api } from '@/core/services/api.service';
import type { Student, StudentFilters } from '../types/student.types';
import type { PaginatedResponse } from '@/core/types/common.types';
import type {
    createStudentSchemaType,
    updateStudentSchemaType
} from '../schema';

const BASE_URL = '/students';

export const studentsService = {
    async list(params?: StudentFilters): Promise<PaginatedResponse<Student>> {
        const { data } = await api.get<PaginatedResponse<Student>>(BASE_URL, {
            params
        });
        return data;
    },

    async getById(id: string): Promise<Student> {
        const { data } = await api.get<Student>(`${BASE_URL}/${id}`);
        return data;
    },

    async create(student: createStudentSchemaType): Promise<Student> {
        const { data } = await api.post<Student>(BASE_URL, student);
        return data;
    },

    async update(
        id: string,
        student: updateStudentSchemaType
    ): Promise<Student> {
        const { data } = await api.put<Student>(`${BASE_URL}/${id}`, student);
        return data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(`${BASE_URL}/${id}`);
    }
};
