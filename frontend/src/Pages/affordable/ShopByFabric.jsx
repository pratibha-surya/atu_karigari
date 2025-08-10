import React from "react";

import SilkImg from "../../assets/Image/Frame 434.png";
import CottonImg from "../../assets/Image/Frame 435.png";
import GeorgetteImg from "../../assets/Image/Group 5506.png";
import OrganzaImg from "../../assets/Image/Frame 437.png";
import BlendedImg from "../../assets/Image/Frame 439.png";
import unit from "../../assets/Image/Untitled design 1 (1).png";

const fabrics = [
  { name: "Silk", img: SilkImg },
  { name: "Cotton", img: CottonImg },
  { name: "Georgette", img: GeorgetteImg },
  { name: "Organza", img: OrganzaImg },
  { name: "Blended", img: BlendedImg },
];

export default function ShopByFabric() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
     
      <h3 className="text-center text-gray-800 mb-4 text-2xl md:text-3xl font-normal font-[Kalnia] leading-tight">
        Shop By Fabric
      </h3>

     
      <div className="flex justify-center mb-8">
        <img
          src={unit}
          alt="Decoration"
          className="w-4/5 max-w-xs md:max-w-sm object-contain"
        />
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {fabrics.map(({ name, img }) => (
          <div
            key={name}
            className="border border-gray-200 rounded-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={img}
              alt={name}
              className="w-full aspect-[6/7] object-cover rounded-md"
            />
           
          </div>
        ))}
      </div>

      
      <div className="text-center mt-6">
        <button className="bg-[#052A3D] text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full hover:bg-pink-900 transition duration-300">
          Explore
        </button>
      </div>
    </section>
  );
}
