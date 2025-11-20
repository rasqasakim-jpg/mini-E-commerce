// src/utils/errorHandling.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export class StorageError extends Error {
  constructor(
    message: string,
    public key?: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public status?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

// ✅ Handle corrupted storage data
export const handleCorruptedStorage = async (key: string, error: any): Promise<void> => {
  console.error(`🧹 Handling corrupted storage for key: ${key}`, error);
  
  try {
    // Hapus data yang corrupt
    await AsyncStorage.removeItem(key);
    console.log(`✅ Removed corrupted data for key: ${key}`);
    
    // Bisa tambahkan logic untuk recover data default di sini
  } catch (cleanupError) {
    console.error(`❌ Failed to clean up corrupted data for key: ${key}`, cleanupError);
    throw new StorageError(
      `Failed to clean up corrupted data for ${key}`,
      key,
      cleanupError
    );
  }
};

// ✅ Safe JSON parsing dengan error handling
export const safeJsonParse = <T>(data: string | null, key?: string): T | null => {
  if (!data) return null;
  
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`❌ Failed to parse JSON for key: ${key}`, error);
    
    if (key) {
      // Auto-cleanup corrupted data
      handleCorruptedStorage(key, error).catch(console.error);
    }
    
    return null;
  }
};

// ✅ Safe AsyncStorage get dengan error handling
export const safeAsyncStorageGet = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return safeJsonParse<T>(data, key);
  } catch (error) {
    console.error(`❌ safeAsyncStorageGet failed for key: ${key}`, error);
    
    if (error instanceof SyntaxError) {
      await handleCorruptedStorage(key, error);
    }
    
    return null;
  }
};

// ✅ Safe AsyncStorage multiGet dengan error handling
export const safeAsyncStorageMultiGet = async (
  keys: string[]
): Promise<[string, any][]> => {
  try {
    const keyValuePairs = await AsyncStorage.multiGet(keys);
    
    return keyValuePairs.map(([key, value]) => {
      try {
        return [key, value ? JSON.parse(value) : null];
      } catch (parseError) {
        console.error(`❌ Failed to parse value for key: ${key}`, parseError);
        
        // Handle corrupted data untuk key ini
        handleCorruptedStorage(key, parseError).catch(console.error);
        
        return [key, null];
      }
    });
  } catch (error) {
    console.error('❌ safeAsyncStorageMultiGet failed', error);
    throw new StorageError('Failed to get multiple storage items', undefined, error);
  }
};

// ✅ Show user-friendly error messages
export const showErrorAlert = (error: any, fallbackMessage?: string): void => {
  let message = fallbackMessage || 'Terjadi kesalahan';
  
  if (error instanceof StorageError) {
    message = 'Terjadi masalah dengan penyimpanan data';
  } else if (error instanceof NetworkError) {
    message = 'Gagal terhubung ke server. Periksa koneksi internet Anda.';
  } else if (error.message) {
    message = error.message;
  }
  
  Alert.alert('Error', message, [{ text: 'OK' }]);
};

// ✅ Check if error is due to storage quota exceeded
export const isStorageQuotaError = (error: any): boolean => {
  return (
    error?.message?.includes('quota') ||
    error?.message?.includes('storage') ||
    error?.code === 'QUOTA_EXCEEDED'
  );
};

// ✅ Handle storage quota exceeded
export const handleStorageQuotaExceeded = async (): Promise<void> => {
  try {
    // Clear non-essential data
    const allKeys = await AsyncStorage.getAllKeys();
    const cacheKeys = allKeys.filter(key => key.startsWith('@cache_'));
    
    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
      console.log(`🧹 Cleared ${cacheKeys.length} cache items due to quota exceeded`);
    }
    
    Alert.alert(
      'Penyimpanan Penuh',
      'Beberapa data cache telah dibersihkan untuk menghemat ruang penyimpanan.',
      [{ text: 'OK' }]
    );
  } catch (error) {
    console.error('❌ Failed to handle storage quota exceeded', error);
    throw error;
  }
};