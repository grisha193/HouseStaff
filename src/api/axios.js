<<<<<<< HEAD
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

export default api
=======
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Laravel API
  withCredentials: true, // для работы с куками (если Sanctum)
});

export default api;
>>>>>>> 1c7155f2d730741c202de2051430a13699d2c8bf
