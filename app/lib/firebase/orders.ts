import { addDoc, collection } from "firebase/firestore";
import { db } from "./config";

export const saveOrder = async (orderData: any) => {
  const orderCol = collection(db, "orders");
  const docRef = await addDoc(orderCol, {
    ...orderData,
    createAt: new Date().toISOString(),
  });
  return docRef.id;
};
