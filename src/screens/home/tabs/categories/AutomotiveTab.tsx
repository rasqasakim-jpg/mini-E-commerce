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
    name: 'Michelin Pilot Sport 4',
    price: 1850000,
    imageUrl: 'https://www.michelin.co.id/wp-content/uploads/2021/06/pilot-sport-4.png',
    description: 'Ban performa tinggi untuk mobil sport',
    category: 'automotive'
  },
  {
    id: 'a2',
    name: 'Castrol Magnatec Engine Oil',
    price: 250000,
    imageUrl: 'https://www.castrol.com/content/dam/castrol/country-sites/en_id/indonesia/home/products/magnatec-stop-start-5w-30.png',
    description: 'Oli mesin synthetic 1L',
    category: 'automotive'
  },
  {
    id: 'a3',
    name: 'Bosch Car Battery',
    price: 1250000,
    imageUrl: 'https://www.bosch-aftermarket.com/content/dam/bosch-aftermarket/indonesia/products/automotive-parts/batteries/s5-005-12v-60ah-540a-en.png',
    description: 'Aki mobil 12V 60Ah',
    category: 'automotive'
  },
  {
    id: 'a4',
    name: '3M Car Wax',
    price: 185000,
    imageUrl: 'https://multimedia.3m.com/mws/media/1364106O/3m-36013-car-wax.png',
    description: 'Wax pelindung cat mobil',
    category: 'automotive'
  },
  {
    id: 'a5',
    name: 'Car Vacuum Cleaner',
    price: 350000,
    imageUrl: 'https://www.blackanddecker.com/content/dam/brand/global/products/vacuums/BDV-series/BDV125/BDV125-1.png',
    description: 'Vacuum cleaner portable untuk mobil',
    category: 'automotive'
  },
  {
    id: 'a6',
    name: 'Car Phone Holder',
    price: 85000,
    imageUrl: 'https://www.rammount.com/images/products/ramb166zua19_1.png',
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