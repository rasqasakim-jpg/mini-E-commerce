import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';

type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  MainApp: undefined; // ✅ PASTIKAN MainApp ada di type
};

type Onboarding2NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding2'>;

interface Props {
  navigation: Onboarding2NavigationProp;
}

const Onboarding2: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const handleGetStarted = () => {
    navigation.navigate('MainApp'); // ✅ NAVIGASI KE MainApp
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/3a/72/d9/3a72d9d44d5bb6d6d0febc52d5b0b8e8.jpg' }}
        style={[styles.image, { width: width * 0.8, height: width * 0.8 }]}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={[styles.title, theme === 'dark' && styles.titleDark]}>
          Mudah & Cepat
        </Text>
        <Text style={[styles.description, theme === 'dark' && styles.descriptionDark]}>
          Beli produk favorit Anda dengan proses yang mudah dan pengiriman yang cepat.
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={[styles.dot, theme === 'dark' && styles.dotDark]} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
        
        <TouchableOpacity
          style={[styles.button, theme === 'dark' && styles.buttonDark]}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Mulai Belanja</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  image: {
    borderRadius: 20,
    marginTop: 40,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2D3748',
  },
  titleDark: {
    color: '#F7FAFC',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#718096',
  },
  descriptionDark: {
    color: '#A0AEC0',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#007AFF',
    width: 24,
  },
  dotDark: {
    backgroundColor: '#4A5568',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#3182CE',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Onboarding2;