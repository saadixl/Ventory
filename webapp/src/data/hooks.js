import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getInventoryItems() {
  try {
    const querySnapshot = await getDocs(collection(db, "InventoryItems"));
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    return [];
  }
}
