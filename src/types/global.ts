// Auth Types
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  username?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiredAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  specifications: { label: string; value: string }[]; // FIXED
  brand: string;
  warranty: string;
  shippingInfo: string;
}

export interface CartItem extends Product {
  quantity: number; // REQUIRED
}

// Storage Types
export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface CacheItem<T> {
  value: T;
  ttl: number;
  cachedAt: string;
}

export interface StorageContextType {
  cart: CartItem[];
  loading: boolean;
  addItem: (item: Product) => Promise<void>; // FIXED (Product or CartItem OK)
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refresh: () => Promise<void>;
  itemCount: number;
  totalPrice: number;
}

// Deep Linking Types
export interface DeepLinkParams {
  path: string;
  productId?: string;
  userId?: string;
  category?: string;
  action?: string;
}

export interface ProtectedDeepLink {
  originalUrl: string;
  targetScreen: string;
  params: Record<string, any>;
  requiresAuth: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
