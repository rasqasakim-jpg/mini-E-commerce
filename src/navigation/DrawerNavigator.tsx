import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import CustomDrawer from './CustomDrawer';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/settings/SettingsScreen';

export type DrawerParamList = {
  MainApp: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
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
      }}
      defaultStatus="closed"
    >
      <Drawer.Screen 
        name="MainApp" 
        component={BottomTabNavigator}
        options={{ 
          title: 'Aplikasi Utama',
          headerShown: true,
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