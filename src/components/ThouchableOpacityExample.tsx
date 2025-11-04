import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TouchableOpacityExample = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={() => Alert.alert('TouchableOpacity Pressed!')}
        disabled={false}
      >
        <Text style={styles.text}>Opacity Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
  },
  text: { color: 'white', fontSize: 16 },
});

export default TouchableOpacityExample;
