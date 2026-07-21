"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer, CartState, initialState } from "./cartReducer";
import { Product } from "../data/products";

type CartContextType = CartState & {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: { id: number }) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // localStorage persistence
  useEffect(() => {
    const saveCard = localStorage.getItem("cart");
    if (saveCard) {
      const parsed = JSON.parse(saveCard);
      dispatch({ type: "RESTORE_CART", payload: parsed });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromCart = (productId: { id: number }) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
