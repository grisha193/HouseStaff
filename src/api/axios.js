import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // для кук и CSRF
});

// Правильный перехватчик для CSRF
api.interceptors.request.use(async (config) => {
    // Добавляем CSRF-токен только для изменяющих методов
    if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true
        });
    }
    return config;
});

export default api;