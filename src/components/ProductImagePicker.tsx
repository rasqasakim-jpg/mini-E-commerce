import React, { useState } from 'react';
import { View, Button, FlatList, Image, Alert, StyleSheet } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext';

const ProductImagePicker: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const { theme } = useTheme();

  const pickProductImages = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 5, // Maksimal 5 foto
      quality: 0.7,
      maxWidth: 600,
      maxHeight: 600,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unknown error');
        return;
      }

      if (response.assets) {
        // Simpan hanya uri dan fileName
        const simplifiedAssets = response.assets.map(asset => ({
          uri: asset.uri,
          fileName: asset.fileName
        }));

        setSelectedImages(simplifiedAssets);
        
        // Simpan ke AsyncStorage
        try {
          await AsyncStorage.setItem('@ecom:newProductAssets', JSON.stringify(simplifiedAssets));
          Alert.alert('Success', 'Foto produk berhasil disimpan');
        } catch (error) {
          Alert.alert('Error', 'Gagal menyimpan foto produk');
        }
      }
    });
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Button title="Pilih Foto Produk (Maks 5)" onPress={pickProductImages} />
      
      <FlatList
        data={selectedImages}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image 
            source={{ uri: item.uri }} 
            style={styles.image} 
          />
        )}
        contentContainerStyle={styles.imageList}
      />
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
  imageList: {
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
});

export default ProductImagePicker;