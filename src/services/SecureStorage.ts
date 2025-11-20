// src/services/SecureStorage.ts
import * as Keychain from 'react-native-keychain';

export interface SecureStorageTokens {
  accessToken: string;
  expiredAt: string; // ISO string
}

class SecureStorageService {
  private readonly TOKEN_KEY = 'auth_tokens';

  // ✅ Simpan token dan expiry ke Secure Storage
  async setTokens(accessToken: string, expiredAt: Date): Promise<boolean> {
    try {
      const tokens: SecureStorageTokens = {
        accessToken,
        expiredAt: expiredAt.toISOString(),
      };

      const result = await Keychain.setGenericPassword(
        this.TOKEN_KEY,
        JSON.stringify(tokens),
        {
          service: this.TOKEN_KEY,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        }
      );

      return !!result;
    } catch (error) {
      console.error('❌ SecureStorage: Failed to save tokens', error);
      return false;
    }
  }

  // ✅ Ambil token dari Secure Storage
  async getTokens(): Promise<SecureStorageTokens | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: this.TOKEN_KEY,
      });

      if (credentials && credentials.password) {
        return JSON.parse(credentials.password) as SecureStorageTokens;
      }

      return null;
    } catch (error) {
      console.error('❌ SecureStorage: Failed to get tokens', error);
      return null;
    }
  }

  // ✅ Hapus token (logout)
  async clearTokens(): Promise<boolean> {
    try {
      const result = await Keychain.resetGenericPassword({
        service: this.TOKEN_KEY,
      });
      return result;
    } catch (error) {
      console.error('❌ SecureStorage: Failed to clear tokens', error);
      return false;
    }
  }

  // ✅ Cek apakah token masih valid
  async isTokenValid(): Promise<boolean> {
    try {
      const tokens = await this.getTokens();
      
      if (!tokens) return false;

      const now = new Date();
      const expiredAt = new Date(tokens.expiredAt);
      
      return now < expiredAt;
    } catch (error) {
      console.error('❌ SecureStorage: Failed to validate token', error);
      return false;
    }
  }

  // ✅ Dapatkan access token saja
  async getAccessToken(): Promise<string | null> {
    const tokens = await this.getTokens();
    return tokens?.accessToken || null;
  }
}

export default new SecureStorageService();