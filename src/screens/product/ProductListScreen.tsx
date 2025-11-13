import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useNetInfo } from '../../hooks/useNetInfo';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';

type ProductListScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'ProductDetail'>;

// ✅ SOAL 16: Product List dengan Fetch API + Cancellation + Timeout
const ProductListScreen: React.FC = () => {
  const { theme } = useTheme();
  const { isOnline, connectionType } = useNetInfo();
  const navigation = useNavigation<ProductListScreenNavigationProp>();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // ✅ SOAL 17: Validasi koneksi sebelum request
    if (!isOnline) {
      setError('Anda sedang Offline. Cek koneksi Anda.');
      setLoading(false);
      return;
    }

    // ✅ SOAL 16: AbortController untuk cancellation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setError('Request timeout - terlalu lama memuat data');
      setLoading(false);
    }, 7000); // 7 seconds timeout

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        
        console.log('🔄 Fetching products from API...');
        const response = await fetch('https://dummyjson.com/products', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`✅ Loaded ${data.products.length} products`);
        
        // Transform data dari API ke format Product kita
        const transformedProducts: Product[] = data.products.map((item: any) => ({
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          imageUrl: item.thumbnail,
          description: item.description,
          category: item.category,
          discount: item.discountPercentage,
          rating: item.rating,
          brand: item.brand,
          stock: item.stock
        }));

        setProducts(transformedProducts);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('⏹️ Request cancelled or timed out');
          setError('Request dibatalkan atau timeout');
        } else {
          console.log('❌ Fetch error:', err.message);
          setError(`Gagal memuat produk: ${err.message}`);
        }
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchProducts();

    // ✅ SOAL 16: Cleanup function untuk cancellation
    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [isOnline]);

  const renderProductItem = ({ item }: { item: Product }) => (
      <ProductCard product={item} />
  );

  if (loading) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <ActivityIndicator size="large" color={theme === 'dark' ? '#63B3ED' : '#007AFF'} />
        <Text style={[styles.loadingText, theme === 'dark' && styles.textDark]}>
          Memuat produk...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <Text style={[styles.errorTitle, theme === 'dark' && styles.textDark]}>
          ⚠️ Gagal Memuat
        </Text>
        <Text style={[styles.errorText, theme === 'dark' && styles.textSecondaryDark]}>
          {error}
        </Text>
        <TouchableOpacity 
          style={[styles.retryButton, theme === 'dark' && styles.retryButtonDark]}
          onPress={() => {
            setLoading(true);
            setError('');
          }}
        >
          <Text style={styles.retryButtonText}>🔄 Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
          📦 Daftar Produk
        </Text>
        {/* ✅ SOAL 17: Tampilkan jenis koneksi */}
        <Text style={[styles.connectionInfo, theme === 'dark' && styles.textSecondaryDark]}>
          {isOnline ? `🟢 Online (${connectionType})` : '🔴 Offline'}
        </Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 8,
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  connectionInfo: {
    fontSize: 12,
    color: '#718096',
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#2D3748',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2D3748',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#718096',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 60,
  },
  retryButtonDark: {
    backgroundColor: '#3182CE',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ProductListScreen;