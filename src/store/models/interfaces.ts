export interface Category {
  categoryId: number;
  title: string;
  slug: string;
  description: string;
  subDescription: string;
  discountRate: number;
  status: string;
}

export interface ResponseDataType {
  status: string;
  message: string;
  timestamp: Date;
  errors: string[];
}
