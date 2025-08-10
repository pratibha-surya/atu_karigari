import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1/auth',
});

export const signup = (data) => API.post('/signup', data);
export const login = (data) => API.post('/login', data);
export const getProtected = (token) =>
  API.get('/protected', {
    headers: { Authorization: `Bearer ${token}` },
  });
