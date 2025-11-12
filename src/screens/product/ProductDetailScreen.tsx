import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from '../../contexts/ThemeContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { DrawerParamList } from '../../navigation/DrawerNavigator';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProductDetailScreenNavigationProp = StackNavigationProp<HomeStackParamList & { Checkout: { productId: string } }, 'ProductDetail'>;
type ProductDetailScreenRouteProp = RouteProp<HomeStackParamList, 'ProductDetail'>;

interface Props {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
}

// ✅ DATA LENGKAP UNTUK SEMUA PRODUK
const productData: { [key: string]: any } = {
  // POPULAR PRODUCTS
  '1': {
    id: '1',
    name: 'iPhone 14 Pro',
    price: 19999000,
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    description: 'iPhone terbaru dengan dynamic island dan kamera 48MP',
    fullDescription: 'iPhone 14 Pro menghadirkan inovasi terbaru dengan Dynamic Island yang mengubah cara Anda berinteraksi dengan iPhone. Dilengkapi dengan kamera utama 48MP untuk foto dengan detail menakjubkan, chip A16 Bionic yang paling cepat, dan daya tahan baterai sepanjang hari.',
    specifications: ['Chip A16 Bionic', 'Kamera utama 48MP', 'Dynamic Island', 'Always-On Display', 'Tahan air IP68', 'Baterai sepanjang hari', 'iOS 16 terbaru'],
    category: 'electronics',
    rating: 4.9,
    discount: 10
  },
  '2': {
    id: '2',
    name: 'Samsung Galaxy S23',
    price: 8999000,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    description: 'Smartphone flagship dengan kamera terbaik',
    fullDescription: 'Samsung Galaxy S23 hadir dengan performa terbaik dan kamera yang luar biasa. Ditenagai oleh Snapdragon 8 Gen 2, kamera 50MP dengan Nightography, dan baterai yang tahan lama hingga 2 hari pemakaian normal.',
    specifications: ['Snapdragon 8 Gen 2', 'Kamera 50MP Nightography', '120Hz Dynamic AMOLED', 'Baterai 3900mAh', 'Android 13', 'Gorilla Glass Victus 2'],
    category: 'electronics',
    discount: 15,
    rating: 4.8
  },
  '3': {
    id: '3',
    name: 'MacBook Air M2',
    price: 15999000,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
    description: 'Laptop tipis dan ringan dengan chip M2',
    fullDescription: 'MacBook Air dengan chip M2 yang revolusioner menghadirkan performa luar biasa dalam desain tipis dan ringan. Sempurna untuk produktivitas dan kreativitas dengan baterai hingga 18 jam.',
    specifications: ['Chip Apple M2', 'RAM 8GB Unified Memory', 'SSD 256GB', 'Layar 13.6" Liquid Retina', 'Baterai hingga 18 jam', 'macOS Ventura'],
    category: 'electronics',
    rating: 4.7
  },
  '4': {
    id: '4',
    name: 'Nike Air Force 1',
    price: 1899000,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    description: 'Sepatu sneaker klasik yang nyaman',
    fullDescription: 'Nike Air Force 1 adalah sepatu basket klasik yang menjadi ikon streetwear. Dengan desain timeless dan kenyamanan maksimal, cocok untuk gaya sehari-hari.',
    specifications: ['Material leather premium', 'Sole rubber tahan lama', 'Air cushioning', 'Warna putih klasik', 'Ukuran tersedia 38-45'],
    category: 'clothing',
    discount: 20,
    rating: 4.6
  },
  '5': {
    id: '5',
    name: 'Sony WH-1000XM4',
    price: 3999000,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
    description: 'Headphone wireless dengan noise cancelling',
    fullDescription: 'Sony WH-1000XM4 menghadirkan pengalaman mendengarkan terbaik dengan noise cancelling cerdas, kualitas suara tinggi, dan baterai hingga 30 jam.',
    specifications: ['Noise Cancelling cerdas', 'Baterai 30 jam', 'Quick charge 10 menit = 5 jam', 'Touch control', 'Voice assistant', 'Koneksi multipoint'],
    category: 'electronics',
    discount: 25,
    rating: 4.8
  },
  '6': {
    id: '6',
    name: 'Indomie Goreng Special',
    price: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=400&h=300&fit=crop',
    description: 'Mi instan goreng rasa special',
    fullDescription: 'Indomie Goreng Special dengan rasa khas Indonesia yang telah mendunia. Perpaduan bumbu sempurna dengan tekstur mi yang kenyal.',
    specifications: ['Net weight 85g', 'Rasa ayam bawang', 'Cara masak 3 menit', 'Tanpa pengawet', 'Halal MUI'],
    category: 'food',
    rating: 4.9
  },

  // NEW PRODUCTS
  'n1': {
    id: 'n1',
    name: 'iPhone 15 Pro',
    price: 24999000,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    description: 'iPhone terbaru dengan titanium body',
    fullDescription: 'iPhone 15 Pro dengan material titanium aerospace-grade yang lebih ringan dan kuat. Dilengkapi kamera 48MP Pro dan chip A17 Pro untuk gaming AAA.',
    specifications: ['Chip A17 Pro', 'Titanium design', 'Kamera 48MP Pro', 'Action button', 'USB-C', 'iOS 17'],
    category: 'electronics',
    discount: 5
  },
  'n2': {
    id: 'n2',
    name: 'Samsung Galaxy Z Flip5',
    price: 15999000,
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop',
    description: 'Smartphone foldable terbaru',
    fullDescription: 'Samsung Galaxy Z Flip5 dengan cover screen yang lebih besar dan desain compact yang sempurna. Cocok untuk gaya hidup modern yang dinamis.',
    specifications: ['Layar 6.7" Foldable', 'Cover Screen 3.4"', 'Snapdragon 8 Gen 2', 'Kamera dual 12MP', 'Baterai 3700mAh', 'Android 13'],
    category: 'electronics',
    discount: 10
  },
  'n3': {
    id: 'n3',
    name: 'MacBook Pro M3',
    price: 29999000,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    description: 'Laptop profesional dengan chip M3',
    fullDescription: 'MacBook Pro dengan chip M3 yang memberikan performa luar biasa untuk profesional kreatif. Layar Liquid Retina XDR dengan kecerahan ekstrem.',
    specifications: ['Chip Apple M3', 'RAM 16GB Unified Memory', 'SSD 512GB', 'Layar 14.2" Liquid Retina XDR', 'Baterai hingga 22 jam', 'Port HDMI & SDXC'],
    category: 'electronics',
    discount: 8
  },
  'n4': {
    id: 'n4',
    name: 'Sony WH-1000XM5',
    price: 4999000,
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
    description: 'Headphone noise cancelling terbaru',
    fullDescription: 'Sony WH-1000XM5 dengan desain baru yang lebih ringan dan nyaman. Noise cancelling terbaik di kelasnya dengan prosesor V1 terintegrasi.',
    specifications: ['Prosesor V1 Integrated', '30 jam baterai', 'Quick charge 3 menit = 3 jam', 'Desain foldable', 'Kualitas suara Hi-Res'],
    category: 'electronics',
    discount: 12
  },

  // DISCOUNT PRODUCTS
  'd1': {
    id: 'd1',
    name: 'iPhone 13',
    price: 12999000,
    imageUrl: 'https://images.unsplash.com/photo-1632661674596-618e45e56d61?w=400&h=300&fit=crop',
    description: 'iPhone dengan performa tinggi',
    fullDescription: 'iPhone 13 masih menjadi pilihan terbaik dengan chip A15 Bionic yang powerful, sistem kamera ganda, dan baterai yang tahan lama.',
    specifications: ['Chip A15 Bionic', 'Kamera dual 12MP', 'Layar Super Retina XDR', 'Baterai hingga 19 jam', 'iOS 15', 'Tahan air IP68'],
    category: 'electronics',
    discount: 30
  },
  'd2': {
    id: 'd2',
    name: 'Samsung Galaxy S21',
    price: 6999000,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
    description: 'Smartphone flagship sebelumnya',
    fullDescription: 'Samsung Galaxy S21 dengan desain kontemporer dan performa flagship. Kamera profesional dan layar Dynamic AMOLED 2X yang memukau.',
    specifications: ['Exynos 2100', 'Kamera triple 64MP', 'Layar 6.2" Dynamic AMOLED', 'Baterai 4000mAh', 'Android 11', '5G Ready'],
    category: 'electronics',
    discount: 35
  },
  'd3': {
    id: 'd3',
    name: 'MacBook Pro M1',
    price: 14999000,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    description: 'Laptop profesional dengan chip M1',
    fullDescription: 'MacBook Pro dengan chip M1 yang revolusioner. Performa luar biasa untuk profesional dengan efisiensi daya yang mengagumkan.',
    specifications: ['Chip Apple M1', 'RAM 8GB Unified Memory', 'SSD 256GB', 'Layar 13" Retina', 'Baterai hingga 20 jam', 'Touch Bar'],
    category: 'electronics',
    discount: 25
  },
  'd4': {
    id: 'd4',
    name: 'Nike Jordan 1',
    price: 2499000,
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
    description: 'Sepatu basketball limited edition',
    fullDescription: 'Air Jordan 1 Retro High OG dengan desain klasik yang ikonik. Kualitas premium dan detailing yang sempurna untuk kolektor.',
    specifications: ['Material leather premium', 'Colorway Chicago', 'Air cushioning', 'High top design', 'Limited edition'],
    category: 'clothing',
    discount: 40
  },
  'd5': {
    id: 'd5',
    name: 'Gaming Chair Pro',
    price: 1999000,
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    description: 'Kursi gaming ergonomis',
    fullDescription: 'Gaming Chair dengan desain ergonomis untuk kenyamanan maksimal selama berjam-jam. Dilengkapi lumbar support dan neck pillow.',
    specifications: ['Material PVC leather', 'Frame besi kuat', 'Adjustable height', 'Reclining 90-180°', 'Lumbar support', 'Max load 150kg'],
    category: 'furniture',
    discount: 20
  },
  'd6': {
    id: 'd6',
    name: 'Smart Watch Series 8',
    price: 4999000,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    description: 'Smartwatch dengan fitness tracking',
    fullDescription: 'Smart Watch dengan fitur kesehatan lengkap termasuk EKG, blood oxygen monitoring, dan sleep tracking. Tahan air hingga 50 meter.',
    specifications: ['Layar Always-On Retina', 'EKG app', 'Blood oxygen monitor', 'GPS + Cellular', 'Baterai 18 jam', 'watchOS 9'],
    category: 'electronics',
    discount: 15
  }
};

const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { productId } = route.params;
  const product = productData[productId];
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  const imageHeight = isLandscape ? height * 0.6 : 300;

  if (!product) {
    return (
      <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
        <Text style={[styles.errorText, theme === 'dark' && styles.textDark]}>Produk tidak ditemukan</Text>
      </View>
    );
  }

  // Hitung harga setelah diskon
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    Alert.alert(
      'Berhasil 🛒', 
      `${product.name} ditambahkan ke keranjang!\n\nHarga: Rp ${discountedPrice.toLocaleString('id-ID')}`,
      [{ text: 'OK' }]
    );
  };

  const handleCheckout = () => {
    (navigation as any).navigate('Checkout', { productId: product.id });
  };

  const handleResetToHome = () => {
    navigation.reset({ 
      index: 0, 
      routes: [{ name: 'HomeTabs' }] 
    });

    try {
      const parentDrawer = navigation.getParent()?.getParent()?.getParent() as DrawerNavigationProp<DrawerParamList> | null;
      if (parentDrawer && typeof parentDrawer.closeDrawer === 'function') {
        parentDrawer.closeDrawer();
      }
    } catch (error) {
      console.log('Error menutup drawer:', error);
    }
  };

  const handleBackToDrawerHomeWithGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Image 
        source={{ uri: product.imageUrl }} 
        style={[styles.productImage, { height: imageHeight }]} 
        resizeMode="cover" 
      />
      
      <View style={[styles.content, isLandscape && styles.contentLandscape]}>
        <View style={isLandscape ? styles.landscapeLeft : {}}>
          <Text style={[styles.productName, theme === 'dark' && styles.textDark]}>{product.name}</Text>
          
          {/* Price Section */}
          <View style={styles.priceContainer}>
            {product.discount ? (
              <>
                <Text style={[styles.originalPrice, theme === 'dark' && styles.originalPriceDark]}>
                  Rp {product.price.toLocaleString('id-ID')}
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{product.discount}%</Text>
                </View>
                <Text style={[styles.productPrice, theme === 'dark' && styles.priceDark]}>
                  Rp {discountedPrice.toLocaleString('id-ID')}
                </Text>
              </>
            ) : (
              <Text style={[styles.productPrice, theme === 'dark' && styles.priceDark]}>
                Rp {product.price.toLocaleString('id-ID')}
              </Text>
            )}
          </View>

          {/* Rating */}
          {product.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingStar}>⭐</Text>
              <Text style={[styles.rating, theme === 'dark' && styles.textSecondaryDark]}>
                {product.rating}/5 • {product.category}
              </Text>
            </View>
          )}
        </View>

        <View style={isLandscape ? styles.landscapeRight : {}}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>📖 Deskripsi Produk</Text>
            <Text style={[styles.productDescription, theme === 'dark' && styles.textSecondaryDark]}>
              {product.fullDescription}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>⚙️ Spesifikasi</Text>
            {product.specifications.map((spec: string, index: number) => (
              <View key={index} style={styles.specItem}>
                <Text style={[styles.specDot, theme === 'dark' && styles.textDark]}>•</Text>
                <Text style={[styles.specText, theme === 'dark' && styles.textSecondaryDark]}>{spec}</Text>
              </View>
            ))}
          </View>

          {/* ✅ TOMBOL AKSI NAVIGASI */}
          <View style={styles.section}>
            <TouchableOpacity style={[styles.checkoutButton, theme === 'dark' && styles.checkoutButtonDark]} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>💰 Checkout Sekarang</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.cartButton, theme === 'dark' && styles.cartButtonDark]} onPress={handleAddToCart}>
              <Text style={styles.cartButtonText}>🛒 Tambah ke Keranjang</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.goBackButton, theme === 'dark' && styles.goBackButtonDark]} onPress={handleBackToDrawerHomeWithGoBack}>
              <Text style={styles.goBackButtonText}>↩️ Kembali</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.resetButton, theme === 'dark' && styles.resetButtonDark]} onPress={handleResetToHome}>
              <Text style={styles.resetButtonText}>🏠 Reset ke Beranda</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  containerDark: { backgroundColor: '#1A202C' },
  productImage: { width: '100%' },
  content: { padding: 20 },
  contentLandscape: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  landscapeLeft: {
    flex: 1,
    marginRight: 20,
  },
  landscapeRight: {
    flex: 2,
  },
  productName: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#2D3748', 
    marginBottom: 8,
    lineHeight: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  productPrice: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#007AFF', 
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: '#718096',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  originalPriceDark: {
    color: '#A0AEC0',
  },
  discountBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingStar: {
    fontSize: 16,
    marginRight: 6,
  },
  rating: {
    fontSize: 14,
    color: '#718096',
  },
  section: { 
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionDark: {
    backgroundColor: '#2D3748',
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#2D3748', 
    marginBottom: 12,
  },
  productDescription: { 
    fontSize: 16, 
    color: '#718096', 
    lineHeight: 24,
    textAlign: 'justify',
  },
  specItem: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 8 
  },
  specDot: { 
    fontSize: 16, 
    color: '#2D3748', 
    marginRight: 8, 
    marginTop: 2 
  },
  specText: { 
    fontSize: 14, 
    color: '#718096', 
    lineHeight: 20, 
    flex: 1 
  },
  checkoutButton: { 
    backgroundColor: '#34C759', 
    padding: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 8 
  },
  checkoutButtonDark: { 
    backgroundColor: '#2E8B57' 
  },
  checkoutButtonText: { 
    fontSize: 16, 
    color: 'white', 
    fontWeight: '600' 
  },
  cartButton: { 
    paddingVertical: 16, 
    backgroundColor: '#515151ff',
    borderRadius: 10, 
    alignItems: 'center',
    marginBottom: 8,
  },
  cartButtonDark: { 
    backgroundColor: '#515151ff',
  },
  cartButtonText: { 
    fontSize: 16, 
    color: 'white', 
    fontWeight: '600' 
  },
  goBackButton: { 
    backgroundColor: '#515151ff',
    padding: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 8 
  },
  goBackButtonDark: { 
 backgroundColor: '#515151ff',
  },
  goBackButtonText: { 
    fontSize: 16, 
    color: 'white', 
    fontWeight: '600' 
  },
  resetButton: { 
    backgroundColor: '#515151ff',
    padding: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 8 
  },
  resetButtonDark: { 
    backgroundColor: '#515151ff',
  },
  resetButtonText: { 
    fontSize: 16, 
    color: 'white', 
    fontWeight: '600' 
  },
  errorText: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginTop: 50, 
    color: '#2D3748' 
  },
  textDark: { 
    color: '#F7FAFC' 
  },
  textSecondaryDark: { 
    color: '#A0AEC0' 
  },
  priceDark: { 
    color: '#63B3ED' 
  },
});

export default ProductDetailScreen;