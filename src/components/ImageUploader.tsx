import React, { useState } from 'react';
import { View, Button, Alert, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import { useTheme } from '../contexts/ThemeContext';

const ImageUploader: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const { theme } = useTheme();

  const takeAndUploadPhoto = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.7,
    };

    launchCamera(options, async (response) => {
      if (response.didCancel || response.errorCode || !response.assets) {
        return;
      }

      await uploadImage(response.assets[0]);
    });
  };

  const uploadImage = async (asset: any) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', {
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || 'upload.jpg',
      });

      // Simulasi upload ke server
      const uploadResponse = await fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (uploadResponse.ok) {
        Alert.alert('Success', 'Foto berhasil diupload');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal mengupload foto');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Button 
        title="Ambil & Upload Foto" 
        onPress={takeAndUploadPhoto}
        disabled={uploading}
      />
      
      {uploading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={[styles.loadingText, theme === 'dark' && styles.textDark]}>
            Mengupload foto...
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7FAFC',
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  loadingContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#2D3748',
  },
  textDark: {
    color: '#F7FAFC',
  },
});

export default ImageUploader;