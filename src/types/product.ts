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
  tags: string[];
}

export interface ProductDetail extends Product {
  images: string[];
  specifications: {
    key: string;
    value: string;
  }[];
  brand: string;
  warranty: string;
  shippingInfo: string;
}