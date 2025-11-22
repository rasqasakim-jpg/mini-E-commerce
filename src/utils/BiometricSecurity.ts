import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { simplePrompt, isSensorAvailable } from '@sbaiahmed1/react-native-biometrics';

export const handleBiometricAuth = async (onSuccess: () => void, onLockout: () => void) => {
    try {
        const { available } = await isSensorAvailable();
        if (!available) {
            Alert.alert('Error', 'Biometrik tidak tersedia');
            return;
        }

        const { success, error } = await simplePrompt('Verifikasi Identitas');

        if (success) {
            onSuccess();
        } else if (error) {
            // Deteksi error lockout atau fatal
            if (error.includes('Lockout') || error.includes('MAX_ATTEMPTS_EXCEEDED')) {
                // Langkah penting: Hapus data sensitif untuk mencegah akses tidak sah
                await Keychain.resetGenericPassword();
                
                // Navigasi paksa ke login
                onLockout();
                
                Alert.alert(
                    'Keamanan',
                    'Terlalu banyak percobaan gagal. Data login telah dihapus untuk keamanan.',
                    [{ text: 'OK' }]
                );
            }
        }
    } catch (error) {
        console.error('Biometric error:', error);
        Alert.alert('Error', 'Terjadi kesalahan pada autentikasi biometrik');
    }
};

// Keterangan mengapa langkah ini penting:
/*
1. Mencegah brute force attack - setelah beberapa percobaan gagal, sistem biometrik akan lockout
2. Protection data sensitif - dengan menghapus data di Keychain, kita mencegah akses tidak sah
3. Memaksa user untuk login ulang - memastikan identitas user terverifikasi kembali
4. Compliance security best practice - menghindari penyimpanan kredensial dalam keadaan riskan
*/