import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'x',
  authDomain: "x",
  projectId: 'x',
  storageBucket: "x",
  messagingSenderId: 'x',
  appId: "x",
}

export const firebaseInitialize = () => {
  console.log("🔥 initializing firebase");
  initializeApp(firebaseConfig)
};
export const auth = getAuth();
export const database = getFirestore();
