import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

type Onboarding1ScreenNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'Onboarding1' | 'Onboarding2' | 'MainApp'  // ✅ TAMBAH INI
>;

type Props = {
  navigation: Onboarding1ScreenNavigationProp;
};

const Onboarding1: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
        <View style={styles.circle3}></View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🛍️ MiniCommerce</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3737/3737372.png' }}
            style={styles.illustration}
          />
          <View style={styles.floatingIcon1}>🔥</View>
          <View style={styles.floatingIcon2}>🚚</View>
          <View style={styles.floatingIcon3}>💰</View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Selamat Datang di{'\n'}
            <Text style={styles.highlight}>MiniCommerce</Text>
          </Text>
          
          <Text style={styles.subtitle}>
            Temukan produk terbaru dengan{'\n'}
            <Text style={styles.bold}>harga terbaik</Text> dan{' '}
            <Text style={styles.bold}>kualitas terjamin</Text>
          </Text>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⭐</Text>
              <Text style={styles.featureText}>Produk Berkualitas</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🚀</Text>
              <Text style={styles.featureText}>Pengiriman Cepat</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🛡️</Text>
              <Text style={styles.featureText}>Garansi 100%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Onboarding2' as never)} // ✅ FIX: tambah 'as never'
        >
          <Text style={styles.primaryButtonText}>Mulai Belanja</Text>
          <Text style={styles.buttonIcon}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('MainApp' as never)} // ✅ FIX: tambah 'as never'
        >
          <Text style={styles.secondaryButtonText}>Lewati</Text>
        </TouchableOpacity>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.activeDot]}></View>
          <View style={styles.progressDot}></View>
          <View style={styles.progressDot}></View>
        </View>
      </View>
    </View>
  );
};

// Styles tetap sama seperti sebelumnya...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 245, 0, 0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: -80,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  circle3: {
    position: 'absolute',
    top: '40%',
    right: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  illustration: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
  },
  floatingIcon1: {
    position: 'absolute',
    top: 20,
    right: 40,
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 20,
    fontSize: 16,
  },
  floatingIcon2: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
    fontSize: 16,
  },
  floatingIcon3: {
    position: 'absolute',
    top: 60,
    left: 40,
    backgroundColor: '#34C759',
    padding: 8,
    borderRadius: 20,
    fontSize: 16,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    lineHeight: 36,
    marginBottom: 16,
  },
  highlight: {
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  bold: {
    fontWeight: '600',
    color: '#1a1a1a',
  },
  featuresContainer: {
    width: '100%',
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 20,
  },
});

export default Onboarding1;