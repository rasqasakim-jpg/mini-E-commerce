import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';

export const requestStoragePermissionAndSave = async (): Promise<void> => {
  if (Platform.OS !== 'android') {
    // Untuk iOS, langsung buka kamera dengan saveToPhotos: true
    openCameraWithSaveOption(true);
    return;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Izin Penyimpanan Foto',
        message: 'Aplikasi membutuhkan izin untuk menyimpan foto KTP ke galeri sebagai backup',
        buttonNeutral: 'Tanya Nanti',
        buttonNegative: 'Tolak',
        buttonPositive: 'Setujui',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      openCameraWithSaveOption(true);
    } else {
      // Izin ditolak, buka kamera tanpa save
      Alert.alert(
        'Izin Ditolak',
        'Foto tidak akan tersimpan di galeri publik. Anda masih bisa mengambil foto untuk upload.'
      );
      openCameraWithSaveOption(false);
    }
  } catch (error) {
    console.error('Error requesting storage permission:', error);
    openCameraWithSaveOption(false);
  }
};

const openCameraWithSaveOption = (canSave: boolean) => {
  const options: CameraOptions = {
    mediaType: 'photo',
    quality: 0.7,
    saveToPhotos: canSave,
  };

  launchCamera(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled camera');
      return;
    }

    if (response.errorCode) {
      if (response.errorCode === 'camera_unavailable') {
        Alert.alert(
          'Kamera Tidak Tersedia',
          'Kamera tidak bisa dibuka. Gunakan Galeri?',
          [
            { text: 'Batal', style: 'cancel' },
            { 
              text: 'Buka Galeri', 
              onPress: () => {
                const galleryOptions: ImageLibraryOptions = {
                  mediaType: 'photo',
                };
                launchImageLibrary(galleryOptions, () => {});
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', response.errorMessage || 'Unknown error');
      }
      return;
    }

    if (response.assets) {
      // Handle successful photo capture
      console.log('Photo captured:', response.assets[0]);
      // Di sini bisa lanjut ke proses upload atau lainnya
    }
  });
};

export const handleCameraError = (errorCode: string, errorMessage?: string) => {
  if (errorCode === 'camera_unavailable') {
    Alert.alert(
      'Kamera Tidak Tersedia',
      'Kamera tidak bisa dibuka. Gunakan Galeri?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Buka Galeri', 
          onPress: () => {
            const galleryOptions: ImageLibraryOptions = {
              mediaType: 'photo',
            };
            launchImageLibrary(galleryOptions, (galleryResponse) => {
              // Handle gallery response here
              if (galleryResponse.assets) {
                console.log('Selected from gallery:', galleryResponse.assets[0]);
              }
            });
          }
        }
      ]
    );
  } else {
    Alert.alert('Error Kamera', errorMessage || 'Unknown camera error');
  }
};