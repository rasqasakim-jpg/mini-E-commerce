import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout, isLoggedIn } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              Alert.alert('Berhasil', 'Anda telah logout');
            } catch (error) {
              Alert.alert('Error', 'Gagal logout');
            }
          }
        },
      ]
    );
  };

  if (!isLoggedIn || !user) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <Text style={[styles.errorTitle, theme === 'dark' && styles.textDark]}> {/* ✅ UBAH: title -> errorTitle */}
          Silakan login terlebih dahulu
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: user.image }} 
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, theme === 'dark' && styles.textDark]}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={[styles.userEmail, theme === 'dark' && styles.textSecondaryDark]}>
              {user.email}
            </Text>
            <Text style={[styles.userUsername, theme === 'dark' && styles.textSecondaryDark]}>
              @{user.username}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={[styles.statsCard, theme === 'dark' && styles.statsCardDark]}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={[styles.statLabel, theme === 'dark' && styles.textSecondaryDark]}>
              Pesanan
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={[styles.statLabel, theme === 'dark' && styles.textSecondaryDark]}>
              Favorit
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={[styles.statLabel, theme === 'dark' && styles.textSecondaryDark]}>
              Voucher
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            Akun Saya
          </Text>
          
          <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
            <Text style={styles.menuIcon}>📦</Text>
            <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
              Pesanan Saya
            </Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
            <Text style={styles.menuIcon}>❤️</Text>
            <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
              Favorit
            </Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
            <Text style={styles.menuIcon}>🎫</Text>
            <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
              Voucher Saya
            </Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
            <Text style={styles.menuIcon}>📍</Text>
            <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
              Alamat Pengiriman
            </Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            Pengaturan
          </Text>
          
          <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
              Notifikasi
            </Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
            <Text style={styles.menuIcon}>🛡️</Text>
            <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
              Privasi & Keamanan
            </Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
            <Text style={styles.menuIcon}>ℹ️</Text>
            <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
              Bantuan & Support
            </Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.logoutButton, theme === 'dark' && styles.logoutButtonDark]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
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
  content: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
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
  },
  // ✅ TAMBAH: errorTitle style yang missing
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginTop: 40,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsCardDark: {
    backgroundColor: '#2D3748',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemDark: {
    backgroundColor: '#2D3748',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 20,
    color: '#A0AEC0',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonDark: {
    backgroundColor: '#E53E3E',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ProfileScreen;