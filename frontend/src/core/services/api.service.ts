import axios, { type AxiosError, type AxiosInstance } from 'axios';
import type { ApiError } from '../types/common.types';

const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const AUTH_TOKEN_KEY = 'auth_token';

const createApiInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 10000
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(AUTH_TOKEN_KEY);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ApiError>) => {
            if (error.response?.status === 401) {
                localStorage.removeItem(AUTH_TOKEN_KEY);

                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }

            const message =
                error.response?.data?.message ||
                error.message ||
                'Erro desconhecido ao comunicar com o servidor';

            return Promise.reject({
                message,
                statusCode: error.response?.status || 500,
                errors: error.response?.data?.errors
            } as ApiError);
        }
    );

    return instance;
};

export const api = createApiInstance();
