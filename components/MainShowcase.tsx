'use client';

import React from 'react';
import ImageSlider from './ImageSlider';
import BlackFridayBanner from './BlackFridayBanner';


const MainShowcase: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-start w-full px-4 md:px-8 lg:px-12 mt-6 gap-4">
      {/* Image Slider - 70% width */}


      <div className="w-full md:w-7/10 lg:w-7/10">
        <ImageSlider />
      </div>
      
      {/* Black Friday Banner - 30% width */}
      <div className="w-full md:w-3/10 lg:w-3/10">
        <BlackFridayBanner />
      </div>
    </div>
  );
};

export default MainShowcase;
