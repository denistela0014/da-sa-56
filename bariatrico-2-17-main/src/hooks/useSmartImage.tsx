import { useState, useEffect, useCallback } from 'react';
import { LazyImage } from '@/components/ui/LazyImage';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SmartImageCache {
  [key: string]: {
    image: HTMLImageElement;
    timestamp: number;
    loadTime: number;
  };
}

interface SmartImageState {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  image: HTMLImageElement | null;
  loadTime: number;
}

// CACHE GLOBAL INTELIGENTE COM EXPIRAÇÃO
let smartCache: SmartImageCache = {};
const CACHE_EXPIRY_TIME = 30 * 60 * 1000; // 30 minutos
const MAX_CACHE_SIZE = 100; // Máximo 100 imagens no cache

// LIMPEZA AUTOMÁTICA DO CACHE
const cleanupCache = () => {
  const now = Date.now();
  const entries = Object.entries(smartCache);
  
  // Remove imagens expiradas
  const validEntries = entries.filter(([_, data]) => 
    now - data.timestamp < CACHE_EXPIRY_TIME
  );
  
  // Se ainda tem muitas imagens, remove as mais antigas
  if (validEntries.length > MAX_CACHE_SIZE) {
    validEntries.sort((a, b) => b[1].timestamp - a[1].timestamp);
    validEntries.splice(MAX_CACHE_SIZE);
  }
  
  // Reconstrói o cache
  smartCache = Object.fromEntries(validEntries);
};

// PRELOAD INTELIGENTE DE IMAGEM
const smartPreloadImage = async (
  src: string, 
  priority: 'critical' | 'essential' | 'high' | 'normal' = 'normal',
  currentPage?: number
): Promise<HTMLImageElement> => {
  const startTime = Date.now();
  
  // CACHE HIT - Retorna imediatamente
  if (smartCache[src]) {
    console.log(`⚡ SMART CACHE HIT: ${src}`);
    return smartCache[src].image;
  }
  
  console.log(`🧠 SMART LOADING [${priority.toUpperCase()}]: ${src}`);
  
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    
    // OTIMIZAÇÕES BASEADAS EM PRIORIDADE
    switch (priority) {
      case 'critical':
        img.fetchPriority = 'high';
        img.decoding = 'sync';
        img.loading = 'eager';
        break;
      case 'essential':
        img.fetchPriority = 'high';
        img.decoding = 'async';
        img.loading = 'eager';
        break;
      case 'high':
        img.fetchPriority = 'auto';
        img.decoding = 'async';
        img.loading = 'lazy';
        break;
      case 'normal':
        img.fetchPriority = 'low';
        img.decoding = 'async';
        img.loading = 'lazy';
        break;
    }
    
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const loadTime = Date.now() - startTime;
      
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        // ADICIONA AO CACHE
        smartCache[src] = {
          image: img,
          timestamp: Date.now(),
          loadTime
        };
        
        if (process.env.NODE_ENV !== 'production') {
          console.log(`✅ SMART LOADED [${priority.toUpperCase()}]: ${src} (${loadTime}ms, ${img.naturalWidth}x${img.naturalHeight})`);
        }
        
        // LIMPEZA PERIÓDICA DO CACHE
        if (Object.keys(smartCache).length % 10 === 0) {
          cleanupCache();
        }
        
        resolve(img);
      } else {
        reject(new Error(`Invalid image dimensions: ${src}`));
      }
    };
    
    img.onerror = (error) => {
      const loadTime = Date.now() - startTime;
      console.error(`❌ SMART FAILED [${priority.toUpperCase()}]: ${src} (${loadTime}ms)`, error);
      reject(new Error(`Failed to load: ${src}`));
    };
    
    img.src = src;
  });
};

// HOOK PRINCIPAL: useSmartImage
export const useSmartImage = (
  src: string, 
  currentPage?: number,
  forcePriority?: 'critical' | 'essential' | 'high' | 'normal'
) => {
  const [state, setState] = useState<SmartImageState>({
    isLoaded: false,
    isLoading: false,
    error: null,
    image: null,
    loadTime: 0
  });
  
  // DETERMINA PRIORIDADE BASEADA NO currentPage
  const priority = forcePriority || 'normal';
  
  const loadImage = useCallback(async () => {
    // SE JÁ ESTÁ NO CACHE, RETORNA IMEDIATAMENTE
    if (smartCache[src]) {
      setState({
        isLoaded: true,
        isLoading: false,
        error: null,
        image: smartCache[src].image,
        loadTime: smartCache[src].loadTime
      });
      return;
    }
    
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const image = await smartPreloadImage(src, priority, currentPage);
      setState({
        isLoaded: true,
        isLoading: false,
        error: null,
        image,
        loadTime: smartCache[src]?.loadTime || 0
      });
    } catch (error) {
      setState({
        isLoaded: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        image: null,
        loadTime: 0
      });
    }
  }, [src, priority, currentPage]);
  
  useEffect(() => {
    if (src) {
      loadImage();
    }
  }, [src, loadImage]);
  
  // FUNÇÃO PARA FORÇAR RELOAD
  const reload = useCallback(() => {
    if (smartCache[src]) {
      delete smartCache[src];
    }
    loadImage();
  }, [src, loadImage]);
  
  return {
    ...state,
    reload,
    priority,
    isCached: !!smartCache[src]
  };
};

// HOOK PARA PRELOAD MÚLTIPLAS IMAGENS
export const useSmartImageBatch = (
  imageUrls: string[],
  currentPage?: number,
  maxConcurrency: number = 6 // LIMITE DE CONCORRÊNCIA ADICIONADO
) => {
  const [batchState, setBatchState] = useState({
    loaded: 0,
    failed: 0,
    loading: true,
    images: {} as { [key: string]: HTMLImageElement }
  });
  
  useEffect(() => {
    if (imageUrls.length === 0) {
      setBatchState({ loaded: 0, failed: 0, loading: false, images: {} });
      return;
    }
    
    const loadBatch = async () => {
      setBatchState(prev => ({ ...prev, loading: true }));
      
      // BATCH COM CONTROLE DE CONCORRÊNCIA
      const loadInBatches = async (urls: string[], batchSize: number) => {
        const results: PromiseSettledResult<HTMLImageElement>[] = [];
        
        for (let i = 0; i < urls.length; i += batchSize) {
          const batch = urls.slice(i, i + batchSize);
          const batchResults = await Promise.allSettled(
            batch.map(url => {
              const priority = 'normal'; // Simplified priority
              return smartPreloadImage(url, priority, currentPage);
            })
          );
          results.push(...batchResults);
        }
        
        return results;
      };
      
      const results = await loadInBatches(imageUrls, maxConcurrency);
      
      let loaded = 0;
      let failed = 0;
      const images: { [key: string]: HTMLImageElement } = {};
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          loaded++;
          images[imageUrls[index]] = result.value;
        } else {
          failed++;
        }
      });
      
      setBatchState({ loaded, failed, loading: false, images });
    };
    
    loadBatch();
  }, [imageUrls.join(','), currentPage, maxConcurrency]);
  
  return batchState;
};

// UTILITÁRIO: Limpar cache manualmente
export const clearSmartImageCache = () => {
  smartCache = {};
  console.log('🧹 Smart image cache cleared');
};

// UTILITÁRIO: Estatísticas do cache
export const getSmartImageCacheStats = () => {
  const entries = Object.entries(smartCache);
  const now = Date.now();
  
  return {
    totalImages: entries.length,
    validImages: entries.filter(([_, data]) => now - data.timestamp < CACHE_EXPIRY_TIME).length,
    expiredImages: entries.filter(([_, data]) => now - data.timestamp >= CACHE_EXPIRY_TIME).length,
    averageLoadTime: entries.reduce((acc, [_, data]) => acc + data.loadTime, 0) / entries.length || 0,
    cacheSize: JSON.stringify(smartCache).length
  };
};