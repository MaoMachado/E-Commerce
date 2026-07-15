"use client";

import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="mt-3">
      <div className="flex items-center justify-evenly lg:justify-center gap-6 bg-sky-700/20 container mx-auto py-2 rounded-md">
        <h1 className="text-center text-2xl font-bold tracking-wider">
          E-Commerce
        </h1>
        <button
          onClick={() => (window.location.href = "/cart")}
          className="cursor-pointer bg-black/50 px-2 py-1 rounded-md"
        >
          <span className="font-bold text-xl">🛒 {totalItems}</span>
        </button>
      </div>
    </header>
  );
}
