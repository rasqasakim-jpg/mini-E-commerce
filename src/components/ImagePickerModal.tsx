// src/components/ImagePickerModal.tsx
import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useImagePicker } from '../hooks/useImagePicker';

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onImagesSelected: (images: any[]) => void;
  maxSelection?: number;
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  visible,
  onClose,
  onImagesSelected,
  maxSelection = 5,
}) => {
  const { theme } = useTheme();
  const { selectMultipleImages, takePhotoWithSave, selectedImages } = useImagePicker();

  const handleCameraPress = async () => {
    await takePhotoWithSave();
    if (selectedImages.length > 0) {
      onImagesSelected(selectedImages);
      onClose();
    }
  };

  const handleGalleryPress = async () => {
    await selectMultipleImages();
    if (selectedImages.length > 0) {
      onImagesSelected(selectedImages);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, theme === 'dark' && styles.modalOverlayDark]}>
        <View style={[styles.modalContent, theme === 'dark' && styles.modalContentDark]}>
          <Text style={[styles.modalTitle, theme === 'dark' && styles.textDark]}>
            Pilih Sumber Gambar
          </Text>
          
          <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
            Maksimal {maxSelection} gambar
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cameraButton]}
              onPress={handleCameraPress}
            >
              <Text style={styles.buttonText}>📷 Kamera</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.galleryButton]}
              onPress={handleGalleryPress}
            >
              <Text style={styles.buttonText}>🖼️ Galeri</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.cancelButton, theme === 'dark' && styles.cancelButtonDark]}
            onPress={onClose}
          >
            <Text style={[styles.cancelButtonText, theme === 'dark' && styles.textDark]}>
              Batal
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlayDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalContentDark: {
    backgroundColor: '#2D3748',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2D3748',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#718096',
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#007AFF',
  },
  galleryButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cancelButtonDark: {
    backgroundColor: '#4A5568',
    borderColor: '#718096',
  },
  cancelButtonText: {
    color: '#4A5568',
    fontSize: 16,
    fontWeight: '500',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ImagePickerModal;