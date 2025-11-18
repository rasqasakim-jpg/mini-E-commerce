import axios from 'axios';
import { secureStorageHelpers } from '../utils/keychain';

// ✅ Buat instance axios
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com', // Ganti dengan base URL-mu
  timeout: 10000,
});

// ✅ SOAL e: Request Interceptor dengan API Key dari Keychain
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Ambil API Key dari Keychain
      const apiKey = await secureStorageHelpers.getApiKey();
      
      if (apiKey) {
        config.headers['X-API-Key'] = apiKey;
        console.log('🔐 API Key attached to request');
      } else {
        console.warn('⚠️ No API Key found in Keychain');
        // ✅ Handle case dimana API Key tidak ditemukan
        throw new Error('UNAUTHORIZED_NO_API_KEY');
      }
      
      // Tambah auth token jika ada
      const authToken = await secureStorageHelpers.getAuthToken();
      if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
      
      return config;
    } catch (error: any) {
      console.error('❌ Request interceptor error:', error);
      
      if (error.message === 'UNAUTHORIZED_NO_API_KEY') {
        // Simulasi 401 error
        return Promise.reject({
          response: {
            status: 401,
            data: { message: 'Unauthorized - API Key missing' }
          }
        });
      }
      
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('❌ API Response error:', error.response?.data || error.message);
    
    // Handle unauthorized errors
    if (error.response?.status === 401) {
      console.log('🔐 Unauthorized - mungkin perlu logout');
      // Bisa trigger logout di sini
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;