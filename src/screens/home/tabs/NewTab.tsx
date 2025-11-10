import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import ProductCard from '../../../components/ProductCard';

const NewTab: React.FC = () => {
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

export default NewTab;