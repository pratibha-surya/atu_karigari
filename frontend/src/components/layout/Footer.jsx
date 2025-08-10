import React from "react";
import Img1 from "../../assets/Image/Group (1).png";
import Img2 from "../../assets/Image/Group (2).png";
import Img3 from "../../assets/Image/Group (3).png";
import Img4 from "../../assets/Image/Group (4).png";
import Img5 from "../../assets/Image/Group (5).png";

const cards = [
  { id: 1, img: Img1 },
  { id: 2, img: Img2 },
  { id: 3, img: Img3 },
  { id: 4, img: Img4 },
  { id: 5, img: Img5 },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 text-gray-800">
    
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10">
       
        <div className="md:w-1/2">
          <h1 className="text-red-700 font-serif text-2xl mb-2">
            Atulya Karigari
            <span className="block text-xs font-thin">INDIA</span>
          </h1>
          <p className="text-xs text-red-700 font-serif max-w-xs">
            Where every thread tells a story of grace. Designed to be worn,
            cherished, and passed on.
          </p>

          <hr className="border-gray-300 mt-6 mb-6" />

          <div className="flex gap-12">
            <div>
              <h6 className="text-xs font-bold mb-3">QUICK LINKS</h6>
              <ul className="text-xs space-y-1">
                <li>Privacy policy</li>
                <li>Terms of Service</li>
                <li>Refund Policy</li>
                <li>Shipping Policy</li>
              </ul>
            </div>

            <div>
              <h6 className="text-xs font-bold mb-3">INFO</h6>
              <ul className="text-xs space-y-1">
                <li>Handloom</li>
                <li>New Collection</li>
                <li>Corporate Gifting</li>
                <li>About Us</li>
                <li>Blogs</li>
              </ul>
            </div>
          </div>
        </div>

      
        <div className="md:w-1/2">
          <h2 className="text-red-700 font-serif text-2xl mb-4">CONTACT US</h2>
          <p className="flex items-start text-xs mb-2">
            <span className="mr-2 mt-1 text-blue-800">📍</span>
            Plot No 1215/1511; Khandagiri Bari, Ghatikia, Khordha,
            Bhubaneswar-751030 Odisha (India)
          </p>
          <p className="flex items-center text-xs mb-2">
            <span className="mr-2 text-blue-800">✉️</span>
            atulyakarigariindia@gmail.com
          </p>
          <p className="flex items-center text-xs mb-6">
            <span className="mr-2 text-blue-800">📞</span>
            +91 9078077078
          </p>
          <div className="flex space-x-4 text-blue-800 text-xl cursor-pointer">
            <span>📞</span>
            <span>📸</span>
            <span>📘</span>
            <span>❌</span>
          </div>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-full aspect-square rounded-lg overflow-hidden shadow"
            >
              <img
                src={card.img}
                alt={`Card ${card.id}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
