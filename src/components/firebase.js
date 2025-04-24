// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBBWO6zm-kqXW4ylrpMYq9Ji-QFb1yLPaQ",
  authDomain: "learningreact-7db48.firebaseapp.com",
  projectId: "learningreact-7db48",
  storageBucket: "learningreact-7db48.firebasestorage.app",
  messagingSenderId: "994157486197",
  appId: "1:994157486197:web:c76e198050f7b19082d83c"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;