
import React from "react";
import { useNavigate } from "react-router-dom";

import imgLeft from "../assets/Image/Group 5521.png";
import imgRight from "../assets/Image/Summer Delight 03 1 (2).png";
import innerLogo from "../assets/Image/Group.png";
import outerLogo from "../assets/Image/Component 92.png";
import img from "../assets/Image/Atulya logo 1.png";
import img2 from "../assets/Image/Atulya Karigari logo 1.png";

const LandingModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleNavigation = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50  bg-opacity-50 flex justify-center pt-10 md:pt-20 lg:pt-28 overflow-y-auto">
      <div className="relative w-[95%] max-w-6xl h-[85vh] md:h-[75vh]
            rounded-[32px] 
            border-[15px] 
            border-white 
            border-l-white border-r-yellow-400 
            overflow-hidden 
            grid grid-cols-1 md:grid-cols-2 
            bg-white shadow-2xl">

        
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="relative w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32">
            <img
              src={outerLogo}
              alt="Outer Circular Logo"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <img
              src={innerLogo}
              alt="Inner Circular Logo"
              className="absolute inset-0 w-2/3 h-2/3 m-auto object-contain"
            />
          </div>
        </div>

      
        <div className="relative w-full h-full">
          <img
            src={imgLeft}
            alt="Affordable Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 text-white">
            <h4 className="text-xs sm:text-sm mb-1 tracking-widest">
              AFFORDABLE ELEGANCE
            </h4>

            
            <div className="mb-3 w-[180px] h-[115px]">
              <img
                src={img}
                alt="Atulya Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-base sm:text-lg  font-semibold mb-2 uppercase font-light font-poppins">
              STARTS FROM ₹1000
            </p>
            <p className="text-xs sm:text-sm mb-4 max-w-xs">
              Beautifully handcrafted pieces designed for everyday charm,
              thoughtful gifts, and accessible artistry.
            </p>
            <button
              onClick={() => handleNavigation("/affordable")}
              className="bg-white text-black px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-200 transition"
            >
              SHOP AFFORDABILITY
            </button>
          </div>
        </div>

      
        <div className="relative w-full h-full">
          <img
            src={imgRight}
            alt="Luxury Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 text-white">
            <h4 className="text-xs sm:text-sm mb-1 tracking-widest">
              LUXE HERITAGE
            </h4>

       
            <div className="mb-3 w-[180px] h-[115px]">
              <img
                src={img2}
                alt="Atulya Karigari Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-base sm:text-lg font-semibold mb-2">
              STARTS FROM ₹7000
            </p>
            <p className="text-xs sm:text-sm mb-4 max-w-xs">
              Elevated designs and heirloom-worthy pieces — crafted for those
              who appreciate timeless luxury.
            </p>
            <button
              onClick={() => handleNavigation("/luxury")}
              className="bg-yellow-400 text-black px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-yellow-500 transition"
            >
              SHOP LUXURY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingModal;
