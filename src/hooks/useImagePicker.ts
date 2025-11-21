// src/hooks/useImagePicker.ts
import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { 
  launchCamera, 
  launchImageLibrary, 
  CameraOptions, 
  ImageLibraryOptions,
  Asset 
} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';

export interface ImagePickerResult {
  uri: string;
  fileName?: string;
  type?: string;
  fileSize?: number;
  width?: number;
  height?: number;
  base64?: string;
}

export const useImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState<ImagePickerResult[]>([]);
  const [uploading, setUploading] = useState(false);

  // ✅ SOAL a: Multi-foto selection dengan optimasi
  const selectMultipleImages = async (): Promise<void> => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 5, // ✅ Maksimal 5 foto
      maxWidth: 600,     // ✅ Optimasi ukuran
      maxHeight: 600,
      quality: 0.7,      // ✅ Kompresi kualitas
      includeBase64: false,
    };

    try {
      const result = await launchImageLibrary(options);
      
      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        handleImagePickerError(result.errorCode, result.errorMessage);
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const processedImages: ImagePickerResult[] = result.assets.map(asset => ({
          uri: asset.uri!,
          fileName: asset.fileName,
          type: asset.type,
          fileSize: asset.fileSize,
          width: asset.width,
          height: asset.height,
        }));

        setSelectedImages(processedImages);
        
        // ✅ Simpan ke AsyncStorage
        await saveImagesToStorage(processedImages);
      }
    } catch (error) {
      console.error('Error selecting images:', error);
      Alert.alert('Error', 'Gagal memilih gambar');
    }
  };

  // ✅ SOAL b: Izin penyimpanan untuk Android
  const requestStoragePermissionAndSave = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return true; // iOS tidak perlu izin WRITE_EXTERNAL_STORAGE
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Izin Penyimpanan',
          message: 'Aplikasi membutuhkan izin untuk menyimpan foto ke galeri',
          buttonNeutral: 'Tanya Nanti',
          buttonNegative: 'Tolak',
          buttonPositive: 'Setujui',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false;
    }
  };

  const takePhotoWithSave = async (): Promise<void> => {
    const hasPermission = await requestStoragePermissionAndSave();
    
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.7,
      saveToPhotos: hasPermission, // ✅ Simpan ke galeri hanya jika izin diberikan
      maxWidth: 600,
      maxHeight: 600,
    };

    try {
      const result = await launchCamera(options);
      
      if (result.didCancel) {
        console.log('User cancelled camera');
        return;
      }

      if (result.errorCode) {
        // ✅ SOAL d: Handle error kamera tidak tersedia
        if (result.errorCode === 'camera_unavailable') {
          Alert.alert(
            'Kamera Tidak Tersedia',
            'Kamera tidak bisa dibuka. Gunakan Galeri?',
            [
              { text: 'Batal', style: 'cancel' },
              { 
                text: 'Buka Galeri', 
                onPress: () => selectMultipleImages() 
              },
            ]
          );
          return;
        }
        handleImagePickerError(result.errorCode, result.errorMessage);
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const photo = result.assets[0];
        const imageResult: ImagePickerResult = {
          uri: photo.uri!,
          fileName: photo.fileName,
          type: photo.type,
        };

        setSelectedImages([imageResult]);
        
        if (!hasPermission) {
          Alert.alert(
            'Info', 
            'Foto tidak disimpan ke galeri karena izin penyimpanan ditolak'
          );
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Gagal mengambil foto');
    }
  };

  // ✅ SOAL c: Upload file dengan loading indicator
  const uploadImages = async (images: ImagePickerResult[]): Promise<boolean> => {
    if (images.length === 0) return false;

    setUploading(true);

    try {
      for (const image of images) {
        const success = await uploadSingleImage(image);
        if (!success) {
          throw new Error(`Gagal upload gambar: ${image.fileName}`);
        }
      }
      
      Alert.alert('Sukses', 'Semua gambar berhasil diupload');
      return true;
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Gagal mengupload beberapa gambar');
      return false;
    } finally {
      setUploading(false); // ✅ Pastikan loading berhenti
    }
  };

  const uploadSingleImage = async (image: ImagePickerResult): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || 'upload.jpg',
      });

      // ✅ Simulasi upload API
      const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Single image upload error:', error);
      return false;
    }
  };

  // ✅ SOAL e: Simpan preview cepat dengan Base64
  const selectImageWithPreview = async (): Promise<string | null> => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,  // ✅ Ukuran kecil untuk preview
      maxHeight: 300,
      quality: 0.5,
      includeBase64: true, // ✅ Include base64 untuk preview cepat
    };

    try {
      const result = await launchImageLibrary(options);
      
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.base64) {
          // ✅ Simpan base64 ke AsyncStorage untuk preview offline
          await saveBase64Preview(asset.base64);
          return asset.base64;
        }
      }
      return null;
    } catch (error) {
      console.error('Error selecting image with preview:', error);
      return null;
    }
  };

  // Helper functions
  const handleImagePickerError = (errorCode: string, errorMessage?: string) => {
    console.error(`Image Picker Error: ${errorCode}`, errorMessage);
    
    switch (errorCode) {
      case 'camera_unavailable':
        Alert.alert('Error', 'Kamera tidak tersedia');
        break;
      case 'permission':
        Alert.alert('Error', 'Izin kamera/galeri ditolak');
        break;
      default:
        Alert.alert('Error', errorMessage || 'Terjadi kesalahan');
    }
  };

  const saveImagesToStorage = async (images: ImagePickerResult[]): Promise<void> => {
    try {
      // Simpan hanya uri dan fileName seperti diminta
      const storageData = images.map(img => ({
        uri: img.uri,
        fileName: img.fileName,
      }));
      
      // Simpan ke AsyncStorage
      const { AsyncStorage } = require('react-native');
      await AsyncStorage.setItem(
        '@ecom:newProductAssets', 
        JSON.stringify(storageData)
      );
      console.log('✅ Images saved to storage');
    } catch (error) {
      console.error('Error saving images to storage:', error);
    }
  };

  const saveBase64Preview = async (base64: string): Promise<void> => {
    try {
      const { AsyncStorage } = require('react-native');
      await AsyncStorage.setItem('@ecom:avatar_preview', base64);
      console.log('✅ Base64 preview saved');
    } catch (error) {
      console.error('Error saving base64 preview:', error);
    }
  };

  const clearSelectedImages = (): void => {
    setSelectedImages([]);
  };

  return {
    selectedImages,
    uploading,
    selectMultipleImages,
    takePhotoWithSave,
    uploadImages,
    selectImageWithPreview,
    clearSelectedImages,
  };
};