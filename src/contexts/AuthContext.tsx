// src/contexts/AuthContext.tsx - UPDATE
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useSecureStorageContext } from './SecureStorageContext'; // ✅ IMPORT BARU
import { storageHelpers } from '../utils/storage';
import { secureStorageHelpers } from '../utils/keychain';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (token: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { secureStorage } = useSecureStorageContext(); // ✅ GUNAKAN SECURE STORAGE

  // ✅ SOAL a: Cek token dari Keychain saat app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      // ✅ SOAL b: Hybrid Storage - Load dari Keychain dan AsyncStorage paralel
      const [authToken, userData] = await Promise.all([
        secureStorageHelpers.getAuthToken(), // ✅ FIX: Panggil fungsi getAuthToken
        storageHelpers.getUserData(), // Dari AsyncStorage (non-sensitive)
      ]);
      
      if (authToken) {
        setIsAuthenticated(true);
        setUser(userData);
        console.log('🔐 Auto-login successful from Keychain');
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error: any) {
      console.error('Error checking auth status:', error);
      
      // ✅ SOAL c: Handle Access Denied
      if (secureStorage.hasAccessDenied) {
        Alert.alert(
          'Login Required',
          'Keamanan perangkat berubah. Silakan login ulang.',
          [{ text: 'OK' }]
        );
        // Reset state
        setIsAuthenticated(false);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string, userData: any) => {
    try {
      // ✅ SOAL a: Simpan token ke Keychain (bukan AsyncStorage)
      await secureStorage.setToken(token);
      await storageHelpers.setUserData(userData);
      
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // ✅ SOAL d: Pembersihan data aman - hapus dari Keychain dan AsyncStorage
      await Promise.all([
        secureStorage.clearAll(), // Hapus dari Keychain
        storageHelpers.removeUserData(), // Hapus dari AsyncStorage
      ]);
      
      setIsAuthenticated(false);
      setUser(null);
      
      console.log('🔐 Logout successful - all secure data cleared');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};