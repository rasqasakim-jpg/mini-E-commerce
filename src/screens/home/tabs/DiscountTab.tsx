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
    name: 'iPhone 14 Pro',
    price: 19999000,
    imageUrl: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539',
    description: 'iPhone dengan dynamic island',
    category: 'electronics',
    discount: 20
  },
  {
    id: 'd2',
    name: 'Samsung Galaxy S22',
    price: 7999000,
    imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/id/2202/gallery/id-galaxy-s22-s901-sm-s901ezgdid-thumb-530688308?$650_519_PNG$',
    description: 'Smartphone flagship sebelumnya',
    category: 'electronics',
    discount: 25
  },
  {
    id: 'd3',
    name: 'MacBook Air M1',
    price: 12999000,
    imageUrl: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-gold-select-201810?wid=2000&hei=1536&fmt=jpeg&qlt=95&.v=1664472289650',
    description: 'Laptop tipis dengan chip M1',
    category: 'electronics',
    discount: 30
  },
  {
    id: 'd4',
    name: 'Sony WH-1000XM4',
    price: 2999000,
    imageUrl: 'https://www.sony.co.id/image/5a6e12d5e4d6c9664cbbc6b9d3b4c9f3?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=2515&hei=1320',
    description: 'Headphone noise cancelling',
    category: 'electronics',
    discount: 35
  },
  {
    id: 'd5',
    name: 'Nike Air Force 1',
    price: 1499000,
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WRlPKR.png',
    description: 'Sepatu sneaker klasik',
    category: 'clothing',
    discount: 15
  },
  {
    id: 'd6',
    name: 'PlayStation 4 Pro',
    price: 4999000,
    imageUrl: 'https://gmedia.playstation.com/is/image/SIEPDC/ps4-pro-product-thumbnail-01-en-14sep21?$1600px--t$',
    description: 'Console gaming 4K',
    category: 'entertainment',
    discount: 40
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