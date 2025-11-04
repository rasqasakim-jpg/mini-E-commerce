import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import GestureDemoScreen from './src/screens/GestureDemoScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <GestureDemoScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
});
