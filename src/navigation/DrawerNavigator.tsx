import React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import CustomDrawer from './CustomDrawer';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/settings/SettingsScreen';
import KTPVerificationScreen from '../screens/verification/KTPVerificationScreen'; // ✅ IMPORT BARU
import { RouteProp, useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';

export type DrawerParamList = {
  MainApp: { userId?: string };
  Settings: undefined;
  KTPVerification: undefined; // ✅ TAMBAH TYPE BARU
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  const { theme } = useTheme();
  const rootRoute = useRoute<RouteProp<{ MainApp: { userId?: string } }, 'MainApp'>>();
  const userId = rootRoute.params?.userId;

  const getHeaderTitle = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeStack';
    if (routeName.includes('Home')) return 'Mini E-Commerce';
    if (routeName === 'ProductAPI') return 'Aplikasi Utama';
    if (routeName === 'Catalog') return 'Aplikasi Utama';
    if (routeName === 'Cart') return 'Aplikasi Utama';
    if (routeName === 'Profile') return 'Aplikasi Utama';
    if (routeName === 'Login') return 'Aplikasi Utama';
    return routeName;
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} userId={userId} />}
      screenOptions={({ navigation, route }) => ({
        drawerStyle: {
          backgroundColor: theme === 'dark' ? '#1A202C' : '#fff',
          width: 320,
        },
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
        },
        headerTintColor: theme === 'dark' ? '#F7FAFC' : '#2D3748',
        drawerType: 'front',
        swipeEnabled: true,
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 15, padding: 5 }}
          >
            <Text style={{ 
              fontSize: 20, 
              color: theme === 'dark' ? '#F7FAFC' : '#2D3748' 
            }}>
              ☰
            </Text>
          </TouchableOpacity>
        ),
      })}
      defaultStatus="closed"
    >
      <Drawer.Screen 
        name="MainApp" 
        component={BottomTabNavigator}
        initialParams={{ userId: userId }}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: true,
        })}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={({ navigation }) => ({ 
          title: 'Pengaturan',
          headerTitle: 'Pengaturan',
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
      {/* ✅ TAMBAH SCREEN BARU UNTUK KTP VERIFICATION */}
      <Drawer.Screen 
        name="KTPVerification" 
        component={KTPVerificationScreen}
        options={({ navigation }) => ({ 
          title: 'Verifikasi KTP',
          headerTitle: 'Verifikasi KTP',
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;