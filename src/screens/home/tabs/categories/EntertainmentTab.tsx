import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../../contexts/ThemeContext'; 
import ProductCard from '../../../../components/ProductCard';

const EntertainmentTab: React.FC = () => {
  const { theme } = useTheme();

  const newProducts = [
    {
      id: '36',
      name: 'Motor cross mini',
      price: 2000000,
      imageUrl: 'https://i.pinimg.com/736x/54/53/6b/54536b351ea59391e2c79b10b53584dc.jpg',
      description: 'Mini motor cross warna hitam'
    },
     {
      id: '37',
      name: 'Spinner',
      price: 100000,
      imageUrl: 'https://i.pinimg.com/736x/4f/44/e2/4f44e29a32c8b3bd27905dcf42d1bc98.jpg',
      description: 'Spinner'
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

export default EntertainmentTab;