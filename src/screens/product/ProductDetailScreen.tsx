import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useStorage } from '../../contexts/StorageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { ProductDetail } from '../../types/product';

type RootStackParamList = {
  ProductDetail: { productId: string };
  Checkout: { productId: string };
};

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

// Mock data
const mockProducts: { [key: string]: ProductDetail } = {
  '1': {
    id: '1',
    name: 'iPhone 14 Pro Max',
    price: 18999000,
    originalPrice: 19999000,
    description: 'iPhone 14 Pro Max dengan Dynamic Island, Always-On display, dan kamera 48MP terbaik untuk fotografi.',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
    ],
    category: 'Elektronik',
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    tags: ['Smartphone', 'Apple', 'Premium'],
    specifications: [
      { key: 'Layar', value: '6.7 inch Super Retina XDR' },
      { key: 'Chip', value: 'A16 Bionic' },
      { key: 'Storage', value: '256GB' },
      { key: 'Kamera', value: '48MP + 12MP + 12MP' },
      { key: 'Baterai', value: '4323 mAh' },
    ],
    brand: 'Apple',
    warranty: '1 Tahun Resmi',
    shippingInfo: 'Gratis Ongkir • Sampai dalam 2 hari',
  },
  '2': {
    id: '2',
    name: 'Nike Air Jordan 1',
    price: 2499000,
    originalPrice: 2999000,
    description: 'Sepatu basket iconic dengan desain klasik dan kenyamanan terbaik untuk aktivitas sehari-hari.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&h=500&fit=crop',
    ],
    category: 'Pakaian',
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    tags: ['Sepatu', 'Sport', 'Limited Edition'],
    specifications: [
      { key: 'Material', value: 'Kulit Asli' },
      { key: 'Warna', value: 'Red/Black/White' },
      { key: 'Ukuran', value: '39-45' },
      { key: 'Style', value: 'High Top' },
    ],
    brand: 'Nike',
    warranty: '6 Bulan',
    shippingInfo: 'Gratis Ongkir • Sampai dalam 3 hari',
  },
  '3': {
    id: '3',
    name: 'MacBook Pro M2',
    price: 27999000,
    description: 'Laptop profesional dengan chip M2, layar Liquid Retina XDR, dan performa luar biasa untuk creative work.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop',
    ],
    category: 'Elektronik',
    rating: 4.9,
    reviewCount: 567,
    inStock: false,
    tags: ['Laptop', 'Apple', 'Profesional'],
    specifications: [
      { key: 'Layar', value: '14.2 inch Liquid Retina XDR' },
      { key: 'Chip', value: 'Apple M2 Pro' },
      { key: 'RAM', value: '16GB' },
      { key: 'Storage', value: '512GB SSD' },
      { key: 'Baterai', value: '17 jam' },
    ],
    brand: 'Apple',
    warranty: '1 Tahun Resmi',
    shippingInfo: 'Gratis Ongkir • Sampai dalam 5 hari',
  },
};

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { productId } = route.params;
  const { cart } = useStorage();
  const { theme } = useTheme();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadProduct = async () => {
      setLoading(true);
      try {
        // FIX: Add void generic type to Promise
        await new Promise<void>((resolve) => setTimeout(resolve, 500));
        
        const productData = mockProducts[productId];
        if (productData) {
          setProduct(productData);
        } else {
          Alert.alert('Error', 'Produk tidak ditemukan');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Error', 'Gagal memuat detail produk');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, navigation]);

  const handleAddToCart = async () => {
    if (!product) return;

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

  const handleBuyNow = () => {
    if (!product) return;
    navigation.navigate('Checkout', { productId: product.id });
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, theme === 'dark' && styles.loadingContainerDark]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, theme === 'dark' && styles.textDark]}>
          Memuat produk...
        </Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.errorContainer, theme === 'dark' && styles.errorContainerDark]}>
        <Text style={[styles.errorText, theme === 'dark' && styles.textDark]}>
          Produk tidak ditemukan
        </Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isDiscounted = product.originalPrice && product.originalPrice > product.price;

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={styles.imageSection}>
          <Image 
            source={{ uri: product.images[selectedImageIndex] }} 
            style={styles.mainImage}
            resizeMode="cover"
          />
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailContainer}
          >
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  styles.thumbnail,
                  selectedImageIndex === index && styles.selectedThumbnail
                ]}
              >
                <Image 
                  source={{ uri: image }} 
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View style={[styles.infoSection, theme === 'dark' && styles.sectionDark]}>
          <Text style={[styles.category, theme === 'dark' && styles.textSecondaryDark]}>
            {product.category} • {product.brand}
          </Text>
          
          <Text style={[styles.name, theme === 'dark' && styles.textDark]}>
            {product.name}
          </Text>

          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              <Text style={styles.ratingText}>⭐ {product.rating}</Text>
              <Text style={[styles.reviewCount, theme === 'dark' && styles.textSecondaryDark]}>
                ({product.reviewCount} reviews)
              </Text>
            </View>
            <View style={[styles.stockBadge, product.inStock ? styles.inStock : styles.outOfStock]}>
              <Text style={styles.stockText}>
                {product.inStock ? 'Stok Tersedia' : 'Stok Habis'}
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            {isDiscounted ? (
              <>
                <Text style={styles.originalPrice}>
                  Rp {product.originalPrice?.toLocaleString()}
                </Text>
                <Text style={styles.price}>
                  Rp {product.price.toLocaleString()}
                </Text>
                <View style={styles.discountTag}>
                  <Text style={styles.discountTagText}>
                    Hemat {Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.price}>
                Rp {product.price.toLocaleString()}
              </Text>
            )}
          </View>

          <Text style={[styles.description, theme === 'dark' && styles.textDark]}>
            {product.description}
          </Text>

          <View style={styles.tagsContainer}>
            {product.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, theme === 'dark' && styles.tagDark]}>
                <Text style={[styles.tagText, theme === 'dark' && styles.textSecondaryDark]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Specifications */}
        <View style={[styles.specSection, theme === 'dark' && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            Spesifikasi
          </Text>
          {product.specifications.map((spec, index) => (
            <View key={index} style={styles.specRow}>
              <Text style={[styles.specKey, theme === 'dark' && styles.textSecondaryDark]}>
                {spec.key}
              </Text>
              <Text style={[styles.specValue, theme === 'dark' && styles.textDark]}>
                {spec.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Warranty & Shipping */}
        <View style={[styles.infoSection, theme === 'dark' && styles.sectionDark]}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, theme === 'dark' && styles.textSecondaryDark]}>
              Garansi:
            </Text>
            <Text style={[styles.infoValue, theme === 'dark' && styles.textDark]}>
              {product.warranty}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, theme === 'dark' && styles.textSecondaryDark]}>
              Pengiriman:
            </Text>
            <Text style={[styles.infoValue, theme === 'dark' && styles.textDark]}>
              {product.shippingInfo}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.actionContainer, theme === 'dark' && styles.actionContainerDark]}>
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
  contentContainer: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  loadingContainerDark: {
    backgroundColor: '#1A202C',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#2D3748',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    padding: 20,
  },
  errorContainerDark: {
    backgroundColor: '#1A202C',
  },
  errorText: {
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  imageSection: {
    backgroundColor: 'white',
    padding: 16,
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  thumbnailContainer: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#007AFF',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 8,
  },
  sectionDark: {
    backgroundColor: '#2D3748',
  },
  category: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#FFA500',
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 12,
    color: '#718096',
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  inStock: {
    backgroundColor: '#C6F6D5',
  },
  outOfStock: {
    backgroundColor: '#FED7D7',
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: '#718096',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountTag: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagDark: {
    backgroundColor: '#4A5568',
  },
  tagText: {
    fontSize: 12,
    color: '#718096',
  },
  specSection: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  specKey: {
    fontSize: 14,
    color: '#718096',
    flex: 1,
  },
  specValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#718096',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  actionContainer: {
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
  actionContainerDark: {
    backgroundColor: '#2D3748',
    borderTopColor: '#4A5568',
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
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ProductDetailScreen;