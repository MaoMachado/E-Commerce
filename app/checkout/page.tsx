"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getCartSummary, getTotalCart, validationStock } from "../utils/cart";
import { useCart } from "../context/CartContext";
import { saveOrder } from "../lib/firebase/orders";
import { useProducts } from "../context/ProductContext";

type Inputs = {
  nameComplete: string;
  lastNameComplete: string;
  email: string;
  confirmEmail: string;
  address: string;
  numberPhone: number;
};

export default function Checkout() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [stockErrors, setStockErrors] = useState<string[]>([]);
  const { items, clearCart } = useCart();
  const { products } = useProducts();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { isValid, errors } = validationStock(items, products);

    if (!isValid) {
      setStockErrors(errors);
      return;
    }

    setLoading(true);

    if (data.email !== data.confirmEmail) {
      setMessage("The emails do not match.");
      setLoading(false);
      return;
    }

    try {
      const orderId = await saveOrder({
        customerName: data.nameComplete,
        items: items.map(({ id, name, price, quantity }) => ({
          id,
          name,
          price,
          quantity,
        })),
        total: totalPrice,
        createdAt: new Date().toISOString(),
      });

      setTimeout(() => {
        clearCart();
        const encodeName = encodeURIComponent(data.nameComplete);
        router.push(`/success?orderId=${orderId}&name=${encodeName}`);
      }, 2000);
    } catch (err) {
      console.error("Error al guardar el pedido: ", err);
      setLoading(false);
      setMessage("Error processing your order. Please try again");
    }
  };

  const totalPrice = getTotalCart(items);
  const summary = getCartSummary(items);

  return (
    <main className="p-3">
      <header className="flex items-center gap-3 bg-gray-900 px-3 py-1 mb-3">
        <Link href="/">⬅️</Link>
        <h1 className="text-xl tracking-wider">Summary</h1>
      </header>

      <article className="flex flex-col lg:flex-row gap-3 lg:justify-center lg:items-start">
        <section className="flex flex-col gap-3 bg-sky-600/20 lg:w-2/5 mb-3 p-3 rounded-sm hover:bg-sky-600/50">
          <h2 className="text-xl tracking-wider text-center">
            Your Cart Resumen
          </h2>

          <p className="text-lg leading-relaxed">{summary}</p>

          <aside className="border-t-2 border-dashed mt-3 pt-3">
            <p className="text-right text-lg font-semibold tracking-wider">
              Total:{" "}
              <span className="bg-sky-600/60 px-1.5 py-0.5  rounded-sm">
                ${totalPrice.toFixed(2)}
              </span>
            </p>
          </aside>
        </section>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 border-sky-800/30 p-3 rounded-sm w-sm"
        >
          <h2 className="text-xl tracking-wider mb-3 text-center font-semibold">
            Shipping Information
          </h2>

          <div className="flex flex-col mb-3">
            <label
              htmlFor="firstNameComplete"
              className="ml-2 mb-1 tracking-wider font-bold"
            >
              First Name
            </label>
            <input
              {...register("nameComplete", { required: true })}
              className="bg-gray-900 rounded-sm px-2 py-1"
            />
            {errors.nameComplete && (
              <p className="text-center font-semibold text-red-700">
                Place enter your name
              </p>
            )}
          </div>

          {/* <div className="flex flex-col mb-3">
            <label
              htmlFor="lastNameComplete"
              className="ml-2 mb-1 tracking-wider font-bold"
            >
              Last Name
            </label>
            <input
              {...register("lastNameComplete", { required: true })}
              className="bg-gray-900 rounded-sm px-2 py-1"
            />
            {errors.lastNameComplete && (
              <p className="text-center font-semibold text-red-700">
                Place enter your last name
              </p>
            )}
          </div>

          <div className="flex flex-col mb-3">
            <label
              htmlFor="email"
              className="ml-2 mb-1 tracking-wider font-bold"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              className="bg-gray-900 rounded-sm px-2 py-1"
            />
            {errors.email && (
              <p className="text-center font-semibold text-red-700">
                Please enter your email
              </p>
            )}
          </div>

          <div className="flex flex-col mb-3">
            <label
              htmlFor="confirmEmail"
              className="ml-2 mb-1 tracking-wider font-bold"
            >
              Confirm Email
            </label>
            <input
              {...register("confirmEmail", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              className="bg-gray-900 rounded-sm px-2 py-1"
            />
            {errors.confirmEmail && (
              <p className="text-center font-semibold text-red-700">
                Please enter your confirm email
              </p>
            )}
          </div>

          {message && (
            <p className="text-center font-semibold text-red-700">{message}</p>
          )}

          <div className="flex flex-col mb-3">
            <label
              htmlFor="address"
              className="ml-2 mb-1 tracking-wider font-bold"
            >
              Address
            </label>
            <input
              {...register("address", {
                required: true,
              })}
              className="bg-gray-900 rounded-sm px-2 py-1"
            />
            {errors.address && (
              <p className="text-center font-semibold text-red-700">
                Please enter your address
              </p>
            )}
          </div>

          <div className="flex flex-col mb-3">
            <label
              htmlFor="numberPhone"
              className="ml-2 mb-1 tracking-wider font-bold"
            >
              Number Phone
            </label>
            <input
              {...register("numberPhone", {
                required: true,
              })}
              className="bg-gray-900 rounded-sm px-2 py-1"
            />
            {errors.numberPhone && (
              <p className="text-center font-semibold text-red-700">
                Please enter your number phone
              </p>
            )}
          </div> */}

          <input
            type="submit"
            value={loading ? "Confirming..." : "Confirm order"}
            disabled={loading}
            className="bg-cyan-700 py-0.5 rounded-sm mt-3 cursor-pointer w-full tracking-wider font-bold"
          />
        </form>
      </article>

      {stockErrors.length > 0 && (
        <span className="absolute bottom-5 right-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>We cannot process your order</strong>
          <ul className="list-disc ml-5 mt-2">
            {stockErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </span>
      )}
    </main>
  );
}
