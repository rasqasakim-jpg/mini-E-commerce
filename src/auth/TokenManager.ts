// src/auth/TokenManager.ts
import SecureStorage from '../services/SecureStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiredAt: Date;
}

class TokenManager {
  private readonly EXPIRY_BUFFER = 5 * 60 * 1000; // 5 menit sebelum expiry

  // ✅ Simpan token dengan expiry handling
  async saveTokens(tokens: AuthTokens): Promise<boolean> {
    try {
      // Simpan access token + expiry di Secure Storage
      const secureSuccess = await SecureStorage.setTokens(
        tokens.accessToken,
        tokens.expiredAt
      );

      if (!secureSuccess) {
        throw new Error('Failed to save tokens to secure storage');
      }

      console.log('✅ TokenManager: Tokens saved successfully');
      return true;
    } catch (error) {
      console.error('❌ TokenManager: Failed to save tokens', error);
      return false;
    }
  }

  // ✅ Validasi token expiry
  async validateToken(): Promise<boolean> {
    try {
      const isValid = await SecureStorage.isTokenValid();
      
      if (!isValid) {
        console.log('🔄 TokenManager: Token expired, clearing...');
        await this.clearTokens();
      }
      
      return isValid;
    } catch (error) {
      console.error('❌ TokenManager: Failed to validate token', error);
      await this.clearTokens();
      return false;
    }
  }

  // ✅ Dapatkan access token yang valid
  async getValidAccessToken(): Promise<string | null> {
    try {
      const isValid = await this.validateToken();
      
      if (!isValid) {
        return null;
      }

      return await SecureStorage.getAccessToken();
    } catch (error) {
      console.error('❌ TokenManager: Failed to get valid token', error);
      return null;
    }
  }

  // ✅ Clear semua tokens (logout)
  async clearTokens(): Promise<void> {
    try {
      // Hapus dari Secure Storage
      await SecureStorage.clearTokens();
      
      // Hapus data user dari AsyncStorage
      await AsyncStorage.multiRemove(['user_data', 'wishlist_ids']);
      
      console.log('✅ TokenManager: All tokens cleared');
    } catch (error) {
      console.error('❌ TokenManager: Failed to clear tokens', error);
      throw error;
    }
  }

  // ✅ Cek status autentikasi
  async getAuthStatus(): Promise<{
    isAuthenticated: boolean;
    hasValidToken: boolean;
  }> {
    try {
      const hasValidToken = await this.validateToken();
      const userData = await AsyncStorage.getItem('user_data');
      
      return {
        isAuthenticated: hasValidToken && !!userData,
        hasValidToken,
      };
    } catch (error) {
      console.error('❌ TokenManager: Failed to get auth status', error);
      return {
        isAuthenticated: false,
        hasValidToken: false,
      };
    }
  }
}

export default new TokenManager();