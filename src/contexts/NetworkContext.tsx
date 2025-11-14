import React, { createContext, useContext, useState, useEffect } from 'react';
import { ToastAndroid, Platform } from 'react-native';

// Import NetInfo dengan cara yang kompatibel
import NetInfo from '@react-native-community/netinfo';

interface NetworkContextType {
  isInternetReachable: boolean;
  isConnected: boolean;
}

const NetworkContext = createContext<NetworkContextType>({
  isInternetReachable: true,
  isConnected: true,
});

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [isInternetReachable, setIsInternetReachable] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? false;
      const reachable = state.isInternetReachable ?? true;

      setIsConnected(connected);
      setIsInternetReachable(reachable);

      // Show toast notifications for connection changes
      if (!connected && Platform.OS === 'android') {
        ToastAndroid.show(
          'Koneksi terputus. Menggunakan mode offline.',
          ToastAndroid.LONG
        );
      } else if (connected && !isConnected) {
        console.log('Koneksi pulih. Melanjutkan operasi.');
        if (Platform.OS === 'android') {
          ToastAndroid.show('Koneksi pulih.', ToastAndroid.SHORT);
        }
      }
    });

    return () => unsubscribe();
  }, [isConnected]);

  return (
    <NetworkContext.Provider value={{ isInternetReachable, isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};