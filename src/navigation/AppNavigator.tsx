import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../contexts/ThemeContext';
import Onboarding1 from '../screens/onboarding/Onboarding1';
import Onboarding2 from '../screens/onboarding/Onboarding2';
import DrawerNavigator from './DrawerNavigator';

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  MainApp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Onboarding1"
        screenOptions={{ 
          headerShown: false,
          cardStyle: {
            backgroundColor: theme === 'dark' ? '#1A202C' : '#F7FAFC',
          }
        }}
      >
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;