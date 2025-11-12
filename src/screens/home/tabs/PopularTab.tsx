import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import ProductCard from '../../../components/ProductCard';
import { Product } from '../../../types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../../navigation/HomeStackNavigator';

type PopularTabNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeTabs'>;

// Sample data dengan category yang lengkap
const popularProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    price: 19999000,
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    description: 'iPhone terbaru dengan dynamic island dan kamera 48MP',
    category: 'electronics',
    rating: 4.9,
    discount: 10
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    price: 8999000,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    description: 'Smartphone flagship dengan kamera terbaik',
    category: 'electronics',
    discount: 15,
    rating: 4.8
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    price: 15999000,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
    description: 'Laptop tipis dan ringan dengan chip M2',
    category: 'electronics',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Nike Air Force 1',
    price: 1899000,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    description: 'Sepatu sneaker klasik yang nyaman',
    category: 'clothing',
    discount: 20,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Sony Headphones',
    price: 2999000,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    description: 'Headphone wireless dengan noise cancelling',
    category: 'electronics',
    discount: 25,
    rating: 4.8
  },
  {
    id: '6',
    name: 'Indomie Goreng',
    price: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=400&h=300&fit=crop',
    description: 'Mi instan goreng rasa special',
    category: 'food',
    rating: 4.9
  }
];
const PopularTab: React.FC = () => {
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation<PopularTabNavigationProp>();
  
  const isLandscape = width > height;
  const numColumns = isLandscape ? 3 : 2;

  // ✅ SOAL 7: Dynamic Header Title based on Focus
  useFocusEffect(
    useCallback(() => {
      // Set header title when focused
      navigation.setOptions({
        title: 'Product ter Populer!',
      });

      return () => {
        // Reset header title when blurred
        navigation.setOptions({
          title: 'Mini E-Commerce',
        });
      };
    }, [navigation])
  );

  // Navigasi ke tab Diskon
  const navigateToDiscountTab = () => {
    // Dapatkan parent navigator untuk akses tab navigator
    const tabNavigator = navigation.getParent();
    if (tabNavigator) {
      (tabNavigator as any).navigate('Diskon');
    }
  };

  const handleSpecialOffer = () => {
    Alert.alert(
      'Penawaran Spesial! 🎉',
      'Dapatkan diskon hingga 50% untuk produk pilihan!',
      [
        { text: 'Tutup', style: 'cancel' },
        { 
          text: 'Lihat Promo', 
          onPress: navigateToDiscountTab
        }
      ]
    );
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      {/* ✅ HAPUS tombol kategori, hanya tombol promo di tengah */}
      <View style={styles.promoButtonContainer}>
        <TouchableOpacity
          style={[styles.promoButton, theme === 'dark' && styles.promoButtonDark]}
          onPress={handleSpecialOffer}
        >
          <Text style={styles.promoButtonText}>🎁 Promo Spesial</Text>
        </TouchableOpacity>
      </View>

      {/* Banner Promo */}
      <View style={[styles.promoBanner, theme === 'dark' && styles.promoBannerDark]}>
        <Text style={[styles.promoTitle, theme === 'dark' && styles.textDark]}>
          🔥 Produk Terpopuler
        </Text>
        <Text style={[styles.promoSubtitle, theme === 'dark' && styles.textSecondaryDark]}>
          Pilihan terbaik berdasarkan penjualan
        </Text>
      </View>

      <FlatList
        data={popularProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        key={numColumns}
        ListHeaderComponent={
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
             Trending Hari Ini
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 8,
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  // ✅ PERBAIKAN: Container untuk tombol promo di tengah
  promoButtonContainer: {
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
  },
  promoButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  promoButtonDark: {
    backgroundColor: '#E53E3E',
  },
  promoButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  promoBanner: {
    backgroundColor: '#E6F3FF',
    padding: 16,
    borderRadius: 12,
    margin: 16,
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  promoBannerDark: {
    backgroundColor: '#2D3748',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 8,
    color: '#2D3748',
  },
  listContent: {
    paddingBottom: 20,
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default PopularTab;