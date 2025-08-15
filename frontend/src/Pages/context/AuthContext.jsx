// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { refreshToken as refreshAccessToken, logout as apiLogout } from '../../api/auth'; // Adjust path as needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwt_decode(token);
      const expiry = decoded.exp * 1000;
      return Date.now() > expiry;
    } catch (err) {
      return true;
    }
  };

  const loginUser = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    const decoded = jwt_decode(accessToken);
    setUser(decoded);
  };

  const logoutUser = async () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    try {
      await apiLogout(); // Clear refresh token cookie on backend
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const initializeUser = async () => {
    const token = localStorage.getItem('accessToken');

    if (token && !isTokenExpired(token)) {
      loginUser(token);
    } else if (token) {
      try {
        const { data } = await refreshAccessToken();
        loginUser(data.accessToken);
      } catch (err) {
        console.error('Auto-refresh failed:', err);
        logoutUser();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
