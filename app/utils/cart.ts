import { CartItem, Product } from "../data/products";

export function getTotalCart(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartSummary(items: CartItem[]): string {
  return items.map((item) => `✔️ ${item.name} x ${item.quantity}`).join(", ");
}

export const validationStock = (cartItems: CartItem[], products: Product[]) => {
  const productMaps = new Map(products.map((p) => [p.id, p]));

  const errors: string[] = [];

  const isValid = cartItems.every((item) => {
    const product = productMaps.get(item.id);
    if (!product) {
      errors.push(`The Product ${item.name} is not available `);
      return false;
    }

    if (item.quantity > product.stock) {
      errors.push(
        `We only have ${product.stock} units available of ${item.name}. You have added ${item.quantity}`,
      );

      return false;
    }

    return true;
  });

  return {
    isValid,
    errors,

    itemsWithStock: cartItems.map((item) => ({
      ...item,
      availableStock: productMaps.get(item.id)?.stock || 0,
    })),
  };
};

export const validateStockOnlyCart = (
  cartItems: CartItem[],
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  cartItems.forEach((item) => {
    const product = products.find((p) => p.id === item.id);

    if (!product) {
      errors.push(`The producto ${item.name} is not available`);
    } else if (item.quantity > product.stock) {
      errors.push(
        `We only have ${product.stock} units available of ${item.name}. You have added ${item.quantity}`,
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
