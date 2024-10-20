// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Aqui você define o endpoint base da sua API
});

export default api;
