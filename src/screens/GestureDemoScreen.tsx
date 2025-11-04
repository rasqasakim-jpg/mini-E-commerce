import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import ButtonExample from '../components/ButtonExample';
import PressableExample from '../components/PressableExample';
import TouchableOpacityExample from '../components/ThouchableOpacityExample';
import TouchableHighlightExample from '../components/TouchableHighlightExample';
import TouchableWithoutFeedbackExample from '../components/TouchableWithoutFeedbackExample';
import TouchableNativeFeedbackExample from '../components/TouchableNativeFeedbackExample';

const GestureDemoScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎯 Gesture & Touch Handling</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>1️⃣ Button</Text>
        <ButtonExample />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>2️⃣ Pressable</Text>
        <PressableExample />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>3️⃣ TouchableOpacity</Text>
        <TouchableOpacityExample />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>4️⃣ TouchableHighlight</Text>
        <TouchableHighlightExample />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>5️⃣ TouchableWithoutFeedback</Text>
        <TouchableWithoutFeedbackExample />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>6️⃣ TouchableNativeFeedback (Android)</Text>
        <TouchableNativeFeedbackExample />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  section: {
    width: '100%',
    alignItems: 'center',
  },
});

export default GestureDemoScreen;
