import * as Keychain from 'react-native-keychain';
import { KeychainService, SecureStorageCredentials } from '../types/secureStorage';

// ✅ SIMPLE VERSION - No custom types
export const secureStorage = {
  // Simpan data securely
  set: async (service: KeychainService, username: string, password: string): Promise<boolean> => {
    try {
      const result = await Keychain.setGenericPassword(username, password, { service });
      console.log(`🔐 Secure storage SET success for: ${service}`);
      return !!result;
    } catch (error) {
      console.error(`❌ Secure storage SET failed for ${service}:`, error);
      throw error;
    }
  },

  // Ambil data securely
  get: async (service: KeychainService): Promise<SecureStorageCredentials | null> => {
    try {
      const credentials = await Keychain.getGenericPassword({ service });
      
      if (credentials && typeof credentials === 'object') {
        console.log(`🔐 Secure storage GET success for: ${service}`);
        return {
          username: credentials.username,
          password: credentials.password,
          service,
        };
      }
      return null;
    } catch (error: any) {
      console.error(`❌ Secure storage GET failed for ${service}:`, error);
      
      if (error.message.includes('access denied') || error.message.includes('security')) {
        console.warn('🛡️ Access denied - security changed, forcing re-login');
        await secureStorage.remove(service);
        throw new Error('ACCESS_DENIED_SECURITY_CHANGED');
      }
      
      throw error;
    }
  },

  // Hapus data securely
  remove: async (service: KeychainService): Promise<boolean> => {
    try {
      const result = await Keychain.resetGenericPassword({ service });
      console.log(`🔐 Secure storage REMOVE success for: ${service}`);
      return result;
    } catch (error) {
      console.error(`❌ Secure storage REMOVE failed for ${service}:`, error);
      throw error;
    }
  },

  // ✅ Get hanya password (untuk token)
  getPassword: async (service: KeychainService): Promise<string | null> => {
    try {
      const credentials = await secureStorage.get(service);
      return credentials ? credentials.password : null;
    } catch (error) {
      throw error;
    }
  },
};

// ✅ Specific Functions untuk E-Commerce
export const secureStorageHelpers = {
  // Auth token operations
  getAuthToken: (): Promise<string | null> => 
    secureStorage.getPassword('@app:auth_token'),
  
  setAuthToken: (token: string): Promise<boolean> => 
    secureStorage.set('@app:auth_token', 'user_auth', token),
  
  removeAuthToken: (): Promise<boolean> => 
    secureStorage.remove('@app:auth_token'),

  // API Key operations
  getApiKey: (): Promise<string | null> => 
    secureStorage.getPassword('@app:api_key'),
  
  setApiKey: (apiKey: string): Promise<boolean> => 
    secureStorage.set('@app:api_key', 'api_client', apiKey),
  
  removeApiKey: (): Promise<boolean> => 
    secureStorage.remove('@app:api_key'),

  // Hybrid Storage Load
  loadSecureData: async (): Promise<{
    authToken: string | null;
    apiKey: string | null;
  }> => {
    try {
      const [authToken, apiKey] = await Promise.all([
        secureStorageHelpers.getAuthToken(),
        secureStorageHelpers.getApiKey(),
      ]);
      return { authToken, apiKey };
    } catch (error) {
      console.error('❌ Hybrid storage load failed:', error);
      throw error;
    }
  },

  // Pembersihan data aman saat logout
  clearAllSecureData: async (): Promise<void> => {
    try {
      await Promise.all([
        secureStorageHelpers.removeAuthToken(),
        secureStorageHelpers.removeApiKey(),
      ]);
      console.log('🔐 All secure data cleared successfully');
    } catch (error) {
      console.error('❌ Failed to clear secure data:', error);
      throw error;
    }
  },
};

// ✅ Tambah di bagian bawah file keychain.ts
export const initializeSecureStorage = async (): Promise<void> => {
  try {
    console.log('🔐 Initializing secure storage...');
    
    // ✅ Initialize API Key jika belum ada
    const existingApiKey = await secureStorageHelpers.getApiKey();
    if (!existingApiKey) {
      // Simpan API Key statis (dalam production, ini dari environment variables)
      const secretApiKey = 'MINI_ECOMMERCE_API_KEY_2024_SECRET';
      await secureStorageHelpers.setApiKey(secretApiKey);
      console.log('🔐 API Key initialized in Keychain');
    } else {
      console.log('🔐 API Key already exists in Keychain');
    }
    
    console.log('🎯 Secure storage initialization completed');
  } catch (error) {
    console.error('❌ Secure storage initialization failed:', error);
    throw error;
  }
};

// ✅ Tambah debug function
export const debugKeychain = async () => {
  try {
    console.log('🔍 Debugging Keychain...');
    
    const authToken = await secureStorageHelpers.getAuthToken();
    const apiKey = await secureStorageHelpers.getApiKey();
    
    console.log('📋 Keychain Status:');
    console.log('  - Auth Token:', authToken ? '✅ Present' : '❌ Missing');
    console.log('  - API Key:', apiKey ? '✅ Present' : '❌ Missing');
    
    if (!apiKey) {
      console.log('🔄 Initializing API Key...');
      await initializeSecureStorage();
    }
    
    return { authToken: !!authToken, apiKey: !!apiKey };
  } catch (error) {
    console.error('❌ Keychain debug failed:', error);
    throw error;
  }
};