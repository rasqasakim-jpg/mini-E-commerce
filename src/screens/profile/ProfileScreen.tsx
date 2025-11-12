import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DrawerParamList } from '../../navigation/DrawerNavigator';

type ProfileScreenRouteProp = RouteProp<DrawerParamList, 'MainApp'>;

const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute<ProfileScreenRouteProp>();
  const { width, height } = useWindowDimensions();
  const [userId, setUserId] = useState<string>('');

  // ✅ SOAL 1: Menerima parameter dari Parent Navigator (Drawer)
  useEffect(() => {
    const userParam = route.params?.userId;
    if (userParam) {
      setUserId(userParam);
    } else {
      // Fallback untuk development
      setUserId('U123');
    }
  }, [route.params]);

  const isLandscape = width > height;

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={[
        styles.content, 
        isLandscape && styles.contentLandscape
      ]}>
        <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
          Profile Pengguna
        </Text>
        
        <View style={[styles.infoCard, theme === 'dark' && styles.infoCardDark]}>
          <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
            User ID:
          </Text>
          <Text style={[styles.value, theme === 'dark' && styles.valueDark]}>
            {userId || 'Tidak tersedia'}
          </Text>
        </View>

        <View style={[styles.infoCard, theme === 'dark' && styles.infoCardDark]}>
          <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
            Nama:
          </Text>
          <Text style={[styles.value, theme === 'dark' && styles.valueDark]}>
            Defense Irgi Harnoyo
          </Text>
        </View>

        <View style={[styles.infoCard, theme === 'dark' && styles.infoCardDark]}>
          <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
            Email:
          </Text>
          <Text style={[styles.value, theme === 'dark' && styles.valueDark]}>
            deffnoy@gmail.com
          </Text>
        </View>

        <Text style={[styles.note, theme === 'dark' && styles.textSecondaryDark]}>
          User ID berhasil diterima dari parameter Root Drawer Navigator
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
  content: {
    padding: 20,
    flex: 1,
  },
  contentLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D3748',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoCardDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    color: '#2D3748',
    fontWeight: 'bold',
  },
  valueDark: {
    color: '#F7FAFC',
  },
  note: {
    fontSize: 12,
    color: '#718096',
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ProfileScreen;