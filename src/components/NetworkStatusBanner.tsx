import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useNetwork } from '../contexts/NetworkContext';

const NetworkStatusBanner: React.FC = () => {
  const { isConnected } = useNetwork();

  if (isConnected) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>
        Koneksi terputus. Menggunakan mode offline.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#E53E3E',
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default NetworkStatusBanner;