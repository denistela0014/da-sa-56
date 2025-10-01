// COMPONENTE SIMPLIFICADO DE IMAGEM
// Renderização instantânea com fallback transparente

import React, { useState, useEffect } from 'react';
import { useImageCache } from '@/hooks/useInvisibleImageCache';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  [key: string]: any; // Para outras props HTML
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
  onLoad,
  onError,
  priority = false,
  ...props
}) => {
  const { isLoaded, cachedImage } = useImageCache(src);
  const [error, setError] = useState(false);
  const [displaySrc, setDisplaySrc] = useState(src);
  
  // ESTRATÉGIA: Sempre renderiza imagem, cache é transparente
  useEffect(() => {
    // Se tem imagem no cache, usa ela
    if (isLoaded && cachedImage) {
      setDisplaySrc(cachedImage.src);
      onLoad?.();
    } else {
      // Senão, usa src normal - preload acontece em background
      setDisplaySrc(src);
    }
  }, [src, isLoaded, cachedImage, onLoad]);
  
  const handleError = () => {
    setError(true);
    
    // Tenta fallback se disponível
    if (fallbackSrc && displaySrc !== fallbackSrc) {
      setDisplaySrc(fallbackSrc);
      setError(false);
    } else {
      onError?.();
    }
  };
  
  const handleLoad = () => {
    setError(false);
    onLoad?.();
  };
  
  // RENDERIZAÇÃO SEMPRE INSTANTÂNEA
  return (
    <img
      src={displaySrc}
      alt={alt}
      className={cn(
        "transition-opacity duration-200",
        error && "opacity-50", // Feedback visual sutil para erros
        className
      )}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
};

// VARIAÇÃO: Imagem com container responsivo
export const ResponsiveLazyImage: React.FC<LazyImageProps & {
  aspectRatio?: string;
  containerClassName?: string;
}> = ({
  aspectRatio = "aspect-video",
  containerClassName,
  className,
  ...props
}) => {
  return (
    <div className={cn("relative overflow-hidden", aspectRatio, containerClassName)}>
      <LazyImage
        className={cn("absolute inset-0 w-full h-full object-cover", className)}
        {...props}
      />
    </div>
  );
};

// VARIAÇÃO: Imagem de perfil com fallback
export const ProfileLazyImage: React.FC<LazyImageProps & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({
  size = 'md',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  
  return (
    <LazyImage
      className={cn(
        "rounded-full object-cover",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};