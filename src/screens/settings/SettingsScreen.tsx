import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

type DrawerParamList = {
  Home: undefined;
  Settings: undefined;
};

type SettingsScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Settings'>;

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [drawerLocked, setDrawerLocked] = useState(true);
  
  // State untuk pengaturan notifikasi
  const [notificationSettings, setNotificationSettings] = useState({
    promo: true,
    orderUpdates: true,
    stockAlerts: false,
    newsletter: true,
    sound: true,
    vibration: true,
  });

  const handleToggleDrawerLock = () => {
    setDrawerLocked(!drawerLocked);
    Alert.alert(
      'Pengaturan Drawer',
      `Swipe gesture drawer ${!drawerLocked ? 'dikunci' : 'dibuka'}`,
      [{ text: 'OK' }]
    );
  };

  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleTestNotification = () => {
    Alert.alert(
      'Test Notifikasi',
      'Ini adalah notifikasi test! Pengaturan notifikasimu berfungsi dengan baik.',
      [{ text: 'Mengerti' }]
    );
  };

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.titleDark]}>
        Pengaturan
      </Text>

      {/* SECTION: PENGATURAN TEMA */}
      <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          🎨 Tema & Tampilan
        </Text>
        
        <View style={[styles.settingItem, theme === 'dark' && styles.settingItemDark]}>
          <View style={styles.settingTextContainer}>
            <Text style={[styles.settingLabel, theme === 'dark' && styles.textDark]}>
              Mode Gelap
            </Text>
            <Text style={[styles.settingDescription, theme === 'dark' && styles.textSecondaryDark]}>
              Aktifkan tema gelap untuk pengalaman yang lebih nyaman
            </Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={theme === 'dark' ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* SECTION: PENGATURAN NOTIFIKASI */}
      <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          🔔 Notifikasi
        </Text>

        <View style={[styles.settingItem, theme === 'dark' && styles.settingItemDark]}>
          <View style={styles.settingTextContainer}>
            <Text style={[styles.settingLabel, theme === 'dark' && styles.textDark]}>
              Notifikasi Promo
            </Text>
            <Text style={[styles.settingDescription, theme === 'dark' && styles.textSecondaryDark]}>
              Diskon & penawaran spesial
            </Text>
          </View>
          <Switch
            value={notificationSettings.promo}
            onValueChange={() => handleNotificationToggle('promo')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationSettings.promo ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.settingItem, theme === 'dark' && styles.settingItemDark]}>
          <View style={styles.settingTextContainer}>
            <Text style={[styles.settingLabel, theme === 'dark' && styles.textDark]}>
              Update Pesanan
            </Text>
            <Text style={[styles.settingDescription, theme === 'dark' && styles.textSecondaryDark]}>
              Status pengiriman & pembayaran
            </Text>
          </View>
          <Switch
            value={notificationSettings.orderUpdates}
            onValueChange={() => handleNotificationToggle('orderUpdates')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationSettings.orderUpdates ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.settingItem, theme === 'dark' && styles.settingItemDark]}>
          <View style={styles.settingTextContainer}>
            <Text style={[styles.settingLabel, theme === 'dark' && styles.textDark]}>
              Alert Stok
            </Text>
            <Text style={[styles.settingDescription, theme === 'dark' && styles.textSecondaryDark]}>
              Produk favorit kembali tersedia
            </Text>
          </View>
          <Switch
            value={notificationSettings.stockAlerts}
            onValueChange={() => handleNotificationToggle('stockAlerts')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationSettings.stockAlerts ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.settingItem, theme === 'dark' && styles.settingItemDark]}>
          <View style={styles.settingTextContainer}>
            <Text style={[styles.settingLabel, theme === 'dark' && styles.textDark]}>
              Newsletter
            </Text>
            <Text style={[styles.settingDescription, theme === 'dark' && styles.textSecondaryDark]}>
              Tips & berita terbaru
            </Text>
          </View>
          <Switch
            value={notificationSettings.newsletter}
            onValueChange={() => handleNotificationToggle('newsletter')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationSettings.newsletter ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.settingItem, theme === 'dark' && styles.settingItemDark]}>
          <View style={styles.settingTextContainer}>
            <Text style={[styles.settingLabel, theme === 'dark' && styles.textDark]}>
              Suara Notifikasi
            </Text>
            <Text style={[styles.settingDescription, theme === 'dark' && styles.textSecondaryDark]}>
              Bunyi saat notifikasi masuk
            </Text>
          </View>
          <Switch
            value={notificationSettings.sound}
            onValueChange={() => handleNotificationToggle('sound')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationSettings.sound ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.settingItem, theme === 'dark' && styles.settingItemDark]}>
          <View style={styles.settingTextContainer}>
            <Text style={[styles.settingLabel, theme === 'dark' && styles.textDark]}>
              Getar
            </Text>
            <Text style={[styles.settingDescription, theme === 'dark' && styles.textSecondaryDark]}>
              Getar saat notifikasi masuk
            </Text>
          </View>
          <Switch
            value={notificationSettings.vibration}
            onValueChange={() => handleNotificationToggle('vibration')}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationSettings.vibration ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity
          style={[styles.testButton, theme === 'dark' && styles.testButtonDark]}
          onPress={handleTestNotification}
        >
          <Text style={styles.testButtonText}>🔔 Test Notifikasi</Text>
        </TouchableOpacity>
      </View>

      {/* SECTION: PENGATURAN LAINNYA */}
      <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          ⚙️ Pengaturan Lainnya
        </Text>

        <View style={[styles.settingItem, theme === 'dark' && styles.settingItemDark]}>
          <View style={styles.settingTextContainer}>
            <Text style={[styles.settingLabel, theme === 'dark' && styles.textDark]}>
              Buka Kunci Swipe Drawer
            </Text>
            <Text style={[styles.settingDescription, theme === 'dark' && styles.textSecondaryDark]}>
              Aktifkan gesture buka drawer dengan swipe
            </Text>
          </View>
          <Switch
            value={!drawerLocked}
            onValueChange={handleToggleDrawerLock}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={!drawerLocked ? '#007AFF' : '#f4f3f4'}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.homeButton, theme === 'dark' && styles.homeButtonDark]}
        onPress={handleGoHome}
      >
        <Text style={styles.homeButtonText}>⬅ Kembali ke Home</Text>
      </TouchableOpacity>

      <View style={[styles.info, theme === 'dark' && styles.infoDark]}>
        <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
          Drawer saat ini: {drawerLocked ? 'TERKUNCI' : 'TERBUKA'}
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
          Tema aktif: {theme === 'dark' ? 'Gelap' : 'Terang'}
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
          Notifikasi aktif: {Object.values(notificationSettings).filter(Boolean).length} dari {Object.values(notificationSettings).length}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D3748',
    textAlign: 'center',
    paddingTop: 20,
  },
  titleDark: {
    color: '#F7FAFC',
  },
  section: {
    backgroundColor: '#fff',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2D3748',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  settingItemDark: {
    backgroundColor: '#4A5568',
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#718096',
  },
  testButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  testButtonDark: {
    backgroundColor: '#2E8B57',
  },
  testButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    marginTop: 8,
  },
  homeButtonDark: {
    backgroundColor: '#3182CE',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  info: {
    margin: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
  },
  infoDark: {
    backgroundColor: '#2D3748',
  },
  infoText: {
    fontSize: 14,
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

export default SettingsScreen;