// src/auth/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext'; // ✅ FIX: Gunakan useAuth dari AuthContext
import { useNavigation } from '@react-navigation/native';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { isAuthenticated } = useAuth(); // isLoading tidak tersedia di context ini
  const navigation = useNavigation();

  useEffect(() => {
    // Jika loading dari context selesai dan user tidak terautentikasi, arahkan ke Login.
    if (!isAuthenticated) {
      console.log('🔒 ProtectedRoute: Not authenticated, redirecting to login');
      
      // FIX: Arahkan ke layar Login di dalam MainApp
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp', params: { screen: 'Login' } } as any],
      });
    }
  }, [isAuthenticated, navigation]);

  // Not authenticated
  if (!isAuthenticated) {
    // Jika tidak terautentikasi, jangan render apa-apa (atau tampilkan fallback)
    // karena useEffect akan menangani redirect.
    return fallback ? <>{fallback}</> : null;
  }

  // Authenticated - render children
  return <>{children}</>;
};

export default ProtectedRoute;