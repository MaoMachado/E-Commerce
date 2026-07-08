"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  quantity?: number; // Optional property to track quantity in cart
}

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="px-3">
      <article className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <section
            key={product.id}
            className="p-1 rounded-md bg-linear-to-b from-sky-600/20 to-transparent flex flex-col justify-between gap-y-2 border-b border-sky-600/20"
          >
            <h2 className="text-md text-center">{product.name}</h2>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-md"
            />
            <article className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-wider opacity-80">
                ${product.price.toFixed(2)}
              </p>
              <span className="text-xs tracking-wider bg-sky-600/20 p-1 rounded-md">
                {product.category}
              </span>
            </article>

            <button
              className="w-fit mx-auto text-sm bg-linear-to-l from-sky-600/50 to-cyan-600/20 px-2 py-0.5 rounded-md cursor-pointer"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </section>
        ))}
      </article>
    </section>
  );
}
