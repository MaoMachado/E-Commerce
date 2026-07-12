"use client";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalItems, addToCart, removeFromCart } = useCart();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

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
        <div className="text-xl cursor-pointer">
          🛒{" "}
          <span className="bg-sky-700 text-lg px-1.5 py-0.5 rounded-full">
            {totalItems}
          </span>
        </div>
      </header>

      <section className="flex flex-col gap-3">
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
            <p className="text-center text-2xl">😔</p>
          ) : (
            <aside className="bg-gray-900 pb-3 rounded-lg lg:w-md ml-auto">
              <h2 className="mb-3 border-b-2 p-3 text-xl tracking-wider font-semibold">
                Your Cart
              </h2>
              <div className="text-right">
                <p className="text-lg tracking-wider p-3">
                  Total:{" "}
                  <span className="font-bold bg-sky-600 rounded-sm p-1">
                    ${totalPrice}
                  </span>
                </p>
                <button
                  onClick={() => (window.location.href = "/checkout")}
                  className="bg-[#3498db]/50 rounded-md w-full border-0 py-1 cursor-pointer"
                >
                  Proceed to payment
                </button>
              </div>
            </aside>
          )}
        </article>
      </section>
    </main>
  );
}
