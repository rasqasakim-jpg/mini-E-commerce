import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../utils/LocationPermission';

// Koordinat toko utama (contoh: Monas, Jakarta)
const STORE_LOCATION = {
  latitude: -6.175392,
  longitude: 106.827153
};

// Fungsi hitung jarak antara dua koordinat (Haversine formula)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius bumi dalam km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c * 1000; // Convert ke meter
  return distance;
};

let watchId: number | null = null;

export const startStoreProximityAlert = async (): Promise<void> => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    Alert.alert('Izin Ditolak', 'Tidak bisa mendeteksi promo terdekat tanpa izin lokasi');
    return;
  }

  console.log('🏪 Memulai deteksi promo toko...');

  watchId = Geolocation.watchPosition(
    (position) => {
      const userLocation = position.coords;
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        STORE_LOCATION.latitude,
        STORE_LOCATION.longitude
      );

      console.log(`📏 Jarak ke toko: ${distance.toFixed(0)} meter`);

      if (distance < 100) { // Dalam radius 100 meter
        Alert.alert(
          '🎉 PROMO DEKAT TOKO!',
          `Anda berada ${distance.toFixed(0)} meter dari toko utama. Dapatkan diskon 20%!`,
          [{ text: 'OK', onPress: stopStoreProximityAlert }]
        );
      }
    },
    (error) => {
      console.error('Geofencing error:', error);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 50, // Update setiap 50 meter
      interval: 10000,
    }
  );
};

export const stopStoreProximityAlert = (): void => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null;
    console.log('🛑 Geofencing dihentikan');
  }
};