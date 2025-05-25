import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHYMCJ55ARb5pp3fO6FJWtWXWLdkTNt64",
  authDomain: "trusttool-3249e.firebaseapp.com",
  projectId: "trusttool-3249e",
  storageBucket: "trusttool-3249e.firebasestorage.app",
  messagingSenderId: "759372148060",
  appId: "1:759372148060:web:9c76955850db0479eee599"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.getElementById("loginForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "admin.html";
    } catch (err) {
      document.getElementById("error").textContent = err.message;
    }
  });
}

export { auth, onAuthStateChanged, signOut };
