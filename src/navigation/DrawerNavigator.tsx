import React from 'react';
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

interface DrawerNavigatorProps {
  drawerLockMode?: 'unlocked' | 'locked-closed' | 'locked-open';
}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({ 
  drawerLockMode = 'locked-closed' 
}) => {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme === 'dark' ? '#1A202C' : '#fff',
          width: 280,
        },
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#2D3748' : '#fff',
        },
        headerTintColor: theme === 'dark' ? '#F7FAFC' : '#2D3748',
        drawerType: 'front',
        swipeEnabled: drawerLockMode === 'unlocked',
        headerShown: true,
      }}
      defaultStatus="closed"
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Beranda' }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'Pengaturan' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;