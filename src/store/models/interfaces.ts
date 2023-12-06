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
  name: string;
  subtitle: string;
  sellingPrice: number;
  listPrice: number;
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
