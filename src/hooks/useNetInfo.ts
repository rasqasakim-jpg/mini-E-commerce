import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

// ✅ ALTERNATIF 2: Dengan comprehensive error handling
export const useNetInfo = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [connectionType, setConnectionType] = useState<string>('unknown');
  const [isInternetReachable, setIsInternetReachable] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      try {
        // ✅ Safe handling untuk semua possible null values
        const connected = state.isConnected ?? false;
        const reachable = state.isInternetReachable ?? true;
        const type = state.type || 'unknown';
        
        const online = connected && reachable;
        
        setIsOnline(online);
        setIsInternetReachable(reachable);
        setConnectionType(type);

        console.log(`📡 Connection: ${online ? 'Online' : 'Offline'}, Type: ${type}, Reachable: ${reachable}`);
      } catch (error) {
        console.error('Error in NetInfo listener:', error);
        // Fallback values jika ada error
        setIsOnline(true);
        setIsInternetReachable(true);
        setConnectionType('unknown');
      }
    });

    // Initial check dengan error handling
    NetInfo.fetch().then(state => {
      try {
        const connected = state.isConnected ?? false;
        const reachable = state.isInternetReachable ?? true;
        const type = state.type || 'unknown';
        
        const initialOnline = connected && reachable;
        
        setIsOnline(initialOnline);
        setIsInternetReachable(reachable);
        setConnectionType(type);
      } catch (error) {
        console.error('Error in NetInfo initial fetch:', error);
      }
    }).catch(error => {
      console.error('NetInfo fetch failed:', error);
    });

    return () => unsubscribe();
  }, []);

  return { 
    isOnline, 
    connectionType,
    isInternetReachable 
  };
};