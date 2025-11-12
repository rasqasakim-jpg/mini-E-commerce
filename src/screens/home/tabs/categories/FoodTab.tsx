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

const foodProducts: Product[] = [
  {
    id: 'f1',
    name: 'Indomie Goreng',
    price: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=400&h=300&fit=crop',
    description: 'Mi instan goreng rasa special',
    category: 'food'
  },
  {
    id: 'f2',
    name: 'Ultra Milk',
    price: 8000,
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop',
    description: 'Susu UHT full cream 250ml',
    category: 'food'
  },
  {
    id: 'f3',
    name: 'Kopi Kapal Api',
    price: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
    description: 'Kopi bubuk special 200gr',
    category: 'food'
  },
  {
    id: 'f4',
    name: 'Roti Tawar',
    price: 18000,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    description: 'Roti tawar fresh 450gr',
    category: 'food'
  },
  {
    id: 'f5',
    name: 'Chitato Chips',
    price: 12000,
    imageUrl: 'https://images.unsplash.com/photo-1566478901221-4dd2f8b6a299?w=400&h=300&fit=crop',
    description: 'Keripik kentang rasa keju',
    category: 'food'
  },
  {
    id: 'f6',
    name: 'Aqua Mineral',
    price: 4000,
    imageUrl: 'https://images.unsplash.com/photo-1548839149-851a5c9dbfb9?w=400&h=300&fit=crop',
    description: 'Air mineral 600ml',
    category: 'food'
  }
];
const FoodTab: React.FC = () => {
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
        🍕 Makanan & Minuman
      </Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
        Cemilan dan kebutuhan sehari-hari
      </Text>
      
      <FlatList
        data={foodProducts}
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

export default FoodTab;