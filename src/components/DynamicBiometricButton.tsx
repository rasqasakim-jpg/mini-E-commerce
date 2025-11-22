import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { simplePrompt, isSensorAvailable } from '@sbaiahmed1/react-native-biometrics';
import { useTheme } from '../contexts/ThemeContext';

const DynamicBiometricButton: React.FC = () => {
    const [biometryType, setBiometryType] = useState<string>('');
    const { theme } = useTheme();

    useEffect(() => {
        checkBiometricType();
    }, []);

    const checkBiometricType = async () => {
        const sensorInfo = await isSensorAvailable();
        if (sensorInfo.available && sensorInfo.biometryType) {
            setBiometryType(sensorInfo.biometryType);
        }
    };

    const getPromptMessage = () => {
        switch (biometryType) {
            case 'FaceID':
                return 'Pindai Wajah untuk Masuk';
            case 'TouchID':
            case 'Biometrics':
                return 'Tempelkan Jari untuk Masuk';
            default:
                return 'Verifikasi Identitas';
        }
    };

    const getButtonIcon = () => {
        switch (biometryType) {
            case 'FaceID':
                return '📱';
            case 'TouchID':
                return '👆';
            case 'Biometrics':
                return '🔒';
            default:
                return '⚡';
        }
    };

    const handleBiometricLogin = async () => {
        const promptMessage = getPromptMessage();
        
        const { success } = await simplePrompt(promptMessage);
        
        if (success) {
            Alert.alert('Berhasil', 'Autentikasi biometrik berhasil!');
        }
    };

    if (!biometryType) {
        return null; // Jangan render jika tidak ada biometrik
    }

    return (
        <TouchableOpacity 
            style={[styles.button, theme === 'dark' && styles.buttonDark]}
            onPress={handleBiometricLogin}
        >
            <Text style={styles.icon}>{getButtonIcon()}</Text>
            <Text style={[styles.text, theme === 'dark' && styles.textDark]}>
                Login dengan {biometryType === 'FaceID' ? 'Face ID' : 'Biometrik'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    buttonDark: {
        backgroundColor: '#2D3748',
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    textDark: {
        color: '#F7FAFC',
    },
});

export default DynamicBiometricButton;