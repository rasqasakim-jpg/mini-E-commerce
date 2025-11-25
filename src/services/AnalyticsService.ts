import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../utils/LocationPermission';

// Simulasi API call ke server
const sendToAnalyticsServer = async (location: {latitude: number; longitude: number}) => {
  console.log('📊 Mengirim lokasi ke server:', location);
  
  // Simulasi API call
  try {
    // await fetch('https://api.yourapp.com/analytics/location', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(location)
    // });
    
    console.log('✅ Lokasi berhasil dikirim ke server');
    return true;
  } catch (error) {
    console.error('❌ Gagal mengirim lokasi:', error);
    return false;
  }
};

export const sendLocationToServer = async (): Promise<boolean> => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    console.log('❌ Tidak ada izin lokasi untuk analytics');
    return false;
  }

  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const success = await sendToAnalyticsServer(position.coords);
        resolve(success);
      },
      (error) => {
        console.error('Error getting location for analytics:', error);
        resolve(false);
      },
      {
        enableHighAccuracy: false, // Tidak perlu akurat untuk analytics
        timeout: 15000,
        maximumAge: 120000 // ⭐ PENTING: Gunakan cache 2 menit
        
        /* 
        PENJELASAN maximumAge: 
        - Mengurangi beban server: Tidak perlu kirim data lokasi baru setiap kali
        - Menghemat baterai: Tidak aktifkan GPS jika data masih fresh
        - Jika user tidak berpindah lokasi dalam 2 menit, gunakan data yang sama
        - Cocok untuk analytics yang tidak butuh real-time
        */
      }
    );
  });
};