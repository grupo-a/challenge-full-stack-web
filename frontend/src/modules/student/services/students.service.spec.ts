import { describe, it, expect, vi } from 'vitest';
import { studentsService } from './students.service';
import { api } from '@/core/services/api.service';

vi.mock('@/core/services/api.service');

describe('studentsService', () => {
    it('should list students', async () => {
        const mockResponse = { data: { data: [], meta: { total: 0 } } };
        (api.get as any).mockResolvedValue(mockResponse);

        const result = await studentsService.list();
        expect(api.get).toHaveBeenCalledWith('/students', {
            params: undefined
        });
        expect(result).toEqual(mockResponse.data);
    });
});
