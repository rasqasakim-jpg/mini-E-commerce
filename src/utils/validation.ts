import { ValidationErrors, ValidatableFields, ProductFormData } from '../types';

export const validateForm = (formData: ProductFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Nama produk wajib diisi';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Nama produk minimal 3 karakter';
  }

  if (!formData.price.trim()) {
    errors.price = 'Harga wajib diisi';
  } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
    errors.price = 'Harga harus berupa angka positif';
  } else if (Number(formData.price) < 1000) {
    errors.price = 'Harga minimal Rp 1.000';
  }

  if (!formData.imageUrl.trim()) {
    errors.imageUrl = 'URL gambar wajib diisi';
  } else if (!isValidUrl(formData.imageUrl)) {
    errors.imageUrl = 'URL gambar tidak valid';
  }

  return errors;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidatableField = (field: string): field is ValidatableFields => {
  return ['name', 'price', 'imageUrl'].includes(field);
};