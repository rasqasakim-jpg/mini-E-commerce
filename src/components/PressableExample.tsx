import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';

const PressableExample = () => {
  const handlePress = () => Alert.alert('Pressable Pressed!');
  const handleLong = () => Alert.alert('Long Press detected!');

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        onLongPress={handleLong}
        onPressIn={() => console.log('Pressed In')}
        onPressOut={() => console.log('Pressed Out')}
        android_ripple={{ color: '#B3E5FC' }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#2196F3' : '#007AFF' },
        ]}
      >
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? 'Pressed...' : 'Pressable Custom'}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  button: {
    padding: 15,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default PressableExample;
