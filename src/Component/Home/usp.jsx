import React from 'react';

// Import your custom logo images here
import naturalLogo from '../../assets/Image/usp1.png';
import skinTypesLogo from '../../assets/Image/usp2.png';
import indiaLogo from '../../assets/Image/usp3.png';
import crueltyFreeLogo from '../../assets/Image/usp4.png';

const UspSection = () => {
  const features = [
    {
      id: 1,
      logoImg: naturalLogo,
      title: "100% Natural",
      description: "Every product is made with pure, plant-based ingredients—no parabens, no sulfates, no synthetic fragrances. Just nature, bottled."
    },
    {
      id: 2,
      logoImg: skinTypesLogo,
      title: "For All Skin Types",
      description: "Gentle yet effective formulas designed to love your skin—whether it's oily, dry, sensitive, or a bit of everything."
    },
    {
      id: 3,
      logoImg: indiaLogo,
      title: "Made in India",
      description: "Proudly crafted in India using time-tested botanical wisdom and modern formulations tailored for Indian skin and weather."
    },
    {
      id: 4,
      logoImg: crueltyFreeLogo,
      title: "Cruelty-Free",
      description: "We never test on animals—because beauty should be kind. Every product is ethically made with compassion, ensuring no furry friends are harmed in the process."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8  ">
      {/* Grid Container with responsive classes */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4  gap-6 md:gap-8 ">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white p-6 lg:p-4 xl:p-6 transition-shadow duration-300 w-full max-w-sm mx-auto "
          >
            {/* Logo Image with circular background */}
            <div className="w-20 h-20 mx-auto mb-4 bg-green-50 rounded-full flex items-center text-center justify-center overflow-hidden">
              <img
                src={feature.logoImg}
                alt={feature.title}
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl text-center font-ysabeau sm:text-center font-semibold lg:text-[22px] text-gray-800 mb-3 ">
              {feature.title}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-[16px] font-ysabeau text-gray-600 leading-relaxed text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UspSection;
