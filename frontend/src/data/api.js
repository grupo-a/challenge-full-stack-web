import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/v1',
});

export default api;
