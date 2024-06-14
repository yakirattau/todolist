import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTZo8t7aP6gO-eIRXoIrNMzR8PtjP9fc0",
  authDomain: "list-e1b5f.firebaseapp.com",
  projectId: "list-e1b5f",
  storageBucket: "list-e1b5f.appspot.com",
  messagingSenderId: "530291852269",
  appId: "1:530291852269:web:3b59058e5669ee0985dde4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);