import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useTheme } from '../contexts/ThemeContext';
import { requestLocationPermission } from '../utils/LocationPermission';

const DeliveryTracker: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Cleanup function - sangat penting!
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
        console.log('🧹 Tracking berhenti (unmount)');
      }
    };
  }, [watchId]);

  const startTracking = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Izin Ditolak', 'Tidak bisa melacak tanpa izin lokasi');
      return;
    }

    console.log('🚚 Memulai tracking kurir...');
    
    const id = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log('📍 Update lokasi kurir:', { latitude, longitude });
        
        // Di real app, kirim update ke server di sini
      },
      (error) => {
        console.error('Tracking error:', error);
        Alert.alert('Error Tracking', error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 20, // Update setiap 20 meter
        interval: 10000,    // Android: update setiap 10 detik
        fastestInterval: 5000, // Android: interval tercepat
      }
    );

    setWatchId(id);
    setIsTracking(true);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
      console.log('⏹️ Tracking dihentikan');
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
        🚚 Tracking Kurir
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title={isTracking ? "Stop Tracking" : "Mulai Tracking"} 
          onPress={isTracking ? stopTracking : startTracking}
          color={isTracking ? "#FF3B30" : "#007AFF"}
        />
      </View>

      {currentLocation && (
        <View style={[styles.locationInfo, theme === 'dark' && styles.locationInfoDark]}>
          <Text style={[styles.locationText, theme === 'dark' && styles.textDark]}>
            📍 Posisi Terkini:
          </Text>
          <Text style={[styles.coords, theme === 'dark' && styles.textSecondaryDark]}>
            Lat: {currentLocation.latitude.toFixed(6)}
          </Text>
          <Text style={[styles.coords, theme === 'dark' && styles.textSecondaryDark]}>
            Long: {currentLocation.longitude.toFixed(6)}
          </Text>
          <Text style={[styles.status, theme === 'dark' && styles.textSecondaryDark]}>
            {isTracking ? '🟢 LIVE TRACKING' : '⏸️ PAUSED'}
          </Text>
        </View>
      )}

      <Text style={[styles.note, theme === 'dark' && styles.textSecondaryDark]}>
        * Tracking otomatis berhenti saat keluar halaman
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    margin: 16,
  },
  containerDark: {
    backgroundColor: '#2D3748',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2D3748',
  },
  buttonContainer: {
    marginBottom: 16,
  },
  locationInfo: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  locationInfoDark: {
    backgroundColor: '#1A202C',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2D3748',
  },
  coords: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#718096',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#718096',
  },
  note: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
    color: '#718096',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default DeliveryTracker;