import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SecureStorageProvider } from './src/contexts/SecureStorageContext';
import { StorageProvider } from './src/contexts/StorageContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { NetworkProvider } from './src/contexts/NetworkContext';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeSecureStorage } from './src/utils/keychain'; // ✅ IMPORT BARU
import { ActivityIndicator, View, Text } from 'react-native';

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        console.log('🚀 Initializing app...');
        await initializeSecureStorage(); // ✅ INIT API KEY
        console.log('✅ App initialization completed');
      } catch (error) {
        console.error('❌ App initialization failed:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initApp();
  }, []);

  // ✅ Loading screen selama initialization
  if (isInitializing) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#F7FAFC' 
      }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ 
          marginTop: 16, 
          fontSize: 16,
          color: '#2D3748' 
        }}>
          Initializing secure storage...
        </Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <SecureStorageProvider>
        <StorageProvider>
          <AuthProvider>
            <NetworkProvider>
              <AppNavigator />
            </NetworkProvider>
          </AuthProvider>
        </StorageProvider>
      </SecureStorageProvider>
    </ThemeProvider>
  );
}