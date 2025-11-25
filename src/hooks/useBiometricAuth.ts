// src/hooks/useBiometricAuth.ts
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { simplePrompt, isSensorAvailable } from '@sbaiahmed1/react-native-biometrics'; // ✅ UPDATE IMPORT
import * as Keychain from 'react-native-keychain';

interface BiometricAuthHook {
  isBiometricAvailable: boolean;
  biometricType: string;
  error: string | null;
  checkBiometricAvailability: () => Promise<void>;
  authenticateWithBiometric: (message?: string) => Promise<boolean>;
}

export const useBiometricAuth = (): BiometricAuthHook => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState('');
  const [error, setError] = useState<string | null>(null);

  const checkBiometricAvailability = useCallback(async (): Promise<void> => {
    try {
      console.log('🔐 Checking biometric availability...');
      const sensorInfo = await isSensorAvailable();
      
      setIsBiometricAvailable(sensorInfo.available);
      setBiometricType(sensorInfo.biometryType || '');
      setError(sensorInfo.error || null);
      
      console.log('🔐 Biometric availability:', {
        available: sensorInfo.available,
        type: sensorInfo.biometryType,
        error: sensorInfo.error
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ Biometric check error:', err);
    }
  }, []);

  const authenticateWithBiometric = useCallback(async (
    message: string = 'Authenticate to continue'
  ): Promise<boolean> => {
    try {
      if (!isBiometricAvailable) {
        Alert.alert('Biometric Not Available', 'Biometric authentication is not available on this device.');
        return false;
      }

      console.log('🔐 Starting biometric authentication...');
      const { success, error: authError } = await simplePrompt(message);

      if (success) {
        console.log('✅ Biometric authentication successful');
        return true;
      } else {
        console.log('❌ Biometric authentication failed:', authError);
        
        // Handle specific error cases
        if (authError?.includes('Lockout') || authError?.includes('MAX_ATTEMPTS_EXCEEDED')) {
          Alert.alert(
            'Security Lockout',
            'Too many failed attempts. Please try again later or use manual login.',
            [{ text: 'OK' }]
          );
        }
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      console.error('❌ Biometric authentication error:', err);
      Alert.alert('Authentication Error', errorMessage);
      return false;
    }
  }, [isBiometricAvailable]);

  return {
    isBiometricAvailable,
    biometricType,
    error,
    checkBiometricAvailability,
    authenticateWithBiometric,
  };
};

export default useBiometricAuth;