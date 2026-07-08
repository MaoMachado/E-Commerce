"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { Product } from "../components/ProductCard";

const initialState = {
  items: [] as Product[],
  totalItems: 0 as number,
};

const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item: { id: number }) => item.id === action.payload.id,
      );

      let updatedItems;

      if (existingItem) {
        updatedItems = state.items.map(
          (item: { id: number; quantity: number }) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
        );
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce(
          (acc: number, item: { quantity: number }) => acc + item.quantity,
          0,
        ),
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items
        .map((item: { id: number; quantity: number }) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item: { quantity: number }) => item.quantity > 0);

      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce(
          (acc: number, item: { quantity: number }) => acc + item.quantity,
          0,
        ),
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext(null as any);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // localStorage persistence
  useEffect(() => {
    const saveCard = localStorage.getItem("cart");
    if (saveCard) {
      const parsed = JSON.parse(saveCard);
      parsed.items.forEach((item: { id: number; quantity: number }) => {
        dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 0 } });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (product: { id: number; quantity: number }) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromCart = (product: { id: number; quantity: number }) => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
