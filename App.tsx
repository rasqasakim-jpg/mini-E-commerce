// App.tsx
import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { StorageProvider } from './src/contexts/StorageContext'; // ✅ PASTIKAN INI DI ATAS
import { AuthProvider } from './src/contexts/AuthContext';
import { NetworkProvider } from './src/contexts/NetworkContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <StorageProvider> 
        <AuthProvider>
          <NetworkProvider>
            <AppNavigator />
          </NetworkProvider>
        </AuthProvider>
      </StorageProvider>
    </ThemeProvider>
  );
}