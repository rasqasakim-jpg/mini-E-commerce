import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import CustomDrawer from './CustomDrawer';
import HomeScreen from '../screens/home/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

export type DrawerParamList = {
  Home: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  const { theme } = useTheme();
  const [drawerLocked, setDrawerLocked] = useState(false); // Default: UNLOCKED untuk testing

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme === 'dark' ? '#1A202C' : '#fff',
          width: 320, // Lebar lebih besar
        },
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
        },
        headerTintColor: theme === 'dark' ? '#F7FAFC' : '#2D3748',
        drawerType: 'front',
        swipeEnabled: true, // PASTIKAN swipe enabled
        headerShown: true,
        headerTitle: '', // Kosongkan title default
      }}
      defaultStatus="closed"
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Beranda',
          headerTitle: 'Mini E-Commerce' // Custom title
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ 
          title: 'Pengaturan',
          headerTitle: 'Pengaturan'
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;