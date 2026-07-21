"use client";

import CardSkeleton from "./components/product/CardSkeleton";
import Header from "./components/header/Header";
import ProductCard from "./components/product/ProductCard";

export default function Home() {
  return (
    <main>
      <Header />
      <ProductCard />
    </main>
  );
}
