// src/hooks/useWishlist.ts
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

interface UseWishlistReturn {
  // State
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  isLoading: boolean;

  // Methods
  loadWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => Promise<void>;
}

export const useWishlist = (): UseWishlistReturn => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 🔹 Load wishlist saat startup
  const loadWishlist = useCallback(async () => {
    try {
      setIsLoading(true);
      const stored = await AsyncStorage.getItem('wishlist_items');
      if (stored) {
        setWishlistItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('❌ Failed to load wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔹 Save wishlist ke storage
  const saveWishlist = async (items: WishlistItem[]) => {
    await AsyncStorage.setItem('wishlist_items', JSON.stringify(items));
  };

  // 🔹 Add
  const addToWishlist = async (productId: string) => {
    const updated = [
      ...wishlistItems,
      { productId, addedAt: new Date().toISOString() },
    ];
    setWishlistItems(updated);
    await saveWishlist(updated);
  };

  // 🔹 Remove
  const removeFromWishlist = async (productId: string) => {
    const updated = wishlistItems.filter(item => item.productId !== productId);
    setWishlistItems(updated);
    await saveWishlist(updated);
  };

  // 🔹 Toggle
  const toggleWishlist = async (productId: string) => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  // 🔹 Check
  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some(item => item.productId === productId);
  };

  // 🔹 Clear
  const clearWishlist = async () => {
    setWishlistItems([]);
    await AsyncStorage.removeItem('wishlist_items');
  };

  // 🔹 Auto load
  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  return {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    isLoading,

    // RETURN FIXED FUNCTIONS
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };
};
