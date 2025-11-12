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
    imageUrl: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539',
    description: 'iPhone terbaru dengan dynamic island',
    category: 'electronics'
  },
  {
    id: 'e2', 
    name: 'Samsung Galaxy S23',
    price: 8999000,
    imageUrl: 'https://i.pinimg.com/736x/07/83/6f/07836fa172bd7ecece2bd2bfc33ac371.jpg',
    description: 'Smartphone flagship Samsung',
    category: 'electronics'
  },
  // Add more products...
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