import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import SimpleList from './src/components/SimpleList';
import SectionListExample from './src/components/SectionListExample';
import FlatListExample from './src/components/FlatListExample';

const App = () => {
  return (
    <SimpleList />
    // <SectionListExample/>
    // <FlatListExample/>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 },
});

export default App;