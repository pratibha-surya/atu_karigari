import React, { useContext, useEffect, useState } from 'react';
import  AuthContext  from '../Pages/context/AuthContext';

const Profile = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
    
      setEmail(user.email); 
    }
  }, [user]);  


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-lg text-gray-500">Loading...</div>
      </div>
    );
  }


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, {email}</h1>
        <p className="text-gray-600 mb-6">This is your profile page.</p>

       
        <button
          onClick={logoutUser}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
