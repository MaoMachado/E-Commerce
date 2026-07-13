import { CartItem } from "../data/products";

export function getTotalCart(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartSummary(items: CartItem[]): string {
  return items.map((item) => `✔️ ${item.name} x ${item.quantity}`).join(", ");
}
