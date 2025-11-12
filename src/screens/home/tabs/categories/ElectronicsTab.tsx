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

const electronicsProducts: Product[] = [
  {
    id: 'e1',
    name: 'iPhone 14 Pro',
    price: 19999000,
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    description: 'iPhone dengan dynamic island',
    category: 'electronics'
  },
  {
    id: 'e2', 
    name: 'Samsung Galaxy S23',
    price: 8999000,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    description: 'Smartphone flagship Samsung',
    category: 'electronics'
  },
  {
    id: 'e3',
    name: 'MacBook Pro',
    price: 22999000,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    description: 'Laptop untuk profesional kreatif',
    category: 'electronics'
  },
  {
    id: 'e4',
    name: 'iPad Air',
    price: 12999000,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    description: 'Tablet serbaguna untuk kerja dan hiburan',
    category: 'electronics'
  },
  {
    id: 'e5',
    name: 'AirPods Pro',
    price: 3999000,
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=300&fit=crop',
    description: 'Earbuds wireless dengan noise cancelling',
    category: 'electronics'
  },
  {
    id: 'e6',
    name: 'Smart TV 55"',
    price: 8999000,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    description: 'TV 4K Ultra HD dengan Smart Features',
    category: 'electronics'
  }
];

const ElectronicsTab: React.FC = () => {
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
        📱 Produk Elektronik
      </Text>
      
      <FlatList
        data={electronicsProducts}
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
  listContent: {
    paddingBottom: 20,
  },
  textDark: {
    color: '#F7FAFC',
  },
});

export default ElectronicsTab;