import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'https://atu-karigari.onrender.com/api/v1/auth',
  withCredentials: true, // Send cookies (refresh token)
});

// Request Interceptor: Attach access token if present
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

// Response Interceptor: Handle token refresh logic
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 Unauthorized and ensure it's not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/refresh')
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const { data } = await API.post('/refresh'); // sent with HttpOnly cookie
        const newAccessToken = data.accessToken;

        // Store new token and retry original request
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Clear stored token and redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoint wrappers
export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
export const logout = () => API.post('/logout');
export const getProtected = () => API.get('/me');
export const refreshToken = () => API.post('/refresh'); // handled automatically

export default API;
