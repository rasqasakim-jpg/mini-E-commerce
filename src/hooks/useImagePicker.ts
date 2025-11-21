// src/hooks/useImagePicker.ts (FIXED VERSION)
import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { 
  launchCamera, 
  launchImageLibrary, 
  CameraOptions, 
  ImageLibraryOptions,
  ImagePickerResponse
} from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ FIX: Import yang benar

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

  // ✅ FIX: Permission handling untuk Android
  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Izin Kamera',
          message: 'Aplikasi membutuhkan akses kamera untuk mengambil foto',
          buttonNeutral: 'Tanya Nanti',
          buttonNegative: 'Tolak',
          buttonPositive: 'Setujui',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  };

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

  // ✅ FIX: Camera function dengan permission handling
  const takePhotoWithSave = async (): Promise<void> => {
    const hasCameraPermission = await requestCameraPermission();
    
    if (!hasCameraPermission) {
      Alert.alert(
        'Izin Ditolak', 
        'Tidak dapat mengakses kamera tanpa izin'
      );
      return;
    }

    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.7,
      saveToPhotos: false, // ✅ Nonaktifkan save ke galeri untuk menghindari permission issues
      maxWidth: 600,
      maxHeight: 600,
      cameraType: 'back',
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
          width: photo.width,
          height: photo.height,
        };

        setSelectedImages([imageResult]);
        await saveImagesToStorage([imageResult]);
        
        console.log('✅ Photo taken successfully:', imageResult);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Gagal mengambil foto');
    }
  };

  // ✅ SOAL c: Upload file dengan loading indicator
  const uploadImages = async (images: ImagePickerResult[]): Promise<boolean> => {
    if (images.length === 0) {
      Alert.alert('Info', 'Tidak ada gambar untuk diupload');
      return false;
    }

    setUploading(true);

    try {
      // ✅ FIX: Simulasi upload yang lebih realistis
      const uploadPromises = images.map((image, index) => 
        uploadSingleImage(image, index)
      );
      
      const results = await Promise.allSettled(uploadPromises);
      
      const successfulUploads = results.filter(result => 
        result.status === 'fulfilled' && result.value
      ).length;
      
      const failedUploads = results.length - successfulUploads;
      
      if (failedUploads === 0) {
        Alert.alert('Sukses', `${successfulUploads} gambar berhasil diupload`);
        return true;
      } else {
        Alert.alert(
          'Peringatan', 
          `${successfulUploads} berhasil, ${failedUploads} gagal`
        );
        return successfulUploads > 0;
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Gagal mengupload gambar');
      return false;
    } finally {
      setUploading(false); // ✅ Pastikan loading berhenti
    }
  };

  const uploadSingleImage = async (image: ImagePickerResult, index: number): Promise<boolean> => {
    return new Promise((resolve) => {
      // ✅ FIX: Simulasi upload dengan timeout
      setTimeout(async () => {
        try {
          // Simulasi FormData creation
          const formData = new FormData();
          formData.append('image', {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: image.fileName || `upload_${index}.jpg`,
          });

          console.log(`📤 Uploading image ${index + 1}:`, image.fileName);
          
          // Simulasi network request
          const success = Math.random() > 0.2; // 80% success rate untuk testing
          
          if (success) {
            console.log(`✅ Image ${index + 1} uploaded successfully`);
            resolve(true);
          } else {
            console.log(`❌ Image ${index + 1} upload failed`);
            resolve(false);
          }
        } catch (error) {
          console.error(`Error uploading image ${index + 1}:`, error);
          resolve(false);
        }
      }, 1000); // Simulasi 1 detik upload time
    });
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

  // ✅ FIX: AsyncStorage usage yang benar
  const saveImagesToStorage = async (images: ImagePickerResult[]): Promise<void> => {
    try {
      // Simpan hanya uri dan fileName seperti diminta
      const storageData = images.map(img => ({
        uri: img.uri,
        fileName: img.fileName,
      }));
      
      // ✅ FIX: Gunakan AsyncStorage yang benar
      await AsyncStorage.setItem(
        '@ecom:newProductAssets', 
        JSON.stringify(storageData)
      );
      console.log('✅ Images saved to storage:', storageData.length);
    } catch (error) {
      console.error('Error saving images to storage:', error);
      Alert.alert('Error', 'Gagal menyimpan gambar');
    }
  };

  const saveBase64Preview = async (base64: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('@ecom:avatar_preview', base64);
      console.log('✅ Base64 preview saved');
    } catch (error) {
      console.error('Error saving base64 preview:', error);
    }
  };

  const clearSelectedImages = (): void => {
    setSelectedImages([]);
  };

  // Load saved images on hook initialization
  const loadSavedImages = async (): Promise<void> => {
    try {
      const savedData = await AsyncStorage.getItem('@ecom:newProductAssets');
      if (savedData) {
        const images = JSON.parse(savedData);
        setSelectedImages(images);
        console.log('✅ Loaded saved images:', images.length);
      }
    } catch (error) {
      console.error('Error loading saved images:', error);
    }
  };

  return {
    selectedImages,
    uploading,
    selectMultipleImages,
    takePhotoWithSave,
    uploadImages,
    selectImageWithPreview,
    clearSelectedImages,
    loadSavedImages,
  };
};