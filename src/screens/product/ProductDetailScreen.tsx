// src/screens/product/ProductDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useStorage } from '../../contexts/StorageContext';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth
import { useWishlist } from '../../hooks/useWishlist';
import { useProductCache } from '../../hooks/useCache';
import { fetchWithRetry } from '../../utils/retryHelpers'; // Pastikan path ini benar
import { ProductDetail, CartItem } from '../../types/product'; // ambil CartItem jika ada
import { StackNavigationProp } from '@react-navigation/stack';

type ProductDetailRouteProp = RouteProp<{ params: { productId: string } }, 'params'>;

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { theme } = useTheme();
  const { cart } = useStorage();
  const { isAuthenticated } = useAuth(); // Ambil status autentikasi
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getCachedProduct, cacheProduct, isLoading: isCacheLoading } = useProductCache();

  const { productId } = route.params;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    loadProduct();
    checkWishlistStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const checkWishlistStatus = () => {
    setIsWishlisted(isInWishlist(productId));
  };

  const loadProduct = async () => {
    try {
      setLoading(true);

      const cachedProduct = await getCachedProduct(productId);

      if (cachedProduct) {
        setProduct(cachedProduct);
        setLoading(false);
        return;
      }

      await fetchProductFromAPI();
    } catch (error) {
      console.error('❌ Failed to load product:', error);
      Alert.alert(
        'Error',
        'Gagal memuat produk. Silakan coba lagi.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchProductFromAPI = async () => {
    try {
      // IMPORTANT: fetchWithRetry expects a callback that may accept an attempt param
      const productData = await fetchWithRetry(async () => {
        // Simulasi API call (gunakan Promise<void> agar typing sesuai)
        await new Promise<void>((res) => setTimeout(res, 1000));

        // Mock data - ensure specifications match the expected type (Record<string,string>)
        const mockProducts: { [key: string]: ProductDetail } = {
          '1': {
            id: '1',
            name: 'iPhone 14 Pro Max',
            price: 18999000,
            originalPrice: 19999000,
            description: 'iPhone 14 Pro Max dengan chip A16 Bionic dan kamera 48MP.',
            image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop',
            images: [],
            category: 'Elektronik',
            rating: 4.8,
            reviewCount: 1247,
            inStock: true,
            tags: [],
            specifications: {} as Record<string, string>, // <-- FIX: object sesuai tipe
            brand: 'Apple',
            warranty: '1 Tahun',
            shippingInfo: 'Gratis Ongkir',
          },
          '2': {
            id: '2',
            name: 'Nike Air Jordan 1',
            price: 2499000,
            originalPrice: 2999000,
            description: 'Sepatu basket iconic dari Nike.',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
            images: [],
            category: 'Pakaian',
            rating: 4.6,
            reviewCount: 892,
            inStock: true,
            tags: [],
            specifications: {} as Record<string, string>, // <-- FIX: object sesuai tipe
            brand: 'Nike',
            warranty: '6 Bulan',
            shippingInfo: 'Gratis Ongkir',
          },
        };

        const foundProduct = mockProducts[productId];
        if (!foundProduct) {
          throw new Error('Product not found');
        }

        return foundProduct;
      });

      setProduct(productData);

      // cache the product
      await cacheProduct(productId, productData);
    } catch (error) {
      console.error('❌ Failed to fetch product from API:', error);
      throw error;
    }
  };

  const handleAddToCart = () => {
    // Cek apakah pengguna sudah login
    if (!isAuthenticated) {
      Alert.alert(
        'Wajib Login',
        'Anda harus login terlebih dahulu untuk menambahkan produk ke keranjang.',
        [{ text: 'OK', onPress: () => navigation.navigate('MainApp', { screen: 'Login' } as any) }]
      );
      return;
    }

    if (product) {
      // cart.addItem biasanya mengharapkan CartItem (memiliki quantity)
      // pastikan kita mengirim objek lengkap; jika CartItem type lebih strict di projectmu, sesuaikan isian berikut
      const toAdd: CartItem = {
        ...(product as any),
        quantity: 1,
      };
      cart.addItem(toAdd);
      Alert.alert('Berhasil', `${product.name} telah ditambahkan ke keranjang!`, [{ text: 'OK' }]);
    }
  };

  const handleToggleWishlist = async () => {
    try {
      await toggleWishlist(productId);
      checkWishlistStatus();

      const message = isWishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist';
      Alert.alert('Berhasil', message, [{ text: 'OK' }]);
    } catch (error) {
      console.error('❌ Failed to toggle wishlist:', error);
      Alert.alert('Error', 'Gagal mengupdate wishlist', [{ text: 'OK' }]);
    }
  };

  if (loading || isCacheLoading) {
    return (
      <View style={[styles.centerContainer, theme === 'dark' && styles.containerDark]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, theme === 'dark' && styles.textDark]}>Memuat produk...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.centerContainer, theme === 'dark' && styles.containerDark]}>
        <Text style={[styles.errorText, theme === 'dark' && styles.textDark]}>Produk tidak ditemukan</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MainApp' as never)}>
          <Text style={styles.backButtonText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.content}>
        <Text style={[styles.productName, theme === 'dark' && styles.textDark]}>{product.name}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>Rp {product.price.toLocaleString('id-ID')}</Text>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>Rp {product.originalPrice.toLocaleString('id-ID')}</Text>
          )}
        </View>

        <View style={styles.ratingContainer}>
          <Text style={[styles.rating, theme === 'dark' && styles.textDark]}>⭐ {product.rating} ({product.reviewCount} ulasan)</Text>
          <Text style={[styles.stock, product.inStock ? styles.inStock : styles.outOfStock]}>
            {product.inStock ? '✅ Stok Tersedia' : '❌ Stok Habis'}
          </Text>
        </View>

        <Text style={[styles.description, theme === 'dark' && styles.textDark]}>{product.description}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.wishlistButton, isWishlisted && styles.wishlistedButton]} onPress={handleToggleWishlist}>
            <Text style={styles.wishlistButtonText}>{isWishlisted ? '❤️ Hapus Wishlist' : '🤍 Tambah Wishlist'}</Text>
          </TouchableOpacity>

          {product.inStock && (
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Text style={styles.addToCartText}>+ Tambah ke Keranjang</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.details}>
          <Text style={[styles.detailLabel, theme === 'dark' && styles.textDark]}>
            Kategori: <Text style={styles.detailValue}>{product.category}</Text>
          </Text>
          <Text style={[styles.detailLabel, theme === 'dark' && styles.textDark]}>
            Merek: <Text style={styles.detailValue}>{product.brand}</Text>
          </Text>
          {product.warranty && (
            <Text style={[styles.detailLabel, theme === 'dark' && styles.textDark]}>
              Garansi: <Text style={styles.detailValue}>{product.warranty}</Text>
            </Text>
          )}
          {product.shippingInfo && (
            <Text style={[styles.detailLabel, theme === 'dark' && styles.textDark]}>
              Pengiriman: <Text style={styles.detailValue}>{product.shippingInfo}</Text>
            </Text>
          )}

          {/* specifications jika tipe-nya Record<string,string> maka render sesuai key/value */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <View style={{ marginTop: 12 }}>
              {Object.entries(product.specifications).map(([label, value]) => (
                <Text key={label} style={[styles.detailLabel, theme === 'dark' && styles.textDark]}>
                  {label}: <Text style={styles.detailValue}>{value}</Text>
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  containerDark: { backgroundColor: '#1A202C' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  productImage: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { padding: 16 },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#2D3748', marginBottom: 8 },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  currentPrice: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginRight: 8 },
  originalPrice: { fontSize: 16, color: '#718096', textDecorationLine: 'line-through' },
  ratingContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  rating: { fontSize: 16, color: '#4A5568' },
  stock: { fontSize: 14, fontWeight: '500' },
  inStock: { color: '#38A169' },
  outOfStock: { color: '#E53E3E' },
  description: { fontSize: 16, lineHeight: 24, color: '#4A5568', marginBottom: 20 },
  actionButtons: { gap: 12, marginBottom: 20 },
  wishlistButton: { backgroundColor: '#F7FAFC', paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  wishlistedButton: { backgroundColor: '#FED7D7', borderColor: '#FEB2B2' },
  wishlistButtonText: { fontSize: 16, fontWeight: '500', color: '#4A5568' },
  addToCartButton: { backgroundColor: '#007AFF', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  addToCartText: { color: 'white', fontSize: 16, fontWeight: '600' },
  details: { backgroundColor: 'rgba(0, 122, 255, 0.1)', padding: 16, borderRadius: 8, marginTop: 12 },
  detailLabel: { fontSize: 14, color: '#4A5568', marginBottom: 4 },
  detailValue: { fontWeight: '600', color: '#2D3748' },
  loadingText: { marginTop: 12, fontSize: 16, color: '#718096' },
  errorText: { fontSize: 18, color: '#718096', marginBottom: 20, textAlign: 'center' },
  backButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6 },
  backButtonText: { color: 'white', fontSize: 14, fontWeight: '500' },
  textDark: { color: '#F7FAFC' },
});

export default ProductDetailScreen;
