import axios from 'axios';

// ✅ SOAL 18: Axios Instance dengan Global Configuration
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// ✅ SOAL 18: Request Interceptor untuk Custom Header
apiClient.interceptors.request.use(
  (config) => {
    // Tambah custom header ke setiap request
    config.headers['X-Client-Platform'] = 'React-Native';
    
    console.log(`🔄 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ SOAL 19: Response Interceptor untuk Data Transformasi
apiClient.interceptors.response.use(
  (response) => {
    // Transform response data jika status 200
    if (response.status === 200) {
      console.log('✅ Request successful:', response.config.url);
      
      // Jika response memiliki struktur khusus, transform di sini
      if (response.data && typeof response.data === 'object') {
        // Tambah timestamp untuk tracking
        response.data._timestamp = new Date().toISOString();
      }
    }
    return response;
  },
  (error) => {
    console.log('❌ Request failed:', error.message);
    return Promise.reject(error);
  }
);

export default apiClient;