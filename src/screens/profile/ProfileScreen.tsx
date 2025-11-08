import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

const ProfileScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg' }}
          style={styles.avatar}
        />
        <Text style={[styles.name, theme === 'dark' && styles.textDark]}>
          Defense Irgi Harnoyo
        </Text>
        <Text style={[styles.email, theme === 'dark' && styles.textSecondaryDark]}>
          irgiharnoyo@gmail.com
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Pengaturan
        </Text>
        
        <TouchableOpacity 
          style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}
          onPress={toggleTheme}
        >
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
            Tema {theme === 'light' ? 'Gelap' : 'Terang'}
          </Text>
          <Text style={styles.menuIcon}>
            {theme === 'light' ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>

        <View style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
            Notifikasi
          </Text>
          <Text style={styles.menuIcon}>🔔</Text>
        </View>

        <View style={[styles.menuItem, theme === 'dark' && styles.menuItemDark]}>
          <Text style={[styles.menuText, theme === 'dark' && styles.textDark]}>
            Bantuan
          </Text>
          <Text style={styles.menuIcon}>❓</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Tentang Aplikasi
        </Text>
        <Text style={[styles.aboutText, theme === 'dark' && styles.textSecondaryDark]}>
          Mini E-Commerce App v1.0.0{'\n'}
          Dibangun dengan React Native & TypeScript
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
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sectionDark: {
    borderBottomColor: '#4A5568',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
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
  menuIcon: {
    fontSize: 18,
  },
  aboutText: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ProfileScreen;