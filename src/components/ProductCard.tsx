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

  // ✅ SOAL 2: Navigasi ke Detail Produk
  const handleProductPress = () => {
    console.log('Navigating to product detail:', product.id);
    navigation.navigate('ProductDetail', { productId: product.id });
  };

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
          style={[styles.name, theme === 'dark' && styles.nameDark]} 
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.name}
        </Text>
        <Text style={[styles.price, theme === 'dark' && styles.priceDark]}>
          Rp {product.price.toLocaleString('id-ID')}
        </Text>
        <Text 
          style={[styles.description, theme === 'dark' && styles.descriptionDark]} 
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.description}
        </Text>
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
  content: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
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
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  priceDark: {
    color: '#63B3ED',
  },
  description: {
    fontSize: 12,
    color: '#718096',
    lineHeight: 16,
  },
  descriptionDark: {
    color: '#A0AEC0',
  },
});

export default ProductCard;