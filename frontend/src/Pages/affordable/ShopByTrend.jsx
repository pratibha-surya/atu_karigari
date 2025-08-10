import React from "react";

import ImgMinimal from "../../assets/Image/Group 5517.png";
import ImgPrint from "../../assets/Image/Group 5516.png";
import ImgPastel from "../../assets/Image/Group 5515.png";
import unit from "../../assets/Image/Untitled design 1 (1).png";

const trends = [
  { name: "Minimal Must-haves", img: ImgMinimal },
  { name: "Print Parade", img: ImgPrint },
  { name: "Pastel Perfection", img: ImgPastel },
];

export default function ShopByTrend() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
     
      <h3 className="text-center text-gray-800 mb-6 text-2xl md:text-3xl font-normal font-[Kalnia] leading-snug">
        Shop By Trend
      </h3>

     
      <div className="flex justify-center mb-12">
        <img
          src={unit}
          alt="Decoration"
          className="w-4/5 max-w-xs md:max-w-sm object-contain"
        />
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trends.map(({ name, img }) => (
          <div
            key={name}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg w-full aspect-[4/5] max-w-sm mx-auto"
          >
            <img
              src={img}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
