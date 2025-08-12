import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Pages/context/AuthContext';

const Profile = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);
  const navigate = useNavigate(); 


  useEffect(() => {
    if (!user) {
      navigate('/'); 
    }
  }, [user, navigate]); 

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  
  if (!user) {
    return null; 
  }

  
  const handleLogout = () => {
    logoutUser(); 
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, {user.email}</h1>
        <p className="text-gray-600 mb-6">This is your profile page.</p>

       
        <button
          onClick={handleLogout} 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
