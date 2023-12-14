export interface Category {
  categoryId: number;
  title: string;
  slug: string;
  description: string;
  subDescription: string;
  discountRate: number;
  status: string;
}

export interface Product {
  productId: number;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  position: number;
  status: string;
  stock: string;
  listPrice: number;
  sellingPrice: number;
  categoryId: number;
  isRemoved: boolean;
  buyingPrice: number;
  minimumStockLevel: number;
  maximumStockLevel: number;
}

export interface FavoritesItem {
  id: number;
  slug: string;
  title: string;
}

export interface Favorites {
  items: FavoritesItem[];
}

export interface ErrorResponse {
  status: string;
  message: string;
  timestamp: Date;
  errors: string[];
}

export interface TokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
}

export interface SignInForm {
  username: string;
  password: string;
}

export interface SignUpForm {
  username: string;
  fullName: string;
  password: string;
  passwordRepeat: string;
  code?: string;
}

export interface ProductForm {
  products: number[];
}

export type VerificationStatus = 'PENDING' | 'SENT' | 'COMPLETED' | 'ERROR';

export type VerificationError =
  | 'INVALID_EMAIL'
  | 'INVALID_RECAPTCHA'
  | 'ALREADY_SENT'
  | 'DUPLICATED'
  | 'EXPIRED'
  | 'INVALID_CODE'
  | null;

export type VerificationState = {
  status: VerificationStatus;
  error: VerificationError;
  timeout: number;
};

export type VerificationAction =
  | { type: 'SENT' }
  | { type: 'COMPLETED' }
  | { type: 'RESET' }
  | { type: 'RELOADED'; timeout: number }
  | { type: 'ERROR'; error: VerificationError };
