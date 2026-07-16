"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { getTotalCart, validationStock } from "../utils/cart";
import { useState } from "react";
import { CartItem } from "../data/products";
import { useProducts } from "../context/ProductContext";

export default function Cart() {
  const { products } = useProducts();
  const { items, totalItems, addToCart, removeFromCart } = useCart();
  const [stockErrors, setStockErrors] = useState<string[]>([]);
  const router = useRouter();

  const totalPrice = getTotalCart(items);

  function handleCheckoutAvailable(item: CartItem) {
    const { isValid, errors } = validationStock([item], products);

    if (!isValid) {
      setStockErrors(errors);
      return;
    }

    addToCart(item);
  }

  return (
    <main className="container mx-auto py-3">
      <header className="mb-3 flex justify-between lg:justify-center gap-x-10 items-center bg-[#2c3e50] px-2 py-1 rounded-sm">
        <button
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer text-xl"
        >
          ⬅️
        </button>
        <h1 className="text-lg tracking-wider">My Online Store</h1>
        <div className="text-xl">
          🛒{" "}
          <span className="bg-sky-700 text-lg px-1.5 py-0.5 rounded-md">
            {totalItems}
          </span>
        </div>
      </header>

      <section className="flex flex-col lg:flex-row gap-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 mx-auto py-3">
            <p className="text-xl tracking-wider font-semibold">
              Your cart is empty.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-sky-600/30 px-2 py-0.5 rounded-sm cursor-pointer tracking-wider hover:bg-sky-600/50"
            >
              Go Back Shopping
            </button>
          </div>
        ) : (
          <article className="flex-3 flex flex-wrap justify-between lg:justify-center gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="lg:w-xs border border-[#ddd]/20 rounded-lg p-3 text-center bg-gray-900"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg mb-3"
                />

                <div>
                  <h3 className="lg:text-lg tracking-wider">{item.name}</h3>
                  <p className="flex justify-center gap-3 py-3">
                    Quantity:{" "}
                    <span className="bg-sky-600/60 px-1 font-bold rounded-full">
                      {item.quantity}
                    </span>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleCheckoutAvailable(item)}
                    >
                      👍
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => removeFromCart({ id: item.id })}
                    >
                      👎
                    </button>
                  </p>
                  <p>Price: $ {item.price}</p>
                  <p className="mt-3 border-t-2 pt-3 text-lg font-semibold tracking-wider">
                    Subtotal: $ {item.price * item.quantity}
                  </p>

                  {stockErrors.length > 0 && (
                    <span className="absolute bottom-5 left-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      <strong>No podemos proceder tu pedido:</strong>
                      <ul className="list-disc ml-5 mt-2">
                        {stockErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </article>
        )}

        <article>
          {items.length === 0 ? (
            <p className="text-center text-2xl">😔</p>
          ) : (
            <aside className="bg-gray-900 pb-3 rounded-lg lg:w-md ml-auto">
              <h2 className="mb-3 border-b-2 border-dashed border-gray-500/50 py-3 text-center text-xl tracking-wider font-semibold">
                Your Cart
              </h2>
              <div className="text-right">
                <p className="text-lg tracking-wider p-3">
                  Total:{" "}
                  <span className="font-bold bg-sky-600 rounded-sm p-1">
                    ${totalPrice}
                  </span>
                </p>
                <div className="px-3 pb-3">
                  <button
                    onClick={() => router.push("/checkout")}
                    className="bg-sky-600/50 rounded-md w-full border-0 py-1 cursor-pointer font-semibold tracking-wider hover:-translate-y-0.5 transition-transform duration-100"
                  >
                    Proceed to payment  
                  </button>
                </div>
              </div>
            </aside>
          )}
        </article>
      </section>
    </main>
  );
}
