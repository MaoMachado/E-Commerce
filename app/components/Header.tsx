"use client";

import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="flex items-center justify-center px-3">
      <h1 className="flex-1 text-center text-2xl my-3 font-bold">E-Commerce</h1>
      <span className="bg-blue-500/60 rounded-full px-1.5">
        {totalItems}
      </span>
    </header>
  );
}
