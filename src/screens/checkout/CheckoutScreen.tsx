import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { RootStackParamList } from '../../navigation/AppNavigator';

type CheckoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;
type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;

interface Props {
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
}

const CheckoutScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { productId } = route.params;

  const handleConfirmCheckout = () => {
    Alert.alert(
      'Checkout Berhasil! 🎉',
      `Produk ${productId} berhasil dipesan!\n\nTotal: Rp 2.999.000`,
      [
        {
          text: 'Kembali ke Beranda',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'MainApp' }]
          })
        }
      ]
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={[styles.modalContent, theme === 'dark' && styles.modalContentDark]}>
        <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
          🛒 Checkout Produk
        </Text>
        
        <View style={styles.productInfo}>
          <Text style={[styles.productId, theme === 'dark' && styles.textSecondaryDark]}>
            Product ID: {productId}
          </Text>
          <Text style={[styles.productName, theme === 'dark' && styles.textDark]}>
            {productId === '1' ? 'iPhone 14 Pro' : 'Samsung Galaxy S23'}
          </Text>
          <Text style={[styles.productPrice, theme === 'dark' && styles.priceDark]}>
            Rp {productId === '1' ? '19.999.000' : '8.999.000'}
          </Text>
        </View>

        <ScrollView style={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
              📦 Metode Pengiriman
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.textSecondaryDark]}>
              • Regular Delivery (3-5 hari) - Gratis
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.textSecondaryDark]}>
              • Express Delivery (1-2 hari) - Rp 25.000
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.textSecondaryDark]}>
              • Same Day Delivery - Rp 50.000
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
              💳 Metode Pembayaran
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.textSecondaryDark]}>
              • Credit Card (Visa/Mastercard)
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.textSecondaryDark]}>
              • Bank Transfer (BCA/Mandiri/BNI)
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.textSecondaryDark]}>
              • E-Wallet (Gopay/OVO/Dana)
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
              🏠 Alamat Pengiriman
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.textSecondaryDark]}>
              Defense Irgi Harnoyo
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.textSecondaryDark]}>
              Jl. Merdeka No. 123, Jakarta Pusat
            </Text>
            <Text style={[styles.text, theme === 'dark' && styles.textSecondaryDark]}>
              081234567890
            </Text>
          </View>

          <View style={styles.summary}>
            <Text style={[styles.summaryTitle, theme === 'dark' && styles.textDark]}>
              Ringkasan Belanja
            </Text>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryText, theme === 'dark' && styles.textSecondaryDark]}>
                Subtotal
              </Text>
              <Text style={[styles.summaryText, theme === 'dark' && styles.textSecondaryDark]}>
                Rp {productId === '1' ? '19.999.000' : '8.999.000'}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryText, theme === 'dark' && styles.textSecondaryDark]}>
                Biaya Pengiriman
              </Text>
              <Text style={[styles.summaryText, theme === 'dark' && styles.textSecondaryDark]}>
                Rp 0
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryTotal, theme === 'dark' && styles.textDark]}>
                Total
              </Text>
              <Text style={[styles.summaryTotal, theme === 'dark' && styles.priceDark]}>
                Rp {productId === '1' ? '19.999.000' : '8.999.000'}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.cancelButton, theme === 'dark' && styles.cancelButtonDark]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>❌ Batal</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.confirmButton, theme === 'dark' && styles.confirmButtonDark]}
            onPress={handleConfirmCheckout}
          >
            <Text style={styles.confirmButtonText}>✅ Konfirmasi Pesanan</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.note, theme === 'dark' && styles.textSecondaryDark]}>
          🎯 Modal Full Screen - Semua navigasi tersembunyi
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDark: {
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '85%',
  },
  modalContentDark: {
    backgroundColor: '#2D3748',
  },
  scrollContent: {
    maxHeight: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2D3748',
  },
  productInfo: {
    backgroundColor: '#F7FAFC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  productInfoDark: {
    backgroundColor: '#4A5568',
  },
  productId: {
    fontSize: 14,
    textAlign: 'center',
    color: '#718096',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
    color: '#2D3748',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007AFF',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F7FAFC',
    borderRadius: 10,
  },
  sectionDark: {
    backgroundColor: '#4A5568',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2D3748',
  },
  text: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 5,
  },
  summary: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#EDF2F7',
    borderRadius: 10,
  },
  summaryDark: {
    backgroundColor: '#4A5568',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2D3748',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 16,
    color: '#718096',
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2D3748',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#6B7280',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonDark: {
    backgroundColor: '#4A5568',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  confirmButtonDark: {
    backgroundColor: '#3182CE',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',
    color: '#718096',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
  priceDark: {
    color: '#63B3ED',
  },
});

export default CheckoutScreen;