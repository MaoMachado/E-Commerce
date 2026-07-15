"use client";

import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { Product } from "../data/products";

export default function ProductCard({ products }: { products: Product[] }) {
  const { addToCart } = useCart();
  const { refreshProduct } = useProducts();

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mt-3 text-xl tracking-wider">
          No products found
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

            <div className="flex flex-col gap-2 p-2">
              <h2 className="text-sm font-medium leading-snug lg:text-lg flex flex-col lg:flex-row items-center lg:justify-between tracking-widest">
                {product.name}{" "}
                <span className="bg-sky-600 px-1 rounded-full text-sm">
                  Stock - {product.stock}
                </span>
              </h2>

              <div className="mx-auto flex items-center justify-between gap-2">
                <p className="text-sm font-semibold lg:text-lg">
                  $ {product.price}
                </p>
                <span className="rounded bg-sky-600/20 px-1.5 py-0.5 text-xs lg:text-sm">
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
