import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useTheme } from '../contexts/ThemeContext';

interface ProductListProps {
  products: Product[];
  onAddProductPress: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddProductPress,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { width, height } = useWindowDimensions();
  
  // Responsive layout based on screen size
  const isLandscape = width > height;
  const numColumns = isLandscape ? 3 : 2;

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#2D3748' : '#fff'}
      />
      
      <View style={[styles.header, theme === 'dark' && styles.headerDark]}>
        <Text style={[styles.title, theme === 'dark' && styles.titleDark]}>
          Mini E-Commerce
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.themeButton, theme === 'dark' && styles.themeButtonDark]}
            onPress={toggleTheme}
          >
            <Text style={[styles.themeButtonText, theme === 'dark' && styles.themeButtonTextDark]}>
              {theme === 'light' ? '🌙' : '☀️'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.addButton, theme === 'dark' && styles.addButtonDark]}
            onPress={onAddProductPress}
          >
            <Text style={styles.addButtonText}>Add produk</Text>
          </TouchableOpacity>
        </View>
      </View>

      {products.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, theme === 'dark' && styles.textDark]}>
            Belum ada produk. Tambah produk pertama Anda!
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          key={numColumns} // Re-render when columns change
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 8, // Additional top padding for status bar
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerDark: {
    backgroundColor: '#2D3748',
    borderBottomColor: '#4A5568',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  titleDark: {
    color: '#F7FAFC',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeButton: {
    backgroundColor: '#EDF2F7',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  themeButtonDark: {
    backgroundColor: '#4A5568',
  },
  themeButtonText: {
    fontSize: 16,
  },
  themeButtonTextDark: {
    color: '#F7FAFC',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonDark: {
    backgroundColor: '#3182CE',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    padding: 8,
    paddingBottom: 20, // Extra padding at bottom
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  textDark: {
    color: '#A0AEC0',
  },
});

export default ProductList;