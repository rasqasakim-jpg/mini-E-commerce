import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../../contexts/ThemeContext';
import ProductCard from '../../../../components/ProductCard';

const ElectronicsTab: React.FC = () => {
  const { theme } = useTheme();

  const newProducts = [
    {
      id: '3',
      name: 'Iphone 17 PRO',
      price: 25000000,
      imageUrl: 'https://i.pinimg.com/1200x/2e/ce/01/2ece01a7aa6938286b3341d88648f12f.jpg',
      description: 'IP terbaru'
    },
     {
      id: '11',
      name: 'Samsung s25 Ultra',
      price: 25000000,
      imageUrl: 'https://i.pinimg.com/736x/d9/82/12/d982123a83fe7a0f6c5ca92e5ea2d814.jpg',
      description: 'Samsung terbaru'
    },
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
       {
      id: '1',
      name: 'iPhone 14 Pro',
      price: 19999000,
      imageUrl: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539',
      description: 'iPhone terbaru dengan dynamic island'
    },
    {
      id: '2', 
      name: 'Samsung Galaxy S23',
      price: 8999000,
      imageUrl: 'https://i.pinimg.com/736x/07/83/6f/07836fa172bd7ecece2bd2bfc33ac371.jpg',
      description: 'Smartphone flagship dengan kamera terbaik'
    },
  ];

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <FlatList
        data={newProducts}
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
  listContent: {
    paddingBottom: 20,
  },
});

export default ElectronicsTab;