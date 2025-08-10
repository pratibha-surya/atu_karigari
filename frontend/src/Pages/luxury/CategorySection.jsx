import React from 'react';
import img1 from "../../assets/Image/image (2).png";
import img2 from "../../assets/Image/Component 87.png";
import img3 from "../../assets/Image/Component 91.png";

const categories = [
  {
    src: img1,
    alt: "Category 1",
    
  },
  {
    src: img2,
    alt: "Category 2",
    
  },
  {
    src: img3,
    alt: "Category 3",
    
  }
];

const CategorySection = () => {
  return (
    <section className="w-full px-4 py-10">
      

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map(({ src, alt, label }) => (
          <div
            key={alt}
            className="relative cursor-pointer group w-full h-[400px] md:h-[540px] overflow-hidden"
          >
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px]"
            />
            <div className="absolute bottom-0 left-0 w-full  bg-opacity-50 py-3 text-center text-white font-semibold text-lg rounded-br-[10px]">
              {label}
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex justify-center mt-8">
        <button className="bg-[#7F0A18] text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:bg-pink-900 transition duration-300">
          Explore
        </button>
      </div>
    </section>
  );
};

export default CategorySection;
