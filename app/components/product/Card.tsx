"use client";

import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/data/products";

export default function Card({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div
      key={product.id}
      className="border-2 border-sky-700/50 rounded-lg overflow-hidden lg:w-70 bg-blue-800/50 relative"
    >
      <span className="absolute top-2 right-2">
        <p className="bg-blue-500 text-sm font-semibold px-2 py-1 rounded-full">
          {product.category}
        </p>
      </span>

      <figure>
        <img src={product.image} alt={product.name} className="rounded-lg" />

        <figcaption>
          <h2 className="py-1 text-center font-semibold tracking-wider text-lg">
            {product.name}
          </h2>
        </figcaption>
      </figure>

      <div className="flex justify-between px-3 py-2">
        <p className="text-lg tracking-wider">
          Price: <span className="font-semibold">{`$${product.price}`}</span>
        </p>
        <p className="text-lg tracking-wider">
          {" "}
          Stock: <span className="font-semibold">{product.stock}</span>
        </p>
      </div>

      <div className="px-3 pb-3">
        {product.stock === 0 ? (
          <button className="w-full bg-red-500 text-sm font-semibold py-2 rounded-md cursor-not-allowed">
            Out of Stock
          </button>
        ) : (
          <button
            className="w-full bg-sky-700 text-sm font-semibold py-2 rounded-md hover:bg-sky-600 cursor-pointer"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
