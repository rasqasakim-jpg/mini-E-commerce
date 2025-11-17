import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary';
import NetworkStatusBanner from '../components/NetworkStatusBanner';
import Onboarding1 from '../screens/onboarding/Onboarding1';
import Onboarding2 from '../screens/onboarding/Onboarding2';
import DrawerNavigator from './DrawerNavigator'; // Ganti dengan DrawerNavigator
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import ScreenHistory from '../screens/analytics/ScreenHistory';

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  MainApp: { userId?: string }; // Ini akan mengarah ke Drawer
  Checkout: { productId: string };
  ScreenHistory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

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

  return (
    <ErrorBoundary>
      <NavigationContainer 
        onStateChange={analyticsListener}
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