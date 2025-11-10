import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import ProductCard from '../../../components/ProductCard';

const DiscountTab: React.FC = () => {
  const { theme } = useTheme();

  // Side effect untuk membuktikan lazy loading
  useEffect(() => {
    console.log('💰 Tab Diskon: DIFOKUS - Konten dimuat');

    return () => {
      console.log('💰 Tab Diskon: DITINGGALKAN - Konten dibersihkan');
    };
  }, []);

  const discountProducts = [
    {
      id: '4',
      name: 'Headphone Sony WH-1000XM4',
      price: 399900,
      imageUrl: 'https://i.pinimg.com/736x/60/0b/d3/600bd3bc8a4df0f42d6b828e749ec7dc.jpg',
      description: 'Noise cancelling headphone premium - DISKON 20%'
    },
      {
      id: '12',
      name: 'Mouse',
      price: 200000,
      imageUrl: 'https://i.pinimg.com/1200x/9d/77/f1/9d77f14e0739fb23cba5111f530d0c0f.jpg',
      description: 'Model D 2 PRO Series Wireless Mouse 4K/8KHz Edition - DISKON 15%'
    },
      {
      id: '13',
      name: 'Earphone',
      price: 80000,
      imageUrl: 'https://i.pinimg.com/1200x/20/c3/b1/20c3b11cc696928982961a88acf60660.jpg',
      description: 'SI TWS 11 - DISKON 20%'
    },
      {
      id: '14',
      name: 'Mouse Pad',
      price: 399900,
      imageUrl: 'https://i.pinimg.com/1200x/9f/43/ff/9f43ffda175e45fbfcd48e7c1b18fc95.jpg',
      description: 'Gaming Mouse Pads - DISKON 20%'
    },
  ];

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.titleDark]}>
        Produk Diskon Spesial
      </Text>
      <FlatList
        data={discountProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 8,
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#2D3748',
  },
  titleDark: {
    color: '#F7FAFC',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default DiscountTab;