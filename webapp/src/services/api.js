import {
  collection,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { showAlert } from "../utils";
import { setCache, getCache, deleteCache } from "./cache";

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

export async function checkInItem(id, skip) {
  try {
    const itemRef = doc(db, "InventoryItems", id);
    await updateDoc(itemRef, {
      lastUsedTimestamp: Date.now(),
    });
    if (!skip) {
      showAlert("Item checked-in successfully.");
    }
  } catch (error) {
    console.error("Something went wrong while checking-in item: ", error);
    showAlert("Something went wrong while checking-in item.", "error");
  }
}

export async function editItem(update, id) {
  try {
    const itemRef = doc(db, "InventoryItems", id);
    await updateDoc(itemRef, {
      ...update,
    });
    showAlert("Item edited successfully.");
  } catch (error) {
    console.error("Something went wrong while editing item: ", error);
    showAlert("Something went wrong while editing item.", "error");
  }
}

export async function restockItem(id, quantity) {
  try {
    const itemRef = doc(db, "InventoryItems", id);
    updateDoc(itemRef, {
      quantity: quantity + 1,
    });
    await checkInItem(id, true);
    showAlert("Item restocked successfully.");
  } catch (error) {
    console.error("Something went wrong while restocking item: ", error);
    showAlert("Something went wrong while restocking item.", "error");
  }
}

export async function unstockItem(id) {
  try {
    const itemRef = doc(db, "InventoryItems", id);
    await updateDoc(itemRef, {
      quantity: 0,
    });
    showAlert("Item marked as out of stock.");
  } catch (error) {
    console.error("Something went wrong while unstocking item: ", error);
    showAlert("Something went wrong while unstocking item.", "error");
  }
}

export async function getInventoryOptions({ collectionName }) {
  try {
    let result = getCache(collectionName);
    if (!result) {
      const querySnapshot = await getDocs(collection(db, collectionName));
      result = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        value: doc.id,
      }));
      setCache(collectionName, result);
    }
    return result;
  } catch (error) {
    return [];
  }
}

export async function addInventoryOptions({ collectionName, label }) {
  try {
    const itemRef = doc(
      db,
      collectionName,
      label.toUpperCase().trim().split(" ").join(""),
    );
    await setDoc(itemRef, { label });
    deleteCache(collectionName);
    showAlert(`Successfully added ${label} in ${collectionName}.`);
  } catch (error) {
    console.error(
      `Something went wrong while adding in ${collectionName}: `,
      error,
    );
    showAlert(
      `Something went wrong while adding in ${collectionName}.`,
      "error",
    );
  }
}

export async function deleteInventoryOptions({ collectionName, id }) {
  try {
    await deleteDoc(doc(db, collectionName, id));
    showAlert("Brand deletion successful.");
  } catch (error) {
    console.error(
      `Something went wrong while deleting from ${collectionName}: `,
      error,
    );
    showAlert(
      `Something went wrong while deleting from ${collectionName}`,
      "error",
    );
  }
}
