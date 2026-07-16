"use client";

import {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from "react";
import { Product } from "../data/products";
import { getProducts } from "../lib/firebase/products";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refreshProduct: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Failed to load products, please, try again later");
      console.error("Error fetching products: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshProduct = async () => {
    await fetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, error, refreshProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a Provider");
  }
  return context;
};
