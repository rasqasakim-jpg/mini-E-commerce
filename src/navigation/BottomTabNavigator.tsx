// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useStorage } from '../contexts/StorageContext';
import HomeStackNavigator from './HomeStackNavigator';
import ProductCatalogScreen from '../screens/catalog/ProductCatalogScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProductListScreen from '../screens/product/ProductListScreen';
import LoginScreen from '../auth/LoginScreen';
import CartScreen from '../screens/cart/CartScreen';
import AddProductScreen from '../screens/product/AddProductScreen'; // ✅ IMPORT

export type BottomTabParamList = {
  HomeStack: undefined;
  ProductAPI: undefined;
  Catalog: undefined;
  Cart: undefined;
  Profile: { userId?: string };
  Login: undefined;
  AddProduct: undefined; // ✅ TAMBAHKAN DI SINI
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const { cart } = useStorage();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
          borderTopColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
          height: 60,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: theme === 'dark' ? '#A0AEC0' : '#718096',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
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
      {/* ✅ TAMBAHKAN AddProduct TAB */}
      <Tab.Screen 
        name="AddProduct" 
        component={AddProductScreen}
        options={{
          title: 'Tambah Produk',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 2 }}>➕</Text>
          ),
        }}
      />
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
        initialParams={{ userId: undefined }}
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