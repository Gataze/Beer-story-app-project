import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC622R4R0z_tu7ised8PVSmOy3BzHNy-YM",
    authDomain: "fir-beer-2.firebaseapp.com",
    projectId: "fir-beer-2",
    storageBucket: "fir-beer-2.appspot.com",
    messagingSenderId: "753228656087",
    appId: "1:753228656087:web:374f46823eac97ec526f92",
    measurementId: "G-86TNM8PQY3"
  };


  const app = initializeApp(firebaseConfig);
  export const db = getFirestore();
  export const auth = getAuth(app)