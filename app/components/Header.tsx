"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="flex items-center justify-center px-3">
      <h1 className="flex-1 text-center text-2xl my-3 font-bold">E-Commerce</h1>
      <Link href="/cart">
        <span className="border-2 border-gray-700 p-1 rounded-full bg-sky-700 font-bold">
          {totalItems}
        </span>
      </Link>
    </header>
  );
}
