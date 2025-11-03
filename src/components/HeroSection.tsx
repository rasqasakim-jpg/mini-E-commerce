import React, { useState } from 'react';
import { View, Text, ImageBackground, Switch, StatusBar, StyleSheet } from 'react-native';

const HeroSection = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.background}
        imageStyle={{ opacity: 0.5 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Selamat Datang!</Text>
          <View style={styles.switchContainer}>
            <Text>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  title: { fontSize: 32, color: 'white', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
});

export default HeroSection;
