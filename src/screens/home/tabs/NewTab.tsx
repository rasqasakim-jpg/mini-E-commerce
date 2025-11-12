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

const newProducts: Product[] = [
  {
    id: 'n1',
    name: 'iPhone 15 Pro Max',
    price: 24999000,
    imageUrl: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846359318',
    description: 'iPhone terbaru dengan titanium',
    category: 'electronics',
    discount: 10
  },
  {
    id: 'n2',
    name: 'Samsung Galaxy Z Flip5',
    price: 15999000,
    imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/id/2307/gallery/id-galaxy-z-flip5-f731--sm-f731blbexid-536258331?$650_519_PNG$',
    description: 'Smartphone foldable terbaru',
    category: 'electronics',
    discount: 15
  },
  {
    id: 'n3',
    name: 'MacBook Pro M3',
    price: 29999000,
    imageUrl: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp-14-2023?wid=2000&hei=1536&fmt=jpeg&qlt=95&.v=1684268261126',
    description: 'Laptop profesional dengan chip M3',
    category: 'electronics',
    discount: 5
  },
  {
    id: 'n4',
    name: 'Sony WH-1000XM5',
    price: 4999000,
    imageUrl: 'https://www.sony.co.id/image/5a6e12d5e4d6c9664cbbc6b9d3b4c9f3?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=2515&hei=1320',
    description: 'Headphone noise cancelling terbaru',
    category: 'electronics',
    discount: 8
  }
];

const NewTab: React.FC = () => {
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
        🆕 Produk Terbaru
      </Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
        Produk baru yang baru saja rilis
      </Text>
      
      <FlatList
        data={newProducts}
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

export default NewTab;