import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNetInfo } from '../../../hooks/useNetInfo';

const { width } = Dimensions.get('window');

type Product = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  discountPercentage: number;
};

type Banner = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
};

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { isOnline } = useNetInfo();
  
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock banners data
  const mockBanners: Banner[] = [
    {
      id: '1',
      image: 'https://cdn-icons-png.flaticon.com/512/3731/3731947.png',
      title: 'Sale Besar-Besaran!',
      subtitle: 'Diskon hingga 70%'
    },
    {
      id: '2', 
      image: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
      title: 'Gratis Ongkir',
      subtitle: 'Min. belanja Rp 100.000'
    },
    {
      id: '3',
      image: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
      title: 'New Arrival',
      subtitle: 'Produk terbaru setiap hari'
    }
  ];

  // Mock categories
  const mockCategories = [
    '📱 Elektronik', '👕 Fashion', '🍔 Makanan', '🏠 Rumah', 
    '💄 Beauty', '🎮 Games', '📚 Buku', '⚽ Olahraga'
  ];

  // Fetch featured products
  const fetchFeaturedProducts = async () => {
    if (!isOnline) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/products?limit=8');
      const data = await response.json();
      
      const transformedProducts: Product[] = data.products.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        category: item.category,
        rating: item.rating,
        discountPercentage: item.discountPercentage,
      }));
      
      setFeaturedProducts(transformedProducts);
    } catch (error) {
      console.log('Error fetching featured products:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
    setBanners(mockBanners);
    setCategories(mockCategories);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeaturedProducts();
  };

  const renderBanner = ({ item }: { item: Banner }) => (
    <View style={[styles.bannerCard, theme === 'dark' && styles.bannerCardDark]}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.bannerImage}
      />
      <View style={styles.bannerTextContainer}>
        <Text style={[styles.bannerTitle, theme === 'dark' && styles.textDark]}>
          {item.title}
        </Text>
        <Text style={[styles.bannerSubtitle, theme === 'dark' && styles.textSecondaryDark]}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity style={[styles.categoryCard, theme === 'dark' && styles.categoryCardDark]}>
      <Text style={styles.categoryIcon}>{item.split(' ')[0]}</Text>
      <Text style={[styles.categoryName, theme === 'dark' && styles.textDark]} numberOfLines={2}>
        {item.split(' ').slice(1).join(' ')}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={[styles.productCard, theme === 'dark' && styles.productCardDark]}>
      <View style={styles.productImageContainer}>
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.productImage}
          resizeMode="cover"
        />
        {item.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(item.discountPercentage)}%
            </Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, theme === 'dark' && styles.textDark]} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStar}>⭐</Text>
          <Text style={[styles.rating, theme === 'dark' && styles.textSecondaryDark]}>
            {item.rating}
          </Text>
        </View>
        <Text style={styles.productPrice}>${item.price}</Text>
        {item.discountPercentage > 0 && (
          <Text style={[styles.originalPrice, theme === 'dark' && styles.textSecondaryDark]}>
            ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor={theme === 'dark' ? '#63B3ED' : '#007AFF'}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, theme === 'dark' && styles.textDark]}>
              Selamat Datang! 👋
            </Text>
            <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
              Temukan produk terbaik untuk Anda
            </Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, theme === 'dark' && styles.notificationButtonDark]}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge}></View>
          </TouchableOpacity>
        </View>

        {/* Banners */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            🎉 Promo Spesial
          </Text>
          <FlatList
            data={banners}
            renderItem={renderBanner}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannersContainer}
            snapToInterval={width - 32}
            decelerationRate="fast"
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            🗂️ Kategori
          </Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
              ⭐ Produk Unggulan
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, theme === 'dark' && styles.textSecondaryDark]}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={[styles.loadingText, theme === 'dark' && styles.textDark]}>
                Memuat produk...
              </Text>
            </View>
          ) : featuredProducts.length > 0 ? (
            <FlatList
              data={featuredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.productsGrid}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, theme === 'dark' && styles.textSecondaryDark]}>
                {isOnline ? 'Tidak ada produk' : '🔴 Anda sedang offline'}
              </Text>
            </View>
          )}
        </View>

        {/* Additional Sections */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            🚀 Baru Saja Datang
          </Text>
          <Text style={[styles.comingSoon, theme === 'dark' && styles.textSecondaryDark]}>
            Produk baru akan segera tersedia...
          </Text>
        </View>
      </ScrollView>

      {/* Floating Cart Button */}
      <TouchableOpacity style={styles.floatingCartButton}>
        <Text style={styles.cartIcon}>🛒</Text>
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>3</Text>
        </View>
      </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  notificationButton: {
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  notificationButtonDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
  },
  notificationIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  seeAllText: {
    color: '#718096',
    fontSize: 14,
    fontWeight: '500',
  },
  bannersContainer: {
    paddingHorizontal: 16,
  },
  bannerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 12,
    width: width - 48,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerCardDark: {
    backgroundColor: '#2D3748',
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  bannerTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryCardDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#2D3748',
    textAlign: 'center',
    fontWeight: '500',
  },
  productsGrid: {
    paddingHorizontal: 8,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    padding: 12,
    flex: 1,
    minWidth: '46%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productCardDark: {
    backgroundColor: '#2D3748',
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
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
  productInfo: {
    marginTop: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
    height: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingStar: {
    fontSize: 12,
    marginRight: 4,
  },
  rating: {
    fontSize: 12,
    color: '#718096',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  originalPrice: {
    fontSize: 12,
    color: '#718096',
    textDecorationLine: 'line-through',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: '#2D3748',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#718096',
    textAlign: 'center',
  },
  comingSoon: {
    paddingHorizontal: 16,
    fontStyle: 'italic',
    color: '#718096',
  },
  floatingCartButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default HomeScreen;