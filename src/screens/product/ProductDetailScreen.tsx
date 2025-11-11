import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from '../../contexts/ThemeContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { DrawerParamList } from '../../navigation/DrawerNavigator';

type ProductDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'ProductDetail'>;
type ProductDetailScreenRouteProp = RouteProp<HomeStackParamList, 'ProductDetail'>;

interface Props {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
}

const productData: { [key: string]: any } = {
  '1': {
    id: '1',
    name: 'iPhone 14 Pro',
    price: 19999000,
    imageUrl: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617539',
    description: 'iPhone terbaru dengan dynamic island dan kamera 48MP',
    fullDescription: 'iPhone 14 Pro menghadirkan inovasi terbaru dengan Dynamic Island yang mengubah cara Anda berinteraksi dengan iPhone. Dilengkapi dengan kamera utama 48MP untuk foto dengan detail menakjubkan, chip A16 Bionic yang paling cepat, dan daya tahan baterai sepanjang hari.',
    specifications: ['Chip A16 Bionic', 'Kamera utama 48MP', 'Dynamic Island', 'Always-On Display', 'Tahan air IP68']
  },
  '2': {
    id: '2',
    name: 'Samsung Galaxy S23',
    price: 8999000,
    imageUrl: 'https://i.pinimg.com/736x/07/83/6f/07836fa172bd7ecece2bd2bfc33ac371.jpg',
    description: 'Smartphone flagship dengan kamera terbaik',
    fullDescription: 'Samsung Galaxy S23 hadir dengan performa terbaik dan kamera yang luar biasa. Ditenagai oleh Snapdragon 8 Gen 2, kamera 50MP, dan baterai yang tahan lama.',
    specifications: ['Snapdragon 8 Gen 2', 'Kamera 50MP', '120Hz Dynamic AMOLED', 'Baterai 3900mAh', 'Android 13']
  }
};

const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { productId } = route.params;
  const product = productData[productId];

  if (!product) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <Text style={[styles.errorText, theme === 'dark' && styles.textDark]}>Produk tidak ditemukan</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    Alert.alert('Berhasil', `${product.name} ditambahkan ke keranjang!`);
  };

  // ✅ SOAL 3: Reset Stack dan Tutup Drawer (FIXED)
  const handleResetToHome = () => {
    // Reset navigation ke home
    navigation.reset({ 
      index: 0, 
      routes: [{ name: 'HomeTabs' }] 
    });

    // Coba tutup drawer dengan safe checking
    try {
      const parentDrawer = navigation.getParent()?.getParent()?.getParent() as DrawerNavigationProp<DrawerParamList> | null;
      
      // Debug: cek apakah parentDrawer ada dan punya method closeDrawer
      console.log('Parent Drawer:', parentDrawer);
      
      if (parentDrawer && typeof parentDrawer.closeDrawer === 'function') {
        parentDrawer.closeDrawer();
        Alert.alert('Berhasil!', 'Telah kembali ke beranda dan drawer ditutup.');
      } else {
        // Fallback jika closeDrawer tidak tersedia
        Alert.alert('Berhasil!', 'Telah kembali ke beranda.');
      }
    } catch (error) {
      console.log('Error menutup drawer:', error);
      Alert.alert('Berhasil!', 'Telah kembali ke beranda.');
    }
  };

  // ✅ SOAL 4: Kembali ke Drawer Home menggunakan Parent Navigator (FIXED)
  const handleBackToDrawerHome = () => {
    try {
      const parentDrawer = navigation.getParent()?.getParent()?.getParent() as DrawerNavigationProp<DrawerParamList> | null;
      
      if (parentDrawer) {
        // Gunakan route yang ada di DrawerParamList - 'MainApp' atau 'Settings'
        // Sesuaikan dengan nama route yang benar di drawer navigator Anda
        parentDrawer.navigate('MainApp'); // Ganti dengan route yang sesuai
        Alert.alert('Navigasi Parent', 'Berhasil kembali ke Drawer Home menggunakan parent navigator!');
      } else {
        // Fallback ke navigation biasa
        navigation.navigate('HomeTabs');
        Alert.alert('Info', 'Berhasil kembali ke beranda menggunakan navigasi biasa.');
      }
    } catch (error) {
      console.log('Error navigasi parent:', error);
      navigation.navigate('HomeTabs');
      Alert.alert('Info', 'Berhasil kembali ke beranda.');
    }
  };

  // ✅ ALTERNATIF: Jika ingin menggunakan goBack()
  const handleBackToDrawerHomeWithGoBack = () => {
    try {
      const parentDrawer = navigation.getParent()?.getParent()?.getParent() as DrawerNavigationProp<DrawerParamList> | null;
      
      if (parentDrawer && typeof parentDrawer.goBack === 'function') {
        parentDrawer.goBack();
        Alert.alert('Navigasi Parent', 'Berhasil kembali menggunakan goBack()!');
      } else {
        navigation.goBack();
        Alert.alert('Info', 'Berhasil kembali menggunakan goBack biasa.');
      }
    } catch (error) {
      console.log('Error goBack:', error);
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} resizeMode="cover" />
      
      <View style={styles.content}>
        <Text style={[styles.productName, theme === 'dark' && styles.textDark]}>{product.name}</Text>
        <Text style={[styles.productPrice, theme === 'dark' && styles.priceDark]}>Rp {product.price.toLocaleString('id-ID')}</Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>Deskripsi Produk</Text>
          <Text style={[styles.productDescription, theme === 'dark' && styles.textSecondaryDark]}>{product.fullDescription}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>Spesifikasi</Text>
          {product.specifications.map((spec: string, index: number) => (
            <View key={index} style={styles.specItem}>
              <Text style={[styles.specDot, theme === 'dark' && styles.textDark]}>•</Text>
              <Text style={[styles.specText, theme === 'dark' && styles.textSecondaryDark]}>{spec}</Text>
            </View>
          ))}
        </View>

        {/* ✅ SOAL 3 & 4: Tombol Aksi Navigasi */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>Aksi Navigasi</Text>

          <TouchableOpacity style={[styles.goBackButton, theme === 'dark' && styles.goBackButtonDark]} onPress={handleBackToDrawerHomeWithGoBack}>
            <Text style={styles.goBackButtonText}>↩️ Kembali dengan GoBack (GoBack)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.resetButton, theme === 'dark' && styles.resetButtonDark]} onPress={handleResetToHome}>
            <Text style={styles.resetButtonText}>🏠 Reset ke Beranda </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.cartButton, theme === 'dark' && styles.cartButtonDark]} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>🛒 Tambah ke Keranjang</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  containerDark: { backgroundColor: '#1A202C' },
  productImage: { width: '100%', height: 300 },
  content: { padding: 20 },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#2D3748', marginBottom: 8 },
  productPrice: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', marginBottom: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#2D3748', marginBottom: 12 },
  productDescription: { fontSize: 16, color: '#718096', lineHeight: 24 },
  specItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  specDot: { fontSize: 16, color: '#2D3748', marginRight: 8, marginTop: 2 },
  specText: { fontSize: 14, color: '#718096', lineHeight: 20, flex: 1 },
  parentBackButton: { backgroundColor: '#AF52DE', padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  parentBackButtonDark: { backgroundColor: '#8B5CF6' },
  parentBackButtonText: { fontSize: 16, color: 'white', fontWeight: '600' },
  goBackButton: { backgroundColor: '#FF9500', padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  goBackButtonDark: { backgroundColor: '#FF9F0A' },
  goBackButtonText: { fontSize: 16, color: 'white', fontWeight: '600' },
  resetButton: { backgroundColor: '#34C759', padding: 16, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  resetButtonDark: { backgroundColor: '#2E8B57' },
  resetButtonText: { fontSize: 16, color: 'white', fontWeight: '600' },
  cartButton: { paddingVertical: 16, backgroundColor: '#007AFF', borderRadius: 10, alignItems: 'center' },
  cartButtonDark: { backgroundColor: '#3182CE' },
  cartButtonText: { fontSize: 16, color: 'white', fontWeight: '600' },
  errorText: { fontSize: 18, textAlign: 'center', marginTop: 50, color: '#2D3748' },
  textDark: { color: '#F7FAFC' },
  textSecondaryDark: { color: '#A0AEC0' },
  priceDark: { color: '#63B3ED' },
});

export default ProductDetailScreen;