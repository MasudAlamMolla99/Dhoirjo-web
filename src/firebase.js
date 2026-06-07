// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByxwFWFgbakliO4YSoOE2AJS5nI6WD7C4",
  authDomain: "dhoirjo-blog.firebaseapp.com",
  projectId: "dhoirjo-blog",
  storageBucket: "dhoirjo-blog.firebasestorage.app",
  messagingSenderId: "569685180812",
  appId: "1:569685180812:web:61c1468c505ff59f4bd6a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the tools so we can use them in other files
export const db = getFirestore(app);       // The Database
export const auth = getAuth(app);          // The Login System
export const storage = getStorage(app);    // Image Storage