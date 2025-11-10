import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../../../contexts/ThemeContext'; 
import ProductCard from '../../../../components/ProductCard';

const NewTab: React.FC = () => {
  const { theme } = useTheme();

  const newProducts = [
    {
      id: '28',
      name: 'kunci pas',
      price: 400000,
      imageUrl: 'https://i.pinimg.com/736x/fe/c5/ad/fec5ad6962de18ef1dd4f66c4bf20240.jpg',
      description: 'Kunci Pas Kode : 01002000412 Merk : TEKIRO Tipe : 18 X 19 mm Status : Siap Berat Kirim : 1 kg Material : Chrome Vanadium'
    },
     {
      id: '29',
      name: 'Hummer Drill',
      price: 80000,
      imageUrl: 'https://i.pinimg.com/1200x/87/ae/58/87ae5830560b97d11d1a99d8c1865431.jpg',
      description: 'Shop Senix X2 18V Brushless Hammer Drill Skin at Hammer Roo. Fast shipping Australia wide.'
    },
      {
      id: '30',
      name: 'kunci pas',
      price: 50000,
      imageUrl: 'https://i.pinimg.com/736x/d0/52/59/d05259b3b68f3d35278a0a889d54a2f4.jpg',
      description: 'kunci pas bulat'
    },
      {
      id: '31',
      name: 'Obeng plus min',
      price: 80000,
      imageUrl: 'https://i.pinimg.com/1200x/69/59/1f/69591f25adf7d5fb5aa4dcea24e76c0c.jpg',
      description: 'obeng gagang karet +/-'
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