import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useStudentsStore } from './students.store';
import { studentsService } from '../services/students.service';

vi.mock('../services/students.service');

describe('useStudentsStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should fetch students', async () => {
        const store = useStudentsStore();
        const mockStudents = [{ id: '1', name: 'Test' }];
        (studentsService.list as any).mockResolvedValue({
            data: mockStudents,
            meta: { total: 1 }
        });

        await store.fetchStudents();

        expect(store.students).toEqual(mockStudents);
        expect(store.totalItems).toBe(1);
        expect(store.isLoading).toBe(false);
    });
});
