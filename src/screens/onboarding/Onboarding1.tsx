import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../contexts/ThemeContext';

type Onboarding1NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding1'>;

interface Props {
  navigation: Onboarding1NavigationProp;
}

const Onboarding1: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();

  // ✅ SOAL 1: Simulasi Login - Kirim userID ke Root Drawer
  const handleSimulatedLogin = () => {
    navigation.navigate('MainApp', { 
      userId: 'U123' // ✅ Kirim parameter userId
    });
  };

  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
        Selamat Datang!
      </Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
        Mini E-Commerce App
      </Text>

      {/* ✅ TAMBAH: Tombol Simulasi Login */}
      <TouchableOpacity
        style={[styles.loginButton, theme === 'dark' && styles.loginButtonDark]}
        onPress={handleSimulatedLogin}
      >
        <Text style={styles.loginButtonText}>
          🔐 Login Simulasi (User: U123)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, theme === 'dark' && styles.buttonDark]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Lanjut ke Onboarding 2</Text>
      </TouchableOpacity>

      <Text style={[styles.note, theme === 'dark' && styles.textSecondaryDark]}>
        ✅ Soal 1: Parameter userId dikirim dari Root ke nested Profile Tab
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D3748',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 40,
    textAlign: 'center',
  },
  // ✅ STYLE BARU: Tombol Login Simulasi
  loginButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  loginButtonDark: {
    backgroundColor: '#2E8B57',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonDark: {
    backgroundColor: '#3182CE',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#718096',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default Onboarding1;