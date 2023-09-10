import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBYFHU5jqljdUDcpW7QpvoRzNJ18Ae0P1I",
  authDomain: "gravitas2023-9c0e6.firebaseapp.com",
  projectId: "gravitas2023-9c0e6",
  storageBucket: "gravitas2023-9c0e6.appspot.com",
  messagingSenderId: "344463875972",
  appId: "1:344463875972:web:89530a247abefacf1a47d1",
  measurementId: "G-RSCH41GH8J"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);