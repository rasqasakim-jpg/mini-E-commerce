import axios from 'axios';
import { secureStorageHelpers } from '../utils/keychain';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

// ✅ IMPROVED Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Skip API Key untuk endpoint tertentu (misal: login)
      const skipApiKeyEndpoints = ['/auth/login', '/auth/register'];
      const shouldSkipApiKey = skipApiKeyEndpoints.some(endpoint => 
        config.url?.includes(endpoint)
      );

      if (!shouldSkipApiKey) {
        // Ambil API Key dari Keychain
        const apiKey = await secureStorageHelpers.getApiKey();
        
        if (apiKey) {
          config.headers['X-API-Key'] = apiKey;
          console.log('🔐 API Key attached to request:', config.url);
        } else {
          console.warn('⚠️ No API Key found in Keychain for:', config.url);
          // Jangan throw error, biarkan request tetap jalan (untuk development)
          // Dalam production, bisa throw error di sini
        }
      }

      // Tambah auth token jika ada (untuk authenticated requests)
      const authToken = await secureStorageHelpers.getAuthToken();
      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
        console.log('🔐 Auth token attached to request');
      }
      
      return config;
    } catch (error: any) {
      console.error('❌ Request interceptor error:', error);
      // Jangan block request karena API Key issues
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ IMPROVED Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // ✅ Success case
    return response;
  },
  (error) => {
    // ✅ Better error logging
    const errorMessage = error.response?.data?.message || error.message;
    const errorStatus = error.response?.status;
    
    console.error('❌ API Response Error:', {
      url: error.config?.url,
      status: errorStatus,
      message: errorMessage,
    });
    
    // Handle specific error cases
    if (errorStatus === 401) {
      console.log('🔐 Unauthorized - mungkin token expired');
      // Bisa trigger logout di sini jika needed
    }
    
    if (errorStatus === 404) {
      console.log('🔍 Endpoint not found:', error.config?.url);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;