import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAHYMCJ55ARb5pp3fO6FJWtWXWLdkTNt64",
  authDomain: "trusttool-3249e.firebaseapp.com",
  projectId: "trusttool-3249e",
  storageBucket: "trusttool-3249e.firebasestorage.app",
  messagingSenderId: "759372148060",
  appId: "1:759372148060:web:9c76955850db0479eee599"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp, getDocs };
