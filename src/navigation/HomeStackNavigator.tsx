import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import HomeTabsNavigator from './HomeTabsNavigator';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import CategoryProductScreen from './CategoryProductScreen';
import { TouchableOpacity, Text } from 'react-native';

export type HomeStackParamList = {
  HomeTabs: undefined;
  CategoryProducts: { category: string };
  ProductDetail: { productId: string };
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
        },
        headerTintColor: theme === 'dark' ? '#F7FAFC' : '#2D3748',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        cardStyle: {
          backgroundColor: theme === 'dark' ? '#1A202C' : '#F7FAFC',
        },
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="HomeTabs" 
        component={HomeTabsNavigator}
        options={{ 
          title: 'Mini E-Commerce',
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProductScreen}
        options={({ route }: any) => ({ title: route.params.category })}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ navigation }) => ({ 
          title: 'Detail Produk',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 15, padding: 5 }}
            >
              <Text style={{ 
                fontSize: 20, 
                color: theme === 'dark' ? '#F7FAFC' : '#2D3748' 
              }}>
                ←
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;