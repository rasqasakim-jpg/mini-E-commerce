import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import ProductCard from '../../../components/ProductCard';
import { Product } from '../../../types';

const discountProducts: Product[] = [
  {
    id: 'd1',
    name: 'iPhone 13',
    price: 12999000,
    imageUrl: 'https://images.unsplash.com/photo-1632661674596-618e45e56d61?w=400&h=300&fit=crop',
    description: 'iPhone dengan performa tinggi',
    category: 'electronics',
    discount: 30
  },
  {
    id: 'd2',
    name: 'Samsung Galaxy S21',
    price: 6999000,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
    description: 'Smartphone flagship sebelumnya',
    category: 'electronics',
    discount: 35
  },
  {
    id: 'd3',
    name: 'MacBook Pro M1',
    price: 14999000,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    description: 'Laptop profesional dengan chip M1',
    category: 'electronics',
    discount: 25
  },
  {
    id: 'd4',
    name: 'Nike Jordan',
    price: 2499000,
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
    description: 'Sepatu basketball limited edition',
    category: 'clothing',
    discount: 40
  },
  {
    id: 'd5',
    name: 'Gaming Chair',
    price: 1999000,
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    description: 'Kursi gaming ergonomis',
    category: 'furniture',
    discount: 20
  },
  {
    id: 'd6',
    name: 'Smart Watch',
    price: 2999000,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    description: 'Smartwatch dengan fitness tracking',
    category: 'electronics',
    discount: 15
  }
];

const DiscountTab: React.FC = () => {
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
        🏷️ Produk Diskon
      </Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
        Hemat hingga 40% dengan promo spesial
      </Text>
      
      <FlatList
        data={discountProducts}
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

export default DiscountTab;