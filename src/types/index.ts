export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface ProductFormData {
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}

export type ValidatableFields = 'name' | 'price' | 'imageUrl';
export type ValidationErrors = Partial<Record<ValidatableFields, string>>;

// Tambahkan type untuk theme
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}