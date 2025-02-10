// src/models/product.ts
export interface Product {
  sku: string;
  name: string;
  price: number;
}

export interface ProductCategory {
  category: string;
  items: Product[];
}
