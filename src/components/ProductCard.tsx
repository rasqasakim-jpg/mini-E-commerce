import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Product } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface ProductCardProps {
  product: Product;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, theme === 'dark' && styles.cardDark]}>
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.name, theme === 'dark' && styles.nameDark]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.price, theme === 'dark' && styles.priceDark]}>
          Rp {product.price.toLocaleString('id-ID')}
        </Text>
        <Text style={[styles.description, theme === 'dark' && styles.descriptionDark]} numberOfLines={2}>
          {product.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardDark: {
    backgroundColor: '#2D3748', // Warna latar belakang gelap
    shadowColor: '#000', // Bayangan bisa tetap hitam tapi mungkin kurang terlihat
    borderColor: '#4A5568', // Tambahkan border untuk memisahkan kartu
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  nameDark: {
    color: '#F7FAFC', // Warna teks terang
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  priceDark: {
    color: '#63B3ED', // Warna aksen biru terang
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  descriptionDark: {
    color: '#A0AEC0', // Warna teks abu-abu terang
  },
});

export default ProductCard;