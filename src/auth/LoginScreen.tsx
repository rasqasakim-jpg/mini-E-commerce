import React, { useState } from 'react';
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

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username dan password harus diisi');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 Attempting login...');
      
      const response = await apiClient.post('/auth/login', {
        username: username,
        password: password,
      });

      console.log('✅ Login response:', response.data);
      
      if (response.data && response.data.token) {
        // Transform user data from API response
        const userData = {
          id: response.data.id?.toString() || '1',
          username: response.data.username || username,
          email: response.data.email || `${username}@example.com`,
          firstName: response.data.firstName || 'User',
          lastName: response.data.lastName || 'Test',
          gender: response.data.gender || 'male',
          image: response.data.image || 'https://via.placeholder.com/150',
        };

        // Save to auth context
        await login(response.data.token, userData);
        
        console.log('🔑 Token received:', response.data.token);
        Alert.alert(
          'Login Berhasil! 🎉',
          `Selamat datang ${userData.firstName}!`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Login Gagal', 'Token tidak diterima dari server');
      }

    } catch (error: any) {
      console.log('❌ Login error:', error.response?.data || error.message);
      
      // Fallback mock login for demo purposes
      if (error.response?.status === 404 || error.message.includes('Network Error')) {
        console.log('🔄 Using mock login for demo...');
        
        // Mock successful login for demo
        setTimeout(async () => {
          const mockUserData = {
            id: '1',
            username: username,
            email: `${username}@example.com`,
            firstName: 'Demo',
            lastName: 'User',
            gender: 'male',
            image: 'https://via.placeholder.com/150',
          };
          
          await login('demo_jwt_token_12345', mockUserData);
          
          Alert.alert(
            'Login Berhasil! 🎉 (Demo Mode)',
            `Selamat datang ${mockUserData.firstName}!`,
            [{ text: 'OK' }]
          );
          setLoading(false);
        }, 1500);
        
        return;
      }
      
      Alert.alert(
        'Login Gagal',
        error.response?.data?.message || 'Terjadi kesalahan saat login'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={styles.content}>
        <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
          🔐 Login
        </Text>
        <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
          Masuk ke akun MiniCommerce Anda
        </Text>

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

        <TouchableOpacity
          style={[
            styles.loginButton,
            theme === 'dark' && styles.loginButtonDark,
            loading && styles.loginButtonDisabled
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>
              🚀 Login
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.demoContainer}>
          <Text style={[styles.demoTitle, theme === 'dark' && styles.textDark]}>
            Kredensial Demo:
          </Text>
          <Text style={[styles.demoText, theme === 'dark' && styles.textSecondaryDark]}>
            • Username: emilys | Password: emilyspass
          </Text>
          <Text style={[styles.demoText, theme === 'dark' && styles.textSecondaryDark]}>
            • Username: kminchelle | Password: 0lelplR
          </Text>
          <Text style={[styles.demoText, theme === 'dark' && styles.textSecondaryDark]}>
            • Atau gunakan username/password apa saja (demo mode)
          </Text>
        </View>

        <Text style={[styles.debugInfo, theme === 'dark' && styles.textSecondaryDark]}>
          ✅ Enhanced Login dengan Auth Context
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
    marginBottom: 40,
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
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDark: {
    backgroundColor: '#3182CE',
  },
  loginButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
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