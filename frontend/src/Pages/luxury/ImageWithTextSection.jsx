import React from "react";
import weavingImage from "../../assets/Image/ATK VIDEO 1.png"; 

const WeavingSection = () => {
  return (
    <section className="w-full flex justify-center py-10 px-4">
      <div className="relative w-full sm:w-4/5 md:w-2/3 lg:w-[1288px] h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
        <img
          src={weavingImage}
          alt="Weaving Woman"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        
        <div className="absolute inset-0 bg-opacity-20" />

       
        <div className="absolute bottom-0 left-0 w-full px-6 pb-6">
          <h2 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-poppins font-normal italic ">
            “To create a saree is to compose poetry with thread <br/> every warp and weft a stanza of tradition.”
          </h2>
        </div>
      </div>
    </section>
  );
};

export default WeavingSection;
