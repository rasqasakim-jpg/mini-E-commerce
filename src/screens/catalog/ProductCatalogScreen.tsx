import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Product } from '../../types';
import ProductList from '../../components/ProductList';
import AddProductModal from '../../components/AddProductModal';
import { useTheme } from '../../contexts/ThemeContext';

// Pindahkan initialProducts ke sini
const initialProducts: Product[] = [
  
];

const ProductCatalogScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();

  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now().toString(),
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <SafeAreaView style={[
      styles.container, 
      theme === 'dark' && styles.containerDark
    ]}>
      <ProductList
        products={products}
        onAddProductPress={() => setModalVisible(true)}
      />
      
      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddProduct={handleAddProduct}
      />
    </SafeAreaView>
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
});

export default ProductCatalogScreen;