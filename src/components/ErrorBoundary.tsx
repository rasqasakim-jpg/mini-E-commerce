import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    console.error('[ERROR BOUNDARY] Error caught:', error);
    console.error('[ERROR BOUNDARY] Component stack:', errorInfo.componentStack);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Aplikasi mengalami masalah tak terduga.</Text>
          <Text style={styles.subtitle}>
            Maaf, terjadi kesalahan yang tidak terduga.
          </Text>
          <Button 
            title="Mulai Ulang Aplikasi" 
            onPress={this.resetError}
            color="#007AFF"
          />
          <View style={styles.debugInfo}>
            <Text style={styles.debugText}>
              Error: {this.state.error?.message}
            </Text>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#718096',
  },
  debugInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#EDF2F7',
    borderRadius: 5,
  },
  debugText: {
    fontSize: 12,
    color: '#718096',
  },
});

export default ErrorBoundary;