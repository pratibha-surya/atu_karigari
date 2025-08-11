import axios from 'axios';


const API = axios.create({
  baseURL:  'http://localhost:5000/api/v1/auth', 
});


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


API.interceptors.response.use(
  (response) => response,  
  async (error) => {
    const originalRequest = error.config;

    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          
          const response = await API.post('/refresh', { refreshToken });
          const { accessToken } = response.data;

         
          localStorage.setItem('accessToken', accessToken);

          
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return API(originalRequest);
        } catch (refreshError) {
          
          console.error('Token refresh failed', refreshError);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';  
        }
      } else {
        
        console.error('No refresh token available');
        window.location.href = '/login';  
      }
    }
    return Promise.reject(error);
  }
);


export const signup = (data) => API.post('/signup', data);


export const login = (data) => API.post('/login', data);


export const getProtected = () => API.get('/me');


export const refreshToken = (refreshToken) => API.post('/refresh', { refreshToken });
