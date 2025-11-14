import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { api } from '../../utils/apiInterceptor';

type RootStackParamList = {
  ProductDetail: { productId: string };
};

type ProductListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  rating: number;
  stock: number;
  brand: string;
  discountPercentage?: number;
}

const ProductListScreen: React.FC = () => {
  const navigation = useNavigation<ProductListScreenNavigationProp>();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [maxRetries] = useState(3);

  // Exponential backoff delays: 1s, 2s, 4s
  const getRetryDelay = (attempt: number): number => {
    return Math.pow(2, attempt) * 1000;
  };

  const fetchProducts = useCallback(async (isRetry = false) => {
    if (!isRetry) {
      setLoading(true);
    }
    setError(null);

    try {
      console.log(`🔄 Fetching products from DummyJSON...${isRetry ? ` (Retry ${retryCount + 1}/${maxRetries})` : ''}`);
      
      // GUNAKAN DUMMYJSON API
      const response = await api.get('https://dummyjson.com/products', {
        timeout: 10000,
      });
      
      if (response.status === 200) {
        console.log('✅ DummyJSON API success! Products loaded:', response.data.products.length);
        setProducts(response.data.products);
        setRetryCount(0); // Reset retry count on success
      }
    } catch (err: any) {
      console.error('❌ Error fetching products from DummyJSON:', err);
      
      let errorMessage = 'Gagal memuat daftar produk';
      
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        errorMessage = 'Request timeout - jaringan lambat';
      } else if (!err.response) {
        errorMessage = 'Koneksi jaringan bermasalah';
      } else if (err.response.status === 404) {
        errorMessage = 'Endpoint produk tidak ditemukan';
      } else if (err.response.status >= 500) {
        errorMessage = 'Server DummyJSON sedang mengalami masalah';
      }

      setError(errorMessage);

      // Implement retry logic dengan exponential backoff
      if (retryCount < maxRetries - 1) {
        const nextRetryCount = retryCount + 1;
        const delay = getRetryDelay(retryCount);
        
        console.log(`⏳ Scheduling retry ${nextRetryCount}/${maxRetries} in ${delay}ms...`);
        
        setTimeout(() => {
          setRetryCount(nextRetryCount);
          fetchProducts(true);
        }, delay);
        
        // Show retry in progress state
        setError(`${errorMessage}\n\nMencoba kembali dalam ${delay/1000} detik...`);
      } else {
        console.log(`🛑 Max retries (${maxRetries}) reached.`);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [retryCount, maxRetries]);

  const handleManualRetry = () => {
    setRetryCount(0);
    fetchProducts();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setRetryCount(0);
    fetchProducts();
  };

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item.id.toString())}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.productImage}
      />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productBrand} numberOfLines={1}>
          {item.brand}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.productCategory}>
          {item.category}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.reviewCount}></Text>
        </View>
        
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>
            ${item.price}
          </Text>
          <Text style={[
            styles.stock,
            item.stock === 0 && styles.outOfStock
          ]}>
            {item.stock === 0 ? 'Habis' : `Stok: ${item.stock}`}
          </Text>
        </View>

        {item.discountPercentage && item.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              🔥 {item.discountPercentage}% OFF
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateEmoji}>📦</Text>
      <Text style={styles.emptyStateTitle}>Tidak ada produk</Text>
      <Text style={styles.emptyStateText}>
        Produk tidak ditemukan atau sedang tidak tersedia.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleManualRetry}>
        <Text style={styles.retryButtonText}>Coba Lagi</Text>
      </TouchableOpacity>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorState}>
      <Text style={styles.errorStateEmoji}>😵</Text>
      <Text style={styles.errorStateTitle}>Gagal Memuat Produk</Text>
      <Text style={styles.errorStateText}>
        {error}
        {retryCount > 0 && `\n\nPercobaan: ${retryCount}/${maxRetries}`}
      </Text>
      
      {retryCount < maxRetries ? (
        <View style={styles.retryContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.retryText}>
            Mencoba kembali...
          </Text>
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={handleManualRetry}
        >
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Memuat produk dari DummyJSON...</Text>
        {retryCount > 0 && (
          <Text style={styles.retryInfo}>
            Percobaan {retryCount + 1}/{maxRetries}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Our Products</Text>
        <Text style={styles.headerSubtitle}>
          {products.length} produk tersedia
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={error ? renderErrorState() : renderEmptyState()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
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
  retryInfo: {
    marginTop: 8,
    fontSize: 14,
    color: '#A0AEC0',
    textAlign: 'center',
  },
  productItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#EDF2F7',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 2,
  },
  productBrand: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
    lineHeight: 16,
  },
  productCategory: {
    fontSize: 12,
    color: '#38A169',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#D69E2E',
    fontWeight: '500',
  },
  reviewCount: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 4,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B6CB0',
  },
  stock: {
    fontSize: 12,
    color: '#38A169',
    fontWeight: '500',
  },
  outOfStock: {
    color: '#E53E3E',
  },
  discountBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#E53E3E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    paddingTop: 80,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  errorState: {
    alignItems: 'center',
    padding: 40,
    paddingTop: 60,
  },
  errorStateEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorStateText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  retryText: {
    fontSize: 14,
    color: '#007AFF',
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

export default ProductListScreen;