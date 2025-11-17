import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useStorage } from '../contexts/StorageContext'; // ✅ IMPORT UNTUK CART BADGE
import HomeStackNavigator from './HomeStackNavigator';
import ProductCatalogScreen from '../screens/catalog/ProductCatalogScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProductListScreen from '../screens/product/ProductListScreen';
import LoginScreen from '../auth/LoginScreen';
import CartScreen from '../screens/cart/CartScreen';

export type BottomTabParamList = {
  HomeStack: undefined;
  ProductAPI: undefined;
  Catalog: undefined;
  Cart: undefined;
  Profile: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const { cart } = useStorage(); // ✅ GUNAKAN CART HOOK

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
          borderTopColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
          height: 60, // ✅ OPTIONAL: Tinggi konsisten
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: theme === 'dark' ? '#A0AEC0' : '#718096',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4, // ✅ OPTIONAL: Spacing better
        },
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
        },
        headerTintColor: theme === 'dark' ? '#F7FAFC' : '#2D3748',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStackNavigator}
        options={{
          title: 'Beranda',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 2 }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="ProductAPI" 
        component={ProductListScreen}
        options={{
          title: 'Produk API',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 2 }}>🌐</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Catalog" 
        component={ProductCatalogScreen}
        options={{
          title: 'Katalog',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 2 }}>📦</Text>
          ),
        }}
      />
      {/* ✅ CART SCREEN DENGAN BADGE */}
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          title: 'Keranjang',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 2 }}>🛒</Text>
          ),
          tabBarBadge: cart.itemCount > 0 ? cart.itemCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#FF3B30',
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 2 }}>🔐</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 2 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;