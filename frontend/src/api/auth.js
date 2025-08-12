import axios from 'axios';

// ✅ Dynamically set baseURL based on environment
const API = axios.create({
  baseURL: import.meta.env.DEV
    ? '/api' // go through Vite proxy during dev
    : 'https://atu-karigari.onrender.com/api/v1/auth', // prod/live
  withCredentials: true,
});

// ✅ Add token to every request if available
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

// ✅ Automatically refresh token on 401
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

// ✅ Export reusable API methods
export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
export const logout = () => API.post('/logout');
export const getProtected = () => API.get('/me');
export const refreshToken = () => API.post('/refresh');

export default API;
