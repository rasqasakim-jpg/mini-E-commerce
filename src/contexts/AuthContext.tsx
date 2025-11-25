// src/contexts/AuthContext.tsx - FIXED VERSION
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useSecureStorageContext } from './SecureStorageContext';
import { storageHelpers } from '../utils/storage';
import { secureStorageHelpers } from '../utils/keychain';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (token: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  hasCheckedAuth: boolean; // ✅ BARU: Untuk tahu kalo auth check sudah selesai
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false); // ✅ BARU
  
  const { secureStorage } = useSecureStorageContext();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      const [authToken, userData] = await Promise.all([
        secureStorageHelpers.getAuthToken(),
        storageHelpers.getUserData(),
      ]);
      
      console.log('🔐 Auth Check Result:', { 
        hasToken: !!authToken, 
        hasUserData: !!userData 
      });
      
      if (authToken && userData) {
        setIsAuthenticated(true);
        setUser(userData);
        console.log('✅ Auto-login from Keychain');
      } else {
        setIsAuthenticated(false);
        setUser(null);
        console.log('❌ No valid credentials, showing LoginScreen');
      }
    } catch (error: any) {
      console.error('Error checking auth status:', error);
      
      if (secureStorage.hasAccessDenied) {
        Alert.alert(
          'Login Required',
          'Keamanan perangkat berubah. Silakan login ulang.',
          [{ text: 'OK' }]
        );
      }
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
      setHasCheckedAuth(true); // ✅ TANDAI BAHWA AUTH CHECK SUDAH SELESAI
    }
  };

  const login = async (token: string, userData: any) => {
    try {
      console.log('🔐 Saving credentials to Keychain...');
      await secureStorage.setToken(token);
      await storageHelpers.setUserData(userData);
      
      setIsAuthenticated(true);
      setUser(userData);
      console.log('✅ Login successful - credentials saved');
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('🔐 Clearing credentials from Keychain...');
      await Promise.all([
        secureStorage.clearAll(),
        storageHelpers.removeUserData(),
      ]);
      
      setIsAuthenticated(false);
      setUser(null);
      console.log('✅ Logout successful - all data cleared');
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
    hasCheckedAuth, // ✅ EXPORT HAS CHECKED AUTH
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