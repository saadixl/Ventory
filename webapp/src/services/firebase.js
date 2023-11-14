import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT9jz5cqMR_4_4vOJuu2Zroqv_zsRHQkk",
  authDomain: "ventoryapp.firebaseapp.com",
  projectId: "ventoryapp",
  storageBucket: "ventoryapp.appspot.com",
  messagingSenderId: "786712964385",
  appId: "1:786712964385:web:653f4883090ced1f99a260",
  measurementId: "G-3Q0C839E92",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

export { auth, db };
