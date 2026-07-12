"use client";

import { useCart } from "../context/CartContext";
import { Product, productsData } from "../data/products";

export default function ProductCard() {
  const { addToCart } = useCart();
  const products: Product[] = productsData;

  return (
    <section className="container mx-auto">
      <article className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
        {products.map((product) => (
          <section
            key={product.id}
            className="overflow-hidden rounded-md border border-sky-600/20 bg-zinc-900/20"
          >
            <div className="aspect-auto bg-zinc-900">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full"
              />
            </div>

            <div className="flex min-h-fit flex-col gap-2 p-2">
              <h2 className="text-sm font-medium leading-snug">
                {product.name}
              </h2>

              <div className="mx-auto flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{product.price}</p>
                <span className="rounded bg-sky-600/20 px-1.5 py-0.5 text-xs">
                  {product.category}
                </span>
              </div>

              <button
                className="w-full rounded-md bg-sky-700 px-2 py-1.5 text-sm font-medium cursor-pointer hover:bg-sky-600"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          </section>
        ))}
      </article>
    </section>
  );
}
