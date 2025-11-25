import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../api/apiClient';
import { simplePrompt, isSensorAvailable } from '@sbaiahmed1/react-native-biometrics'; // ✅ IMPORT simplePrompt
import * as Keychain from 'react-native-keychain';

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [biometricAvailable, setBiometricAvailable] = useState<boolean>(false);
  const [biometryType, setBiometryType] = useState<string>('');

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      const sensorInfo = await isSensorAvailable();
      setBiometricAvailable(sensorInfo.available);
      setBiometryType(sensorInfo.biometryType || '');
      
      console.log('🔐 Biometric Status:', {
        available: sensorInfo.available,
        type: sensorInfo.biometryType,
        error: sensorInfo.error
      });
    } catch (error) {
      console.log('Biometric check error:', error);
    }
  };

  // ✅ FIXED: Handle biometric login langsung di sini
  const handleBiometricLogin = async () => {
    if (!biometricAvailable) {
      Alert.alert('Maaf', 'Sensor biometrik tidak tersedia di perangkat ini');
      return;
    }

    setLoading(true);
    try {
      const promptMessage = getBiometricPromptMessage();
      const { success, error } = await simplePrompt(promptMessage);

      if (success) {
        // Jika biometrik sukses, ambil token dari Keychain
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          // Gunakan token yang tersimpan untuk login
          await login(credentials.password, { 
            firstName: 'User', 
            lastName: 'Biometric', 
            email: credentials.username,
            image: 'https://i.pravatar.cc/150?u=' + credentials.username
          });
          Alert.alert('Welcome Back!', `Halo ${credentials.username}, login berhasil!`);
        } else {
          Alert.alert('Info', 'Tidak ada data tersimpan. Login manual dulu.');
        }
      } else {
        if (error && (error.includes('Lockout') || error.includes('MAX_ATTEMPTS_EXCEEDED'))) {
          await Keychain.resetGenericPassword();
          Alert.alert('Keamanan', 'Terlalu banyak percobaan gagal. Data login telah dihapus.');
        } else {
          Alert.alert('Gagal', 'Autentikasi biometrik gagal atau dibatalkan');
        }
      }
    } catch (error) {
      console.error('Biometric auth error:', error);
      Alert.alert('Error', 'Terjadi kesalahan pada autentikasi biometrik');
    } finally {
      setLoading(false);
    }
  };

  const getBiometricPromptMessage = () => {
    switch (biometryType) {
      case 'FaceID':
        return 'Pindai Wajah untuk Masuk';
      case 'TouchID':
        return 'Tempelkan Jari untuk Masuk';
      default:
        return 'Verifikasi Identitas untuk Login';
    }
  };

  const getBiometricButtonText = () => {
    switch (biometryType) {
      case 'FaceID':
        return 'Login dengan Face ID';
      case 'TouchID':
        return 'Login dengan Touch ID';
      default:
        return 'Login dengan Biometrik';
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username dan password harus diisi');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 Attempting login...');
      
      // Gunakan mock login seperti sebelumnya
      console.log('🔄 Using guaranteed mock login...');
      
      const mockUserData = {
        id: Math.random().toString(36).substr(2, 9),
        username: username,
        email: `${username}@example.com`,
        firstName: username.charAt(0).toUpperCase() + username.slice(1),
        lastName: 'User',
        gender: 'male',
        image: 'https://i.pravatar.cc/150?u=' + username,
      };
      
      const mockToken = 'mock_jwt_' + Math.random().toString(36).substr(2, 10);
      
      await login(mockToken, mockUserData);
      
      // ✅ SIMPAN KE KEYCHAIN SETELAH LOGIN MANUAL PERTAMA KALI
      await Keychain.setGenericPassword(username, mockToken);
      
      Alert.alert(
        'Login Berhasil! 🎉',
        `Selamat datang ${mockUserData.firstName}!`,
        [{ text: 'OK' }]
      );
      
    } catch (error: unknown) {
      console.log('❌ Login error:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  // ✅ TEST FUNCTION
  const testApiConnection = async () => {
    try {
      console.log('🧪 Testing API connection...');
      const testResponse = await apiClient.get('/products/1');
      console.log('✅ API Test Success:', testResponse.status);
      Alert.alert('API Test', 'Koneksi API berhasil!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.log('❌ API Test Failed:', errorMessage);
      Alert.alert('API Test', 'Koneksi API gagal: ' + errorMessage);
    }
  };

  // ✅ CEK APAKAH ADA CREDENTIALS UNTUK TAMPILKAN TOMBOL BIOMETRIK
  const [hasCredentials, setHasCredentials] = useState(false);

  useEffect(() => {
    const checkCredentials = async () => {
      const credentials = await Keychain.getGenericPassword();
      setHasCredentials(!!credentials);
    };
    checkCredentials();
  }, []);

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={styles.content}>
        <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
          🔐 Login
        </Text>
        <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
          Masuk ke akun MiniCommerce Anda
        </Text>

        {/* ✅ TAMPILKAN STATUS BIOMETRIK */}
        {biometricAvailable && (
          <View style={[styles.biometricStatus, theme === 'dark' && styles.biometricStatusDark]}>
            <Text style={[styles.biometricStatusText, theme === 'dark' && styles.textDark]}>
              ✅ {biometryType} Tersedia
            </Text>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
            Username
          </Text>
          <TextInput
            style={[
              styles.input,
              theme === 'dark' && styles.inputDark,
            ]}
            value={username}
            onChangeText={setUsername}
            placeholder="masukkan username"
            placeholderTextColor={theme === 'dark' ? '#A0AEC0' : '#718096'}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
            Password
          </Text>
          <TextInput
            style={[
              styles.input,
              theme === 'dark' && styles.inputDark,
            ]}
            value={password}
            onChangeText={setPassword}
            placeholder="masukkan password"
            placeholderTextColor={theme === 'dark' ? '#A0AEC0' : '#718096'}
            secureTextEntry
          />
        </View>

        {/* ✅ TOMBOL BIOMETRIK - TAMPIL JIKA ADA SENSOR DAN SUDAH PERNAH LOGIN */}
        {biometricAvailable && hasCredentials && (
          <TouchableOpacity
            style={[
              styles.biometricButton,
              theme === 'dark' && styles.biometricButtonDark,
              loading && styles.buttonDisabled
            ]}
            onPress={handleBiometricLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.biometricButtonText}>
                {biometryType === 'FaceID' ? '📱' : '👆'} {getBiometricButtonText()}
              </Text>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.loginButton,
            theme === 'dark' && styles.loginButtonDark,
            loading && styles.buttonDisabled
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>
              🚀 Login Manual
            </Text>
          )}
        </TouchableOpacity>

        {/* ✅ TAMBAH TEST BUTTON */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={testApiConnection}
        >
          <Text style={styles.testButtonText}>
            🧪 Test API Connection
          </Text>
        </TouchableOpacity>

        <View style={styles.demoContainer}>
          <Text style={[styles.demoTitle, theme === 'dark' && styles.textDark]}>
            Cara Login:
          </Text>
          <Text style={[styles.demoText, theme === 'dark' && styles.textSecondaryDark]}>
            • Login manual pertama kali untuk menyimpan kredensial
          </Text>
          <Text style={[styles.demoText, theme === 'dark' && styles.textSecondaryDark]}>
            • Setelah itu bisa login dengan {biometryType || 'biometrik'}
          </Text>
          {biometricAvailable && (
            <Text style={[styles.demoText, theme === 'dark' && styles.textSecondaryDark]}>
              • Sensor {biometryType} terdeteksi di perangkat Anda
            </Text>
          )}
        </View>

        <Text style={[styles.debugInfo, theme === 'dark' && styles.textSecondaryDark]}>
          ✅ Hybrid Authentication - Manual + Biometrik
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
  },
  // ✅ STYLE BARU UNTUK STATUS BIOMETRIK
  biometricStatus: {
    backgroundColor: '#EDF2F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  biometricStatusDark: {
    backgroundColor: '#2D3748',
  },
  biometricStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2D3748',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#2D3748',
  },
  inputDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    color: '#F7FAFC',
  },
  biometricButton: {
    backgroundColor: '#10B981',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  biometricButtonDark: {
    backgroundColor: '#38A169',
    borderColor: '#38A169',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDark: {
    backgroundColor: '#3182CE',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  biometricButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  testButton: {
    backgroundColor: '#48BB78',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  testButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  demoContainer: {
    backgroundColor: '#EDF2F7',
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  debugInfo: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
    color: '#718096',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default LoginScreen;