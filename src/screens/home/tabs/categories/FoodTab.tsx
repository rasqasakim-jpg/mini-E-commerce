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
    name: 'Indomie Goreng Special',
    price: 3500,
    imageUrl: 'https://www.indomie.com/uploads/products/indomie-goreng-special-1.png',
    description: 'Mi instan goreng rasa special',
    category: 'food',
    rating: 4.8
  },
  {
    id: 'f2',
    name: 'Ultra Milk Full Cream',
    price: 8000,
    imageUrl: 'https://www.ultramilk.co.id/storage/app/uploads/public/62c/6c8/98c/62c6c898c2d1e991314945.png',
    description: 'Susu UHT full cream 250ml',
    category: 'food',
    rating: 4.5
  },
  {
    id: 'f3',
    name: 'Kopi Kapal Api Special',
    price: 15000,
    imageUrl: 'https://kapalapi.com/wp-content/uploads/2021/06/kape-kapal-api-special-200gr-front-1.png',
    description: 'Kopi bubuk special 200gr',
    category: 'food',
    discount: 10,
    rating: 4.7
  },
  {
    id: 'f4',
    name: 'Roti Tawar Sari Roti',
    price: 18000,
    imageUrl: 'https://sariroti.com/assets/images/products/roti-tawar-regular.png',
    description: 'Roti tawar fresh 450gr',
    category: 'food',
    rating: 4.3
  },
  {
    id: 'f5',
    name: 'Chitato Potato Chips',
    price: 12000,
    imageUrl: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//101/MTA-3518945/chitato_chitato-keju-65gr_full02.jpg',
    description: 'Keripik kentang rasa keju',
    category: 'food',
    discount: 15,
    rating: 4.6
  },
  {
    id: 'f6',
    name: 'Aqua Mineral Water',
    price: 4000,
    imageUrl: 'https://www.aqua.com/uploads/products/aqua-330ml.png',
    description: 'Air mineral 600ml',
    category: 'food',
    rating: 4.9
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