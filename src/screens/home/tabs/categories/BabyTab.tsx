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

const babyProducts: Product[] = [
  {
    id: 'b1',
    name: 'Baby Diapers',
    price: 125000,
    imageUrl: 'https://images.unsplash.com/photo-1584839404049-94c6c0a78e13?w=400&h=300&fit=crop',
    description: 'Popok bayi size M 32 pcs',
    category: 'baby'
  },
  {
    id: 'b2',
    name: 'Baby Bottle',
    price: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1571781418607-64dacd784b0a?w=400&h=300&fit=crop',
    description: 'Botol susu bayi 260ml',
    category: 'baby'
  },
  {
    id: 'b3',
    name: 'Baby Stroller',
    price: 750000,
    imageUrl: 'https://images.unsplash.com/photo-1508779938392-316b9ef9ff48?w=400&h=300&fit=crop',
    description: 'Kereta dorong bayi lipat portable',
    category: 'baby'
  },
  {
    id: 'b4',
    name: 'Baby Shampoo',
    price: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1584305574647-469b2f461d46?w=400&h=300&fit=crop',
    description: 'Shampoo bayi 100ml',
    category: 'baby'
  },
  {
    id: 'b5',
    name: 'Baby Toys',
    price: 150000,
    imageUrl: 'https://images.unsplash.com/photo-1533324268742-60b233802eef?w=400&h=300&fit=crop',
    description: 'Mainan edukatif untuk bayi',
    category: 'baby'
  },
  {
    id: 'b6',
    name: 'Baby Food',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1570913149826-2f1f42b40da6?w=400&h=300&fit=crop',
    description: 'Makanan organik untuk bayi 6m+',
    category: 'baby'
  }
];

const BabyTab: React.FC = () => {
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
        👶 Perlengkapan Bayi
      </Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
        Kebutuhan bayi dan balita terlengkap
      </Text>
      
      <FlatList
        data={babyProducts}
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

export default BabyTab;