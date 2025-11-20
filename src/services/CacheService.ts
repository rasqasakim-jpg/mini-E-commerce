// src/services/CacheService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CacheItem<T> {
  value: T;
  ttl: number; // Time to live in milliseconds
  cachedAt: string; // ISO string
}

class CacheService {
  private readonly PREFIX = '@cache_';

  // ✅ Generate cache key
  private generateKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }

  // ✅ Set data dengan TTL
  async set<T>(key: string, value: T, ttl: number = 15 * 60 * 1000): Promise<boolean> {
    try {
      const cacheKey = this.generateKey(key);
      const cacheItem: CacheItem<T> = {
        value,
        ttl,
        cachedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheItem));
      console.log(`✅ CacheService: Cached ${key} for ${ttl}ms`);
      return true;
    } catch (error) {
      console.error(`❌ CacheService: Failed to cache ${key}`, error);
      return false;
    }
  }

  // ✅ Get data dengan validasi TTL
  async get<T>(key: string): Promise<T | null> {
    try {
      const cacheKey = this.generateKey(key);
      const cached = await AsyncStorage.getItem(cacheKey);

      if (!cached) {
        return null;
      }

      const cacheItem: CacheItem<T> = JSON.parse(cached);
      
      // ✅ SOAL d: Validasi TTL
      const now = new Date().getTime();
      const cachedAt = new Date(cacheItem.cachedAt).getTime();
      const isExpired = now - cachedAt > cacheItem.ttl;

      if (isExpired) {
        console.log(`🔄 CacheService: Cache expired for ${key}, clearing...`);
        await this.remove(key);
        return null;
      }

      console.log(`✅ CacheService: Cache hit for ${key}`);
      return cacheItem.value;
    } catch (error) {
      console.error(`❌ CacheService: Failed to get cache for ${key}`, error);
      
      // ✅ SOAL i: Handle corrupted data
      if (error instanceof SyntaxError) {
        console.log(`🧹 CacheService: Corrupted cache for ${key}, clearing...`);
        await this.remove(key);
      }
      
      return null;
    }
  }

  // ✅ Remove cache item
  async remove(key: string): Promise<void> {
    try {
      const cacheKey = this.generateKey(key);
      await AsyncStorage.removeItem(cacheKey);
      console.log(`✅ CacheService: Removed cache for ${key}`);
    } catch (error) {
      console.error(`❌ CacheService: Failed to remove cache for ${key}`, error);
      throw error;
    }
  }

  // ✅ Clear all cache
  async clearAll(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.PREFIX));
      
      if (cacheKeys.length > 0) {
        await AsyncStorage.multiRemove(cacheKeys);
        console.log(`✅ CacheService: Cleared ${cacheKeys.length} cache items`);
      }
    } catch (error) {
      console.error('❌ CacheService: Failed to clear cache', error);
      throw error;
    }
  }

  // ✅ Check if cache exists and is valid
  async has(key: string): Promise<boolean> {
    const data = await this.get(key);
    return data !== null;
  }

  // ✅ Product-specific cache methods
  async cacheProduct(productId: string, productData: any): Promise<boolean> {
    const key = `product_detail:${productId}`;
    // Cache product untuk 30 menit
    return await this.set(key, productData, 30 * 60 * 1000);
  }

  async getCachedProduct(productId: string): Promise<any> {
    const key = `product_detail:${productId}`;
    return await this.get(key);
  }
}

export default new CacheService();