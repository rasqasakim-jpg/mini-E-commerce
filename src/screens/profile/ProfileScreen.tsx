import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { isAuthenticated, login, logout } = useAuth();

  // ✅ SOAL 5: Auth Guard - Tampilkan placeholder jika belum login
  if (!isAuthenticated) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <View style={[styles.authPlaceholder, theme === 'dark' && styles.authPlaceholderDark]}>
          <Text style={[styles.authTitle, theme === 'dark' && styles.textDark]}>
            🔐 Harap Login
          </Text>
          <Text style={[styles.authDescription, theme === 'dark' && styles.textSecondaryDark]}>
            Anda harus login untuk mengakses halaman profile
          </Text>
          <TouchableOpacity
            style={[styles.loginButton, theme === 'dark' && styles.loginButtonDark]}
            onPress={() => login('dummy-token-123')}
          >
            <Text style={styles.loginButtonText}>📱 Login Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Konten profil asli hanya dimuat jika sudah login
  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg' }}
          style={styles.avatar}
        />
        <Text style={[styles.name, theme === 'dark' && styles.textDark]}>Defense Irgi Harnoyo</Text>
        <Text style={[styles.email, theme === 'dark' && styles.textSecondaryDark]}>deffnoy@gmail.com</Text>
        <Text style={[styles.authStatus, theme === 'dark' && styles.textSecondaryDark]}>
          Status: ✅ Terautentikasi
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>Pengaturan Akun</Text>
        
        <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>✏️ Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>🔐 Ubah Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>🔔 Notifikasi</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, theme === 'dark' && styles.logoutButtonDark]}
        onPress={logout}
      >
        <Text style={styles.logoutButtonText}>🚪 Logout</Text>
      </TouchableOpacity>
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
  // Styles untuk auth placeholder
  authPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#EDF2F7',
    margin: 20,
    borderRadius: 12,
  },
  authPlaceholderDark: {
    backgroundColor: '#2D3748',
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2D3748',
    textAlign: 'center',
  },
  authDescription: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 10,
  },
  loginButtonDark: {
    backgroundColor: '#3182CE',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Styles untuk konten profil
  header: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerDark: {
    borderBottomColor: '#4A5568',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 8,
  },
  authStatus: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemDark: {
    backgroundColor: '#2D3748',
  },
  menuText: {
    fontSize: 16,
    color: '#2D3748',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonDark: {
    backgroundColor: '#E53E3E',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ProfileScreen;