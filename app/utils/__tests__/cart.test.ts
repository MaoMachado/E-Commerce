import { describe, expect, it } from "vitest";
import { validationStock } from "../cart";
import { CartItem } from "../../data/products";
import { Product } from "@/app/data/products";

describe("validationStock", () => {
  it("debería devolver isValid: true si todos los items tienen stock suficiente", () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Producto A",
        price: 10,
        stock: 5,
        category: "test",
        image: "",
      },
      {
        id: 2,
        name: "Producto B",
        price: 20,
        stock: 3,
        category: "test",
        image: "",
      },
    ];

    const cartItems: CartItem[] = [
      {
        id: 1,
        name: "Producto A",
        price: 10,
        quantity: 2,
        category: "test",
        image: "",
      },
      {
        id: 2,
        name: "Producto B",
        price: 20,
        quantity: 1,
        category: "test",
        image: "",
      },
    ];

    const result = validationStock(cartItems, mockProducts);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("debería devolver isValid: false si un producto no existe", () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Producto A",
        price: 10,
        stock: 2,
        category: "test",
        image: "",
      },
    ];

    const cartItems: CartItem[] = [
      {
        id: 99,
        name: "Producto Inexistente",
        price: 99,
        quantity: 5,
        category: "test",
        image: "",
      },
    ];

    const result = validationStock(cartItems, mockProducts);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "The Product Producto Inexistente is not available",
    );
  });
});
