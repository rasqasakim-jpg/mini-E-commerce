import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { api } from '../../utils/apiInterceptor';

type RootStackParamList = {
  Checkout: { productId: string };
  MainApp: undefined;
};

type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;
type CheckoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;

interface Props {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
}

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
}

const CheckoutScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInputBlur = (field: keyof CheckoutForm) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const validateField = (field: keyof CheckoutForm, value: string): boolean => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Nama wajib diisi';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Nama minimal 2 karakter';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Format email tidak valid';
        } else {
          delete newErrors.email;
        }
        break;

      case 'address':
        if (!value.trim()) {
          newErrors.address = 'Alamat wajib diisi';
        } else if (value.trim().length < 10) {
          newErrors.address = 'Alamat terlalu pendek';
        } else {
          delete newErrors.address;
        }
        break;

      case 'city':
        if (!value.trim()) {
          newErrors.city = 'Kota wajib diisi';
        } else {
          delete newErrors.city;
        }
        break;

      case 'postalCode':
        if (!value.trim()) {
          newErrors.postalCode = 'Kode pos wajib diisi';
        } else if (!/^\d+$/.test(value)) {
          newErrors.postalCode = 'Kode pos harus angka';
        } else if (value.length < 5) {
          newErrors.postalCode = 'Kode pos minimal 5 digit';
        } else {
          delete newErrors.postalCode;
        }
        break;

      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'Nomor HP wajib diisi';
        } else if (!/^\d+$/.test(value)) {
          newErrors.phone = 'Nomor HP harus angka';
        } else if (value.length < 10) {
          newErrors.phone = 'Nomor HP minimal 10 digit';
        } else {
          delete newErrors.phone;
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const validateForm = (): boolean => {
    const fields: (keyof CheckoutForm)[] = ['name', 'email', 'address', 'city', 'postalCode', 'phone'];
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field, form[field])) {
        isValid = false;
      }
    });

    // Mark all fields as touched to show errors
    const allTouched = fields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setTouched(allTouched);

    return isValid;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Harap perbaiki error pada form sebelum melanjutkan');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      const checkoutData = {
        productId,
        ...form,
        timestamp: new Date().toISOString()
      };

      const response = await api.post('/checkout', checkoutData);
      
      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          'Sukses', 
          'Pesanan berhasil dibuat! Anda akan menerima email konfirmasi.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('MainApp')
            }
          ]
        );
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      
      // Handle validation errors from server (400 Bad Request)
      if (err.response?.status === 400 && err.response.data?.errors) {
        const serverErrors = err.response.data.errors;
        setErrors(serverErrors);
        Alert.alert('Error Validasi', 'Harap periksa kembali data yang Anda masukkan');
      } else if (err.response?.status === 401) {
        Alert.alert('Error', 'Sesi telah berakhir, silakan login kembali');
      } else if (err.response?.status === 500) {
        Alert.alert('Error', 'Server sedang mengalami masalah, silakan coba lagi nanti');
      } else {
        Alert.alert(
          'Error Jaringan', 
          'Gagal membuat pesanan. Periksa koneksi internet Anda dan coba lagi.',
          [{ text: 'Coba Lagi', onPress: handleCheckout }]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const getInputStyle = (field: keyof CheckoutForm) => {
    if (errors[field] && touched[field]) {
      return [styles.input, styles.inputError];
    }
    return styles.input;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Checkout Produk</Text>
      <Text style={styles.subtitle}>Product ID: {productId}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nama Lengkap *</Text>
          <TextInput
            style={getInputStyle('name')}
            value={form.name}
            onChangeText={(value) => handleInputChange('name', value)}
            onBlur={() => handleInputBlur('name')}
            placeholder="Masukkan nama lengkap"
            editable={!loading}
          />
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={getInputStyle('email')}
            value={form.email}
            onChangeText={(value) => handleInputChange('email', value)}
            onBlur={() => handleInputBlur('email')}
            placeholder="masukkan@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nomor HP *</Text>
          <TextInput
            style={getInputStyle('phone')}
            value={form.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            onBlur={() => handleInputBlur('phone')}
            placeholder="08xxxxxxxxxx"
            keyboardType="phone-pad"
            editable={!loading}
          />
          {errors.phone && touched.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Alamat Lengkap *</Text>
          <TextInput
            style={[getInputStyle('address'), styles.textArea]}
            value={form.address}
            onChangeText={(value) => handleInputChange('address', value)}
            onBlur={() => handleInputBlur('address')}
            placeholder="Jl. Nama Jalan No. X, RT/RW, Kelurahan, Kecamatan"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            editable={!loading}
          />
          {errors.address && touched.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, styles.flex]}>
            <Text style={styles.label}>Kota *</Text>
            <TextInput
              style={getInputStyle('city')}
              value={form.city}
              onChangeText={(value) => handleInputChange('city', value)}
              onBlur={() => handleInputBlur('city')}
              placeholder="Nama Kota"
              editable={!loading}
            />
            {errors.city && touched.city && (
              <Text style={styles.errorText}>{errors.city}</Text>
            )}
          </View>

          <View style={[styles.formGroup, styles.flex, styles.leftMargin]}>
            <Text style={styles.label}>Kode Pos *</Text>
            <TextInput
              style={getInputStyle('postalCode')}
              value={form.postalCode}
              onChangeText={(value) => handleInputChange('postalCode', value)}
              onBlur={() => handleInputBlur('postalCode')}
              placeholder="12345"
              keyboardType="numeric"
              maxLength={5}
              editable={!loading}
            />
            {errors.postalCode && touched.postalCode && (
              <Text style={styles.errorText}>{errors.postalCode}</Text>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.checkoutButton, loading && styles.buttonDisabled]}
        onPress={handleCheckout}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.buttonContent}>
            <ActivityIndicator size="small" color="white" />
            <Text style={styles.checkoutButtonText}>Memproses...</Text>
          </View>
        ) : (
          <Text style={styles.checkoutButtonText}>
            Buat Pesanan Sekarang
          </Text>
        )}
      </TouchableOpacity>

      <Text style={styles.note}>
        * Menandakan field wajib diisi
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2D3748',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#2D3748',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#4A5568',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#2D3748',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#E53E3E',
    backgroundColor: '#FEF5F5',
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  leftMargin: {
    marginLeft: 12,
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#A0AEC0',
    shadowOpacity: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
  },
});

export default CheckoutScreen;