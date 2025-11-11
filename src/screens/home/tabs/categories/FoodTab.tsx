import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../../contexts/ThemeContext';
import ProductCard from '../../../../components/ProductCard';

const FoodTab: React.FC = () => {
  const { theme } = useTheme();

  const newProducts = [
    {
      id: '20',
      name: 'Nasgor',
      price: 10000,
      imageUrl: 'https://i.pinimg.com/1200x/94/82/ab/9482ab2e248d249e7daa7fd6924c8d3b.jpg',
      description: 'Nasi goreng jawa'
    },
     {
      id: '21',
      name: 'Spicy korean katsu',
      price: 25000,
      imageUrl: 'https://i.pinimg.com/736x/29/57/de/2957de3534a768aa8698b04defe64ebe.jpg',
      description: 'Spicy korean katsu'
    },
       {
      id: '22',
      name: 'Mie Goreng',
      price: 5000,
      imageUrl: 'https://i.pinimg.com/1200x/74/e6/66/74e66635b6386750a1153937bbacc3ad.jpg',
      description: 'Mie Goreng kos kos an'
    },
      {
      id: '23',
      name: 'Nasi padang',
      price: 20000,
      imageUrl: 'https://i.pinimg.com/736x/e5/1b/23/e51b23732539afe4a8d84d93e7cd184f.jpg',
      description: 'Nasi padang lauk ayam'
    },
      {
      id: '24',
      name: 'Ayam taliwang',
      price: 30000,
      imageUrl: 'https://i.pinimg.com/1200x/80/3c/bc/803cbcabba9e4f43b52ea660ac726b90.jpg',
      description: 'Ayam taliwang bakar tlefon'
    },
      {
      id: '25',
      name: 'French Fries',
      price: 399900,
      imageUrl: 'https://i.pinimg.com/736x/6e/7b/5e/6e7b5e91357a7ce785a75d3449c1ded5.jpg',
      description: 'Ketang Goreng'
    },
       {
      id: '26',
      name: 'Pizza',
      price: 50000,
      imageUrl: 'https://i.pinimg.com/736x/7e/61/ea/7e61ea809dc9fc0223c6c03e8b877e0b.jpg',
      description: 'Pizza italiano dfeliciusso'
    },
    {
      id: '27', 
      name: 'Chocolate Muffin',
      price: 250000,
      imageUrl: 'https://i.pinimg.com/736x/60/c1/72/60c1723d8386ed00ce4e4b2ddb23f786.jpg',
      description: 'Cholotale Muffin mahal'
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

export default FoodTab;