"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getOrderById, Order } from "../lib/firebase/orders";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const name = searchParams.get("name");

  const [order, setOrder] = useState<(Order & { id: string }) | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async (orderId: string) => {
    try {
      setLoading(true);
      const data = await getOrderById(orderId);
      setOrder(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch order");
      console.error("Error fetching order: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder(orderId);
  }, [orderId]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <section className="p-3 bg-linear-to-b from-sky-600/50 via-transparent place-content-center h-screen">
      <div className="w-fit mx-auto bg-cyan-700/20 p-3 rounded-md flex flex-col gap-6">
        <h1 className="text-xl tracking-wider font-semibold text-center">
          Your purchase has been confirmed!{" "}
          <span className="text-sky-300">{name}</span>
        </h1>

        <article>
          {order?.items.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center text-center lg:text-left gap-3 mb-1 text-lg bg-sky-600/20 px-2 rounded-md"
            >
              <h3>{item.name}</h3> - <p>Quantity: {item.quantity}</p> -{" "}
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </article>

        <article className="border-t-2 pt-3 border-dashed border-gray-500/50">
          <p className="text-xl tracking-wider font-semibold text-right">
            Total: ${order?.total}
          </p>
        </article>

        <div className="flex justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="cursor-pointer bg-sky-700/60 py-1 rounded-md w-full"
          >
            Continue with the purchase
          </button>
        </div>
      </div>
    </section>
  );
}
