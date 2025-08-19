import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? '/api' 
  : 'https://atu-karigari.onrender.com/api'; 

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await API.post('/refresh');
        const newAccessToken = data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const signup = (data) => API.post('/v1/auth/signup', data);
export const login = (data) => API.post('/v1/auth/login', data);
export const logout = () => API.post('/v1/auth/logout');
export const getProtected = () => API.get('/v1/auth/me');
export const refreshToken = () => API.post('/v1/auth/refresh');

export default API;
