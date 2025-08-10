import React from "react";

import unit from "../../assets/Image/Untitled design 1 (1).png";
import card2Img from "../../assets/Image/Screenshot 2025-06-02 at 5.09.47 PM 1 (1).png";
import card1Img from "../../assets/Image/Screenshot 2025-06-02 at 4.39.00 PM 1.png";
import card3Img from "../../assets/Image/image (3).png";
import card4Img from "../../assets/Image/image (4).png";
import card5Img from "../../assets/Image/image (5).png";

const cards = [
  {
    id: 1,
    img: card1Img,
    instagram: true,
    instagramHandle: "@atulyakarigariindia",
  },
  {
    id: 2,
    img: card2Img,
  },
  {
    id: 3,
    img: card3Img,
    label: "Sitashma",
    subtitle: "PURE TISSUE SILK",
  },
  {
    id: 4,
    img: card4Img,
    label: "कर धागा कसता है आपकी डालस",
  },
  {
    id: 5,
    img: card5Img,
  },
];

export default function CardGrid() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
   
      <h3
        className="text-center text-gray-800 mb-8"
        style={{
          fontFamily: "Kalnia",
          fontWeight: 400,
          fontSize: "32px",
          lineHeight: "50px",
        }}
      >
        Draped by Atulya Karigari
      </h3>


      <div className="flex justify-center mb-8">
        <img
          src={unit}
          alt="Decoration"
          className="object-contain"
          style={{ width: 314, height: 42 }}
        />
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       
        <div className="lg:row-span-2 lg:col-span-1 w-full h-[400px] md:h-[500px] rounded-[10px] overflow-hidden">
          <img
            src={cards[0].img}
            alt="Card 1"
            className="w-full h-full object-cover"
          />
        </div>

       
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.slice(1).map((card) => (
            <div
              key={card.id}
              className="relative w-full h-[250px] rounded-[10px] overflow-hidden"
            >
              <img
                src={card.img}
                alt={`Card ${card.id}`}
                className="w-full h-full object-cover"
              />
              {(card.label || card.subtitle) && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-2">
                  {card.label && (
                    <h3 className="text-lg md:text-xl font-semibold drop-shadow">
                      {card.label}
                    </h3>
                  )}
                  {card.subtitle && (
                    <p className="text-sm md:text-base tracking-wide drop-shadow">
                      {card.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
