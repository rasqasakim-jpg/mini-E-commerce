import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../utils/LocationPermission';

export const getCurrentLocationForShipping = async (): Promise<{latitude: number, longitude: number} | null> => {
  const hasPermission = await requestLocationPermission();
  
  if (!hasPermission) {
    Alert.alert('Izin Ditolak', 'Tidak bisa menghitung ongkir tanpa izin lokasi');
    return null;
  }

  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('📍 Lokasi berhasil didapatkan untuk ongkir:', position.coords);
        resolve(position.coords);
      },
      (error) => {
        console.error('Error getting location:', error);
        
        if (error.code === 3) { // TIMEOUT error code
          Alert.alert('GPS Timeout', 'Periksa koneksi GPS Anda');
        } else {
          Alert.alert('Error Lokasi', `Gagal mendapatkan lokasi: ${error.message}`);
        }
        resolve(null);
      },
      {
        enableHighAccuracy: true,    // Akurat untuk perhitungan ongkir
        timeout: 10000,              // 10 detik batas waktu
        maximumAge: 60000            // Gunakan cache jika < 1 menit
      }
    );
  });
};

export const calculateShippingCost = async (totalAmount: number): Promise<number> => {
  const location = await getCurrentLocationForShipping();
  
  if (!location) {
    // Fallback: gunakan ongkir standar jika lokasi tidak tersedia
    return totalAmount > 500000 ? 0 : 15000;
  }

  // Simulasi perhitungan ongkir berdasarkan lokasi
  // Di real app, ini akan hit API shipping service
  const baseCost = 15000;
  const freeShippingThreshold = 500000;
  
  return totalAmount > freeShippingThreshold ? 0 : baseCost;
};