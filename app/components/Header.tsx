"use client";

import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="flex items-center justify-center container mx-auto">
      <h1 className="flex-1 text-center text-2xl my-3 font-bold">E-Commerce</h1>
      <button onClick={() => (window.location.href = "/cart")}>
        <span className="px-2 py-1 rounded-full bg-sky-700/50 font-bold text-lg cursor-pointer">
          🛒 {totalItems}
        </span>
      </button>
    </header>
  );
}
