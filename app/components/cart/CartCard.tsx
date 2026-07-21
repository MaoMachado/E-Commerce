import { SquareArrowDown, SquareArrowUp } from "reicon-react";
import { CartItem } from "../../data/products";

interface CartCardProps {
  item: CartItem;
  handleCheckoutAvailable: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
}

export default function CartCard({
  item,
  handleCheckoutAvailable,
  removeFromCart,
}: CartCardProps) {
  return (
    <main
      key={item.id}
      className="lg:w-70 border-2 border-sky-800/70 rounded-lg overflow-hidden bg-blue-800/50"
    >
      <figure className="relative">
        <img src={item.image} alt={item.name} />
        <figcaption className="absolute bottom-1 right-1 bg-gray-500/50 px-2 py-1 rounded-md">
          <h2 className="font-bold tracking-wider">{item.name}</h2>
        </figcaption>
      </figure>

      <article className="flex justify-between p-3">
        <h3>Quantity: {item.quantity}</h3>
        <p>Price: ${item.price}</p>
      </article>

      <article className="flex justify-center gap-3 mb-3">
        <button
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => handleCheckoutAvailable(item)}
        >
          <SquareArrowUp size={32} weight="Filled" />
        </button>
        <button
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => removeFromCart(item)}
        >
          <SquareArrowDown size={32} weight="Filled" />
        </button>
      </article>

      <article className="border-t-2 border-gray-500/80 py-3 font-semibold tracking-wider text-center">
        Subtotal: ${item.price * item.quantity}
      </article>
    </main>
  );
}
