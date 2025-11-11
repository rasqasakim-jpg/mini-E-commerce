import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import ProductCard from '../../../components/ProductCard'; 

const PopularTab: React.FC = () => {
  const { theme } = useTheme();

  // Sample data untuk produk populer
  const popularProducts = [
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
      imageUrl: 'https://i.pinimg.com/1200x/ad/44/22/ad4422a51d0f4763d09f094f36329243.jpg',
      description: 'Smartphone flagship dengan kamera terbaik'
    },
      {
      id: '18',
      name: 'Short pants',
      price: 300000,
      imageUrl: 'https://i.pinimg.com/736x/a2/39/39/a23939eb25208dafc39dcd96257ac311.jpg',
      description: 'celana pendek jeans'
    },
      {
      id: '19',
      name: 'Varsity SweatShirt',
      price: 600000,
      imageUrl: 'https://i.pinimg.com/1200x/78/06/c7/7806c77dc405dc428ca8c570c1517df1.jpg',
      description: 'Round neck sweatshirt with long sleeves. Ribbed trim. Varsity print on the front. Fabric with 81% cotton.'
    },
  ];

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <FlatList
        data={popularProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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

export default PopularTab;