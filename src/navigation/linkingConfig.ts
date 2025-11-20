import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './AppNavigator';

// ✅ SIMPLE VERSION - Hanya screen yang ada di RootStackParamList
export const linkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: [
    'ecommerceapp://',
    'https://ecommerceapp.com',
  ],

  config: {
    screens: {
      // ✅ Hanya screen yang ada di RootStackParamList
      Onboarding1: 'onboarding1',
      Onboarding2: 'onboarding2',
      MainApp: 'main',                    // ecommerceapp://main
      Checkout: 'checkout/:productId',    // ecommerceapp://checkout/123
      ScreenHistory: 'riwayat',
    },
  },
};

// ✅ Simple deep link generators
export const generateDeepLink = {
  home: (): string => 'ecommerceapp://main',
  product: (productId: string): string => `ecommerceapp://main/produk/${productId}`,
  profile: (userId: string): string => `ecommerceapp://main/profil/${userId}`,
  cart: (): string => 'ecommerceapp://main/keranjang',
  checkout: (productId: string): string => `ecommerceapp://checkout/${productId}`,
};