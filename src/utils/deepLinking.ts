// src/utils/deepLinking.ts (ULTRA SIMPLE VERSION)
import { Linking, Platform, Alert } from 'react-native';

// Simple URL parsing utility untuk React Native
const parseUrl = (url: string): { path: string; params: Record<string, string> } => {
  const result = { path: '', params: {} as Record<string, string> };
  
  try {
    // Handle custom scheme
    if (url.startsWith('ecommerceapp://')) {
      const cleanUrl = url.replace('ecommerceapp://', '');
      const [path, query] = cleanUrl.split('?');
      result.path = '/' + path;
      
      if (query) {
        query.split('&').forEach(pair => {
          const [key, value] = pair.split('=');
          if (key) {
            result.params[key] = value || '';
          }
        });
      }
    }
    // Handle https
    else if (url.startsWith('https://ecommerceapp.com/')) {
      const cleanUrl = url.replace('https://ecommerceapp.com/', '');
      const [path, query] = cleanUrl.split('?');
      result.path = '/' + path;
      
      if (query) {
        query.split('&').forEach(pair => {
          const [key, value] = pair.split('=');
          if (key) {
            result.params[key] = value || '';
          }
        });
      }
    }
  } catch (error) {
    console.error('URL parsing error:', error);
  }
  
  return result;
};

export const deepLinkingUtils = {
  canHandleURL: async (url: string): Promise<boolean> => {
    try {
      return await Linking.canOpenURL(url);
    } catch (error) {
      return false;
    }
  },

  openURL: async (url: string, fallbackUrl?: string): Promise<void> => {
    try {
      const canOpen = await deepLinkingUtils.canHandleURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else if (fallbackUrl) {
        await Linking.openURL(fallbackUrl);
      } else {
        Alert.alert('Error', 'Tidak dapat membuka tautan');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Gagal membuka tautan');
    }
  },

  generateShareableLink: (type: 'product' | 'profile' | 'category', id: string): string => {
    return `https://ecommerceapp.com/${type}/${id}`;
  },

  isValidDeepLink: (url: string): boolean => {
    return url.startsWith('ecommerceapp://') || url.startsWith('https://ecommerceapp.com/');
  },

  extractParams: parseUrl,

  testDeepLinking: async (): Promise<void> => {
    const testUrls = [
      'ecommerceapp://home',
      'ecommerceapp://produk/123', 
      'ecommerceapp://keranjang'
    ];

    console.log('Testing Deep Links...');
    for (const url of testUrls) {
      const isValid = deepLinkingUtils.isValidDeepLink(url);
      const canOpen = await deepLinkingUtils.canHandleURL(url);
      const extracted = deepLinkingUtils.extractParams(url);
      
      console.log(url, { isValid, canOpen, ...extracted });
    }
  },

  extractProductId: (url: string): string | null => {
    const match = url.match(/\/(produk|product)\/([^/?]+)/);
    return match ? match[2] : null;
  },

  extractUserId: (url: string): string | null => {
    const match = url.match(/\/(profil|profile)\/([^/?]+)/);
    return match ? match[2] : null;
  },

  extractCategory: (url: string): string | null => {
    const match = url.match(/\/(kategori|category)\/([^/?]+)/);
    return match ? match[2] : null;
  }
};

export default deepLinkingUtils;