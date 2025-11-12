export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  discount?: number;
  rating?: number;
  stock?: number;
  brand?: string;
}

export interface ProductFormData {
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  category: string;
}

// ✅ PERBAIKAN: Gunakan Record<string, string> untuk ValidationErrors
export type ValidationErrors = Record<string, string>;

export type ValidatableFields = 'name' | 'price' | 'imageUrl' | 'category' | 'description';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  products: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  address?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
}