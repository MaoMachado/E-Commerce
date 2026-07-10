import { Product, CartItem } from "../data/products";

export interface CartState {
  items: CartItem[];
  totalItems: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "CLEAR_CART" };

export const initialState: CartState = {
  items: [],
  totalItems: 0,
};

export const cartReducer = (state: CartState, action: CartAction) => {
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
