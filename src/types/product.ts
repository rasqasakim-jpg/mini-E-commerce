// src/types/product.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface ProductDetail extends Product {
  images: string[];
  tags: string[];
  specifications: Record<string, string>;
  brand: string;
  warranty: string;
  shippingInfo: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}