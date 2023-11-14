import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
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

export async function deleteInventoryItem(id) {
  try {
    await deleteDoc(doc(db, "InventoryItems", id));
    showAlert("Item deletion successful.");
  } catch (error) {
    console.error("Something went wrong while deleting item: ", error);
    showAlert("Something went wrong while deleting item.", "error");
  }
}
