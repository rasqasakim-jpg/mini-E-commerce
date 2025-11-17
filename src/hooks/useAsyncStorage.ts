import { useState, useEffect, useCallback } from 'react';
import { storage, storageHelpers, cache } from '../utils/storage';
import { StorageKeys, CartItem, UserData, isCartItemArray, isUserData } from '../types/storage';

// ✅ Hook untuk auth token
export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const savedToken = await storageHelpers.getAuthToken();
      setToken(savedToken);
    } catch (error) {
      console.error('Error loading auth token:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToken = async (newToken: string) => {
    try {
      await storageHelpers.setAuthToken(newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Error saving auth token:', error);
      throw error;
    }
  };

  const removeToken = async () => {
    try {
      await storageHelpers.removeAuthToken();
      setToken(null);
    } catch (error) {
      console.error('Error removing auth token:', error);
      throw error;
    }
  };

  return { token, loading, saveToken, removeToken, refresh: loadToken };
};

// ✅ Hook untuk cart dengan type safety
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await storageHelpers.getCart();
      
      // Type safety check
      if (isCartItemArray(savedCart)) {
        setCart(savedCart);
      } else {
        console.warn('Invalid cart data found, resetting cart');
        await storageHelpers.setCart([]);
        setCart([]);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: CartItem) => {
    try {
      await storageHelpers.addToCart(item);
      await loadCart(); // Reload cart untuk sync state
    } catch (error: any) {
      console.error('Error adding item to cart:', error);
      
      // Handle quota exceeded error
      if (error?.message?.includes('quota')) {
        throw new Error('Penyimpanan penuh. Silakan hapus beberapa item dari keranjang.');
      }
      throw error;
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await storageHelpers.removeFromCart(itemId);
      await loadCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const currentCart = await storageHelpers.getCart();
      const updatedCart = currentCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      await storageHelpers.setCart(updatedCart);
      await loadCart();
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await storageHelpers.clearCart();
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  return {
    cart,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refresh: loadCart,
    itemCount: cart.reduce((total, item) => total + item.quantity, 0),
    totalPrice: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
  };
};

// ✅ Hook untuk caching dengan TTL
export const useCache = <T>(key: StorageKeys, ttl?: number) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFromCache = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cachedData = await cache.get<T>(key);
      setData(cachedData);
      return cachedData;
    } catch (err) {
      const errorMsg = `Error loading cache for ${key}: ${err}`;
      setError(errorMsg);
      console.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [key]);

  const saveToCache = useCallback(async (value: T) => {
    try {
      await cache.set(key, value, ttl);
      setData(value);
      setError(null);
    } catch (err) {
      const errorMsg = `Error saving cache for ${key}: ${err}`;
      setError(errorMsg);
      console.error(errorMsg);
      throw err;
    }
  }, [key, ttl]);

  const removeFromCache = useCallback(async () => {
    try {
      await storage.remove(key);
      setData(null);
      setError(null);
    } catch (err) {
      const errorMsg = `Error removing cache for ${key}: ${err}`;
      setError(errorMsg);
      console.error(errorMsg);
      throw err;
    }
  }, [key]);

  useEffect(() => {
    loadFromCache();
  }, [loadFromCache]);

  return {
    data,
    loading,
    error,
    refresh: loadFromCache,
    save: saveToCache,
    remove: removeFromCache,
  };
};