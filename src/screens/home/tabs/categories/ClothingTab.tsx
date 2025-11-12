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
    name: 'Nike Air Max 270',
    price: 1899000,
    imageUrl: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-max-270-shoes-WRlPKR.png',
    description: 'Sepatu sneaker dengan cushioning terbaik',
    category: 'clothing'
  },
  {
    id: 'c2',
    name: 'Uniqlo Ultra Light Down Jacket',
    price: 899000,
    imageUrl: 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/429069/sub/goods_429069_sub14.jpg',
    description: 'Jaket ringan dan hangat untuk segala musim',
    category: 'clothing'
  },
  {
    id: 'c3',
    name: 'Zara Basic T-Shirt',
    price: 299000,
    imageUrl: 'https://static.zara.net/photos///2023/I/0/1/p/8748/310/250/2/w/750/8748310250_1_1_1.jpg?ts=1693392391285',
    description: 'Kaos basic cotton yang nyaman',
    category: 'clothing'
  },
  {
    id: 'c4',
    name: 'H&M Slim Fit Jeans',
    price: 499000,
    imageUrl: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F3a%2F54%2F3a54a14c6e12d08619b4d8f94542e4b79b6c6d7c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
    description: 'Celana jeans slim fit premium',
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