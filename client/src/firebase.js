// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "homex-1f0df.firebaseapp.com",
  projectId: "homex-1f0df",
  storageBucket: "homex-1f0df.appspot.com",
  messagingSenderId: "151075484834",
  appId: "1:151075484834:web:8809055244261f5f8ed3fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);