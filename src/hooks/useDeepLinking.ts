import { useState, useEffect, useCallback } from 'react';
import { Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// ✅ SOAL 3: Penanganan Warm Start
export const useDeepLinking = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [initialUrl, setInitialUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ Handle URL yang dibuka
  const handleOpenURL = useCallback((url: string | null) => {
    if (!url) return;

    console.log('🔗 Deep link received:', url);
    setIsProcessing(true);

    try {
      // Parse URL untuk mendapatkan path
      if (url.includes('ecommerceapp://')) {
        const path = url.replace('ecommerceapp://', '');
        
        console.log('📋 Parsed deep link path:', path);

        // Handle different deep link paths
        if (path.startsWith('produk/')) {
          const productId = path.replace('produk/', '');
          if (productId) {
            // Navigate to MainApp (BottomTabNavigator) dan ke product detail
            navigation.navigate('MainApp' as any, { 
              screen: 'HomeStack', 
              params: { 
                screen: 'ProductDetail', 
                params: { productId } 
              } 
            });
            console.log('🎯 Navigated to product:', productId);
          }
        }
        else if (path.startsWith('profil/')) {
          const userId = path.replace('profil/', '');
          if (userId && /^[a-zA-Z0-9]{3,50}$/.test(userId)) {
            // Navigate to profile
            navigation.navigate('MainApp' as any, { 
              screen: 'Profile', 
              params: { userId } 
            });
            console.log('🎯 Navigated to profile:', userId);
          } else {
            Alert.alert('Error', 'User ID tidak valid');
            navigation.navigate('MainApp' as any);
          }
        }
        else if (path === 'keranjang') {
          // ✅ SOAL 3: Navigasi ke keranjang dari external
          navigation.navigate('MainApp' as any, { screen: 'Cart' });
          console.log('🎯 Navigated to cart');
        }
        else if (path === 'home' || path === '') {
          navigation.navigate('MainApp' as any);
          console.log('🎯 Navigated to home');
        }
        else if (path.startsWith('checkout/')) {
          const productId = path.replace('checkout/', '');
          if (productId) {
            navigation.navigate('Checkout', { productId });
            console.log('🎯 Navigated to checkout:', productId);
          }
        }
        else {
          console.log('⚠️ Unknown deep link path:', path);
          // Fallback ke home
          navigation.navigate('MainApp' as any);
        }
      }
    } catch (error) {
      console.error('❌ Error processing deep link:', error);
      Alert.alert('Error', 'Gagal memproses tautan');
      navigation.navigate('MainApp' as any);
    } finally {
      setIsProcessing(false);
    }
  }, [navigation]);

  // ✅ Get initial URL saat app start (Cold Start)
  const getInitialURL = useCallback(async () => {
    try {
      const url = await Linking.getInitialURL();
      setInitialUrl(url);
      if (url) {
        console.log('🚀 App opened with deep link (Cold Start):', url);
        handleOpenURL(url);
      }
    } catch (error) {
      console.error('❌ Error getting initial URL:', error);
    }
  }, [handleOpenURL]);

  // ✅ FIXED: Setup event listener untuk URL changes (Warm Start)
  const setupURLListener = useCallback(() => {
    // ✅ FIX: Gunakan Linking.addEventListener yang baru
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('🔄 App received deep link (Warm Start):', url);
      handleOpenURL(url);
    });

    return () => {
      subscription.remove();
    };
  }, [handleOpenURL]);

  // ✅ Test deep linking (untuk development)
  const testDeepLink = useCallback((url: string) => {
    console.log('🧪 Testing deep link:', url);
    handleOpenURL(url);
  }, [handleOpenURL]);

  // ✅ Open external URL
  const openExternalURL = useCallback(async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        console.log('🌐 Opened external URL:', url);
      } else {
        Alert.alert('Error', 'Tidak dapat membuka URL ini');
      }
    } catch (error) {
      console.error('❌ Error opening URL:', error);
      Alert.alert('Error', 'Gagal membuka URL');
    }
  }, []);

  useEffect(() => {
    // ✅ SOAL 3: Setup untuk warm start handling
    getInitialURL();
    const cleanup = setupURLListener();

    return cleanup;
  }, [getInitialURL, setupURLListener]);

  return {
    initialUrl,
    isProcessing,
    testDeepLink,
    openExternalURL,
    handleOpenURL,
  };
};