"use client";

import { useSearchParams } from "next/navigation";

export default function Success() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Cliente";

  return (
    <section className="p-3 bg-linear-to-b from-sky-600/50 via-transparent place-content-center h-screen">
      <h1 className="text-xl tracking-wider mb-3 font-semibold text-center">
        Your purchase has been confirmed!{" "}
        <span>{decodeURIComponent(name)}</span>
      </h1>

      <div className="flex justify-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer bg-sky-700/60 px-5 py-1 rounded-md"
        >
          Continue with the purchase
        </button>
      </div>
    </section>
  );
}
