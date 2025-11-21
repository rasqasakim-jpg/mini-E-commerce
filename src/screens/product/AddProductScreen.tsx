// src/screens/product/AddProductScreen.tsx (FIXED VERSION)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useImagePicker } from '../../hooks/useImagePicker';
import ImagePickerModal from '../../components/ImagePickerModal';
import ProtectedRoute from '../../auth/ProtectedRoute';
import ImageUploader from '../../components/ImageUploader';

const AddProductScreen: React.FC = () => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [productImages, setProductImages] = useState<any[]>([]);
  
  const {
    uploading,
    uploadImages,
    loadSavedImages,
  } = useImagePicker();

  // Load saved images on component mount
  useEffect(() => {
    loadSavedImages();
  }, []);

  const handleImagesSelected = (images: any[]) => {
    setProductImages(images);
  };

  const handleUploadImages = async () => {
    if (productImages.length === 0) {
      Alert.alert('Info', 'Pilih gambar terlebih dahulu');
      return;
    }

    const success = await uploadImages(productImages);
    if (success) {
      // Tidak perlu clear images setelah upload berhasil
      // Biarkan user melihat hasil upload
      Alert.alert('Sukses', 'Gambar berhasil diupload!');
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...productImages];
    newImages.splice(index, 1);
    setProductImages(newImages);
  };

  const AddProductContent = () => (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
        Tambah Produk Baru
      </Text>

      {/* Product Form Section */}
      <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Informasi Produk
        </Text>
        
        {/* Informasi produk lainnya bisa ditambahkan di sini */}
        <Text style={[styles.placeholder, theme === 'dark' && styles.textSecondaryDark]}>
          Nama produk, deskripsi, harga, dll.
        </Text>
      </View>

      {/* Image Upload Section */}
      <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Foto Produk
        </Text>
        
        <Text style={[styles.sectionSubtitle, theme === 'dark' && styles.textSecondaryDark]}>
          Maksimal 5 foto (600x600px, kualitas 70%)
        </Text>

        {/* Gunakan ImageUploader component */}
        <ImageUploader
          onImagesUploaded={handleImagesSelected}
          maxImages={5}
          label="Upload Foto Produk"
        />

        {/* Selected Images Preview */}
        {productImages.length > 0 && (
          <View style={styles.imagesContainer}>
            <Text style={[styles.imagesCount, theme === 'dark' && styles.textDark]}>
              {productImages.length} foto terpilih
            </Text>
            
            <View style={styles.imagesGrid}>
              {productImages.map((image, index) => (
                <View key={index} style={styles.imageItem}>
                  <Image 
                    source={{ uri: image.uri }} 
                    style={styles.previewImage}
                  />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeImageText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
              onPress={handleUploadImages}
              disabled={uploading}
            >
              {uploading ? (
                <View style={styles.uploadingContainer}>
                  <ActivityIndicator color="white" size="small" />
                  <Text style={styles.uploadButtonText}>
                    Mengupload...
                  </Text>
                </View>
              ) : (
                <Text style={styles.uploadButtonText}>
                  📤 Upload {productImages.length} Foto
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Image Picker Modal */}
      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onImagesSelected={handleImagesSelected}
        maxSelection={5}
      />
    </ScrollView>
  );

  return (
    <ProtectedRoute>
      <AddProductContent />
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 16,
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionDark: {
    backgroundColor: '#2D3748',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  imagesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  imagesCount: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  imageItem: {
    position: 'relative',
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#E53E3E',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#38A169',
    paddingVertical: 14,
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
    fontSize: 16,
    fontWeight: '600',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default AddProductScreen;