import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../../../../contexts/ThemeContext';
import ProductCard from '../../../../components/ProductCard';
import { Product } from '../../../../types';

const clothingProducts: Product[] = [
  {
    id: 'c1',
    name: 'Nike Air Max',
    price: 1899000,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    description: 'Sepatu sneaker dengan cushioning terbaik',
    category: 'clothing'
  },
  {
    id: 'c2',
    name: 'Uniqlo Jacket',
    price: 899000,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    description: 'Jaket ringan dan hangat untuk segala musim',
    category: 'clothing'
  },
  {
    id: 'c3',
    name: 'Zara T-Shirt',
    price: 299000,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    description: 'Kaos basic cotton yang nyaman',
    category: 'clothing'
  },
  {
    id: 'c4',
    name: 'H&M Jeans',
    price: 499000,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
    description: 'Celana jeans slim fit premium',
    category: 'clothing'
  },
  {
    id: 'c5',
    name: 'Adidas Hoodie',
    price: 799000,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
    description: 'Hoodie comfortable untuk sehari-hari',
    category: 'clothing'
  },
  {
    id: 'c6',
    name: 'Puma Backpack',
    price: 599000,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    description: 'Tas ransel stylish dan fungsional',
    category: 'clothing'
  }
];

const ClothingTab: React.FC = () => {
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();
  
  const isLandscape = width > height;
  const numColumns = isLandscape ? 3 : 2;

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
        👕 Fashion & Pakaian
      </Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
        Trend terbaru untuk gaya sehari-hari
      </Text>
      
      <FlatList
        data={clothingProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        key={numColumns}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    color: '#718096',
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

export default ClothingTab;