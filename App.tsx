import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from './src/types';
import ProductList from './src/components/ProductList';
import AddProductModal from './src/components/AddProductModal';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

// Initial sample products dengan URL gambar dari kamu
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy S23',
    price: 8999000,
    imageUrl: 'https://i.pinimg.com/736x/07/83/6f/07836fa172bd7ecece2bd2bfc33ac371.jpg',
    description: 'Smartphone flagship dengan kamera terbaik'
  },
  {
    id: '2',
    name: 'iPhone 14 Pro',
    price: 19999000,
    imageUrl: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539',
    description: 'iPhone terbaru dengan dynamic island'
  },
  {
    id: '3',
    name: 'Laptop ASUS ROG Zephyrus',
    price: 25000000,
    imageUrl: 'https://i.pinimg.com/736x/db/1f/e2/db1fe2a55af18c48840879f755de0736.jpg',
    description: 'Laptop gaming performa tinggi'
  },
  {
    id: '4',
    name: 'Headphone Sony WH-1000XM4',
    price: 3999000,
    imageUrl: 'https://i.pinimg.com/736x/60/0b/d3/600bd3bc8a4df0f42d6b828e749ec7dc.jpg',
    description: 'Noise cancelling headphone premium'
  },
  {
    id: '5',
    name: 'Apple Watch Series 8',
    price: 6999000,
    imageUrl: 'https://i.pinimg.com/1200x/1a/92/75/1a9275357966593e23aa791c208f5fc1.jpg',
    description: 'Smartwatch dengan fitur kesehatan lengkap'
  },
  {
    id: '6',
    name: 'iPad Air 5',
    price: 8999000,
    imageUrl: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1645066732666',
    description: 'iPad dengan chip M1 yang powerful'
  },
  {
    id: '7',
    name: 'Kamera Canon EOS R6',
    price: 32999000,
    imageUrl: 'https://i.pinimg.com/736x/63/8b/d5/638bd56923625eeba5027c6f36f4a2a3.jpg',
    description: 'Kamera mirrorless full-frame'
  },
  {
    id: '8',
    name: 'Speaker JBL Flip 6',
    price: 1999000,
    imageUrl: 'https://i.pinimg.com/1200x/9d/ec/0c/9dec0c9fb0c1af3b2c5ab418fed24fe7.jpg',
    description: 'Speaker portable waterproof'
  },
  {
    id: '9',
    name: 'Monitor LG UltraGear',
    price: 4999000,
    imageUrl: 'https://i.pinimg.com/1200x/43/0e/8b/430e8b30411e091d6a31fd0f9f79fae8.jpg',
    description: 'Monitor gaming 144Hz 27 inch'
  },
  {
    id: '10',
    name: 'Keyboard Mechanical Logitech',
    price: 1499000,
    imageUrl: 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-keyboard/pro-x-keyboard-gallery-1.png?v=1',
    description: 'Keyboard mechanical untuk gaming dan kerja'
  }
];

// Komponen utama dengan theme access
const AppContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme(); // Menggunakan hook useTheme

  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now().toString(), // Simple ID generation
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <SafeAreaView style={[
      styles.container, 
      theme === 'dark' && styles.containerDark // Sekarang containerDark sudah ada
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

// Komponen App utama dengan ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC', // Light mode background
  },
  containerDark: {
    backgroundColor: '#1A202C', // Dark mode background
  },
});