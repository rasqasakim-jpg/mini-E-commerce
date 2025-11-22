import React, { useState, useEffect } from 'react';
import { View, Button, Alert, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { simplePrompt, isSensorAvailable } from '@sbaiahmed1/react-native-biometrics';
import * as Keychain from 'react-native-keychain';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const BiometricLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [biometricAvailable, setBiometricAvailable] = useState(false);
    const [biometricError, setBiometricError] = useState<string | null>(null);
    const [biometryType, setBiometryType] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    const { login } = useAuth();

    useEffect(() => {
        checkBiometricAvailability();
    }, []);

    const checkBiometricAvailability = async () => {
        try {
            const sensorInfo = await isSensorAvailable();
            setBiometricAvailable(sensorInfo.available);
            setBiometryType(sensorInfo.biometryType || '');
            
            if (!sensorInfo.available && sensorInfo.error) {
                setBiometricError(sensorInfo.error);
            }
        } catch (error) {
            console.error('Error checking biometric:', error);
            setBiometricError('Gagal memeriksa sensor biometrik');
        }
    };

    // 1. Login Manual & Simpan Kredensial
    const handleLoginManual = async () => {
        if (username && password) {
            setLoading(true);
            try {
                // Simulasi login sukses
                const token = `token_${Date.now()}`;
                
                // Simpan ke Keychain
                await Keychain.setGenericPassword(username, token);
                login(token, { 
                    firstName: 'User', 
                    lastName: 'Test', 
                    email: username,
                    image: 'https://i.pravatar.cc/150?u=' + username
                });
                
                Alert.alert('Sukses', 'Login berhasil & disimpan untuk Biometrik');
            } catch (error) {
                Alert.alert('Error', 'Gagal menyimpan kredensial');
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert('Gagal', 'Username/Password tidak boleh kosong');
        }
    };

    // 2. Login via Biometrik
    const handleLoginBiometric = async () => {
        // Cek jika belum enroll
        if (!biometricAvailable && biometricError?.includes('NotEnrolled')) {
            Alert.alert(
                'Biometrik Belum DiatUR',
                'Sidik jari/Face ID belum diatur di perangkat ini. Silakan atur di Settings',
                [
                    { text: 'OK', style: 'default' },
                    { text: 'Login dengan Manual', onPress: () => {
                        // Focus ke input manual
                        setUsername('user');
                        setPassword('1234');
                    }}
                ]
            );
            return;
        }

        if (!biometricAvailable) {
            Alert.alert('Maaf', 'Sensor biometrik tidak tersedia di perangkat ini');
            return;
        }

        setLoading(true);
        try {
            const promptMessage = getBiometricPromptMessage();
            const { success, error } = await simplePrompt(promptMessage);

            if (success) {
                // Jika biometrik sukses, ambil token dari Keychain
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    login(credentials.password, { 
                        firstName: 'User', 
                        lastName: 'Biometric', 
                        email: credentials.username,
                        image: 'https://i.pravatar.cc/150?u=' + credentials.username
                    });
                    Alert.alert('Welcome Back!', `Halo ${credentials.username}, login berhasil!`);
                } else {
                    Alert.alert('Info', 'Tidak ada data tersimpan. Login manual dulu.');
                }
            } else {
                // Deteksi error lockout atau fatal
                if (error && (error.includes('Lockout') || error.includes('MAX_ATTEMPTS_EXCEEDED'))) {
                    // Langkah penting: Hapus data sensitif untuk mencegah akses tidak sah
                    await Keychain.resetGenericPassword();
                    
                    Alert.alert(
                        'Keamanan',
                        'Terlalu banyak percobaan gagal. Data login telah dihapus untuk keamanan.',
                        [{ text: 'OK' }]
                    );
                } else {
                    Alert.alert('Gagal', 'Autentikasi biometrik gagal atau dibatalkan');
                }
            }
        } catch (error) {
            console.error('Biometric auth error:', error);
            Alert.alert('Error', 'Terjadi kesalahan pada autentikasi biometrik');
        } finally {
            setLoading(false);
        }
    };

    const getBiometricPromptMessage = () => {
        switch (biometryType) {
            case 'FaceID':
                return 'Pindai Wajah untuk Masuk';
            case 'TouchID':
                return 'Tempelkan Jari untuk Masuk';
            default:
                return 'Verifikasi Identitas untuk Login';
        }
    };

    const getBiometricButtonText = () => {
        switch (biometryType) {
            case 'FaceID':
                return 'Login dengan Face ID';
            case 'TouchID':
                return 'Login dengan Touch ID';
            default:
                return 'Login dengan Biometrik';
        }
    };

    return (
        <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
            <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
                Login Mini E-Commerce
            </Text>
            
            <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
                {biometricAvailable 
                    ? `Sensor ${biometryType} tersedia` 
                    : 'Login manual diperlukan'
                }
            </Text>
            
            <TextInput
                placeholder="Username"
                placeholderTextColor={theme === 'dark' ? '#A0AEC0' : '#718096'}
                value={username}
                onChangeText={setUsername}
                style={[styles.input, theme === 'dark' && styles.inputDark]}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor={theme === 'dark' ? '#A0AEC0' : '#718096'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={[styles.input, theme === 'dark' && styles.inputDark]}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.manualButton,
                        theme === 'dark' && styles.manualButtonDark,
                        loading && styles.buttonDisabled
                    ]}
                    onPress={handleLoginManual}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" size="small" />
                    ) : (
                        <Text style={styles.buttonText}>🔐 Login Manual</Text>
                    )}
                </TouchableOpacity>

                {biometricAvailable && (
                    <TouchableOpacity
                        style={[
                            styles.biometricButton,
                            theme === 'dark' && styles.biometricButtonDark,
                            loading && styles.buttonDisabled
                        ]}
                        onPress={handleLoginBiometric}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <Text style={styles.buttonText}>
                                {biometryType === 'FaceID' ? '📱' : '👆'} {getBiometricButtonText()}
                            </Text>
                        )}
                    </TouchableOpacity>
                )}

                {biometricError && (
                    <Text style={[styles.errorText, theme === 'dark' && styles.textSecondaryDark]}>
                        ⚠️ {biometricError}
                    </Text>
                )}
            </View>

            <View style={[styles.infoBox, theme === 'dark' && styles.infoBoxDark]}>
                <Text style={[styles.infoTitle, theme === 'dark' && styles.textDark]}>
                    Cara Login:
                </Text>
                <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
                    • Login manual: Isi username/password apa saja
                </Text>
                <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
                    • Biometrik: Butuh login manual terlebih dahulu
                </Text>
                <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
                    • Data disimpan aman di Keychain
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F7FAFC',
    },
    containerDark: {
        backgroundColor: '#1A202C',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#2D3748',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30,
        color: '#718096',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        fontSize: 16,
    },
    inputDark: {
        borderColor: '#4A5568',
        backgroundColor: '#2D3748',
        color: '#F7FAFC',
    },
    buttonContainer: {
        marginTop: 20,
    },
    manualButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
    },
    manualButtonDark: {
        backgroundColor: '#3182CE',
    },
    biometricButton: {
        backgroundColor: '#10B981',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
    },
    biometricButtonDark: {
        backgroundColor: '#38A169',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
        color: '#E53E3E',
        fontStyle: 'italic',
    },
    infoBox: {
        backgroundColor: '#EDF2F7',
        padding: 16,
        borderRadius: 10,
        marginTop: 30,
    },
    infoBoxDark: {
        backgroundColor: '#2D3748',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2D3748',
    },
    infoText: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 4,
    },
    textDark: {
        color: '#F7FAFC',
    },
    textSecondaryDark: {
        color: '#A0AEC0',
    },
});

export default BiometricLogin;