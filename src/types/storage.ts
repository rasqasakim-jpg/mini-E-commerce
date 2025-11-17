export type StorageKeys = 
  | '@app:auth_token'
  | '@app:user_data'
  | '@app:theme'
  | '@app:cart'
  | '@cache:categories'
  | '@cache:products'
  | '@app:notification_status';

export interface CacheData<T = any> {
  value: T;
  timestamp: number;
  ttl?: number; // Time to Live in milliseconds
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
}

// ✅ Type guards untuk safety
export const isCartItem = (item: any): item is CartItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number'
  );
};

export const isCartItemArray = (items: any): items is CartItem[] => {
  return Array.isArray(items) && items.every(isCartItem);
};

export const isUserData = (data: any): data is UserData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    typeof data.email === 'string'
  );
};