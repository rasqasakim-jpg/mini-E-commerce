// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import TokenManager from '../auth/TokenManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}

interface UseAuthReturn {
  // State
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Methods
  login: (tokens: any, userData: UserData) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigation = useNavigation();

  // ✅ Check authentication status on app start
  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const authStatus = await TokenManager.getAuthStatus();
      
      if (authStatus.isAuthenticated) {
        // Load user data dari AsyncStorage
        const userDataString = await AsyncStorage.getItem('user_data');
        if (userDataString) {
          const userData = JSON.parse(userDataString) as UserData;
          setUser(userData);
        }
      }
      
      setIsAuthenticated(authStatus.isAuthenticated);
    } catch (error) {
      console.error('❌ useAuth: Failed to check authentication', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Login function
  const login = useCallback(async (tokens: any, userData: UserData): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Simpan tokens dengan expiry (contoh: 1 jam dari sekarang)
      const expiredAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam
      
      const authTokens = {
        accessToken: tokens.accessToken || tokens.token,
        expiredAt,
      };

      const tokenSuccess = await TokenManager.saveTokens(authTokens);
      
      if (!tokenSuccess) {
        throw new Error('Failed to save tokens');
      }

      // Simpan user data ke AsyncStorage
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      console.log('✅ useAuth: Login successful');
      return true;
    } catch (error) {
      console.error('❌ useAuth: Login failed', error);
      
      // Cleanup on failure
      await TokenManager.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
      
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Clear semua data
      await TokenManager.clearTokens();
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      // Navigate ke login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
      
      console.log('✅ useAuth: Logout successful');
    } catch (error) {
      console.error('❌ useAuth: Logout failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  // ✅ Auto-check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ✅ Auto-logout ketika token expired
  useEffect(() => {
    const checkTokenPeriodically = setInterval(async () => {
      if (isAuthenticated) {
        const isValid = await TokenManager.validateToken();
        if (!isValid) {
          console.log('🔄 useAuth: Token expired, auto-logout');
          await logout();
        }
      }
    }, 30000); // Check setiap 30 detik

    return () => clearInterval(checkTokenPeriodically);
  }, [isAuthenticated, logout]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    
    // Methods
    login,
    logout,
    checkAuth,
  };
};