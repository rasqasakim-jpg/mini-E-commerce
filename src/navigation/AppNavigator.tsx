// src/navigation/AppNavigator.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary';
import NetworkStatusBanner from '../components/NetworkStatusBanner';
import SplashScreen from '../components/SplashScreen';
import Onboarding1 from '../screens/onboarding/Onboarding1';
import Onboarding2 from '../screens/onboarding/Onboarding2';
import DrawerNavigator from './DrawerNavigator'; // Ganti ke DrawerNavigator
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import ScreenHistory from '../screens/analytics/ScreenHistory';
import { linkingConfig } from './linkingConfig';
import { useAppStartup } from '../hooks/useAppStartup';


// ✅ DEFINISI TIPE
export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
  CategoryProducts: { category: string };
};

export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ProductAPI: undefined;
  Catalog: undefined;
  Cart: undefined;
  Profile: { userId?: string };
  Login: undefined;
};

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  MainApp: {
    screen: string;
    params?: any;
  } | undefined;
  Checkout: { source: 'cart' | 'buy-now', productId?: string };
  ScreenHistory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// ✅ Analytics Listener
const analyticsListener = (state: any) => {
  if (state && state.routes && state.routes.length > 0) {
    const currentRoute = state.routes[state.index];
    let routeName = currentRoute.name;
    
    if (currentRoute.state) {
      const nestedState = currentRoute.state;
      const nestedRoute = nestedState.routes[nestedState.index];
      routeName = `${routeName}/${nestedRoute.name}`;
    }
    
    console.log(`[ANALYTICS] Rute dikunjungi: ${routeName}`);
    
    const historyEntry = {
      route: routeName,
      timestamp: new Date().toISOString(),
      userId: 'U123'
    };
    
    console.log('Analytics:', historyEntry);
  }
};

const AppNavigator: React.FC = () => {
  const { theme } = useTheme();
  const { isAppReady, startupError, startupProgress } = useAppStartup();

  // ✅ Tampilkan SplashScreen selama app loading
  if (!isAppReady) {
    return (
      <SplashScreen 
        message={`Memuat data... ${startupProgress}%`}
      />
    );
  }

  // ✅ Tampilkan error screen jika startup gagal
  if (startupError) {
    return (
      <SplashScreen 
        message="Gagal memuat aplikasi. Silakan restart."
      />
    );
  }

  return (
    <ErrorBoundary>
      <NavigationContainer 
        linking={linkingConfig}
        onStateChange={analyticsListener}
        fallback={<SplashScreen message="Memproses tautan..." />}
      >
        <NetworkStatusBanner />
        <Stack.Navigator 
          initialRouteName="Onboarding1"
          screenOptions={{ 
            headerShown: false,
            cardStyle: {
              backgroundColor: theme === 'dark' ? '#1A202C' : '#F7FAFC',
            }
          }}
        >
          <Stack.Screen name="Onboarding1" component={Onboarding1} />
          <Stack.Screen name="Onboarding2" component={Onboarding2} />
          <Stack.Screen name="MainApp" component={DrawerNavigator} />
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen}
            options={{
              presentation: 'modal',
              headerShown: false,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen 
            name="ScreenHistory" 
            component={ScreenHistory}
            options={{
              title: 'Riwayat Screen',
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default AppNavigator;