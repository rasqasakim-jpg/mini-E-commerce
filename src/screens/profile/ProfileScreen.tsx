import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const ProfileScreen: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => logout()
        },
      ]
    );
  };

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <View style={styles.notLoggedIn}>
          <Text style={[styles.notLoggedInEmoji, theme === 'dark' && styles.textDark]}>
            🔐
          </Text>
          <Text style={[styles.notLoggedInTitle, theme === 'dark' && styles.textDark]}>
            Belum Login
          </Text>
          <Text style={[styles.notLoggedInSubtitle, theme === 'dark' && styles.textSecondaryDark]}>
            Silakan login untuk melihat profil Anda
          </Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      {/* Header Profile */}
      <View style={[styles.header, theme === 'dark' && styles.headerDark]}>
        <Image 
          source={{ uri: user?.image || 'https://i.pravatar.cc/150' }} 
          style={styles.avatar}
        />
        <Text style={[styles.userName, theme === 'dark' && styles.textDark]}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={[styles.userEmail, theme === 'dark' && styles.textSecondaryDark]}>
          {user?.email}
        </Text>
        <Text style={[styles.userUsername, theme === 'dark' && styles.textSecondaryDark]}>
          @{user?.username}
        </Text>
      </View>

      {/* Profile Info */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Informasi Profil
        </Text>
        
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, theme === 'dark' && styles.textSecondaryDark]}>
            User ID:
          </Text>
          <Text style={[styles.infoValue, theme === 'dark' && styles.textDark]}>
            {user?.id}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Nama Lengkap:
          </Text>
          <Text style={[styles.infoValue, theme === 'dark' && styles.textDark]}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Username:
          </Text>
          <Text style={[styles.infoValue, theme === 'dark' && styles.textDark]}>
            @{user?.username}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Email:
          </Text>
          <Text style={[styles.infoValue, theme === 'dark' && styles.textDark]}>
            {user?.email}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Gender:
          </Text>
          <Text style={[styles.infoValue, theme === 'dark' && styles.textDark]}>
            {user?.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
          </Text>
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Akun & Pengaturan
        </Text>

        <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
          <Text style={styles.menuIcon}>✏️</Text>
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
            Edit Profil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
          <Text style={styles.menuIcon}>🔔</Text>
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
            Notifikasi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
          <Text style={styles.menuIcon}>🌙</Text>
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
            Tema {theme === 'dark' ? 'Gelap' : 'Terang'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
          <Text style={styles.menuIcon}>🛡️</Text>
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
            Privasi & Keamanan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, theme === 'dark' && styles.textSecondaryDark]}>
          MiniCommerce v1.0.0
        </Text>
        <Text style={[styles.footerText, theme === 'dark' && styles.textSecondaryDark]}>
          Developed with ❤️
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
  notLoggedIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notLoggedInEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  notLoggedInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  notLoggedInSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerDark: {
    backgroundColor: '#2D3748',
    borderBottomColor: '#4A5568',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 2,
  },
  userUsername: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 16,
    padding: 16,
  },
  sectionDark: {
    backgroundColor: '#2D3748',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#718096',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  menuItemDark: {
    backgroundColor: '#2D3748',
    borderBottomColor: '#4A5568',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
  },
  menuText: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FED7D7',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 12,
    color: '#E53E3E',
  },
  logoutText: {
    fontSize: 16,
    color: '#E53E3E',
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ProfileScreen;