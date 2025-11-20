import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useStorage } from '../../contexts/StorageContext';
import { CartItem } from '../../types/storage';

const paymentMethods = [
  { id: 'va_bca', name: 'BCA Virtual Account', icon: '🏦' },
  { id: 'ewallet_gopay', name: 'GoPay', icon: '🟢' },
  { id: 'ewallet_ovo', name: 'OVO', icon: '🟣' },
  { id: 'cc', name: 'Kartu Kredit/Debit', icon: '💳' },
  { id: 'cod', name: 'Bayar di Tempat (COD)', icon: '📦' },
];

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { cart } = useStorage();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      Alert.alert('Pilih Pembayaran', 'Anda harus memilih metode pembayaran terlebih dahulu.');
      return;
    }

    Alert.alert(
      'Pesanan Berhasil',
      'Terima kasih telah berbelanja! Pesanan Anda sedang diproses.',
      [
        { 
          text: 'OK', 
          onPress: () => {
            cart.clearCart();
            navigation.navigate('MainApp' as never);
          }
        }
      ]
    );
  };

  const totalAmount = cart.totalPrice;
  const shippingCost = totalAmount > 500000 ? 0 : 15000;
  const finalAmount = totalAmount + shippingCost;

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
          Checkout
        </Text>

        {/* Shipping Address */}
        <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            Alamat Pengiriman
          </Text>
          <View style={styles.addressContainer}>
            <Text style={[styles.addressName, theme === 'dark' && styles.textDark]}>John Doe</Text>
            <Text style={[styles.addressDetail, theme === 'dark' && styles.textSecondaryDark]}>
              (+62) 812-3456-7890
            </Text>
            <Text style={[styles.addressDetail, theme === 'dark' && styles.textSecondaryDark]}>
              Jl. Jenderal Sudirman No. 123, Jakarta Pusat, DKI Jakarta, 10220
            </Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            Produk Dipesan ({cart.itemCount})
          </Text>
          {cart.cart.map((item: CartItem) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={[styles.itemName, theme === 'dark' && styles.textDark]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.itemPrice, theme === 'dark' && styles.textSecondaryDark]}>Rp {item.price.toLocaleString('id-ID')}</Text>
              </View>
              <Text style={[styles.itemQuantity, theme === 'dark' && styles.textDark]}>x{item.quantity}</Text>
            </View>
          ))}
        </View>

        {/* Payment Method */}
        <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
            Metode Pembayaran
          </Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                theme === 'dark' && styles.paymentMethodDark,
                selectedPayment === method.id && styles.paymentMethodSelected
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <Text style={styles.paymentIcon}>{method.icon}</Text>
              <Text style={[styles.paymentName, theme === 'dark' && styles.textDark]}>{method.name}</Text>
              {selectedPayment === method.id && <Text style={styles.checkIcon}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, theme === 'dark' && styles.footerDark]}>
        {/* Payment Summary */}
        <View style={styles.paymentSummary}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, theme === 'dark' && styles.textSecondaryDark]}>Subtotal</Text>
            <Text style={[styles.summaryValue, theme === 'dark' && styles.textDark]}>Rp {totalAmount.toLocaleString('id-ID')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, theme === 'dark' && styles.textSecondaryDark]}>Pengiriman</Text>
            <Text style={[styles.summaryValue, theme === 'dark' && styles.textDark]}>
              {shippingCost === 0 ? 'Gratis' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footerActions}>
          <View>
            <Text style={[styles.totalLabel, theme === 'dark' && styles.textSecondaryDark]}>Total Bayar</Text>
            <Text style={styles.totalAmount}>Rp {finalAmount.toLocaleString('id-ID')}</Text>
          </View>
          <TouchableOpacity
            style={[styles.placeOrderButton, !selectedPayment && styles.disabledButton]}
            onPress={handlePlaceOrder}
            disabled={!selectedPayment}
          >
            <Text style={styles.placeOrderText}>Buat Pesanan</Text>
          </TouchableOpacity>
        </View>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 200, // Space for the fixed footer
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionDark: {
    backgroundColor: '#2D3748',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  addressContainer: {},
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  addressDetail: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D3748',
  },
  itemPrice: {
    fontSize: 12,
    color: '#718096',
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  paymentMethodDark: {
    borderColor: '#4A5568',
  },
  paymentMethodSelected: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  paymentIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  paymentName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  checkIcon: {
    fontSize: 20,
    color: '#007AFF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 32, // Safe area for home indicator
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerDark: {
    backgroundColor: '#2D3748',
    borderTopColor: '#4A5568',
  },
  paymentSummary: {
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#4A5568',
  },
  summaryValue: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#718096',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  placeOrderButton: {
    flex: 1,
    marginLeft: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A0AEC0',
  },
  placeOrderText: {
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

export default CheckoutScreen;
