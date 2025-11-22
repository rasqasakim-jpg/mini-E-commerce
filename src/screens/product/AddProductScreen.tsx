import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import ProductImagePicker from '../../components/ProductImagePicker';

const AddProductScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
        Tambah Produk Baru
      </Text>
      
      <View style={[styles.section, theme === 'dark' && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.textDark]}>
          Foto Produk (Maksimal 5)
        </Text>
        <Text style={[styles.sectionSubtitle, theme === 'dark' && styles.textSecondaryDark]}>
          Pilih foto produk dari galeri
        </Text>
        <ProductImagePicker />
      </View>
    </ScrollView>
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
    marginBottom: 24,
    color: '#2D3748',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionDark: {
    backgroundColor: '#2D3748',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D3748',
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    color: '#718096',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default AddProductScreen;