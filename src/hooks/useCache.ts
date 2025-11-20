// src/hooks/useCache.ts
import { useState, useCallback } from 'react';
import CacheService from '../services/CacheService';

interface UseCacheReturn<T> {
  // State
  data: T | null;
  isLoading: boolean;
  isCached: boolean;
  
  // Methods
  getCachedData: (key: string) => Promise<T | null>;
  setCachedData: (key: string, data: T, ttl?: number) => Promise<boolean>;
  clearCache: (key?: string) => Promise<void>;
}

export const useCache = <T>(): UseCacheReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCached, setIsCached] = useState(false);

  // ✅ Get data from cache
  const getCachedData = useCallback(async (key: string): Promise<T | null> => {
    try {
      setIsLoading(true);
      const cachedData = await CacheService.get<T>(key);
      
      setData(cachedData);
      setIsCached(cachedData !== null);
      
      return cachedData;
    } catch (error) {
      console.error(`❌ useCache: Failed to get cached data for ${key}`, error);
      setData(null);
      setIsCached(false);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Set data to cache
  const setCachedData = useCallback(async (
    key: string, 
    data: T, 
    ttl: number = 15 * 60 * 1000
  ): Promise<boolean> => {
    try {
      const success = await CacheService.set(key, data, ttl);
      
      if (success) {
        setData(data);
        setIsCached(true);
      }
      
      return success;
    } catch (error) {
      console.error(`❌ useCache: Failed to set cached data for ${key}`, error);
      return false;
    }
  }, []);

  // ✅ Clear cache
  const clearCache = useCallback(async (key?: string): Promise<void> => {
    try {
      if (key) {
        await CacheService.remove(key);
      } else {
        await CacheService.clearAll();
      }
      
      setData(null);
      setIsCached(false);
    } catch (error) {
      console.error('❌ useCache: Failed to clear cache', error);
      throw error;
    }
  }, []);

  return {
    // State
    data,
    isLoading,
    isCached,
    
    // Methods
    getCachedData,
    setCachedData,
    clearCache,
  };
};

// ✅ Specialized hook untuk product cache
export const useProductCache = () => {
  const cache = useCache<any>();

  const getCachedProduct = useCallback(async (productId: string): Promise<any> => {
    const key = `product_detail:${productId}`;
    return await cache.getCachedData(key);
  }, [cache]);

  const cacheProduct = useCallback(async (productId: string, productData: any): Promise<boolean> => {
    const key = `product_detail:${productId}`;
    return await cache.setCachedData(key, productData, 30 * 60 * 1000); // 30 menit
  }, [cache]);

  return {
    ...cache,
    getCachedProduct,
    cacheProduct,
  };
};