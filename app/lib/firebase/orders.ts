import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./config";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  customerName: string;
  items: OrderItem[];
  total: number;
}

export const saveOrder = async (orderData: Order) => {
  const orderCol = collection(db, "orders");
  const docRef = await addDoc(orderCol, {
    ...orderData,
    createAt: new Date().toISOString(),
  });
  return docRef.id;
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const docRef = doc(db, "orders", orderId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;
  return { ...snapshot.data(), id: snapshot.id } as Order & { id: string };
};
