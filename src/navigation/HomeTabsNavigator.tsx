import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '../contexts/ThemeContext';
import PopularTab from '../screens/home/tabs/PopularTab';
import NewTab from '../screens/home/tabs/NewTab';
import DiscountTab from '../screens/home/tabs/DiscountTab';
import ElectronicsTab from '../screens/home/tabs/categories/ElectronicsTab';
import ClothingTab from '../screens/home/tabs/categories/ClothingTab';
import FoodTab from '../screens/home/tabs/categories/FoodTab';
import AutomotiveTab from '../screens/home/tabs/categories/AutomotiveTab';
import EntertainmentTab from '../screens/home/tabs/categories/EntertainmentTab';
import BabyTab from '../screens/home/tabs/categories/BabyTab';

export type HomeTabsParamList = {
  Populer: undefined;
  Terbaru: undefined;
  Diskon: undefined;
  Elektronik: undefined;
  Pakaian: undefined;
  Makanan: undefined;
  Otomotif: undefined;
  Hiburan: undefined;
  Bayi: undefined;
};

const Tab = createMaterialTopTabNavigator<HomeTabsParamList>();

const HomeTabsNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#007AFF',
        },
        tabBarLabelStyle: {
          textTransform: 'none',
          fontSize: 14,
          fontWeight: '500',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: theme === 'dark' ? '#A0AEC0' : '#718096',
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 'auto',
          paddingHorizontal: 16,
        },
        // Swipe configuration to prevent conflicts
        swipeEnabled: true,
        animationEnabled: true,
      }}
    >
      <Tab.Screen name="Populer" component={PopularTab} options={{ tabBarLabel: 'Populer' }} />
      <Tab.Screen name="Terbaru" component={NewTab} options={{ tabBarLabel: 'Terbaru' }} />
      <Tab.Screen name="Diskon" component={DiscountTab} options={{ tabBarLabel: 'Diskon' }} />
      <Tab.Screen name="Elektronik" component={ElectronicsTab} options={{ tabBarLabel: 'Elektronik' }} />
      <Tab.Screen name="Pakaian" component={ClothingTab} options={{ tabBarLabel: 'Pakaian' }} />
      <Tab.Screen name="Makanan" component={FoodTab} options={{ tabBarLabel: 'Makanan' }} />
      <Tab.Screen name="Otomotif" component={AutomotiveTab} options={{ tabBarLabel: 'Otomotif' }} />
      <Tab.Screen name="Hiburan" component={EntertainmentTab} options={{ tabBarLabel: 'Hiburan' }} />
      <Tab.Screen name="Bayi" component={BabyTab} options={{ tabBarLabel: 'Perlengkapan Bayi' }} />
    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;