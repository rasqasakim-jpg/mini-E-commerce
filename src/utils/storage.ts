import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys, CacheData, CartItem, UserData } from '../types/storage';

// ✅ Basic Operations
export const storage = {
  // Simpan data
  set: async <T>(key: StorageKeys, value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  },

  // Ambil data - FIX: Explicit return type
  get: async <T>(key: StorageKeys): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return null;
    }
  },

  // Hapus data
  remove: async (key: StorageKeys): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  },

  // Multi get - untuk load banyak data sekaligus
  multiGet: async (keys: StorageKeys[]): Promise<[StorageKeys, any][]> => {
    try {
      const results = await AsyncStorage.multiGet(keys);
      return results.map(([key, value]) => [key as StorageKeys, value ? JSON.parse(value) : null]);
    } catch (error) {
      console.error('Error in multiGet:', error);
      return [];
    }
  },

  // Multi remove - untuk hapus banyak data sekaligus
  multiRemove: async (keys: StorageKeys[]): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error in multiRemove:', error);
      throw error;
    }
  },

  // Clear all - hati-hati pakai ini!
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

// ✅ Cache Operations dengan TTL
export const cache = {
  // Simpan data dengan TTL
  set: async <T>(key: StorageKeys, value: T, ttl?: number): Promise<void> => {
    const cacheData: CacheData<T> = {
      value,
      timestamp: Date.now(),
      ttl,
    };
    await storage.set(key, cacheData);
  },

  // Ambil data cache, return null jika expired - FIX: Explicit return type
  get: async <T>(key: StorageKeys): Promise<T | null> => {
    const cached = await storage.get<CacheData<T>>(key);
    
    if (!cached) return null;

    // Cek jika TTL ada dan data sudah expired
    if (cached.ttl && Date.now() - cached.timestamp > cached.ttl) {
      await storage.remove(key); // Auto cleanup
      return null;
    }

    return cached.value;
  },

  // Cek apakah cache masih valid
  isValid: (cached: CacheData | null): boolean => {
    if (!cached) return false;
    if (!cached.ttl) return true; // No TTL, always valid
    
    return Date.now() - cached.timestamp < cached.ttl;
  },
};

// ✅ Specific Functions untuk E-Commerce
export const storageHelpers = {
  // Auth token operations
  getAuthToken: (): Promise<string | null> => storage.get<string>('@app:auth_token'),
  setAuthToken: (token: string): Promise<void> => storage.set('@app:auth_token', token),
  removeAuthToken: (): Promise<void> => storage.remove('@app:auth_token'),

  // User data operations
  getUserData: (): Promise<UserData | null> => storage.get<UserData>('@app:user_data'),
  setUserData: (userData: UserData): Promise<void> => storage.set('@app:user_data', userData),
  removeUserData: (): Promise<void> => storage.remove('@app:user_data'),

  // Cart operations - FIX: Explicit type dengan default value
  getCart: async (): Promise<CartItem[]> => {
    const cart = await storage.get<CartItem[]>('@app:cart');
    return cart || [];
  },
  setCart: (cart: CartItem[]): Promise<void> => storage.set('@app:cart', cart),
  
  addToCart: async (item: CartItem): Promise<void> => {
    const currentCart = await storageHelpers.getCart();
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity jika item sudah ada
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      // Tambah item baru
      currentCart.push(item);
    }
    
    await storageHelpers.setCart(currentCart);
  },
  
  removeFromCart: async (itemId: string): Promise<void> => {
    const currentCart = await storageHelpers.getCart();
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    await storageHelpers.setCart(updatedCart);
  },
  
  clearCart: (): Promise<void> => storage.remove('@app:cart'),

  // Theme operations
  getTheme: async (): Promise<'light' | 'dark' | null> => {
    const theme = await storage.get<'light' | 'dark'>('@app:theme');
    return theme;
  },
  setTheme: (theme: 'light' | 'dark'): Promise<void> => storage.set('@app:theme', theme),

  // Categories cache dengan TTL 30 menit
  getCategoriesCache: (): Promise<any> => cache.get('@cache:categories'),
  setCategoriesCache: (categories: any): Promise<void> => 
    cache.set('@cache:categories', categories, 30 * 60 * 1000), // 30 menit

  // Notification status - FIX: Explicit type dengan default value
  getNotificationStatus: async (): Promise<boolean> => {
    const status = await storage.get<boolean>('@app:notification_status');
    return status ?? true; // Default true jika null
  },
  
  setNotificationStatus: (enabled: boolean): Promise<void> => 
    storage.set('@app:notification_status', enabled),
};