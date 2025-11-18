// App.tsx
import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SecureStorageProvider } from './src/contexts/SecureStorageContext'; // ✅ BARU
import { StorageProvider } from './src/contexts/StorageContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { NetworkProvider } from './src/contexts/NetworkContext';
import AppNavigator from './src/navigation/AppNavigator';
import { useEffect } from 'react';
import { secureStorageHelpers } from './src/utils/keychain';

const initializeApp = async () => {
  try {
    const existingApiKey = await secureStorageHelpers.getApiKey();

    if (!existingApiKey) {
      const secretApiKey = 'API_KEY_SECRET_XYZ_1234';
      await secureStorageHelpers.setApiKey(secretApiKey);
      console.log('🔐 API Key initialized in keychin');
    } else {
      console.log('🔐 API Key already exists in keychin');
    }
  } catch (error) {
    console.error('Error initializing API Key:', error);
  }
};

export default function App() {
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