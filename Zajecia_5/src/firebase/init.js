// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA64_wzol1WpYorb_2KqjvTXC9Q2gDksjQ",
  authDomain: "todo-piwo-ede7e.firebaseapp.com",
  projectId: "todo-piwo-ede7e",
  storageBucket: "todo-piwo-ede7e.appspot.com",
  messagingSenderId: "23273349856",
  appId: "1:23273349856:web:fa2a55f6811dd06a482685",
  measurementId: "G-JK9QP1MN12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
//const analytics = getAnalytics(app);