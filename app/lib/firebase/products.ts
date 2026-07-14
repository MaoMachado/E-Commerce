import { collection, getDocs, query, where } from "firebase/firestore";
import { Product } from "@/app/data/products";
import { db } from "./config";

export const getProducts = async (): Promise<Product[]> => {
  const productsCol = collection(db, "products");
  const snapshot = await getDocs(productsCol);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      category: data.category,
      stock: data.stock,
      image: data.image,
    } as Product;
  });
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const q = query(collection(db, "products"), where("id", "==", id));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as Product;
};
