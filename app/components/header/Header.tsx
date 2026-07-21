"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { CartShop } from "reicon-react";

export default function Header() {
  const { totalItems } = useCart();
  const router = useRouter();

  return (
    <header className="container mx-auto py-3">
      <div className="flex items-center justify-evenly">
        <h1 className="text-center text-2xl font-bold tracking-wider">
          E-Commerce
        </h1>
        <button
          onClick={() => router.push("/cart")}
          className="cursor-pointer bg-sky-800/50 px-2 py-1 rounded-md"
        >
          <span className="font-bold text-xl flex items-center gap-3">
            <CartShop size={20} weight="Filled" />
            {totalItems}
          </span>
        </button>
      </div>
    </header>
  );
}
