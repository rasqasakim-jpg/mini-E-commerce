import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useStorage } from '../contexts/StorageContext';
import { Product } from '../types/product';

interface ProductActionButtonsProps {
  product: Product;
}

type RootStackParamList = {
  Checkout: { productId: string };
};

const ProductActionButtons: React.FC<ProductActionButtonsProps> = ({ product }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { cart } = useStorage();

  const handleAddToCart = async () => {
    try {
      await cart.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    } catch (error: any) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = () => {
    navigation.navigate('Checkout', { productId: product.id });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.cartButton, !product.inStock && styles.disabledButton]}
        onPress={handleAddToCart}
        disabled={!product.inStock}
      >
        <Text style={styles.cartButtonText}>
          {product.inStock ? '+ Keranjang' : 'Stok Habis'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.buyButton, !product.inStock && styles.disabledButton]}
        onPress={handleBuyNow}
        disabled={!product.inStock}
      >
        <Text style={styles.buyButtonText}>
          Beli Sekarang
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#A0AEC0',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductActionButtons;