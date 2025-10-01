import React, { useState, useEffect } from 'react';

interface SocialProofCarouselProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  autoplayInterval?: number;
}

export const SocialProofCarousel: React.FC<SocialProofCarouselProps> = ({
  images,
  autoplayInterval = 4000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [images.length, autoplayInterval]);

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-500/20">
      <h3 className="text-center font-semibold text-gray-800 mb-4">
        📱 Resultados reais das nossas alunas
      </h3>
      <div className="relative h-80 overflow-hidden rounded-lg bg-white">
        <div 
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full flex items-center justify-center">
              <img 
                src={image.src}
                alt={image.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
        
        {/* Dots indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};