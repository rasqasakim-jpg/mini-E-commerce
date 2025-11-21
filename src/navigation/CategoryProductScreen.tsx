import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import ProductItem from '../components/ProductItem';

// Perbaikan: Definisikan tipe Product yang lebih lengkap sesuai kebutuhan ProductItem
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string; // Diubah dari imageUrl menjadi image agar sesuai dengan ProductItem
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  discount?: number;
}

// Mock data, sama seperti di ProductDetailScreen
const mockProducts: { [key: string]: Product } = {
  '1': { id: '1', name: 'iPhone 14 Pro Max', price: 18999000, originalPrice: 19999000, description: 'iPhone 14 Pro Max...', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop', category: 'Elektronik', rating: 4.8, reviewCount: 1247, inStock: true },
  '2': { id: '2', name: 'Nike Air Jordan 1', price: 2499000, originalPrice: 2999000, description: 'Sepatu basket iconic...', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', category: 'Pakaian', rating: 4.6, reviewCount: 892, inStock: true },
  '3': { id: '3', name: 'MacBook Pro M2', price: 27999000, description: 'Laptop profesional...', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop', category: 'Elektronik', rating: 4.9, reviewCount: 567, inStock: false },
  '4': { id: '4', name: 'Rendang Sapi', price: 50000, description: 'Rendang sapi asli Padang.', image: 'https://images.unsplash.com/photo-1565299585323-151f1a427cc2?w=300&h=300&fit=crop', category: 'Makanan', rating: 4.9, reviewCount: 2000, inStock: true },
  '5': { id: '5', name: 'Helm KYT', price: 450000, description: 'Helm full face.', image: 'https://plus.unsplash.com/premium_photo-1677093957238-3b39a75a4450?w=300&h=300&fit=crop', category: 'Otomotif', rating: 4.5, reviewCount: 300, inStock: true },
  '6': { id: '6', name: 'Popok Bayi', price: 75000, description: 'Popok sekali pakai.', image: 'https://images.unsplash.com/photo-1546015229-fee17604283a?w=300&h=300&fit=crop', category: 'Bayi', rating: 4.7, reviewCount: 500, inStock: true },
  '7': { id: '7', name: 'PS5 Controller', price: 1250000, description: 'Controller DualSense untuk PS5.', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop', category: 'Hiburan', rating: 4.8, reviewCount: 800, inStock: true },
};

type CategoryProductScreenRouteProp = RouteProp<{ params: { category: string } }, 'params'>;

const CategoryProductScreen: React.FC = () => {
  const route = useRoute<CategoryProductScreenRouteProp>();
  const { category } = route.params;
  const { theme } = useTheme();

  // Filter produk berdasarkan kategori
  const filteredProducts = useMemo(() => {
    return Object.values(mockProducts).filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }, [category]);

  if (!filteredProducts) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const renderEmpty = () => (
    <View style={styles.centerContainer}>
      <Text style={[styles.emptyText, theme === 'dark' && styles.textDark]}>
        😢 Belum ada produk untuk kategori "{category}".
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  listContent: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  textDark: {
    color: '#A0AEC0',
  },
});

export default CategoryProductScreen;