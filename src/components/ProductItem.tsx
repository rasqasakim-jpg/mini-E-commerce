import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useStorage } from '../contexts/StorageContext';
import { Product } from '../types/product';
import { useTheme } from '../contexts/ThemeContext';

interface ProductItemProps {
  product: Product;
}

type RootStackParamList = {
  ProductDetail: { productId: string };
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { cart } = useStorage();
  const { theme } = useTheme();

  const handleAddToCart = async () => {
    try {
      await cart.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      Alert.alert('Sukses', `${product.name} ditambahkan ke keranjang!`);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleProductPress = () => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const isDiscounted = product.originalPrice && product.originalPrice > product.price;

  return (
    <TouchableOpacity 
      style={[styles.container, theme === 'dark' && styles.containerDark]}
      onPress={handleProductPress}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        {!product.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Habis</Text>
          </View>
        )}
        {isDiscounted && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
            </Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.category, theme === 'dark' && styles.textSecondaryDark]} numberOfLines={1}>
          {product.category}
        </Text>
        
        <Text style={[styles.name, theme === 'dark' && styles.textDark]} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}><Text>⭐</Text> {product.rating}</Text>
          <Text style={[styles.reviewCount, theme === 'dark' && styles.textSecondaryDark]}>
            ({product.reviewCount})
          </Text>
        </View>

        <View style={styles.priceContainer}>
          {isDiscounted ? (
            <>
              <Text style={styles.originalPrice}>Rp {product.originalPrice?.toLocaleString()}</Text>
              <Text style={styles.price}>Rp {product.price.toLocaleString()}</Text>
            </>
          ) : (
            <Text style={styles.price}>Rp {product.price.toLocaleString()}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.addButton, !product.inStock && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <Text style={styles.addButtonText}>
            {product.inStock ? '➕ Keranjang' : 'Stok Habis'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: 160,
  },
  containerDark: {
    backgroundColor: '#2D3748',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  category: {
    fontSize: 10,
    color: '#718096',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    height: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    color: '#FFA500',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 10,
    color: '#718096',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  originalPrice: {
    fontSize: 12,
    color: '#718096',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A0AEC0',
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ProductItem;