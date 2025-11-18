import { useState, useEffect, useCallback } from 'react';
import { secureStorageHelpers } from '../utils/keychain';
import { Alert } from 'react-native';

export const useSecureStorage = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Load semua secure data
  const loadSecureData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const secureData = await secureStorageHelpers.loadSecureData();
      
      setAuthToken(secureData.authToken);
      setApiKey(secureData.apiKey);
      
      return secureData;
    } catch (error: any) {
      console.error('❌ Secure storage load error:', error);
      
      // ✅ SOAL c: Handle Access Denied Error
      if (error.message === 'ACCESS_DENIED_SECURITY_CHANGED') {
        setError('ACCESS_DENIED');
        Alert.alert(
          'Keamanan Perangkat Berubah',
          'Kredensial keamanan perangkat telah berubah. Silakan login ulang untuk keamanan.',
          [{ text: 'OK', onPress: () => {
            // Navigasi ke login akan di-handle di component
          }}]
        );
      } else {
        setError(error.message);
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Set auth token
  const setToken = async (token: string) => {
    try {
      await secureStorageHelpers.setAuthToken(token);
      setAuthToken(token);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // ✅ Set API key
  const setKey = async (key: string) => {
    try {
      await secureStorageHelpers.setApiKey(key);
      setApiKey(key);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // ✅ Clear all secure data (logout)
  const clearAll = async () => {
    try {
      await secureStorageHelpers.clearAllSecureData();
      setAuthToken(null);
      setApiKey(null);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    loadSecureData();
  }, [loadSecureData]);

  return {
    authToken,
    apiKey,
    loading,
    error,
    setToken,
    setKey,
    clearAll,
    refresh: loadSecureData,
    hasAccessDenied: error === 'ACCESS_DENIED',
  };
};