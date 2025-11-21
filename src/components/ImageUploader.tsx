// src/components/ImageUploader.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useImagePicker } from '../hooks/useImagePicker';

interface ImageUploaderProps {
  onImagesUploaded?: (images: any[]) => void;
  maxImages?: number;
  label?: string;
  initialImages?: any[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesUploaded,
  maxImages = 5,
  label = 'Upload Gambar',
  initialImages = [],
}) => {
  const { theme } = useTheme();
  const [localImages, setLocalImages] = useState<any[]>(initialImages);
  
  const {
    selectedImages,
    uploading,
    selectMultipleImages,
    takePhotoWithSave,
    uploadImages,
  } = useImagePicker();

  const handleSelectImages = async () => {
    await selectMultipleImages();
    
    if (selectedImages.length > 0) {
      const allImages = [...localImages, ...selectedImages].slice(0, maxImages);
      setLocalImages(allImages);
      onImagesUploaded?.(allImages);
    }
  };

  const handleTakePhoto = async () => {
    await takePhotoWithSave();
    
    if (selectedImages.length > 0) {
      const allImages = [...localImages, ...selectedImages].slice(0, maxImages);
      setLocalImages(allImages);
      onImagesUploaded?.(allImages);
    }
  };

  const handleUpload = async () => {
    if (localImages.length === 0) {
      Alert.alert('Info', 'Tidak ada gambar untuk diupload');
      return;
    }

    const success = await uploadImages(localImages);
    if (success) {
      Alert.alert('Sukses', 'Gambar berhasil diupload');
      setLocalImages([]);
      onImagesUploaded?.([]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = localImages.filter((_, i) => i !== index);
    setLocalImages(newImages);
    onImagesUploaded?.(newImages);
  };

  const remainingSlots = maxImages - localImages.length;

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
          {label}
        </Text>
        <Text style={[styles.counter, theme === 'dark' && styles.textSecondaryDark]}>
          {localImages.length}/{maxImages}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cameraButton]}
          onPress={handleTakePhoto}
          disabled={remainingSlots === 0}
        >
          <Text style={styles.actionButtonText}>📷 Kamera</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.galleryButton]}
          onPress={handleSelectImages}
          disabled={remainingSlots === 0}
        >
          <Text style={styles.actionButtonText}>🖼️ Galeri</Text>
        </TouchableOpacity>
      </View>

      {/* Selected Images Preview */}
      {localImages.length > 0 && (
        <View style={styles.previewContainer}>
          <Text style={[styles.previewTitle, theme === 'dark' && styles.textDark]}>
            Preview Gambar:
          </Text>
          
          <View style={styles.imagesGrid}>
            {localImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image 
                  source={{ uri: image.uri }} 
                  style={styles.previewImage}
                />
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
                <Text style={styles.imageIndex}>{index + 1}</Text>
              </View>
            ))}
          </View>

          {/* Upload Button */}
          <TouchableOpacity 
            style={[
              styles.uploadButton, 
              uploading && styles.uploadButtonDisabled
            ]}
            onPress={handleUpload}
            disabled={uploading}
          >
            {uploading ? (
              <View style={styles.uploadingContainer}>
                <ActivityIndicator size="small" color="white" />
                <Text style={styles.uploadButtonText}>Mengupload...</Text>
              </View>
            ) : (
              <Text style={styles.uploadButtonText}>
                📤 Upload {localImages.length} Gambar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Empty State */}
      {localImages.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, theme === 'dark' && styles.textSecondaryDark]}>
            📷 Belum ada gambar
          </Text>
          <Text style={[styles.emptySubtext, theme === 'dark' && styles.textSecondaryDark]}>
            Tekan tombol di atas untuk menambahkan gambar
          </Text>
        </View>
      )}

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
          ⚡ Maksimal {maxImages} gambar
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
          🖼️ Ukuran optimal: 600x600px
        </Text>
        <Text style={[styles.infoText, theme === 'dark' && styles.textSecondaryDark]}>
          💾 Kualitas: 70%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  containerDark: {
    backgroundColor: '#2D3748',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  counter: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    backgroundColor: '#007AFF',
  },
  galleryButton: {
    backgroundColor: '#34C759',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  previewContainer: {
    marginTop: 8,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 12,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  imageWrapper: {
    position: 'relative',
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#E53E3E',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  imageIndex: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  uploadButton: {
    backgroundColor: '#38A169',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#A0AEC0',
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  infoText: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 2,
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ImageUploader;