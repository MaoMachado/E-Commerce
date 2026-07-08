import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import { CartProvider } from "./context/CartContext";

export default function Home() {
  return (
    <main>
      <CartProvider>
        <Header />
        <ProductCard />
      </CartProvider>
    </main>
  );
}
