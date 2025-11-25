import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useStorage } from '../../contexts/StorageContext';
import { CartItem } from '../../types/storage';
import PaymentConfirmation from '../../components/PaymentConfirmation';
import { calculateShippingCost } from '../../services/ShippingService'; // ✅ IMPORT BARU

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
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [shippingCost, setShippingCost] = useState<number | null>(null); // ✅ STATE BARU
  const [loadingShipping, setLoadingShipping] = useState(true); // ✅ STATE BARU

  useEffect(() => {
    loadShippingCost();
  }, []);

  // ✅ FUNGSI BARU: LOAD ONGKIR BERDASARKAN LOKASI
  const loadShippingCost = async () => {
    setLoadingShipping(true);
    try {
      const cost = await calculateShippingCost(cart.totalPrice);
      setShippingCost(cost);
    } catch (error) {
      console.error('Error calculating shipping:', error);
      // Fallback ke ongkir standar jika error
      setShippingCost(cart.totalPrice > 500000 ? 0 : 15000);
    } finally {
      setLoadingShipping(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      Alert.alert('Pilih Pembayaran', 'Anda harus memilih metode pembayaran terlebih dahulu.');
      return;
    }

    // ✅ TAMPILKAN PAYMENT CONFIRMATION UNTUK METODE YANG BUTUH BIOMETRIK
    if (selectedPayment === 'cc' || selectedPayment === 'ewallet_gopay' || selectedPayment === 'ewallet_ovo') {
      setShowPaymentConfirmation(true);
    } else {
      // Untuk metode pembayaran lain, langsung proses
      processPayment();
    }
  };

  // ✅ FUNGSI PROSES PEMBAYARAN
  const processPayment = () => {
    console.log(`Processing payment with method: ${selectedPayment}`);
    
    Alert.alert(
      'Pesanan Berhasil',
      `Terima kasih telah berbelanja! Pesanan Anda sedang diproses dengan ${getPaymentMethodName(selectedPayment)}.`,
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

  // ✅ FUNGSI UNTUK MENDAPATKAN NAMA METODE PEMBAYARAN
  const getPaymentMethodName = (methodId: string | null) => {
    const method = paymentMethods.find(m => m.id === methodId);
    return method ? method.name : 'Metode Pembayaran';
  };

  const totalAmount = cart.totalPrice;
  const finalAmount = totalAmount + (shippingCost || 0);

  // ✅ JIKA SEDANG MENAMPILKAN KONFIRMASI PEMBAYARAN
  if (showPaymentConfirmation) {
    return (
      <PaymentConfirmation 
        amount={finalAmount}
        onSuccess={() => {
          setShowPaymentConfirmation(false);
          processPayment();
        }}
      />
    );
  }

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
            
            {/* ✅ INFORMASI ONGKIR BERDASARKAN LOKASI */}
            <View style={styles.shippingInfo}>
              <Text style={[styles.shippingLabel, theme === 'dark' && styles.textSecondaryDark]}>
                📍 Ongkir dihitung berdasarkan lokasi Anda
              </Text>
              {loadingShipping ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#007AFF" />
                  <Text style={[styles.loadingText, theme === 'dark' && styles.textSecondaryDark]}>
                    Menghitung ongkir...
                  </Text>
                </View>
              ) : (
                <Text style={[styles.shippingCost, theme === 'dark' && styles.textDark]}>
                  Biaya pengiriman: {shippingCost === 0 ? 'GRATIS' : `Rp ${shippingCost?.toLocaleString('id-ID')}`}
                </Text>
              )}
            </View>
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

        {/* ✅ INFORMASI BIOMETRIK UNTUK PEMBAYARAN */}
        {(selectedPayment === 'cc' || selectedPayment === 'ewallet_gopay' || selectedPayment === 'ewallet_ovo') && (
          <View style={[styles.infoBox, theme === 'dark' && styles.infoBoxDark]}>
            <Text style={[styles.infoTitle, theme === 'dark' && styles.textDark]}>
              🔒 Keamanan Tambahan
            </Text>
            <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
              Pembayaran dengan {getPaymentMethodName(selectedPayment)} memerlukan verifikasi biometrik untuk keamanan.
            </Text>
          </View>
        )}
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
            {loadingShipping ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Text style={[styles.summaryValue, theme === 'dark' && styles.textDark]}>
                {shippingCost === 0 ? 'Gratis' : `Rp ${shippingCost?.toLocaleString('id-ID')}`}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footerActions}>
          <View>
            <Text style={[styles.totalLabel, theme === 'dark' && styles.textSecondaryDark]}>Total Bayar</Text>
            {loadingShipping ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Text style={styles.totalAmount}>Rp {finalAmount.toLocaleString('id-ID')}</Text>
            )}
          </View>
          <TouchableOpacity
            style={[styles.placeOrderButton, (!selectedPayment || loadingShipping) && styles.disabledButton]}
            onPress={handlePlaceOrder}
            disabled={!selectedPayment || loadingShipping}
          >
            <Text style={styles.placeOrderText}>
              {selectedPayment && (selectedPayment === 'cc' || selectedPayment === 'ewallet_gopay' || selectedPayment === 'ewallet_ovo') 
                ? 'Bayar dengan Biometrik' 
                : 'Buat Pesanan'
              }
            </Text>
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
    paddingBottom: 200,
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
  // ✅ STYLE BARU UNTUK SHIPPING INFO
  shippingInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
  },
  shippingLabel: {
    fontSize: 12,
    marginBottom: 8,
    color: '#718096',
  },
  shippingCost: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#718096',
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
  infoBox: {
    backgroundColor: '#EDF2F7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoBoxDark: {
    backgroundColor: '#2D3748',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D3748',
  },
  infoText: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 32,
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