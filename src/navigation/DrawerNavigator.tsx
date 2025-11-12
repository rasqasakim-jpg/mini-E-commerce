import React from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import CustomDrawer from './CustomDrawer';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';

export type DrawerParamList = {
  MainApp: { userId?: string };
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute<RouteProp<DrawerParamList, 'MainApp'>>();
  const userId = route.params?.userId;

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
        initialParams={{ userId }}
        options={{ 
          title: 'Aplikasi Utama',
          headerShown: true,
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={({ navigation }) => ({ 
          title: 'Pengaturan',
          headerTitle: 'Pengaturan',
          // ✅ TAMBAH tombol back untuk Settings screen
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