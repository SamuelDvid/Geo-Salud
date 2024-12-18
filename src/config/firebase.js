// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNCn-4MObW3_d24oguKPjlGITQrP_Vlns",
  authDomain: "geosalud-8d7ee.firebaseapp.com",
  databaseURL: "https://geosalud-8d7ee-default-rtdb.firebaseio.com",
  projectId: "geosalud-8d7ee",
  storageBucket: "geosalud-8d7ee.firebasestorage.app",
  messagingSenderId: "889245141086",
  appId: "1:889245141086:web:d58f142f73d8e7cbad8ccf",
  measurementId: "G-TM0D2H909X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Referencia para Firestore y autenticación
export const db = getFirestore(app);
export const auth = getAuth(app);

// Referencia para la base de datos en tiempo real
const database = getDatabase(app);
export { database };
