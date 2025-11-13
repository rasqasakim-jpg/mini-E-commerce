import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useNetInfo } from '../../../../hooks/useNetInfo';

type Product = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  brand: string;
};

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const { isOnline } = useNetInfo();
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Popular search suggestions
  const popularSearches = [
    'Smartphone', 'Laptop', 'Headphones', 'Watch', 'Camera',
    'Shoes', 'T-shirt', 'Jacket', 'Book', 'Home Decor'
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      if (!isOnline) return;
      
      setLoading(true);
      try {
        const response = await fetch('https://dummyjson.com/products?limit=50');
        const data = await response.json();
        
        const transformedProducts: Product[] = data.products.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          price: item.price,
          thumbnail: item.thumbnail,
          category: item.category,
          rating: item.rating,
          brand: item.brand,
        }));
        
        setProducts(transformedProducts);
      } catch (error) {
        console.log('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isOnline]);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      setHasSearched(false);
      return;
    }

    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredProducts(filtered);
    setHasSearched(true);
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePopularSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={[styles.productCard, theme === 'dark' && styles.productCardDark]}>
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, theme === 'dark' && styles.textDark]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.productBrand, theme === 'dark' && styles.textSecondaryDark]}>
          {item.brand}
        </Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>⭐</Text>
            <Text style={[styles.rating, theme === 'dark' && styles.textSecondaryDark]}>
              {item.rating}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPopularSearch = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={[styles.popularSearchItem, theme === 'dark' && styles.popularSearchItemDark]}
      onPress={() => handlePopularSearch(item)}
    >
      <Text style={[styles.popularSearchText, theme === 'dark' && styles.textDark]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <TextInput
          style={[styles.searchInput, theme === 'dark' && styles.searchInputDark]}
          placeholder="Cari produk, brand, atau kategori..."
          placeholderTextColor={theme === 'dark' ? '#A0AEC0' : '#718096'}
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus={true}
        />
        {searchQuery ? (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme === 'dark' ? '#63B3ED' : '#007AFF'} />
          <Text style={[styles.loadingText, theme === 'dark' && styles.textDark]}>
            Memuat produk...
          </Text>
        </View>
      ) : !hasSearched ? (
        /* Popular Searches */
        <View style={styles.popularSearchesContainer}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            🔥 Pencarian Populer
          </Text>
          <FlatList
            data={popularSearches}
            renderItem={renderPopularSearch}
            keyExtractor={(item) => item}
            numColumns={2}
            contentContainerStyle={styles.popularSearchesGrid}
            scrollEnabled={false}
          />
          
          {/* Recent Searches (kosong dulu) */}
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            📝 Pencarian Terakhir
          </Text>
          <Text style={[styles.emptyText, theme === 'dark' && styles.textSecondaryDark]}>
            Belum ada pencarian terakhir
          </Text>
        </View>
      ) : filteredProducts.length > 0 ? (
        /* Search Results */
        <View style={styles.resultsContainer}>
          <Text style={[styles.resultsCount, theme === 'dark' && styles.textDark]}>
            Ditemukan {filteredProducts.length} produk untuk "{searchQuery}"
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
      ) : (
        /* No Results */
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsIcon, theme === 'dark' && styles.textDark]}>
            🔍
          </Text>
          <Text style={[styles.noResultsTitle, theme === 'dark' && styles.textDark]}>
            Produk tidak ditemukan
          </Text>
          <Text style={[styles.noResultsText, theme === 'dark' && styles.textSecondaryDark]}>
            Tidak ada hasil untuk "{searchQuery}".{'\n'}
            Coba kata kunci lain atau lihat pencarian populer.
          </Text>
        </View>
      )}

      {!isOnline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>🔴 Anda sedang offline</Text>
        </View>
      )}
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
  searchHeader: {
    padding: 16,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#2D3748',
  },
  searchInputDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    color: '#F7FAFC',
  },
  clearButton: {
    position: 'absolute',
    right: 28,
    padding: 8,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#718096',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#2D3748',
  },
  popularSearchesContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  popularSearchesGrid: {
    marginBottom: 24,
  },
  popularSearchItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    margin: 4,
    flex: 1,
    minWidth: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  popularSearchItemDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
  },
  popularSearchText: {
    color: '#2D3748',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#718096',
    fontStyle: 'italic',
    marginTop: 8,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsCount: {
    padding: 16,
    paddingBottom: 8,
    color: '#2D3748',
    fontSize: 14,
  },
  productsList: {
    padding: 8,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    padding: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productCardDark: {
    backgroundColor: '#2D3748',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    fontSize: 12,
    marginRight: 4,
  },
  rating: {
    fontSize: 12,
    color: '#718096',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  offlineBanner: {
    backgroundColor: '#FED7D7',
    padding: 8,
    alignItems: 'center',
  },
  offlineText: {
    color: '#C53030',
    fontSize: 12,
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default SearchScreen;