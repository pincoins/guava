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
