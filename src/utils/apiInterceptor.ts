import axios from 'axios';
import { ToastAndroid, Platform } from 'react-native';

// Create axios instance
export const api = axios.create({
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // JANGAN TAMPILKAN ERROR DI DEVELOPMENT MODE
    if (__DEV__) {
      console.log('🔧 Development Mode: API error suppressed');
      console.log('Error details:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.message
      });
    } else {
      // Production error handling
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            console.error('Bad Request:', data);
            return Promise.reject({ type: 'VALIDATION_ERROR', errors: data.errors });
          case 401:
            console.error('Unauthorized');
            if (Platform.OS === 'android') {
              ToastAndroid.show('Sesi telah berakhir, silakan login kembali', ToastAndroid.LONG);
            }
            break;
          case 404:
            console.error('Not Found:', error.config.url);
            break;
          case 500:
            console.error('Internal Server Error');
            if (Platform.OS === 'android') {
              ToastAndroid.show('Server mengalami masalah, coba lagi nanti', ToastAndroid.LONG);
            }
            break;
          default:
            console.error(`HTTP Error ${status}:`, data);
        }
      } else if (error.request) {
        // Network error - hanya show di production
        console.error('Network Error:', error.message);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Koneksi jaringan bermasalah', ToastAndroid.LONG);
        }
      } else {
        console.error('Error:', error.message);
      }
    }

    return Promise.reject(error);
  }
);

// Helper function untuk development
export const simulateApiCall = (data: any, delay = 1000): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data, status: 200 });
    }, delay);
  });
};

export default api;