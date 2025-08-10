import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import MainBanner from '../Pages/affordable/MainBanner';
import ShopByOccation from '../Pages/affordable/ShopByOccation';
import ShopByFabric from '../Pages/affordable/ShopByFabric';
import ShopByTrend from '../Pages/affordable/ShopByTrend';
import Testimonials from '../Pages/affordable/Testimonials';
import CardGrid from '../Pages/affordable/AtulyaKarigariGrid';
import { useAuth } from '../Pages/context/AuthContext';


const Home = () => {
  const { user } = useAuth(); 

  return (
    <>
      <Navbar />
      <MainBanner />
      <ShopByOccation />
      <ShopByFabric />
      <ShopByTrend />
      <Testimonials />
      <CardGrid />
      <Footer />
    </>
  );
};

export default Home;
