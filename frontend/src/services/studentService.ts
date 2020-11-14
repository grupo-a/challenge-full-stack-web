import { AxiosResponse } from 'axios';
import api from './api';

export interface Student {
  name: string;
  email: string;
  cpf?: string;
  ra?: string;
  id?: number;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
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

  async create(student: Student): Promise<AxiosResponse<any>> {
    try {
      const response = await api.post('/students', student);

      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getById(id: string): Promise<AxiosResponse<Student>> {
    try {
      const response = await api.get(`/students/${id}`);

      return response;
    } catch (error) {
      return error.response;
    }
  }

  async update(id: string, student: Student): Promise<AxiosResponse<any>> {
    try {
      const response = await api.put(`/students/${id}`, student);

      return response;
    } catch (error) {
      return error.response;
    }
  }

  async delete(id: string) {
    try {
      const response = await api.delete(`/students/${id}`);

      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new StudentService();
