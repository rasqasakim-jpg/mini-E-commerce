import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import QuickProfilePreview from '../../components/QuickProfilePreview';
import * as Keychain from 'react-native-keychain';

const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [showImagePicker, setShowImagePicker] = useState(false);

  const forceLogout = async () => {
    await Keychain.resetGenericPassword();
    logout();
    Alert.alert('Success', 'Logged out and credentials cleared');
  };

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <Text style={[styles.text, theme === 'dark' && styles.textDark]}>
          Silakan login untuk melihat profil
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      {/* Section Foto Profil */}
      <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Foto Profil
        </Text>
        
        <TouchableOpacity 
          style={styles.changePhotoButton}
          onPress={() => setShowImagePicker(!showImagePicker)}
        >
          <Text style={styles.changePhotoText}>
            {showImagePicker ? 'Sembunyikan Picker' : 'Ganti Foto Profil'}
          </Text>
        </TouchableOpacity>

        {showImagePicker && <QuickProfilePreview />}
      </View>

      {/* Info User */}
      <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Informasi Profil
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textDark]}>
          Nama: {user?.firstName} {user?.lastName}
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textDark]}>
          Email: {user?.email}
        </Text>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={forceLogout}>
          <Text style={styles.logoutButtonText}>
           Logout
          </Text>
        </TouchableOpacity>
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
  section: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionDark: {
    backgroundColor: '#2D3748',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2D3748',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#2D3748',
  },
  textDark: {
    color: '#F7FAFC',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4A5568',
  },
  changePhotoButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  changePhotoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // ✅ TAMBAHKAN STYLE UNTUK LOGOUT BUTTON
  logoutButton: {
    backgroundColor: '#E53E3E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;