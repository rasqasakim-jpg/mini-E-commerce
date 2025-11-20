// src/screens/cart/CartScreen.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../contexts/ThemeContext';
import { useStorage } from '../../contexts/StorageContext';
import { useAuth } from '../../contexts/AuthContext'; // Ganti ProtectedRoute dengan useAuth
import { CartItem } from '../../types/storage';
import { RootStackParamList } from '../../navigation/AppNavigator';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainApp'>;
type CartScreenRouteProp = RouteProp<RootStackParamList, 'MainApp'>;

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const route = useRoute<CartScreenRouteProp>();
  const { theme } = useTheme();
  const { cart } = useStorage();
  const { isAuthenticated, loading: authLoading } = useAuth(); // Ambil status autentikasi

  useEffect(() => {
    // Jika pengecekan auth selesai dan user tidak terautentikasi, arahkan ke Login
    if (!authLoading && !isAuthenticated) {
      Alert.alert(
        'Wajib Login',
        'Anda harus login untuk melihat keranjang belanja.',
        [{ text: 'OK', onPress: () => navigation.navigate('MainApp', { screen: 'Login' }) }]
      );
    }
    // Dependency array memastikan efek ini berjalan saat status auth berubah
  }, [isAuthenticated, authLoading, navigation]);

  const handleCheckout = () => {
    if (cart.itemCount === 0) {
      Alert.alert('Keranjang Kosong', 'Tambahkan produk terlebih dahulu!');
      return;
    }
    navigation.navigate('Checkout', { source: 'cart' });
  };

  const handleRemoveItem = (productId: string) => {
    Alert.alert(
      'Hapus Produk',
      'Apakah Anda yakin ingin menghapus produk ini dari keranjang?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive',
          onPress: () => cart.removeItem(productId) // ✅ FIX 4: Panggil fungsi dari objek cart
        }
      ]
    );
  };

  const handleContinueShopping = () => {
    navigation.navigate('MainApp', { screen: 'HomeStack' });
  };

  const renderCartItem = ({ item }: { item: CartItem }) => ( // ✅ FIX 6: Gunakan tipe CartItem
    <View style={[styles.cartItem, theme === 'dark' && styles.cartItemDark]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, theme === 'dark' && styles.textDark]}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>
          Rp {item.price.toLocaleString('id-ID')}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={styles.removeButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (cart.itemCount === 0) { // ✅ FIX 7: Gunakan itemCount untuk pengecekan yang lebih jelas
      return (
        <View style={[styles.emptyContainer, theme === 'dark' && styles.containerDark]}>
          <Text style={[styles.emptyTitle, theme === 'dark' && styles.textDark]}>
            🛒 Keranjang Kosong
          </Text>
          <Text style={[styles.emptyMessage, theme === 'dark' && styles.textSecondaryDark]}>
            Tambahkan beberapa produk menarik ke keranjang belanja Anda!
          </Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.shopButtonText}>Mulai Belanja</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const totalAmount = cart.totalPrice; // ✅ FIX 8: Gunakan totalPrice dari context

    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <FlatList
          data={cart.cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={[styles.footer, theme === 'dark' && styles.footerDark]}>
          <View style={styles.totalContainer}>
            <Text style={[styles.totalLabel, theme === 'dark' && styles.textDark]}>
              Total Belanja:
            </Text>
            <Text style={styles.totalAmount}>
              Rp {totalAmount.toLocaleString('id-ID')}
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                Alert.alert(
                  'Hapus Semua',
                  'Apakah Anda yakin ingin menghapus semua item dari keranjang?',
                  [
                    { text: 'Batal', style: 'cancel' },
                    { 
                      text: 'Hapus Semua', 
                      style: 'destructive',
                      onPress: () => cart.clearCart() // ✅ FIX 9: Panggil fungsi dari objek cart
                    }
                  ]
                );
              }}
            >
              <Text style={styles.clearButtonText}>Hapus Semua</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Selama auth loading atau jika user belum login, tampilkan loading indicator
  if (authLoading || !isAuthenticated) {
    return (
      <View style={[styles.container, styles.emptyContainer, theme === 'dark' && styles.containerDark]} />
    );
  }

  return renderContent();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  shopButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cartItemDark: {
    backgroundColor: '#2D3748',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: '#718096',
  },
  removeButton: {
    padding: 8,
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 18,
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerDark: {
    backgroundColor: '#2D3748',
    borderTopColor: '#4A5568',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#E53E3E',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    flex: 2,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
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

export default CartScreen;