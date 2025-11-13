import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import apiClient from '../api/apiClient';

// ✅ SOAL 19: Login Screen dengan Axios POST + Response Interceptor
const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
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
      
      // ✅ SOAL 19: Axios POST request dengan instance
      const response = await apiClient.post('/auth/login', {
        username: username,
        password: password,
      });

      // ✅ SOAL 19: Response interceptor sudah transform data
      console.log('✅ Login response:', response.data);
      
      // Tampilkan token di console
      if (response.data && response.data.token) {
        console.log('🔑 Token received:', response.data.token);
        Alert.alert(
          'Login Berhasil! 🎉',
          `Token: ${response.data.token}\n\nLihat token di console developer tools.`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Login Gagal', 'Token tidak diterima');
      }

    } catch (error: any) {
      console.log('❌ Login error:', error.response?.data || error.message);
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
          Gunakan kredensial dummy untuk simulasi
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
          <Text style={styles.loginButtonText}>
            {loading ? '🔄 Logging in...' : '🚀 Login'}
          </Text>
        </TouchableOpacity>

       <Text style={[styles.note, theme === 'dark' && styles.textSecondaryDark]}>
  💡 Coba: username: "emilys", password: "emilyspass"
</Text>

        <Text style={[styles.debugInfo, theme === 'dark' && styles.textSecondaryDark]}>
          ✅ Soal 19: Axios POST + Response Interceptor
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
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
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
    borderRadius: 8,
    padding: 12,
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
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonDark: {
    backgroundColor: '#3182CE',
  },
  loginButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  note: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#718096',
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