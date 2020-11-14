import { AxiosResponse } from 'axios';
import api from './api';

export interface Student {
  name: string;
  email: string;
  cpf: string;
  ra: string;
}

class StudentService {
  async getAll(search?: string): Promise<AxiosResponse<Student[]>> {
    try {
      const response = await api.get('/students', {
        params: {
          search,
        },
      });

      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new StudentService();
