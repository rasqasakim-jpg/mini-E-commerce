import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Product, ProductFormData, ValidationErrors, ValidatableFields } from '../types';
import { validateForm, isValidatableField } from '../utils/validation';
import { useTheme } from '../contexts/ThemeContext';

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  visible,
  onClose,
  onAddProduct,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    imageUrl: '',
    description: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { theme } = useTheme();

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing - hanya untuk field yang divalidasi
    if (isValidatableField(field) && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newProduct: Omit<Product, 'id'> = {
      name: formData.name.trim(),
      price: Number(formData.price),
      imageUrl: formData.imageUrl.trim(),
      description: formData.description.trim(),
    };

    onAddProduct(newProduct);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      price: '',
      imageUrl: '',
      description: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={[styles.modalOverlay, theme === 'dark' && styles.modalOverlayDark]}>
          <View style={[styles.modalContent, theme === 'dark' && styles.modalContentDark]}>
            <Text style={[styles.modalTitle, theme === 'dark' && styles.textDark]}>
              Tambah Produk Baru
            </Text>

            <ScrollView style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
                  Nama Produk *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    theme === 'dark' && styles.inputDark,
                    errors.name && styles.inputError,
                  ]}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholder="Masukkan nama produk"
                  placeholderTextColor={theme === 'dark' ? '#A0AEC0' : '#718096'}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
                  Harga *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    theme === 'dark' && styles.inputDark,
                    errors.price && styles.inputError,
                  ]}
                  value={formData.price}
                  onChangeText={(value) => handleInputChange('price', value)}
                  placeholder="Masukkan harga"
                  placeholderTextColor={theme === 'dark' ? '#A0AEC0' : '#718096'}
                  keyboardType="numeric"
                />
                {errors.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
                  URL Gambar *
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    theme === 'dark' && styles.inputDark,
                    errors.imageUrl && styles.inputError,
                  ]}
                  value={formData.imageUrl}
                  onChangeText={(value) => handleInputChange('imageUrl', value)}
                  placeholder="Masukkan URL gambar"
                  placeholderTextColor={theme === 'dark' ? '#A0AEC0' : '#718096'}
                />
                {errors.imageUrl && (
                  <Text style={styles.errorText}>{errors.imageUrl}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, theme === 'dark' && styles.textDark]}>
                  Deskripsi
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    theme === 'dark' && styles.inputDark,
                  ]}
                  value={formData.description}
                  onChangeText={(value) => handleInputChange('description', value)}
                  placeholder="Masukkan deskripsi produk"
                  placeholderTextColor={theme === 'dark' ? '#A0AEC0' : '#718096'}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton, theme === 'dark' && styles.cancelButtonDark]}
                onPress={handleClose}
              >
                <Text style={[styles.cancelButtonText, theme === 'dark' && styles.cancelButtonTextDark]}>
                  Batal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton, theme === 'dark' && styles.submitButtonDark]}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Tambah Produk</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    width: '90%',
    maxHeight: '80%',
  },
  modalContentDark: {
    backgroundColor: '#2D3748',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2D3748',
  },
  form: {
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#2D3748',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#F7FAFC',
    color: '#2D3748',
  },
  inputDark: {
    backgroundColor: '#4A5568',
    borderColor: '#4A5568',
    color: '#F7FAFC',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#EDF2F7',
  },
  cancelButtonDark: {
    backgroundColor: '#4A5568',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  submitButtonDark: {
    backgroundColor: '#3182CE',
  },
  cancelButtonText: {
    color: '#4A5568',
    fontWeight: '600',
  },
  cancelButtonTextDark: {
    color: '#E2E8F0',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  textDark: {
    color: '#F7FAFC',
  },
});

export default AddProductModal;