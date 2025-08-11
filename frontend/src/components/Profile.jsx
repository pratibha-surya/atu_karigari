
import React from 'react';
import AuthContext from '../Pages/context/AuthContext';

const Profile = () => {
  const { user, logoutUser } = AuthContext(); 

  return (
    <div>
      <h1>Welcome, {user?.email}</h1> 
      <p>This is your profile page.</p>
      <button onClick={logoutUser}>Logout</button> 
    </div>
  );
};

export default Profile;
