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

const automotiveProducts: Product[] = [
  {
    id: 'a1',
    name: 'Michelin Tire',
    price: 1850000,
    imageUrl: 'https://images.unsplash.com/photo-1603712610496-5368a6c44998?w=400&h=300&fit=crop',
    description: 'Ban performa tinggi untuk mobil',
    category: 'automotive'
  },
  {
    id: 'a2',
    name: 'Engine Oil',
    price: 250000,
    imageUrl: 'https://images.unsplash.com/photo-1627485937981-bcffa38b0bdc?w=400&h=300&fit=crop',
    description: 'Oli mesin synthetic 1L',
    category: 'automotive'
  },
  {
    id: 'a3',
    name: 'Car Battery',
    price: 1250000,
    imageUrl: 'https://images.unsplash.com/photo-1603712610496-5368a6c44998?w=400&h=300&fit=crop',
    description: 'Aki mobil 12V 60Ah',
    category: 'automotive'
  },
  {
    id: 'a4',
    name: 'Car Wax',
    price: 185000,
    imageUrl: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=400&h=300&fit=crop',
    description: 'Wax pelindung cat mobil',
    category: 'automotive'
  },
  {
    id: 'a5',
    name: 'Car Vacuum',
    price: 350000,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    description: 'Vacuum cleaner portable untuk mobil',
    category: 'automotive'
  },
  {
    id: 'a6',
    name: 'Phone Holder',
    price: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    description: 'Holder smartphone untuk dashboard',
    category: 'automotive'
  }
];

const AutomotiveTab: React.FC = () => {
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
        🚗 Otomotif & Aksesoris
      </Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
        Perlengkapan dan sparepart kendaraan
      </Text>
      
      <FlatList
        data={automotiveProducts}
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

export default AutomotiveTab;