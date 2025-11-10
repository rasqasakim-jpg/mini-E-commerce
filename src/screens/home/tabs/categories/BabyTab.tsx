import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../../contexts/ThemeContext'; 
import ProductCard from '../../../../components/ProductCard';

const NewTab: React.FC = () => {
  const { theme } = useTheme();

  const newProducts = [
    {
      id: '32',
      name: 'Dorongan bayi',
      price: 600000,
      imageUrl: 'https://i.pinimg.com/736x/9e/d0/a4/9ed0a41895fc3b6c24cae44bc30b1a3f.jpg',
      description: 'Choceto city v8'
    },
     {
      id: '33',
      name: 'Gendongan bayi',
      price: 450000,
      imageUrl: 'https://i.pinimg.com/1200x/d1/be/cd/d1becd9e66c39e0fd245a8c983b48d78.jpg',
      description: 'Ergobaby Baby Carrier for Newborns, Adaptable 3-Positions Comfortable Carrier, Various Colours'
    },
      {
      id: '34',
      name: 'Botol susu bayi',
      price: 20000,
      imageUrl: 'https://i.pinimg.com/736x/ad/79/e2/ad79e2cd4d97adbd5a4399354e62818b.jpg',
      description: 'Warna putih, 130ML'
    },
      {
      id: '35',
      name: 'Tas perlengkapan bayi',
      price: 50000,
      imageUrl: 'https://i.pinimg.com/736x/49/28/7f/49287f02f42b3bc1bf96b5f26f371c6d.jpg',
      description: 'Tas warna coklat'
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