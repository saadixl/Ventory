import { showAlert } from "../utils";

export const setCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getCache = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const deleteCache = (key) => {
  localStorage.removeItem(key);
};

export const clearCache = () => {
  localStorage.clear();
  showAlert("Inventory settings cache cleared.");
};
