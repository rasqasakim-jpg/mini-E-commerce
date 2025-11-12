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

const entertainmentProducts: Product[] = [
  {
    id: 'en1',
    name: 'PlayStation 5',
    price: 8999000,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop',
    description: 'Console gaming next generation',
    category: 'entertainment'
  },
  {
    id: 'en2',
    name: 'Nintendo Switch',
    price: 4999000,
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop',
    description: 'Console hybrid gaming portable',
    category: 'entertainment'
  },
  {
    id: 'en3',
    name: 'JBL Speaker',
    price: 2499000,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    description: 'Bluetooth speaker waterproof',
    category: 'entertainment'
  },
  {
    id: 'en4',
    name: 'Sony Headphones',
    price: 3999000,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
    description: 'Headphone noise cancelling premium',
    category: 'entertainment'
  },
  {
    id: 'en5',
    name: 'Xbox Controller',
    price: 899000,
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop',
    description: 'Controller wireless untuk Xbox/PC',
    category: 'entertainment'
  },
  {
    id: 'en6',
    name: '4K Blu-ray Movie',
    price: 299000,
    imageUrl: 'https://images.unsplash.com/photo-1489599804158-91c796e572e6?w=400&h=300&fit=crop',
    description: 'Film koleksi 4K Ultra HD',
    category: 'entertainment'
  }
];

const EntertainmentTab: React.FC = () => {
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
        🎮 Hiburan & Gaming
      </Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
        Console, audio, dan entertainment terbaik
      </Text>
      
      <FlatList
        data={entertainmentProducts}
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

export default EntertainmentTab;