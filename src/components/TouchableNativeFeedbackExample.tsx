import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
} from 'react-native';

const TouchableWithoutFeedbackExample = () => {
  return (
    <TouchableWithoutFeedback
      onPress={() => Alert.alert('TouchableWithoutFeedback Pressed!')}
      onLongPress={() => Alert.alert('Long Press Detected!')}
      delayLongPress={800}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      touchSoundDisabled={false}
    >
      <View style={styles.box}>
        <Text style={styles.text}>No Visual Feedback</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 5,
  },
  text: { color: 'white', fontSize: 16 },
});

export default TouchableWithoutFeedbackExample;
