"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalItems, addToCart, removeFromCart } = useCart();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <main className="container mx-auto p-3">
      <header className=" mb-3 flex justify-between items-center bg-[#2c3e50] px-2 py-1 rounded-sm">
        <Link href="/">⬅️</Link>
        <h1 className="text-lg tracking-wider">My Online Store</h1>
        <div className="text-xl cursor-pointer">
          🛒{" "}
          <span className="bg-sky-700 text-lg px-1.5 py-0.5 rounded-full">
            {totalItems}
          </span>
        </div>
      </header>

      <section className="flex flex-col gap-3 p-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 mx-auto py-3">
            <p>Your cart is empty.</p>
            <Link href="/" className="bg-sky-600/30 px-2 py-0.5 rounded-sm">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <article className="flex-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-[#ddd]/20 rounded-lg p-3 text-center bg-gray-900"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg mb-3"
                />

                <div>
                  <h3>{item.name}</h3>
                  <p className="flex justify-center gap-3 py-3">
                    Quantity:{" "}
                    <span className="bg-sky-600/60 px-1 font-bold rounded-full">
                      {item.quantity}
                    </span>
                    <button
                      className="cursor-pointer"
                      onClick={() => addToCart(item)}
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
                  <p>Price: {item.price}</p>
                  <p>Subtotal: {item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </article>
        )}

        <article>
          {items.length === 0 ? (
            <p>😔</p>
          ) : (
            <aside className="bg-gray-900 border border-[#ddd] rounded-lg p-5">
              <h2 className="mb-3 border-b-2 pb-3">Your Cart</h2>
              <div className="text-right">
                <p>Total: {totalPrice}</p>
                <Link
                  href="/checkout"
                  className="bg-[#3498db]/50 rounded-md w-full mt-3 border-0 py-1 px-2 cursor-pointer"
                >
                  Proceed to payment
                </Link>
              </div>
            </aside>
          )}
        </article>
      </section>
    </main>
  );
}
