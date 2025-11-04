import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Alert } from 'react-native';

const TouchableHighlightExample = () => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => Alert.alert('TouchableHighlight Pressed!')}
        onShowUnderlay={() => console.log('Underlay shown')}
        onHideUnderlay={() => console.log('Underlay hidden')}
      >
        <Text style={styles.text}>Highlight Underlay</Text>
      </TouchableHighlight>
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

export default TouchableHighlightExample;
