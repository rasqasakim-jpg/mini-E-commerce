import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

interface ProductCardProps {
  product: Product;
}

type ProductCardNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeTabs'>;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const navigation = useNavigation<ProductCardNavigationProp>();

  const CARD_WIDTH = (width - 48) / 2;

  const handleProductPress = () => {
    console.log('Navigating to product detail:', product.id);
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  // Calculate discounted price
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : null;

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        theme === 'dark' && styles.cardDark,
        { width: CARD_WIDTH }
      ]}
      onPress={handleProductPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {imageLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme === 'dark' ? '#63B3ED' : '#007AFF'} />
          </View>
        )}
        
        {/* Discount Badge */}
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}

        <Image
          source={{ 
            uri: imageError 
              ? 'https://via.placeholder.com/150/EDF2F7/2D3748?text=No+Image' 
              : product.imageUrl 
          }}
          style={styles.image}
          resizeMode="cover"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
        />
      </View>
      
      <View style={styles.content}>
        <Text 
          style={[styles.category, theme === 'dark' && styles.categoryDark]} 
          numberOfLines={1}
        >
          {product.category}
        </Text>
        
        <Text 
          style={[styles.name, theme === 'dark' && styles.nameDark]} 
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.name}
        </Text>

        {/* Price Section */}
        <View style={styles.priceContainer}>
          {discountedPrice ? (
            <>
              <Text style={[styles.originalPrice, theme === 'dark' && styles.originalPriceDark]}>
                Rp {product.price.toLocaleString('id-ID')}
              </Text>
              <Text style={[styles.price, theme === 'dark' && styles.priceDark]}>
                Rp {discountedPrice.toLocaleString('id-ID')}
              </Text>
            </>
          ) : (
            <Text style={[styles.price, theme === 'dark' && styles.priceDark]}>
              Rp {product.price.toLocaleString('id-ID')}
            </Text>
          )}
        </View>

        <Text 
          style={[styles.description, theme === 'dark' && styles.descriptionDark]} 
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.description}
        </Text>

        {/* Rating */}
        {product.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>⭐</Text>
            <Text style={[styles.rating, theme === 'dark' && styles.textSecondaryDark]}>
              {product.rating}/5
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    minHeight: 200,
  },
  cardDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    borderWidth: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 10,
    color: '#718096',
    marginBottom: 4,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  categoryDark: {
    color: '#A0AEC0',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#2D3748',
    lineHeight: 18,
  },
  nameDark: {
    color: '#F7FAFC',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    flexShrink: 1,
  },
  priceDark: {
    color: '#63B3ED',
  },
  originalPrice: {
    fontSize: 12,
    color: '#718096',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  originalPriceDark: {
    color: '#A0AEC0',
  },
  description: {
    fontSize: 12,
    color: '#718096',
    lineHeight: 16,
  },
  descriptionDark: {
    color: '#A0AEC0',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingStar: {
    fontSize: 12,
    marginRight: 4,
  },
  rating: {
    fontSize: 12,
    color: '#718096',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ProductCard;