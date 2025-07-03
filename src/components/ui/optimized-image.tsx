
import React from 'react';
import { useLazyLoading } from '../../hooks/use-lazy-loading';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  style,
  loading = 'lazy',
  priority = false
}) => {
  const { imgRef, isLoaded, isInView, handleLoad } = useLazyLoading();

  // For priority images, load immediately
  const shouldLoad = priority || isInView;

  return (
    <div className={`relative ${className}`} style={style}>
      {!isLoaded && shouldLoad && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        ref={imgRef}
        src={shouldLoad ? src : ''}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={style}
        loading={loading}
        onLoad={handleLoad}
        decoding="async"
      />
    </div>
  );
};

export default OptimizedImage;
