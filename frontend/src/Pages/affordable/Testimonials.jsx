import React from "react";
import VectorImage from "../../assets/Image/Vector 17 (1).png";
import unit from "../../assets/Image/Untitled design 1 (1).png";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Nivedita Roy",
      location: "Kolkata",
      review:
        "As someone who collects handloom sarees, I was blown away by the craftsmanship and story behind every Atulyakarigar piece. Truly wearable art.",
    },
    {
      name: "Rahul Sharma",
      location: "Delhi",
      review:
        "Amazing quality and attention to detail. I always get compliments when I wear their pieces.",
    },
    {
      name: "Sonal Gupta",
      location: "Mumbai",
      review:
        "The perfect blend of tradition and style. I love their collection!",
    },
  ];

  return (
    <section className="bg-white mt-12 py-10 px-4 md:px-10 lg:px-20">

      <h3 className="text-center text-gray-800 mb-6 text-2xl md:text-3xl font-[Kalnia] leading-tight">
        Testimonials
      </h3>

      
      <div className="flex justify-center mb-10">
        <img
          src={unit}
          alt="Decoration"
          className="w-4/5 max-w-xs md:max-w-sm object-contain"
        />
      </div>

     
      <div className="sm:flex justify-center md:gap-10">
        
        <div className="relative w-full md:w-1/3 h-auto md:h-[700px] mb-6 md:mb-0">
          <img
            src={VectorImage}
            alt="Testimonials"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <h2 className="absolute top-4 left-4 md:left-6 text-white font-[Kalnia] font-normal text-[20px] md:text-[28px] leading-[1.4] max-w-[%] z-10">
            Hear what our<br />satisfied clients<br />have to say.
          </h2>
        </div>

        
        <div className="w-full md:w-1/3 flex flex-col gap-6 max-h-[700px] overflow-y-auto pr-2 md:pr-4">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-[#811b31] text-white p-5 sm:p-6 rounded-md shadow-lg flex flex-col justify-between h-full"
            >
             
              <div className="flex gap-1 mb-3 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>

              
              <p className="italic text-sm sm:text-base mb-4 leading-relaxed">
                "{t.review}"
              </p>

              
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
                  <p className="text-sm font-semibold">{`${t.name}, ${t.location}`}</p>
                </div>
                <button className="bg-[#fca58d] text-white w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#fa8a64] transition">
                  ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
