import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useNetInfo } from '../../hooks/useNetInfo';

// ✅ SOAL 20: Cart dengan Polling Bersyarat
const CartScreen: React.FC = () => {
  const { theme } = useTheme();
  const { isOnline, connectionType } = useNetInfo();
  
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);
  const [pollingCount, setPollingCount] = useState<number>(0);

  useEffect(() => {
    // ✅ SOAL 20: Hentikan polling jika cellular
    if (connectionType === 'cellular') {
      console.log('📵 Polling dihentikan - jaringan cellular terdeteksi');
      return;
    }

    if (!isOnline) {
      console.log('🔴 Polling dihentikan - offline');
      return;
    }

    console.log('🔄 Memulai polling cart...');
    
    const intervalId = setInterval(() => {
      // Simulasi update cart data
      const newTotal = Math.floor(Math.random() * 1000000) + 50000;
      const newCount = Math.floor(Math.random() * 10) + 1;
      
      setCartTotal(newTotal);
      setItemCount(newCount);
      setPollingCount(prev => prev + 1);
      
      console.log(`🛒 Polling #${pollingCount + 1}: Total: Rp ${newTotal.toLocaleString('id-ID')}`);
    }, 15000); // ✅ 15 detik interval

    // ✅ SOAL 20: Cleanup interval
    return () => {
      console.log('🧹 Membersihkan polling interval');
      clearInterval(intervalId);
    };
  }, [isOnline, connectionType, pollingCount]);

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      `Total belanja: Rp ${cartTotal.toLocaleString('id-ID')}\n\n${itemCount} items`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
        🛒 Keranjang Belanja
      </Text>

      {/* Status Polling */}
      <View style={[styles.statusCard, theme === 'dark' && styles.statusCardDark]}>
        <Text style={[styles.statusTitle, theme === 'dark' && styles.textDark]}>
          Status Polling
        </Text>
        <Text style={[styles.statusText, theme === 'dark' && styles.textSecondaryDark]}>
          {connectionType === 'cellular' ? (
            '⏸️ Polling dihentikan (jaringan cellular)'
          ) : !isOnline ? (
            '🔴 Polling dihentikan (offline)'
          ) : (
            `🔄 Polling aktif - Count: ${pollingCount}`
          )}
        </Text>
        <Text style={[styles.connectionInfo, theme === 'dark' && styles.textSecondaryDark]}>
          Koneksi: {isOnline ? `🟢 ${connectionType}` : '🔴 Offline'}
        </Text>
      </View>

      {/* Cart Summary */}
      <View style={[styles.cartCard, theme === 'dark' && styles.cartCardDark]}>
        <Text style={[styles.cartTitle, theme === 'dark' && styles.textDark]}>
          Ringkasan Belanja
        </Text>
        
        <View style={styles.cartRow}>
          <Text style={[styles.cartLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Jumlah Item:
          </Text>
          <Text style={[styles.cartValue, theme === 'dark' && styles.textDark]}>
            {itemCount} items
          </Text>
        </View>

        <View style={styles.cartRow}>
          <Text style={[styles.cartLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Total Belanja:
          </Text>
          <Text style={[styles.cartTotal, theme === 'dark' && styles.priceDark]}>
            Rp {cartTotal.toLocaleString('id-ID')}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, theme === 'dark' && styles.checkoutButtonDark]}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>
            💳 Checkout Sekarang
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.note, theme === 'dark' && styles.textSecondaryDark]}>
        ✅ Soal 20: Polling bersyarat berdasarkan jenis koneksi
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusCardDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    borderWidth: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  connectionInfo: {
    fontSize: 12,
    color: '#718096',
    fontStyle: 'italic',
  },
  cartCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartCardDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    borderWidth: 1,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cartLabel: {
    fontSize: 16,
    color: '#718096',
  },
  cartValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  cartTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonDark: {
    backgroundColor: '#2E8B57',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
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

export default CartScreen;