import React from 'react'
import image1 from "../../assets/Image/Summer Delight 03 1 (2).png"
import image2 from "../../assets/Image/Summer Symphony 03 1 (1).png";
import image3 from "../../assets/Image/Summer Splash 03 1 (1).png";
import str from "../../assets/Image/str.png"
import unit from "../../assets/Image/Untitled design 1 (1).png"

const Mainsection = () => {
  return (
    <>
     <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <img
          src={image1}
          alt="Saree 1"
          className="object-cover w-full h-[400px] sm:h-[400px] lg:h-[500px]"
        />
        <img
          src={image2}
          alt="Saree 2"
          className="object-cover w-full h-[400px] sm:h-[400px] lg:h-[500px]"
        />
        <img
          src={image3}
          alt="Saree 3"
          className="object-cover w-full h-[400px] sm:h-[400px] lg:h-[500px]"
        />
      </div>
    </section>
    <div className="w-full bg-[#6D001D] border-y-2 border-[#8E8E8E1A] h-[50px] flex items-center justify-center">
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-x-6 gap-y-2 w-full max-w-screen md:max-w-screen-lg px-4 ">
        {[
          "SHOP LUXURY",
          "SHOP KARIGARI",
          "SHOP LUXURY",
          "SHOP KARIGARI",
          "SHOP LUXURY",
          "SHOP KARIGARI",
          "SHOP LUXURY",
        ].map((text, i, arr) => (
          <React.Fragment key={i}>
            <span className="text-white text-sm font-medium whitespace-nowrap">
              {text}
            </span>
            {i < arr.length - 1 && (
              <img
                src={str}
                alt="star"
                className="w-[14px] h-[14px] object-contain"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
      <div className="relative max-w-[1200px] mx-auto mt-20 mb-8 px-4 text-center">
            <h3
              className="text-gray-800 font-normal text-[32px] leading-[50px]"
              style={{ fontFamily: "Kalnia" }}
            >
              Signature Collection
            </h3>
    
          
            <img
              src={unit}
              alt="Decoration"
              className="mx-auto mt-4"
              style={{
                width: 314,
                height: 42,
                opacity: 1,
                transform: "rotate(0deg)",
              }}
            />
          </div>
      
    </>
  )
}

export default Mainsection
