import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';

const TouchableNativeFeedbackExample = () => {
  if (Platform.OS !== 'android') {
    return (
      <Text style={{ color: 'gray', fontStyle: 'italic' }}>
        Hanya tersedia di Android
      </Text>
    );
  }

  const ripple = TouchableNativeFeedback.Ripple('#2196F3', true);

  return (
    <TouchableNativeFeedback
      background={ripple}
      useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      onPress={() => Alert.alert('Native Ripple Pressed!')}
    >
      <View style={styles.button}>
        <Text style={styles.text}>Native Ripple Android</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    elevation: 3,
  },
  text: { color: 'black', fontSize: 16 },
});

export default TouchableNativeFeedbackExample;
