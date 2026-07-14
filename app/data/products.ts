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

export const productsData: Product[] = [
  {
    id: 1,
    name: "Hoodie Oversized Black",
    price: 45.99,
    category: "Hoodies",
    stock: 1,
    image: "https://picsum.photos/id/1/400/500",
  },
  {
    id: 2,
    name: "Jogger Cargo Green",
    price: 39.99,
    category: "Pants",
    stock: 8,
    image: "https://picsum.photos/id/2/400/500",
  },
  {
    id: 3,
    name: "T-Shirt Graphic Skull",
    price: 24.99,
    category: "T-Shirts",
    stock: 15,
    image: "https://picsum.photos/id/3/400/500",
  },
  {
    id: 4,
    name: "Denim Jacket Vintage",
    price: 59.99,
    category: "Jackets",
    stock: 5,
    image: "https://picsum.photos/id/4/400/500",
  },
  {
    id: 5,
    name: "Cargo Pants Beige",
    price: 42.0,
    category: "Pants",
    stock: 7,
    image: "https://picsum.photos/id/5/400/500",
  },
  {
    id: 6,
    name: "Cropped Hoodie Pink",
    price: 38.0,
    category: "Hoodies",
    stock: 12,
    image: "https://picsum.photos/id/6/400/500",
  },
  {
    id: 7,
    name: "Socks Pack x3",
    price: 15.99,
    category: "Accessories",
    stock: 20,
    image: "https://picsum.photos/id/7/400/500",
  },
  {
    id: 8,
    name: "Cap Embroidered",
    price: 19.99,
    category: "Accessories",
    stock: 9,
    image: "https://picsum.photos/id/8/400/500",
  },
];
