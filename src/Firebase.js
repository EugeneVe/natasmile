import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-nGRYtK1AXFhgbjJ4ViBUIdX1ne82IG4",
  authDomain: "natysmile-7bfee.firebaseapp.com",
  projectId: "natysmile-7bfee",
  storageBucket: "natysmile-7bfee.appspot.com",
  messagingSenderId: "111347434496",
  appId: "1:111347434496:web:5c58c046c987adae00c4e5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const imageDb = getStorage(app);
export const db = getFirestore();
