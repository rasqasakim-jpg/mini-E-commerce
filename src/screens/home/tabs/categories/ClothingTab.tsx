import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../../contexts/ThemeContext'; 
import ProductCard from '../../../../components/ProductCard';

const ClothingTab: React.FC = () => {
  const { theme } = useTheme();

  const newProducts = [
    {
      id: '14',
      name: 'Hoddie dexternity',
      price: 400000,
      imageUrl: 'https://i.pinimg.com/736x/e1/d5/c0/e1d5c05f240d48af9e8b16a72bdc58f7.jpg',
      description: 'brand dexternity'
    },
     {
      id: '15',
      name: 'Sweatshirt',
      price: 550000,
      imageUrl: 'https://i.pinimg.com/1200x/9a/f1/b7/9af1b7af7bf66153f9a17c3288423762.jpg',
      description: 'Claim Dot Men Letter Graphic Raglan Sleeve Long Sleeve Going Out Color Block Sweatshirt'
    },
      {
      id: '16',
      name: 'Jeans',
      price: 1000000,
      imageUrl: 'https://i.pinimg.com/1200x/94/af/fd/94affd18d735d4edd67e4f8e8b1e1325.jpg',
      description: 'Bowtoans jeans raw denim'
    },
      {
      id: '17',
      name: 'Kaos polos',
      price: 50000,
      imageUrl: 'https://i.pinimg.com/1200x/27/b5/a1/27b5a1602087a7113d58118e357bdc54.jpg',
      description: 'Polos shirt white'
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

export default ClothingTab;