import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

// ✅ TAMBAH interface untuk props
interface CustomDrawerProps extends DrawerContentComponentProps {
  userId?: string;
}

const CustomDrawer: React.FC<CustomDrawerProps> = (props) => {
  const { theme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth(); // Ambil data 'user' dari context
  const { navigation, userId } = props; // ✅ DESTRUCTURE userId dari props

  const menuItems = [
    { label: 'Beranda', icon: '🏠', screen: 'HomeStack' },
    { label: 'Profile', icon: '👤', screen: 'Profile' },
    { label: 'Riwayat Kunjungan', icon: '📊', screen: 'ScreenHistory' },
    { label: 'Pengaturan', icon: '⚙️', screen: 'Settings' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Logout', onPress: () => logout() }
      ]
    );
  };

  const handleMenuPress = (screen: string) => {
    if (screen === 'Settings' || screen === 'ScreenHistory') {
      // Navigasi ke screen di Root Stack
      navigation.navigate(screen as any);
    } else {
      // Navigasi ke tab di dalam BottomTabNavigator
      navigation.navigate('MainApp', { screen });
    }
    navigation.closeDrawer();
  };

  const handleLoginPress = () => {
    navigation.navigate('MainApp', { screen: 'Login' });
    navigation.closeDrawer();
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      
      <View style={[styles.header, theme === 'dark' && styles.headerDark]}>
        <Image
          source={{ uri: user?.image || '' }}
          style={styles.avatar}
        />
        {isAuthenticated && user ? (
          <>
            <Text style={[styles.userName, theme === 'dark' && styles.textDark]}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={[styles.userEmail, theme === 'dark' && styles.textSecondaryDark]}>
              {user.email}
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.userName, theme === 'dark' && styles.textDark]}>
              Guest User
            </Text>
            <TouchableOpacity onPress={handleLoginPress}>
              <Text style={styles.loginPrompt}>Login untuk melihat profil</Text>
            </TouchableOpacity>
          </>
        )}
        <Text style={[styles.authStatus, theme === 'dark' && styles.textSecondaryDark]}>
          Status: {isAuthenticated ? '✅ Login' : '❌ Logout'}
          </Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}
            onPress={() => handleMenuPress(item.screen)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={[styles.menuLabel, theme === 'dark' && styles.textDark]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.footer, theme === 'dark' && styles.footerDark]}>
        <TouchableOpacity
          style={[styles.logoutButton, theme === 'dark' && styles.logoutButtonDark]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={[styles.logoutText, theme === 'dark' && styles.textDark]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#F7FAFC',
  },
  headerDark: {
    backgroundColor: '#2D3748',
    borderBottomColor: '#4A5568',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  loginPrompt: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 4,
  },
  // ✅ TAMBAH style untuk userId
  userId: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  authStatus: {
    fontSize: 12,
    color: '#718096',
    fontStyle: 'italic',
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  menuItemDark: {
    backgroundColor: '#1A202C',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 30,
  },
  menuLabel: {
    fontSize: 18,
    color: '#2D3748',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#F7FAFC',
  },
  footerDark: {
    backgroundColor: '#2D3748',
    borderTopColor: '#4A5568',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
  },
  logoutButtonDark: {
    backgroundColor: '#E53E3E',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 12,
    color: 'white',
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default CustomDrawer;