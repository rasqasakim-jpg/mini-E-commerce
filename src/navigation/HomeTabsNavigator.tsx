import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '../contexts/ThemeContext';
import HomeScreen from '../screens/home/HomeScreen';
import CategoryProductScreen from './CategoryProductScreen';

export type HomeTabsParamList = {
  Beranda: undefined;
  Elektronik: { category: 'Elektronik' };
  Pakaian: { category: 'Pakaian' };
  Makanan: { category: 'Makanan' };
  Otomotif: { category: 'Otomotif' };
  Hiburan: { category: 'Hiburan' };
  Bayi: { category: 'Bayi' };
};

const Tab = createMaterialTopTabNavigator<HomeTabsParamList>();

// Daftar kategori untuk membuat tab
const categories = [
  { name: 'Elektronik' }, { name: 'Pakaian' }, { name: 'Makanan' },
  { name: 'Otomotif' }, { name: 'Hiburan' }, { name: 'Bayi' }
] as const; // ✅ Memberitahu TypeScript untuk membaca nilai sebagai literal

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
        swipeEnabled: true,
        animationEnabled: true,
      }}
    >
      <Tab.Screen
       name='Beranda'
       component={HomeScreen}
      />
      {categories.map(category => (
        <Tab.Screen
          key={category.name}
          name={category.name as keyof HomeTabsParamList}
          component={CategoryProductScreen}
          initialParams={{ category: category.name }}
          options={{
            tabBarLabel: category.name,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;