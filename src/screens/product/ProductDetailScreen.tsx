import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
  Platform
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { api } from '../../utils/apiInterceptor';

type RootStackParamList = {
  ProductDetail: { productId: string };
  Checkout: { productId: string };
  HomeTabs: undefined;
};

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

interface Props {
  route: ProductDetailScreenRouteProp;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  stock: number;
  discountPercentage?: number;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}

const ProductDetailScreen: React.FC<Props> = ({ route }) => {
  const { productId } = route.params;
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 Fetching product details from DummyJSON for ID: ${productId}`);
      
      // GUNAKAN DUMMYJSON API
      const response = await api.get(`https://dummyjson.com/products/${productId}`, {
        timeout: 10000,
      });
      
      if (response.status === 200) {
        console.log('✅ Product details loaded successfully from DummyJSON');
        setProduct(response.data);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err: any) {
      console.error('❌ Error fetching product details from DummyJSON:', err);
      
      let errorMessage = 'Gagal memuat detail produk';
      
      if (err.response?.status === 404) {
        errorMessage = 'Produk tidak ditemukan di DummyJSON';
        console.error('Product not found in DummyJSON - Status 404');
      } else if (err.response?.status === 500) {
        errorMessage = 'Server DummyJSON mengalami masalah';
        console.error('DummyJSON server error - Status 500');
      } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        errorMessage = 'Timeout - jaringan lambat';
      } else if (!err.response) {
        errorMessage = 'Koneksi jaringan bermasalah';
      }

      setError(errorMessage);
      
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Gagal memuat data produk dari DummyJSON',
          ToastAndroid.LONG
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!product) return;

    if (product.stock === 0) {
      Alert.alert('Stok Habis', 'Maaf, produk ini sedang tidak tersedia.');
      return;
    }

    navigation.navigate('Checkout', { productId: product.id.toString() });
  };

  const handleRetry = () => {
    fetchProductDetail();
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('⭐');
      } else {
        stars.push('☆');
      }
    }
    
    return stars.join('');
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Memuat detail produk dari DummyJSON...</Text>
      </View>
    );
  }

  if (error && !product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorEmoji}>😵</Text>
        <Text style={styles.errorTitle}>Gagal Memuat Produk</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Produk Tidak Ditemukan</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Product Images */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[selectedImageIndex] || product.thumbnail }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        {product.images.length > 1 && (
          <ScrollView 
            horizontal 
            style={styles.imageThumbnails}
            showsHorizontalScrollIndicator={false}
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
        )}
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.productBrand}>{product.brand}</Text>
        <Text style={styles.productName}>{product.title}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            {renderStars(product.rating)} {product.rating}/5
          </Text>
          <Text style={styles.reviewCount}>({Math.floor(product.rating * 20)} reviews)</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>
            ${product.price}
          </Text>
          {product.discountPercentage && product.discountPercentage > 0 && (
            <View style={styles.discountContainer}>
              <Text style={styles.originalPrice}>
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </Text>
              <Text style={styles.discountPercentage}>
                {product.discountPercentage}% OFF
              </Text>
            </View>
          )}
        </View>

        <View style={styles.stockContainer}>
          <Text style={[
            styles.stockText,
            product.stock === 0 ? styles.outOfStock : styles.inStock
          ]}>
            {product.stock === 0 ? '🛑 Stok Habis' : `✅ Stok Tersedia: ${product.stock}`}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        <Text style={styles.sectionTitle}>Detail Produk</Text>
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kategori:</Text>
            <Text style={styles.detailValue}>{product.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Merk:</Text>
            <Text style={styles.detailValue}>{product.brand}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rating:</Text>
            <Text style={styles.detailValue}>{product.rating} / 5</Text>
          </View>
          {product.discountPercentage && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Diskon:</Text>
              <Text style={styles.detailValue}>{product.discountPercentage}%</Text>
            </View>
          )}
        </View>
      </View>

      {/* Fixed Buy Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.buyButton,
            (product.stock === 0 || loading) && styles.buttonDisabled
          ]}
          onPress={handleBuyNow}
          disabled={product.stock === 0 || loading}
        >
          <Text style={styles.buyButtonText}>
            {product.stock === 0 ? 'Stok Habis' : `Beli Sekarang - $${product.price}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  contentContainer: {
    paddingBottom: 100,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#EDF2F7',
  },
  imageThumbnails: {
    marginTop: 12,
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
  infoContainer: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 16,
  },
  productBrand: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    lineHeight: 28,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  rating: {
    fontSize: 14,
    color: '#D69E2E',
    fontWeight: '500',
  },
  reviewCount: {
    fontSize: 14,
    color: '#718096',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B6CB0',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#718096',
    textDecorationLine: 'line-through',
  },
  discountPercentage: {
    fontSize: 14,
    color: '#E53E3E',
    fontWeight: '600',
    backgroundColor: '#FED7D7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stockContainer: {
    marginBottom: 16,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inStock: {
    color: '#38A169',
  },
  outOfStock: {
    color: '#E53E3E',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    marginBottom: 8,
  },
  details: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#2D3748',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ProductDetailScreen;