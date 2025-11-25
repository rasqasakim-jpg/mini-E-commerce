import { PermissionsAndroid, Platform, Alert } from 'react-native';

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izin Akses Lokasi',
          message: 'Kami butuh lokasi Anda untuk menampilkan toko terdekat secara akurat.',
          buttonPositive: 'Setujui',
          buttonNegative: 'Tolak',
          buttonNeutral: 'Tanya Nanti',
        }
      );
      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('✅ Izin lokasi disetujui');
        return true;
      } else {
        console.log('❌ Izin lokasi ditolak');
        return false;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }
  
  // Untuk iOS, izin diatur via Info.plist
  return true;
};