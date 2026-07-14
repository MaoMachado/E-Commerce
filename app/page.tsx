"use client";

import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { useProducts } from "@/app/context/ProductContext";

export default function Home() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <main>
        <Header />
        <p className="text-center mt-3 text-xl tracking-wider">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Header />
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <ProductCard products={products} />
    </main>
  );
}
