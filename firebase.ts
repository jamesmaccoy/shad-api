// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiKSHQTuEWpL1jb55KTgVggNzvK0sjRRM",
  authDomain: "brand-bd195.firebaseapp.com",
  projectId: "brand-bd195",
  storageBucket: "brand-bd195.appspot.com",
  messagingSenderId: "648671813712",
  appId: "1:648671813712:web:80a2e0d3135d4f72bfb155",
  measurementId: "G-M77HJK33EM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

