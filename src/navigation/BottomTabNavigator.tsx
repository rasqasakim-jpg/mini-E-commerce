import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import HomeScreen from '../screens/home/tabs/HomeScreen';
import SearchScreen from '../screens/home/tabs/search/SearchScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LoginScreen from '../auth/LoginScreen';

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Profile: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const { isLoggedIn, user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
          borderTopColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: theme === 'dark' ? '#A0AEC0' : '#718096',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
        },
        headerTintColor: theme === 'dark' ? '#F7FAFC' : '#2D3748',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Beranda',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Text style={{ 
              color, 
              fontSize: focused ? size : size - 2,
              fontWeight: focused ? 'bold' : 'normal'
            }}>
              🏠
            </Text>
          ),
        }}
      />
      
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          title: 'Cari',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Text style={{ 
              color, 
              fontSize: focused ? size : size - 2 
            }}>
              🔍
            </Text>
          ),
        }}
      />
      
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          title: 'Keranjang',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ position: 'relative' }}>
              <Text style={{ 
                color, 
                fontSize: focused ? size : size - 2 
              }}>
                🛒
              </Text>
              {/* Badge untuk jumlah item di cart */}
              <View style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: '#FF3B30',
                borderRadius: 8,
                width: 16,
                height: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                  0
                </Text>
              </View>
            </View>
          ),
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={isLoggedIn ? ProfileScreen : LoginScreen}
        options={{
          title: isLoggedIn ? 'Profile' : 'Login',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Text style={{ 
              color, 
              fontSize: focused ? size : size - 2 
            }}>
              {isLoggedIn ? '👤' : '🔐'}
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;