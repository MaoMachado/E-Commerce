"use client";

import { useProducts } from "../../context/ProductContext";
import Header from "../header/Header";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

export default function ProductCard() {
  const { products, refreshProduct, loading, error } = useProducts();

  if (loading) {
    return (
      <main className="container mx-auto">
        <div className="flex flex-wrap gap-3 justify-center mt-3 px-3 lg:px-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mt-3 text-xl tracking-wider">
          No products found <span>{error}</span>
        </div>

        <button
          className="mt-3 rounded-md bg-sky-700 px-2 py-1.5 text-sm font-medium cursor-pointer hover:bg-sky-600"
          onClick={refreshProduct}
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <section className="container mx-auto">
      <div className="flex flex-wrap justify-center gap-3 mt-3">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
