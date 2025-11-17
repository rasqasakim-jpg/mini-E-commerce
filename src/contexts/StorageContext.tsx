import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthToken, useCart, useCache } from '../hooks/useAsyncStorage';
import { storage } from '../utils/storage';
import { StorageKeys } from '../types/storage';

interface StorageContextType {
  // Auth
  authToken: ReturnType<typeof useAuthToken>;
  
  // Cart
  cart: ReturnType<typeof useCart>;
  
  // Cache
  categoriesCache: ReturnType<typeof useCache>;
  
  // Multi operations
  loadAppData: () => Promise<void>;
  clearAllData: () => Promise<void>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authToken = useAuthToken();
  const cart = useCart();
  const categoriesCache = useCache('@cache:categories');

  // ✅ Multi load untuk optimasi startup
  const loadAppData = async () => {
    try {
      // Load multiple data sekaligus
      const results = await storage.multiGet([
        '@app:auth_token',
        '@app:theme',
        '@app:notification_status',
        '@app:cart',
      ]);

      console.log('Multi load results:', results);
      // Data akan di-handle oleh masing-masing hook
    } catch (error) {
      console.error('Error in multi load:', error);
    }
  };

  // ✅ Clear all data (untuk debugging)
  const clearAllData = async () => {
    try {
      await storage.clear();
      // Refresh semua hook
      authToken.refresh();
      cart.refresh();
      categoriesCache.refresh();
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  };

  const value: StorageContextType = {
    authToken,
    cart,
    categoriesCache,
    loadAppData,
    clearAllData,
  };

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};