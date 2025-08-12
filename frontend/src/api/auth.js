import axios from 'axios';

// Use VITE_API_URL from .env (e.g., https://your-backend.onrender.com/api/v1/auth)
const API = axios.create({
  baseURL:  'http://localhost:5000/api/v1/auth',
  withCredentials: true, // Required for sending secure httpOnly cookies
});

// Request Interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle expired access token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await API.post('/refresh'); // refresh token is sent via httpOnly cookie
        const { accessToken } = res.data;

        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
export const logout = () => API.post('/logout');
export const getProtected = () => API.get('/me');
export const refreshToken = () => API.post('/refresh'); // not used directly; handled by interceptor

export default API;
