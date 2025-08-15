import React, { createContext, useState, useEffect } from 'react';
import {
  refreshToken as refreshAccessToken,
  logout as apiLogout,
  getProtected,
} from '../../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const expiry = decoded.exp * 1000;
      return Date.now() > expiry;
    } catch (err) {
      return true;
    }
  };

  const loginUser = async (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    await fetchUserProfile();
  };

  const logoutUser = async () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    try {
      await apiLogout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await getProtected(); // Calls /me endpoint
      const { user } = res.data;

      // console.log('Fetched user profile:', user);
      setUser(user);
    } catch (err) {
      console.error('Fetching user profile failed:', err);
      // logoutUser();
    }
  };

  const initializeUser = async () => {
    const token = localStorage.getItem('accessToken');

    if (token && !isTokenExpired(token)) {
      await fetchUserProfile();
    } else if (token) {
      try {
        const { data } = await refreshAccessToken();
        localStorage.setItem('accessToken', data.accessToken);
        await fetchUserProfile();
      } catch (err) {
        console.error('Auto-refresh failed:', err);
        // logoutUser();
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
