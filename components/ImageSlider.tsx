// Enable client-side rendering
'use client';

// Import required dependencies
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Dynamically import Slider component to avoid SSR issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });

// TypeScript interfaces for slider data structure
interface ImageData {
  image: {
    asset: { url: string; _id: string };
  };
  alt: string;
  caption?: string;
  link?: string;
}

interface ImageSliderData {
  title: string;
  images: ImageData[];
}

// Sanity query to fetch slider data
const query = `*[_type == "imageSlider"]{
  title,
  images[]{
    image{asset->{url, _id}},
    alt,
    caption,
    link
  }
}`;

// Arrow button component for slider navigation
const ArrowButton: React.FC<{ onClick?: () => void; direction: 'left' | 'right' }> = React.memo(
  ({ onClick, direction }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'right' ? 'Next Slide' : 'Previous Slide'}
      className={`absolute ${direction === 'right' ? 'right-2 md:right-4 lg:right-6' : 'left-2 md:left-4 lg:left-6'} 
      top-1/2 transform -translate-y-1/2 z-30 p-2 md:p-3 lg:p-4 bg-white/80 hover:bg-white 
      shadow-lg rounded-full transition-all duration-300 ease-in-out hover:scale-110 
      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 backdrop-blur-sm
      hidden md:flex items-center justify-center`}
    >
      {direction === 'right' ?
        <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-900" /> :
        <FaArrowLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-900" />}
    </button>
  )
);
ArrowButton.displayName = 'ArrowButton';

// Custom hook to fetch and manage slider data
const useSliderData = () => {
  const [sliderData, setSliderData] = useState<ImageSliderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch data from Sanity
  const fetchData = useCallback(() => {
    setLoading(true);
    client
      .fetch<ImageSliderData[]>(query)
      .then((data) => {
        if (data && data.length > 0) {
          setSliderData(data[0]);
          setError(null);
        } else {
          setError('No slider data found.');
        }
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
        setError('Failed to load slider data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { sliderData, error, loading, refetch: fetchData };
};

// Main ImageSlider component
const ImageSlider: React.FC = () => {
  const { sliderData, error, loading, refetch } = useSliderData();
  const [aspectRatio, setAspectRatio] = useState<string>('aspect-video');

  // Slider settings configuration
  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
    fade: true,
    cssEase: 'ease-out',
    pauseOnHover: true,
    // Responsive breakpoints configuration
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          arrows: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          autoplaySpeed: 4000,
        }
      }
    ],
    // Custom dots styling and positioning
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 w-full">
        <ul className="flex justify-center items-center gap-2 md:gap-3">{dots}</ul>
      </div>
    ),

    customPaging: () => (
      <button className="w-2 h-2 md:w-3 md:h-3 bg-white/70 hover:bg-white rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"></button>
    ),
  }), []);

  // Loading state UI
  if (loading) {
    return (
      <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg md:text-xl text-gray-700 font-medium">Loading slider...</p>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-6 px-4">
          <p className="text-red-500 text-lg md:text-xl font-medium text-center">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transform hover:scale-105 
            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main slider UI
  return (
    <div className="w-full max-w-[2000px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 mt-3" >
      <div className="relative group">
        <Slider {...settings}>
          {sliderData?.images.map((item) => (

            <div key={item.image.asset._id} className="outline-none">
              <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-lg shadow-lg`}>
                {/* Render clickable image if link exists */}
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <Image
                      src={item.image.asset.url}
                      alt={item.alt || 'Slider Image'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                      className=" h-[300px] md:h-[400px] lg:h-[500px]"
                      priority
                      quality={90}
                      onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                        // Dynamically set aspect ratio based on image dimensions
                        const ratio = naturalWidth / naturalHeight;
                        setAspectRatio(
                          ratio > 1.5 ? 'aspect-video' :
                            ratio < 0.8 ? 'aspect-[3/4]' :
                              'aspect-square'
                        );
                      }}
                    />
                  </a>
                ) : (
                  // Render non-clickable image
                  <Image
                    src={item.image.asset.url}
                    alt={item.alt || 'Slider Image'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    className=" h-[300px] md:h-[400px] lg:h-[566px]"
                    priority
                    quality={90}
                    onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                      // Dynamically set aspect ratio based on image dimensions
                      const ratio = naturalWidth / naturalHeight;
                      setAspectRatio(
                        ratio > 1.5 ? 'aspect-video' :
                          ratio < 0.8 ? 'aspect-[3/4]' :
                            'aspect-square'
                      );
                    }}
                  />
                )}


              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;