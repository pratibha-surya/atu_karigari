import React from 'react'
import pic1 from "../../assets/Image/image (1).png"
import pic2 from "../../assets/Image/Group 5524.png"
import pic3 from "../../assets/Image/Group 5521.png"
import unit from "../../assets/Image/Untitled design 1 (1).png"
import str from "../../assets/Image/str.png"

const Section = () => {
  return (
    <div>
       <div className="relative max-w-[1200px]  mx-auto px-4 mt-20 mb-12">
      
        <h3
          className="text-center mt-55 text-gray-800 mb-4"
          style={{
            fontFamily: "Kalnia",
            fontWeight: 400,
            fontSize: "32px",
            lineHeight: "50px",
            letterSpacing: "0%",
            fontStyle: "normal",
          }}
        >
          Shop By Occasion
        </h3>
      
       
        <img
          src={unit}
          alt="Decoration"
          className="mx-auto mb-8"
          style={{
            width: "314px",
            height: "42px",
            opacity: 1,
            transform: "rotate(0deg)",
          }}
        />
      
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            src: pic1,
            alt: "Office Wear",
            
          }, {
            src: pic2,
            alt: "Festive Wear",
            
          }, {
            src: pic3,
            alt: "Casual Wear",
            
          }].map(({ src, alt, label }) => (
            <div
              key={alt}
              className="relative cursor-pointer rounded-[10px] overflow-hidden"
              style={{ height: 540 }}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full  bg-opacity-80 py-3 text-center text-white font-semibold rounded-br-[10px]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section
