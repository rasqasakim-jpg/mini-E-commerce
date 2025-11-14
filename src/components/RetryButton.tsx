import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RetryButtonProps {
  onPress: () => void;
  retryCount?: number;
  maxRetries?: number;
}

const RetryButton: React.FC<RetryButtonProps> = ({ 
  onPress, 
  retryCount = 0, 
  maxRetries = 3 
}) => {
  const remainingRetries = maxRetries - retryCount;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        {remainingRetries > 0 
          ? `Coba Lagi (${retryCount}/${maxRetries})` 
          : 'Coba Lagi Manual'
        }
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default RetryButton;