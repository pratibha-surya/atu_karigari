
import React from 'react';
import image1 from "../../assets/Image/Summer Delight 03 1.png";
import image2 from "../../assets/Image/Summer Splash 03 1.png";
import image3 from "../../assets/Image/Summer Symphony 03 1.png";

const MainBanner = () => {
  return (
    <section className="w-full">
     
      <div className="flex flex-col md:flex-row w-full">
        <img
          src={image1}
          alt="Saree 1"
          className="object-cover w-full md:w-1/3 h-[250px] md:h-[600px]"
        />
        <img
          src={image2}
          alt="Saree 2"
          className="object-cover w-full md:w-1/3 h-[250px] md:h-[600px]"
        />
        <img
          src={image3}
          alt="Saree 3"
          className="object-cover w-full md:w-1/3 h-[250px] md:h-[600px]"
        />
      </div>

     
      <div className="bg-[#F09D8D] p-4 md:p-6 w-full flex flex-col md:flex-row items-center justify-between text-white">
        <h2
          className="text-xl sm:text-2xl md:text-[40.27px] leading-tight tracking-[0.03em] uppercase font-normal mb-4 md:mb-0 text-center md:text-left"
          style={{ fontFamily: "Kalnia, sans-serif" }}
        >
          SHOP AFFORDABLE<br/> RANGE
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
          <p
            className="text-3xl sm:text-5xl md:text-[68.07px] leading-tight tracking-[0.03em] uppercase font-normal"
            style={{ fontFamily: "Kalnia, sans-serif" }}
          >
            ₹7000
          </p>
          <p className="text-sm sm:text-lg font-medium text-white mt-1 sm:mt-0">
            UPTO 20% OFF
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
