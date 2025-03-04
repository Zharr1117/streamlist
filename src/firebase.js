// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdaUIf5ztiVcazPvMsSUGxMioRlNn9mak",
  authDomain: "streamlistapp-1ad2d.firebaseapp.com",
  projectId: "streamlistapp-1ad2d",
  storageBucket: "streamlistapp-1ad2d.appspot.com",  // ✅ small fix here (should be appspot.com)
  messagingSenderId: "59609154567",
  appId: "1:59609154567:web:d38c0fb9286322484ed6a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
