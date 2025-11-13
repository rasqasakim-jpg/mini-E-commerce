import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type Onboarding2ScreenNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'Onboarding1' | 'Onboarding2' | 'MainApp'  // ✅ TAMBAH INI
>;

type Props = {
  navigation: Onboarding2ScreenNavigationProp;
};

const Onboarding2: React.FC<Props> = ({ navigation }) => {
  const features = [
    {
      icon: '🔍',
      title: 'Cari Produk',
      description: 'Temukan produk yang kamu cari dengan mudah'
    },
    {
      icon: '🛒',
      title: 'Tambah Keranjang',
      description: 'Masukkan produk pilihan ke keranjang belanja'
    },
    {
      icon: '💳',
      title: 'Bayar Mudah',
      description: 'Pembayaran aman dan cepat'
    },
    {
      icon: '📦',
      title: 'Dapatkan Produk',
      description: 'Produk dikirim langsung ke rumah kamu'
    }
  ];

  const popularCategories = [
    { name: 'Elektronik', icon: '📱', color: '#007AFF' },
    { name: 'Fashion', icon: '👕', color: '#FF3B30' },
    { name: 'Makanan', icon: '🍔', color: '#34C759' },
    { name: 'Rumah', icon: '🏠', color: '#FF9500' },
  ];

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.backgroundPattern}>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🛍️ MiniCommerce</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Cara Berbelanja{'\n'}
            <Text style={styles.highlight}>Mudah & Cepat</Text>
          </Text>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>

          {/* Popular Categories */}
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Kategori Populer</Text>
            <View style={styles.categoriesGrid}>
              {popularCategories.map((category, index) => (
                <View key={index} style={styles.categoryCard}>
                  <View 
                    style={[
                      styles.categoryIconContainer,
                      { backgroundColor: category.color + '20' }
                    ]}
                  >
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Produk</Text>
            </View>
            <View style={styles.statDivider}></View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5K+</Text>
              <Text style={styles.statLabel}>Pelanggan</Text>
            </View>
            <View style={styles.statDivider}></View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>99%</Text>
              <Text style={styles.statLabel}>Kepuasan</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MainApp' as never)} // ✅ FIX: tambah 'as never'
        >
          <Text style={styles.primaryButtonText}>Mulai Belanja Sekarang</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Onboarding1' as never)} // ✅ FIX: tambah 'as never'
        >
          <Text style={styles.secondaryButtonText}>Kembali</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressDot}></View>
          <View style={[styles.progressDot, styles.activeDot]}></View>
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
    top: -80,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: '30%',
    right: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    lineHeight: 36,
    marginBottom: 40,
  },
  highlight: {
    color: '#007AFF',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  categoriesSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    alignItems: 'center',
    width: (width - 60) / 4,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#dee2e6',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
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
    marginTop: 20,
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

export default Onboarding2;