"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="px-3">
      <article className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
        {products.map((product) => (
          <section
            key={product.id}
            className="border-2 border-sky-600/20 p-1 rounded-md flex flex-col justify-between"
          >
            <header className="mb-3">
              <h2 className="text-center mb-1 font-semibold text-md">
                {product.name}
              </h2>
            </header>

            <div className="max-w-70 mx-auto mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-md"
              />
            </div>

            <footer className="flex items-center justify-between mb-3">
              <p className="text-sm">Category: {product.category}</p>

              <p className="bg-sky-600/40 py-0.5 px-1 text-sm rounded-sm">
                ${product.price.toFixed(2)}
              </p>
            </footer>

            <button className="cursor-pointer bg-cyan-600/30 px-3 py-0.5 rounded-md text-sm hover:bg-cyan-600/50 transition-colors duration-300">
              Add to Cart
            </button>
          </section>
        ))}
      </article>
    </section>
  );
}
