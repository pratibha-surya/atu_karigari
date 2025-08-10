import React from 'react';
import img1 from "../../assets/Image/Rectangle 52.png";
import img2 from "../../assets/Image/image.png";
import img3 from "../../assets/Image/Rectangle 53.png";
import unit from "../../assets/Image/Untitled design 1 (1).png";

const ShopByOccation = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12 relative">
      <h3 className="text-center text-gray-800 mb-8 text-2xl md:text-3xl font-normal leading-tight font-[Kalnia]">
        Shop By Occasion
      </h3>

      <img
        src={unit}
        alt="Underline Decoration"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 w-[80%] max-w-xs md:max-w-md"
        style={{
          opacity: 1,
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          { src: img1, alt: "Office Wear", label: "Office Wear" },
          { src: img2, alt: "Festive Wear", label: "Festive Wear" },
          { src: img3, alt: "Casual Wear", label: "Casual Wear" },
        ].map(({ src, alt, label }) => (
          <div
            key={alt}
            className="relative cursor-pointer group w-full aspect-[3/4]"
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover rounded-tl-lg rounded-tr-lg rounded-br-lg"
            />
            <div className="absolute bottom-0 left-0 w-full bg-[#F09D8D] bg-opacity-80 py-3 text-center text-white font-semibold rounded-br-lg">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-[#052A3D] text-white px-6 py-2 rounded-full transition duration-300 hover:bg-[#073b53]">
          Explore
        </button>
      </div>
    </section>
  );
};

export default ShopByOccation;
