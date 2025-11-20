// src/components/SplashScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface SplashScreenProps {
  message?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  message = 'Memuat aplikasi...' 
}) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      theme === 'dark' && styles.containerDark
    ]}>
      <Text style={[
        styles.logo, 
        theme === 'dark' && styles.textDark
      ]}>
        🛍️ E-Commerce
      </Text>
      
      <ActivityIndicator 
        size="large" 
        color={theme === 'dark' ? '#F7FAFC' : '#007AFF'} 
        style={styles.spinner}
      />
      
      <Text style={[
        styles.message,
        theme === 'dark' && styles.textSecondaryDark
      ]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2D3748',
  },
  spinner: {
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#718096',
    marginTop: 10,
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default SplashScreen;