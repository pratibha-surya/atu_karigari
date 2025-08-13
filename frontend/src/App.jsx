
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';


import Home from './landing/Home';
import Index from './landing/Index';
import LandingModal from './landing/LandingModal';


import Login from './Pages/auth/Login';
import Signup from './Pages/auth/Signup';
import  PrivateRoute from "./Pages/ProtectedRoute/PrivateRoute"
import Profile from  "./components/Profile"


function App() {  
  const location = useLocation();
  const [showModal, setShowModal] = useState(true);

  
  const modalRoutes = ['/', '/affordable', '/luxury'];
  const shouldShowModal = modalRoutes.includes(location.pathname) && showModal;

  return (
    <>
      {shouldShowModal && (
        <LandingModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/affordable" element={<Home />} />
        <Route path="/luxury" element={<Index />} />

       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />  
            </PrivateRoute>
          }
        />


        
      </Routes>
    </>
  );
}



export default App;  