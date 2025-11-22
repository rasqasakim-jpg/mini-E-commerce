import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { requestStoragePermissionAndSave } from '../../utils/CameraUtils';

const KTPVerificationScreen: React.FC = () => {
  const { theme } = useTheme();

  const handleTakeKTPPhoto = async () => {
    await requestStoragePermissionAndSave();
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
        Verifikasi KTP
      </Text>
      
      <Text style={[styles.description, theme === 'dark' && styles.textSecondaryDark]}>
        Ambil foto KTP Anda untuk verifikasi. Foto akan disimpan di galeri sebagai backup.
      </Text>

      <View style={styles.buttonContainer}>
        <Button 
          title="Ambil Foto KTP" 
          onPress={handleTakeKTPPhoto}
          color="#007AFF"
        />
      </View>

      <View style={[styles.infoBox, theme === 'dark' && styles.infoBoxDark]}>
        <Text style={[styles.infoText, theme === 'dark' && styles.textDark]}>
          📸 Tips foto KTP yang baik:
        </Text>
        <Text style={[styles.infoTip, theme === 'dark' && styles.textSecondaryDark]}>
          • Pastikan KTP dalam kondisi baik
        </Text>
        <Text style={[styles.infoTip, theme === 'dark' && styles.textSecondaryDark]}>
          • Foto di tempat yang terang
        </Text>
        <Text style={[styles.infoTip, theme === 'dark' && styles.textSecondaryDark]}>
          • Pastikan semua informasi terbaca jelas
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7FAFC',
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2D3748',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#718096',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 32,
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoBoxDark: {
    backgroundColor: '#2D3748',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2D3748',
  },
  infoTip: {
    fontSize: 14,
    marginBottom: 8,
    color: '#718096',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default KTPVerificationScreen;