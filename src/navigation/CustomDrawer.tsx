import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { theme } = useTheme();
  const { navigation } = props;

  const menuItems = [
    { label: 'Home', icon: '🏠', route: 'Home' },
    { label: 'Settings', icon: '⚙️', route: 'Settings' },
  ];

  const handleLogout = () => {
    console.log('Logout pressed');
    // Implement logout logic here
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      {/* Header dengan Avatar */}
      <View style={[styles.header, theme === 'dark' && styles.headerDark]}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg' }}
          style={styles.avatar}
        />
        <Text style={[styles.userName, theme === 'dark' && styles.textDark]}>
          Defense Irgi Harnoyo
        </Text>
        <Text style={[styles.userEmail, theme === 'dark' && styles.textSecondaryDark]}>
          irgiharnoyo@gmail.com
        </Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}
            onPress={() => navigation.navigate(item.route)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={[styles.menuLabel, theme === 'dark' && styles.textDark]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button di Bawah */}
      <View style={styles.footer}>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#F7FAFC',
  },
  headerDark: {
    backgroundColor: '#2D3748',
    borderBottomColor: '#4A5568',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#718096',
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  menuItemDark: {
    backgroundColor: '#1A202C',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 24,
  },
  menuLabel: {
    fontSize: 16,
    color: '#2D3748',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
  },
  logoutButtonDark: {
    backgroundColor: '#2D3748',
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  logoutText: {
    fontSize: 16,
    color: '#2D3748',
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