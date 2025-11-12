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
    name: 'Pampers Premium Care',
    price: 125000,
    imageUrl: 'https://www.pampers.com/en-us/sites/pampers_us/files/styles/product_image/public/lpn-pampers-premium-care-newborn-diapers.png?itok=ZfKqXqJ6',
    description: 'Popok bayi size M 32 pcs',
    category: 'baby'
  },
  {
    id: 'b2',
    name: 'Philips Avent Baby Bottle',
    price: 85000,
    imageUrl: 'https://www.philips.co.id/c-dam/b2c/master/catalog-pdp-pet/AVENT-natural-baby-bottle-260ml-SCF673-27.png',
    description: 'Botol susu bayi 260ml',
    category: 'baby'
  },
  {
    id: 'b3',
    name: 'MamyPoko Extra Dry',
    price: 95000,
    imageUrl: 'https://mamypoko.co.id/images/products/pants-m.png',
    description: 'Popok celana size M 22 pcs',
    category: 'baby'
  },
  {
    id: 'b4',
    name: 'Baby Stroller Portable',
    price: 750000,
    imageUrl: 'https://www.babyzen.com/wp-content/uploads/2021/06/BABYZEN-YOYO2_06-2021_Stroller_Graphite-Grey_Fold_Right.png',
    description: 'Kereta dorong bayi lipat portable',
    category: 'baby'
  },
  {
    id: 'b5',
    name: 'Johnson Baby Shampoo',
    price: 25000,
    imageUrl: 'https://www.johnsonsbaby.com/sites/jbaby_us/files/styles/product_image/public/product-images/johnsons-baby-shampoo-15oz-front.png?itok=6Zf9ZJ9Q',
    description: 'Shampoo bayi 100ml',
    category: 'baby'
  },
  {
    id: 'b6',
    name: 'Baby Toy Educational Set',
    price: 150000,
    imageUrl: 'https://www.fisher-price.com/content/dam/fp/multi-images/play-learn-toy-images/CGN33.png',
    description: 'Mainan edukatif untuk bayi',
    category: 'baby'
  },
  {
    id: 'b7',
    name: 'Baby Food Organic',
    price: 35000,
    imageUrl: 'https://www.gerber.com/sites/gerber.com/files/2021-06/gerber-organic-1st-foods-peas.png',
    description: 'Makanan organik untuk bayi 6m+',
    category: 'baby'
  },
  {
    id: 'b8',
    name: 'Baby Carrier',
    price: 450000,
    imageUrl: 'https://www.ergobaby.com/wp-content/uploads/2021/08/Omni-Breeze-Front-View.png',
    description: 'Gendongan bayi ergonomis',
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