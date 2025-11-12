import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import Onboarding1 from '../screens/onboarding/Onboarding1';
import Onboarding2 from '../screens/onboarding/Onboarding2';
import DrawerNavigator from './DrawerNavigator';
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import ScreenHistory from '../screens/analytics/ScreenHistory';

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  MainApp: { userId?: string };
  Checkout: { productId: string };
  ScreenHistory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Analytics simulation function
const analyticsListener = (state: any) => {
  if (state && state.routes && state.routes.length > 0) {
    const currentRoute = state.routes[state.index];
    let routeName = currentRoute.name;
    
    // Get nested route name if exists
    if (currentRoute.state) {
      const nestedState = currentRoute.state;
      const nestedRoute = nestedState.routes[nestedState.index];
      routeName = `${routeName}/${nestedRoute.name}`;
    }
    
    console.log(`[ANALYTICS] Rute dikunjungi: ${routeName}`);
    
    // Simpan ke screen history (simulasi saja)
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
    <NavigationContainer 
      onStateChange={analyticsListener}
    >
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
  );
};

export default AppNavigator;