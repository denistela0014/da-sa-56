// SISTEMA INVISÍVEL DE CACHE DE IMAGENS
// Preload transparente e eficiente que nunca bloqueia a UI

import { useState, useEffect, useCallback, useRef } from 'react';
import { getPreloadStrategy } from '@/utils/imagePreloadStrategy';
import { detectUserFlow } from '@/utils/userFlowDetection';

interface CachedImage {
  image: HTMLImageElement;
  timestamp: number;
  loadTime: number;
}

interface CacheStats {
  total: number;
  loaded: number;
  failed: number;
  memoryUsage: number;
}

// CACHE GLOBAL SIMPLES COM MAP
const imageCache = new Map<string, CachedImage>();
const loadingPromises = new Map<string, Promise<HTMLImageElement>>();
const CACHE_MAX_SIZE = 120; // AUMENTADO de 50 para 120
const CACHE_EXPIRY = 45 * 60 * 1000; // AUMENTADO de 15 para 45 minutos

// PRELOAD INDIVIDUAL OTIMIZADO COM TRATAMENTO DE ERRO ROBUSTO
const preloadImage = async (src: string, priority: 'critical' | 'essential' | 'high' | 'normal' = 'normal'): Promise<HTMLImageElement | null> => {
  try {
    // Cache hit - retorna imediatamente
    if (imageCache.has(src)) {
      const cached = imageCache.get(src)!;
      // Atualiza timestamp para LRU
      imageCache.set(src, { ...cached, timestamp: Date.now() });
      return cached.image;
    }
    
    // Se já está carregando, retorna a promise existente
    if (loadingPromises.has(src)) {
      return loadingPromises.get(src)! as Promise<HTMLImageElement>;
    }
    
    const startTime = Date.now();
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      
      // Otimizações baseadas em prioridade
      if (priority === 'critical' || priority === 'essential') {
        img.fetchPriority = 'high';
        img.loading = 'eager';
      } else {
        img.fetchPriority = 'low';
        img.loading = 'lazy';
      }
      
      img.decoding = 'async';
      
      // CORS apenas para assets externos (não lovable-uploads)
      if (!src.includes('/lovable-uploads/') && !src.startsWith('/src/')) {
        img.crossOrigin = 'anonymous';
      }
      
      img.onload = () => {
        const loadTime = Date.now() - startTime;
        
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          // Adiciona ao cache
          imageCache.set(src, {
            image: img,
            timestamp: Date.now(),
            loadTime
          });
          
          // Limpeza do cache se necessário
          cleanupCache();
          
          resolve(img);
        } else {
          reject(new Error(`Invalid image: ${src}`));
        }
      };
      
      img.onerror = (error) => {
        // Log warning mas não quebra o sistema
        console.warn(`Failed to preload image: ${src}`, error);
        
        // Track error para monitoramento (opcional)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'image_load_error', {
            src: src,
            priority: priority
          });
        }
        
        reject(new Error(`Failed to load: ${src}`));
      };
      
      img.src = src;
    });
    
    loadingPromises.set(src, promise);
    
    // Remove da lista de loading quando completar
    promise.finally(() => {
      loadingPromises.delete(src);
    });
    
    return promise;
  } catch (error) {
    console.warn(`Error setting up preload for ${src}:`, error);
    return null; // Return null instead of throwing
  }
};

// LIMPEZA INTELIGENTE DO CACHE
const cleanupCache = () => {
  if (imageCache.size <= CACHE_MAX_SIZE) return;
  
  const now = Date.now();
  const entries = Array.from(imageCache.entries());
  
  // Remove imagens expiradas primeiro
  const validEntries = entries.filter(([_, data]) => 
    now - data.timestamp < CACHE_EXPIRY
  );
  
  // Se ainda tem muitas, remove as mais antigas (LRU)
  if (validEntries.length > CACHE_MAX_SIZE) {
    validEntries.sort((a, b) => b[1].timestamp - a[1].timestamp);
    validEntries.splice(CACHE_MAX_SIZE);
  }
  
  // Reconstrói o cache
  imageCache.clear();
  validEntries.forEach(([src, data]) => {
    imageCache.set(src, data);
  });
};

// HOOK PRINCIPAL: Sistema Invisível de Cache
export const useInvisibleImageCache = (currentPage: number) => {
  const [stats, setStats] = useState<CacheStats>({
    total: 0,
    loaded: 0,
    failed: 0,
    memoryUsage: 0
  });
  
  const backgroundPreloadRef = useRef<NodeJS.Timeout>();
  const userFlow = detectUserFlow();
  
  // PRELOAD ESCALONADO E INVISÍVEL
  const startBackgroundPreload = useCallback(async () => {
    const strategy = getPreloadStrategy(currentPage);
    
    // FASE 1: CRÍTICO - Imediato (0ms)
    if (strategy.critical.length > 0) {
      Promise.allSettled(
        strategy.critical.map(src => preloadImage(src, 'critical'))
      );
    }
    
    // FASE 2: ESSENCIAL - Próximo tick (imediato)
    Promise.resolve().then(() => {
      if (strategy.essential.length > 0) {
        Promise.allSettled(
          strategy.essential.map(src => preloadImage(src, 'essential'))
        );
      }
    });
    
    // FASE 3: ALTA - 1200ms (REDUZIDO)
    setTimeout(() => {
      if (strategy.high.length > 0) {
        Promise.allSettled(
          strategy.high.map(src => preloadImage(src, 'high'))
        );
      }
    }, 1200);
    
    // FASE 4: NORMAL - 5 segundos ou requestIdleCallback
    const scheduleNormalPreload = () => {
      if (strategy.normal.length > 0) {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            Promise.allSettled(
              strategy.normal.map(src => preloadImage(src, 'normal'))
            );
          });
        } else {
          setTimeout(() => {
            Promise.allSettled(
              strategy.normal.map(src => preloadImage(src, 'normal'))
            );
          }, 5000);
        }
      }
    };
    
    setTimeout(scheduleNormalPreload, 5000);
  }, [currentPage]);
  
  // Inicia preload quando página muda
  useEffect(() => {
    startBackgroundPreload();
    
    // Limpa timeout anterior
    return () => {
      if (backgroundPreloadRef.current) {
        clearTimeout(backgroundPreloadRef.current);
      }
    };
  }, [startBackgroundPreload]);
  
  // Atualiza estatísticas periodicamente
  useEffect(() => {
    const updateStats = () => {
      setStats({
        total: imageCache.size,
        loaded: imageCache.size,
        failed: 0, // Simplificado por enquanto
        memoryUsage: imageCache.size * 100 // Estimativa em KB
      });
    };
    
    updateStats();
    const interval = setInterval(updateStats, 2000);
    
    return () => clearInterval(interval);
  }, [currentPage]);
  
  return {
    stats,
    userFlow,
    isImageCached: (src: string) => imageCache.has(src),
    getCachedImage: (src: string) => imageCache.get(src)?.image || null,
    preloadImage: (src: string) => preloadImage(src, 'high'),
    clearCache: () => {
      imageCache.clear();
      loadingPromises.clear();
    }
  };
};

// HOOK SIMPLES: Verificar se imagem está no cache
export const useImageCache = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(imageCache.has(src));
  
  useEffect(() => {
    const checkCache = () => {
      setIsLoaded(imageCache.has(src));
    };
    
    checkCache();
    
    // Se não está no cache, tenta preload em background
    if (!imageCache.has(src)) {
      preloadImage(src, 'normal').then(() => {
        setIsLoaded(true);
      }).catch(() => {
        setIsLoaded(false);
      });
    }
    
    const interval = setInterval(checkCache, 1000);
    return () => clearInterval(interval);
  }, [src]);
  
  return {
    isLoaded,
    cachedImage: imageCache.get(src)?.image || null
  };
};