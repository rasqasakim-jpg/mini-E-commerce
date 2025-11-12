import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../../../../contexts/ThemeContext';
import ProductCard from '../../../../components/ProductCard';
import { Product } from '../../../../types';

const entertainmentProducts: Product[] = [
  {
    id: 'en1',
    name: 'Sony PlayStation 5',
    price: 8999000,
    imageUrl: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$1600px--t$',
    description: 'Console gaming next generation',
    category: 'entertainment'
  },
  {
    id: 'en2',
    name: 'Nintendo Switch OLED',
    price: 4999000,
    imageUrl: 'https://cdn01.nintendo-europe.com/media/images/10_share_images/systems_15/nintendo_switch_4/H2x1_NSwitch_OLED_model.png',
    description: 'Console hybrid gaming portable',
    category: 'entertainment'
  },
  {
    id: 'en3',
    name: 'JBL Flip 6 Speaker',
    price: 2499000,
    imageUrl: 'https://www.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw9a31e67d/JBL_FLIP_6_HERO_BLUE_0456_x3.png?sw=535&sh=535',
    description: 'Bluetooth speaker waterproof',
    category: 'entertainment'
  },
  {
    id: 'en4',
    name: 'Sony WH-1000XM4',
    price: 3999000,
    imageUrl: 'https://www.sony.co.id/image/5a6e12d5e4d6c9664cbbc6b9d3b4c9f3?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=2515&hei=1320',
    description: 'Headphone noise cancelling premium',
    category: 'entertainment'
  },
  {
    id: 'en5',
    name: 'Xbox Wireless Controller',
    price: 899000,
    imageUrl: 'https://compass-ssl.xbox.com/assets/54/45/54450e89-3c3a-42f8-bdec-252d2c52b6e1.png?n=XBX_A-BuyBoxBGImage02-D.png',
    description: 'Controller wireless untuk Xbox/PC',
    category: 'entertainment'
  },
  {
    id: 'en6',
    name: '4K Ultra HD Blu-ray Movie',
    price: 299000,
    imageUrl: 'https://m.media-amazon.com/images/I/81zZYpM-1aL._SL1500_.jpg',
    description: 'Film koleksi 4K Ultra HD',
    category: 'entertainment'
  }
];

const EntertainmentTab: React.FC = () => {
  const { theme } = useTheme();
  const { width, height } = useWindowDimensions();
  
  const isLandscape = width > height;
  const numColumns = isLandscape ? 3 : 2;

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
        🎮 Hiburan & Gaming
      </Text>
      <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
        Console, audio, dan entertainment terbaik
      </Text>
      
      <FlatList
        data={entertainmentProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        key={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 8,
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    color: '#718096',
  },
  listContent: {
    paddingBottom: 20,
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default EntertainmentTab;