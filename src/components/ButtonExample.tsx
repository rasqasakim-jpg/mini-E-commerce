import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const ButtonExample = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Button Default"
        onPress={() => Alert.alert('Button Pressed!')}
        color="#007AFF"
        disabled={false}
        accessibilityLabel="Contoh tombol cross-platform"
        touchSoundDisabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
});

export default ButtonExample;
