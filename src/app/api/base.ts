import axios from 'axios';

export const baseApi = axios.create({
    baseURL: 'https://6970912678fec16a63fe21ad.mockapi.io',
    headers: { 'Content-Type': 'application/json' },
});

baseApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

baseApi.interceptors.response.use((response) => response, (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
        }
        return Promise.reject(error);
    }
);