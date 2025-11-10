import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '../../contexts/ThemeContext';
import PopularTab from './tabs/PopularTab';
import NewTab from './tabs/NewTab';
import DiscountTab from './tabs/DiscountTab';
import ElectronicsTab from './tabs/categories/ElectronicsTab';
import ClothingTab from './tabs/categories/ClothingTab';
import FoodTab from './tabs/categories/FoodTab';
import AutomotiveTab from './tabs/categories/AutomotiveTab';
import EntertainmentTab from './tabs/categories/EntertainmentTab';
import BabyTab from './tabs/categories/BabyTab';

const Tab = createMaterialTopTabNavigator();

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#007AFF', // Garis indikator biru primer
        },
        tabBarLabelStyle: {
          textTransform: 'none', // Tidak menggunakan huruf kapital semua
          fontSize: 14,
          fontWeight: '500',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: theme === 'dark' ? '#A0AEC0' : '#718096',
        tabBarScrollEnabled: true, // Scroll horizontal untuk banyak tab
        tabBarItemStyle: {
          width: 'auto', // Auto width untuk label
          paddingHorizontal: 16,
        },
      }}
    >
      <Tab.Screen 
        name="Populer" 
        component={PopularTab}
        options={{ tabBarLabel: 'Populer' }}
      />
      <Tab.Screen 
        name="Terbaru" 
        component={NewTab}
        options={{ tabBarLabel: 'Terbaru' }}
      />
      <Tab.Screen 
        name="Diskon" 
        component={DiscountTab}
        options={{ tabBarLabel: 'Diskon' }}
      />
      <Tab.Screen 
        name="Elektronik" 
        component={ElectronicsTab}
        options={{ tabBarLabel: 'Elektronik' }}
      />
      <Tab.Screen 
        name="Pakaian" 
        component={ClothingTab}
        options={{ tabBarLabel: 'Pakaian' }}
      />
      <Tab.Screen 
        name="Makanan" 
        component={FoodTab}
        options={{ tabBarLabel: 'Makanan' }}
      />
      <Tab.Screen 
        name="Otomotif" 
        component={AutomotiveTab}
        options={{ tabBarLabel: 'Otomotif' }}
      />
      <Tab.Screen 
        name="Hiburan" 
        component={EntertainmentTab}
        options={{ tabBarLabel: 'Hiburan' }}
      />
      <Tab.Screen 
        name="Bayi" 
        component={BabyTab}
        options={{ tabBarLabel: 'Perlengkapan Bayi' }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;