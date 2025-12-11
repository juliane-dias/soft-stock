export interface Product {
  id: number;
  name: string;
  category: string;
  qty: number;
  price: number;
}

export type ProductInput = Omit<Product, 'id'>;