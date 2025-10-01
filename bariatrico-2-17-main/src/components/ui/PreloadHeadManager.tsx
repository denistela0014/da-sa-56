// PRELOAD HEAD MANAGER
// Injeta <link rel="preload" as="image"> no head para máxima prioridade do browser

import { useEffect } from 'react';
import { getPreloadStrategy } from '@/utils/imagePreloadStrategy';

interface PreloadHeadManagerProps {
  currentPage: number;
}

export const PreloadHeadManager: React.FC<PreloadHeadManagerProps> = ({ 
  currentPage 
}) => {
  useEffect(() => {
    const strategy = getPreloadStrategy(currentPage);
    const preloadLinks: HTMLLinkElement[] = [];
    
    // Criar links de preload para critical + essential
    const priorityImages = [...strategy.critical, ...strategy.essential];
    
    priorityImages.forEach(src => {
      if (src && !document.querySelector(`link[href="${CSS.escape(src)}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        
        // Adicionar ao head
        document.head.appendChild(link);
        preloadLinks.push(link);
        
        if (process.env.NODE_ENV !== 'production') {
          console.log(`🚀 HEAD PRELOAD: ${src}`);
        }
      }
    });
    
    // Cleanup: remove links quando componente desmonta ou página muda
    return () => {
      preloadLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [currentPage]);

  return null; // Componente invisível
};