import React, { useState, useEffect } from 'react';


import LandingModal from '../landing/LandingModal';
import Mainsection from '../Pages/luxury/mainsection';
import CategorySection from '../Pages/luxury/CategorySection';
import Section from '../Pages/luxury/section';

import ShopByFabric from '../Pages/luxury/ShopByFabric';
import Testimonials from '../Pages/luxury/Testimonials';
import CardGrid from '../Pages/luxury/AtulyaKarigariGrid';
import WeavingSection from '../Pages/luxury/ImageWithTextSection';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Index = () => {

  return (
    <>
   
      <Navbar />
      <Mainsection/>
      <CategorySection/>
       <ShopByFabric/>
       <WeavingSection/>
       <Section/>
        <Testimonials/>
          <CardGrid/>
   
      
     
      <Footer />
    </>
  );
};

export default Index;
