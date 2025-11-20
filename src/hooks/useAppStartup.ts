// src/hooks/useAppStartup.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenManager from '../auth/TokenManager';
import { useWishlist } from './useWishlist';
import { safeAsyncStorageMultiGet } from '../utils/errorHandling';

export interface AppStartupState {
  isAppReady: boolean;
  startupError: string | null;
  startupProgress: number;
}

export const useAppStartup = (): AppStartupState => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [startupError, setStartupError] = useState<string | null>(null);
  const [startupProgress, setStartupProgress] = useState(0);
  
  const { loadWishlist } = useWishlist();

  // ✅ SOAL g: Load semua data startup secara paralel
  const initializeApp = async (): Promise<void> => {
    try {
      console.log('🚀 Starting app initialization...');
      setStartupProgress(10);

      // ✅ Phase 1: Load authentication status
      const authStatus = await TokenManager.getAuthStatus();
      setStartupProgress(30);
      console.log('✅ Auth status loaded:', authStatus);

      // ✅ Phase 2: Load essential data secara paralel
      const essentialData = await Promise.allSettled([
        // Load wishlist
        loadWishlist(),
        
        // Load user preferences
        safeAsyncStorageMultiGet(['user_preferences', 'app_settings']),
        
        // Load cart data jika ada
        AsyncStorage.getItem('cart_items').catch(() => null),
      ]);
      
      setStartupProgress(70);
      console.log('✅ Essential data loaded');

      // ✅ Phase 3: Load cached data (non-blocking)
      const cacheKeys = await AsyncStorage.getAllKeys();
      const hasCachedData = cacheKeys.some(key => key.startsWith('@cache_'));
      
      if (hasCachedData) {
        console.log('✅ Cache data detected');
      }

      setStartupProgress(100);
      
      // Tunggu sebentar untuk smooth UX
      await new Promise<void>(res => setTimeout(res, 500))
      
      setIsAppReady(true);
      console.log('🎉 App initialization completed successfully');
      
    } catch (error) {
      console.error('❌ App initialization failed:', error);
      setStartupError(error instanceof Error ? error.message : 'Unknown error');
      
      // Tetap lanjut meski ada error (graceful degradation)
      setIsAppReady(true);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return {
    isAppReady,
    startupError,
    startupProgress,
  };
};