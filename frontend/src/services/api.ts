import axios from 'axios';

export interface ApiValidationErrors {
  input: string;
  errors: string[];
}

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

export default api;
