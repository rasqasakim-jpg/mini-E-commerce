import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useStorage } from '../../contexts/StorageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { CartItem } from '../../types/storage';

const CartScreen: React.FC = () => {
  const { cart } = useStorage();
  const { theme } = useTheme();

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      // Hapus item jika quantity 0
      await cart.removeItem(itemId);
    } else {
      // Update quantity
      await cart.updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart.cart.length === 0) {
      Alert.alert('Keranjang Kosong', 'Tambahkan produk terlebih dahulu!');
      return;
    }

    Alert.alert(
      'Checkout',
      `Total: Rp ${cart.totalPrice.toLocaleString()}\n\nLanjutkan ke pembayaran?`,
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Bayar', 
          onPress: () => {
            Alert.alert('Sukses', 'Pesanan berhasil dibuat!');
            cart.clearCart();
          }
        },
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={[styles.cartItem, theme === 'dark' && styles.cartItemDark]}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      
      <View style={styles.productInfo}>
        <Text style={[styles.productName, theme === 'dark' && styles.textDark]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>
          Rp {item.price.toLocaleString()}
        </Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={[styles.quantity, theme === 'dark' && styles.textDark]}>
            {item.quantity}
          </Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemTotal}>
        <Text style={styles.totalPrice}>
          Rp {(item.price * item.quantity).toLocaleString()}
        </Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => cart.removeItem(item.id)}
        >
          <Text style={styles.removeButtonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cart.loading) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <Text style={[styles.loadingText, theme === 'dark' && styles.textDark]}>
          Memuat keranjang...
        </Text>
      </View>
    );
  }

  if (cart.cart.length === 0) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <View style={styles.emptyCart}>
          <Text style={[styles.emptyCartEmoji, theme === 'dark' && styles.textDark]}>
            🛒
          </Text>
          <Text style={[styles.emptyCartText, theme === 'dark' && styles.textDark]}>
            Keranjang Belanja Kosong
          </Text>
          <Text style={[styles.emptyCartSubtext, theme === 'dark' && styles.textSecondaryDark]}>
            Yuk tambahkan produk favoritmu!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <FlatList
        data={cart.cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Summary Section */}
      <View style={[styles.summary, theme === 'dark' && styles.summaryDark]}>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Total Items:
          </Text>
          <Text style={[styles.summaryValue, theme === 'dark' && styles.textDark]}>
            {cart.itemCount} items
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Total Harga:
          </Text>
          <Text style={styles.total}>
            Rp {cart.totalPrice.toLocaleString()}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>
            Checkout Sekarang
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            Alert.alert(
              'Hapus Semua',
              'Yakin ingin menghapus semua item dari keranjang?',
              [
                { text: 'Batal', style: 'cancel' },
                { text: 'Hapus', onPress: () => cart.clearCart() },
              ]
            );
          }}
        >
          <Text style={styles.clearButtonText}>
            Hapus Semua
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
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#2D3748',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cartItemDark: {
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
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotal: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  removeButton: {
    backgroundColor: '#FED7D7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#E53E3E',
    fontWeight: '600',
  },
  summary: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  summaryDark: {
    backgroundColor: '#2D3748',
    borderTopColor: '#4A5568',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#718096',
  },
  summaryValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E53E3E',
  },
  clearButtonText: {
    color: '#E53E3E',
    fontSize: 14,
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