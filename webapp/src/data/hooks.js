import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { showAlert } from "../utils";

export async function getInventoryItems() {
  try {
    const querySnapshot = await getDocs(collection(db, "InventoryItems"));
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    return [];
  }
}

export async function addInventoryItem(newItem) {
  try {
    Object.keys(newItem).forEach((key) => {
      if (!newItem[key]) {
        delete newItem[key];
      }
    });
    await addDoc(collection(db, "InventoryItems"), newItem);
    showAlert(`Successfully added ${newItem.name || "new item"}.`);
  } catch (error) {
    console.error("Something went wrong while adding a new item: ", error);
    showAlert("Something went wrong while adding new item.", "error");
  }
}
