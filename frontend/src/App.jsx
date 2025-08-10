import './App.css';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

// Landing pages
import Home from './landing/Home';
import Index from './landing/Index';
import LandingModal from './landing/LandingModal';

// Auth pages
import Login from './Pages/auth/Login';
import Signup from './Pages/auth/Signup';


function App() {  // renamed from "const function App()"
  const location = useLocation();
  const [showModal, setShowModal] = useState(true);

  // Show modal only on these routes
  const modalRoutes = ['/', '/affordable', '/luxury'];
  const shouldShowModal = modalRoutes.includes(location.pathname) && showModal;

  return (
    <>
      {shouldShowModal && (
        <LandingModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}

      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/affordable" element={<Home />} />
        <Route path="/luxury" element={<Index />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
      </Routes>
    </>
  );
}



export default App;  // fixed capitalization
