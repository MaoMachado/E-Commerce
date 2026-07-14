export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export type CartItem = Product & {
  quantity: number;
};
