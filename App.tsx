import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ProfilCard from './src/components/Profile';
import LoginForm from './src/components/LoginForm';
import HeroSection from './src/components/HeroSection';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    // <ProfilCard/>
    // <LoginForm />
    <HeroSection />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 },
});

export default App;