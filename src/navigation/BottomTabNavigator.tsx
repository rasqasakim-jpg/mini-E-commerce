import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import HomeStackNavigator from './HomeStackNavigator';
import ProductCatalogScreen from '../screens/catalog/ProductCatalogScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

export type BottomTabParamList = {
  HomeStack: undefined;
  Catalog: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
          borderTopColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: theme === 'dark' ? '#A0AEC0' : '#718096',
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
        },
        headerTintColor: theme === 'dark' ? '#F7FAFC' : '#2D3748',
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
        name="Catalog" 
        component={ProductCatalogScreen}
        options={{
          title: 'Katalog',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 2 }}>📦</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size - 2 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;