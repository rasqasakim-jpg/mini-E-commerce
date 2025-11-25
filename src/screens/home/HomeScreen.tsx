import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { startStoreProximityAlert, stopStoreProximityAlert } from '../../services/GeofencingService'; // ✅ IMPORT BARU

type RootStackParamList = {
  HomeTabs: undefined;
  ProductDetail: { productId: string };
};

type CategoryType = 
  | 'Elektronik' 
  | 'Pakaian' 
  | 'Makanan' 
  | 'Otomotif' 
  | 'Hiburan' 
  | 'Bayi';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const [isNearStore, setIsNearStore] = useState(false); // ✅ STATE BARU

  useEffect(() => {
    // ✅ AKTIFKAN GEOFENCING SAAT KOMPONEN MOUNT
    const initGeofencing = async () => {
      try {
        await startStoreProximityAlert();
        console.log('🏪 Geofencing activated for store proximity');
      } catch (error) {
        console.error('Error activating geofencing:', error);
      }
    };

    initGeofencing();

    // ✅ CLEANUP: MATIKAN GEOFENCING SAAT KOMPONEN UNMOUNT
    return () => {
      stopStoreProximityAlert();
      console.log('🛑 Geofencing deactivated');
    };
  }, []);

  const featuredProducts = [
    {
      id: '1',
      name: 'iPhone 14 Pro Max',
      price: 18999000,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop',
      category: 'Elektronik' as CategoryType
    },
    {
      id: '2', 
      name: 'Nike Air Jordan 1',
      price: 2499000,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      category: 'Pakaian' as CategoryType
    },
    {
      id: '3',
      name: 'MacBook Pro M2',
      price: 27999000,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
      category: 'Elektronik' as CategoryType
    },
    {
      id: '4',
      name: 'Samsung Galaxy S23',
      price: 12999000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
      category: 'Elektronik' as CategoryType
    }
  ];

  const categories = [
    { name: 'Elektronik' as CategoryType, icon: '📱', count: 124 },
    { name: 'Pakaian' as CategoryType, icon: '👕', count: 89 },
    { name: 'Makanan' as CategoryType, icon: '🍔', count: 67 },
    { name: 'Otomotif' as CategoryType, icon: '🚗', count: 45 },
    { name: 'Hiburan' as CategoryType, icon: '🎮', count: 56 },
    { name: 'Bayi' as CategoryType, icon: '👶', count: 34 },
  ];

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleCategoryPress = (categoryName: CategoryType) => {
    const tabMap: Record<CategoryType, string> = {
      'Elektronik': 'Elektronik',
      'Pakaian': 'Pakaian', 
      'Makanan': 'Makanan',
      'Otomotif': 'Otomotif',
      'Hiburan': 'Hiburan',
      'Bayi': 'Bayi'
    };
    const targetTab = tabMap[categoryName];
    console.log('Navigating to tab:', targetTab);
  };

  // ✅ FUNGSI UNTUK TEST GEOFENCING MANUAL
  const testGeofencing = () => {
    Alert.alert(
      'Test Geofencing',
      'Fitur geofencing sudah aktif! Aplikasi akan memberi notifikasi otomatis ketika Anda mendekati toko utama dalam radius 100 meter.',
      [
        { 
          text: 'OK', 
          onPress: () => console.log('User acknowledged geofencing test') 
        },
        {
          text: 'Lihat Lokasi Toko',
          onPress: () => {
            // Navigate to store location map
            console.log('Navigate to store location');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
          Selamat Datang!
        </Text>
        <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
          Temukan produk terbaik untuk Anda
        </Text>

        {/* ✅ BANNER GEOFENCING */}
        <TouchableOpacity 
          style={[styles.geofencingBanner, theme === 'dark' && styles.geofencingBannerDark]}
          onPress={testGeofencing}
        >
          <Text style={styles.geofencingIcon}>📍</Text>
          <View style={styles.geofencingTextContainer}>
            <Text style={styles.geofencingTitle}>Promo Lokasi Aktif</Text>
            <Text style={styles.geofencingSubtitle}>
              Dapatkan diskon 20% saat dekat toko utama
            </Text>
          </View>
          <Text style={styles.geofencingArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Kategori
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.categoryCard, theme === 'dark' && styles.categoryCardDark]}
                onPress={() => handleCategoryPress(category.name)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[styles.categoryName, theme === 'dark' && styles.textDark]}>
                  {category.name}
                </Text>
                <Text style={[styles.categoryCount, theme === 'dark' && styles.textSecondaryDark]}>
                  {category.count} produk
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            Produk Terpopuler
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.productsContainer}>
            {featuredProducts.map((product) => (
              <TouchableOpacity 
                key={product.id}
                style={[styles.productCard, theme === 'dark' && styles.productCardDark]}
                onPress={() => handleProductPress(product.id)}
              >
                <View style={styles.productImageContainer}>
                  <Image 
                    source={{ uri: product.image }} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.productInfo}>
                  <Text style={[styles.productCategory, theme === 'dark' && styles.textSecondaryDark]}>
                    {product.category}
                  </Text>
                  <Text style={[styles.productName, theme === 'dark' && styles.textDark]} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productPrice}>
                    Rp {product.price.toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Promo Banner */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Flash Sale!</Text>
            <Text style={styles.promoSubtitle}>Diskon hingga 70%</Text>
            <Text style={styles.promoTime}>Berakhir dalam 24:00:00</Text>
          </View>
          <View style={styles.promoImageContainer}>
            <Text style={styles.promoEmoji}>🛍️</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ✅ INFORMASI GEOFENCING */}
      <View style={[styles.infoSection, theme === 'dark' && styles.infoSectionDark]}>
        <Text style={[styles.infoTitle, theme === 'dark' && styles.textDark]}>
          🎯 Fitur Lokasi Cerdas
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
          • Notifikasi promo otomatis saat dekat toko
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
          • Perhitungan ongkir berdasarkan lokasi Anda
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
          • Deteksi toko terdekat secara real-time
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
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 16,
  },
  // ✅ STYLE BARU UNTUK GEOFENCING BANNER
  geofencingBanner: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  geofencingBannerDark: {
    backgroundColor: '#065F46',
  },
  geofencingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  geofencingTextContainer: {
    flex: 1,
  },
  geofencingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  geofencingSubtitle: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  geofencingArrow: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  seeAllText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryCardDark: {
    backgroundColor: '#2D3748',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#718096',
  },
  productsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productCardDark: {
    backgroundColor: '#2D3748',
  },
  productImageContainer: {
    width: '100%',
    height: 120,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productCategory: {
    fontSize: 10,
    color: '#718096',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    height: 40,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  promoBanner: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: 'white',
    marginBottom: 8,
  },
  promoTime: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
  promoImageContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoEmoji: {
    fontSize: 24,
  },
  // ✅ STYLE BARU UNTUK INFO SECTION
  infoSection: {
    backgroundColor: '#EDF2F7',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  infoSectionDark: {
    backgroundColor: '#2D3748',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2D3748',
  },
  infoText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 6,
    lineHeight: 20,
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default HomeScreen;