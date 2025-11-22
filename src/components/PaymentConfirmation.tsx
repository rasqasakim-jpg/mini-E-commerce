import React, { useState } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';
import { simplePrompt } from '@sbaiahmed1/react-native-biometrics';
import { useTheme } from '../contexts/ThemeContext';

interface PaymentConfirmationProps {
    amount: number;
    onSuccess: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({ amount, onSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const { theme } = useTheme();

    const processPayment = () => {
        // Simulasi proses pembayaran
        console.log(`Processing payment: Rp ${amount}`);
        Alert.alert('Sukses', `Pembayaran Rp ${amount.toLocaleString()} berhasil!`);
        onSuccess();
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        
        try {
            const { success } = await simplePrompt(`Konfirmasi Transfer Rp ${amount.toLocaleString()}`);

            if (success) {
                processPayment();
            } else {
                Alert.alert('Transaksi Dibatalkan', 'Anda membatalkan transaksi');
            }
        } catch (error) {
            Alert.alert('Error', 'Terjadi kesalahan pada sensor biometrik');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
            <Text style={[styles.amount, theme === 'dark' && styles.textDark]}>
                Rp {amount.toLocaleString()}
            </Text>
            
            <Button 
                title={isProcessing ? "Memproses..." : "Bayar dengan Biometrik"} 
                onPress={handlePayment}
                disabled={isProcessing}
                color="#007AFF"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        margin: 16,
        alignItems: 'center',
    },
    containerDark: {
        backgroundColor: '#2D3748',
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2D3748',
    },
    textDark: {
        color: '#F7FAFC',
    },
});

export default PaymentConfirmation;