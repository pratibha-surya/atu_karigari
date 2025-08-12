import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true); 
  
  const isTokenExpired = (token) => {
    try {
      const expiry = decoded.exp * 1000;  
      return Date.now() > expiry;  
    } catch (error) {
      return true;  
    }
  };

  
  const loginUser = (token) => {
    localStorage.setItem('accessToken', token);  
    const decodedToken = jwt_decode(token);  
    setUser(decodedToken);  
  };

  
  const logoutUser = () => {
    localStorage.removeItem('accessToken');  
    setUser(null); 
  };


  useEffect(() => {
    const token = localStorage.getItem('accessToken');  
    if (token && !isTokenExpired(token)) {
      const decodedToken = jwt_decode(token);  
      setUser(decodedToken); 
    } else {
      logoutUser();  
    }
    setLoading(false);  
  }, []);  

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
