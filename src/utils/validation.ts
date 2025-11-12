import { ProductFormData, ValidationErrors, ValidatableFields } from '../types';

export const validateForm = (formData: ProductFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate name
  if (!formData.name.trim()) {
    errors.name = 'Nama produk harus diisi';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Nama produk minimal 3 karakter';
  }

  // Validate price
  if (!formData.price.trim()) {
    errors.price = 'Harga harus diisi';
  } else {
    const price = Number(formData.price);
    if (isNaN(price) || price <= 0) {
      errors.price = 'Harga harus berupa angka yang valid';
    }
  }

  // Validate image URL
  if (!formData.imageUrl.trim()) {
    errors.imageUrl = 'URL gambar harus diisi';
  } else if (!isValidUrl(formData.imageUrl)) {
    errors.imageUrl = 'URL gambar tidak valid';
  }

  // Validate category
  if (!formData.category.trim()) {
    errors.category = 'Kategori harus diisi';
  } else if (formData.category.trim().length < 2) {
    errors.category = 'Kategori minimal 2 karakter';
  }

  // Validate description (optional but with max length)
  if (formData.description.trim().length > 500) {
    errors.description = 'Deskripsi maksimal 500 karakter';
  }

  return errors;
};

export const isValidatableField = (field: string): field is ValidatableFields => {
  return ['name', 'price', 'imageUrl', 'category', 'description'].includes(field);
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Helper untuk format harga
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};