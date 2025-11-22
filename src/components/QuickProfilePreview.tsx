import React, { useState, useEffect } from 'react';
import { 
  View, 
  Button, 
  Image, 
  Alert, 
  StyleSheet, 
  TouchableOpacity, 
  Text,
  ActionSheetIOS,
  Platform 
} from 'react-native';
import { launchImageLibrary, launchCamera, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';

const QuickProfilePreview: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { theme } = useTheme();

  const showImagePickerOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Batal', 'Ambil Foto', 'Pilih dari Galeri'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            takePhoto();
          } else if (buttonIndex === 2) {
            pickFromGallery();
          }
        }
      );
    } else {
      // Untuk Android, tampilkan Alert
      Alert.alert(
        'Pilih Foto Profil',
        'Dari mana Anda ingin mengambil foto?',
        [
          { text: 'Batal', style: 'cancel' },
          { text: 'Kamera', onPress: takePhoto },
          { text: 'Galeri', onPress: pickFromGallery },
        ]
      );
    }
  };

  const takePhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.7,
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: true,
    };

    launchCamera(options, handleImageResponse);
  };

  const pickFromGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.7,
      maxWidth: 300,
      maxHeight: 300,
      includeBase64: true,
    };

    launchImageLibrary(options, handleImageResponse);
  };

  const handleImageResponse = async (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }

    if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Terjadi kesalahan');
      return;
    }

    if (response.assets && response.assets[0]) {
      const asset = response.assets[0];
      if (asset.base64) {
        const base64String = `data:${asset.type};base64,${asset.base64}`;
        setPreviewImage(base64String);
        
        // Simpan ke AsyncStorage untuk preview offline
        try {
          await AsyncStorage.setItem('@ecom:profilePreview', base64String);
          Alert.alert('Success', 'Foto profil berhasil disimpan');
        } catch (error) {
          Alert.alert('Error', 'Gagal menyimpan foto profil');
        }
      } else if (asset.uri) {
        // Fallback jika base64 tidak tersedia, gunakan URI
        setPreviewImage(asset.uri);
        try {
          await AsyncStorage.setItem('@ecom:profilePreview', asset.uri);
          Alert.alert('Success', 'Foto profil berhasil disimpan');
        } catch (error) {
          Alert.alert('Error', 'Gagal menyimpan foto profil');
        }
      }
    }
  };

  // Load saved preview on component mount
  useEffect(() => {
    const loadSavedPreview = async () => {
      try {
        const savedPreview = await AsyncStorage.getItem('@ecom:profilePreview');
        if (savedPreview) {
          setPreviewImage(savedPreview);
        }
      } catch (error) {
        console.error('Error loading preview:', error);
      }
    };

    loadSavedPreview();
  }, []);

  const removePhoto = async () => {
    try {
      await AsyncStorage.removeItem('@ecom:profilePreview');
      setPreviewImage(null);
      Alert.alert('Success', 'Foto profil berhasil dihapus');
    } catch (error) {
      Alert.alert('Error', 'Gagal menghapus foto profil');
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      {/* Preview Image */}
      {previewImage && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: previewImage }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={removePhoto}
          >
            <Text style={styles.removeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={showImagePickerOptions}
        >
          <Text style={styles.buttonText}>📷 Ganti Foto Profil</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={takePhoto}
          >
            <Text style={styles.secondaryButtonText}>📸 Kamera</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={pickFromGallery}
          >
            <Text style={styles.secondaryButtonText}>🖼️ Galeri</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Text */}
      <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
        Foto akan disimpan sebagai preview cepat dan bisa dilihat saat offline
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    marginTop: 8,
  },
  containerDark: {
    backgroundColor: '#2D3748',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 12,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
    flex: 1,
    marginHorizontal: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#718096',
    fontStyle: 'italic',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default QuickProfilePreview;