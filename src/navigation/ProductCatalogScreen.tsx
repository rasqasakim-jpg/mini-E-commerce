import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import ProductList from '../../components/ProductList';
import AddProductModal from '../../components/AddProductModal';
import { Product } from '../../types';
import { useStorage } from '../../contexts/StorageContext';


// Tentukan tipe untuk route params
type CatalogRouteProp = RouteProp<{ params?: { handleAddProduct?: () => void } }, 'params'>;

const ProductCatalogScreen: React.FC = () => {
  const { products, addProduct } = useStorage();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<CatalogRouteProp>();

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    addProduct(newProduct);
  };

  // Efek ini akan "mendengarkan" event dari tombol header
  useEffect(() => {
    if (route.params?.handleAddProduct) {
      setModalVisible(true);
      // Reset parameter agar modal tidak terbuka lagi saat kembali ke layar ini
      navigation.setParams({ handleAddProduct: undefined });
    }
  }, [route.params?.handleAddProduct, navigation]);

  return (
    <View style={styles.container}>
      <ProductList 
        products={products} 
        onAddProductPress={() => setModalVisible(true)} 
      />
      <AddProductModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddProduct={handleAddProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ProductCatalogScreen;