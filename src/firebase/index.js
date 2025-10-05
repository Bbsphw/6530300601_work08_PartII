// // src/firebase/connect.js
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDV5Rqfn-LeYHe4nPEVpEOSCjuLyLy9irs",
//   authDomain: "mobile2025-ef648.firebaseapp.com",
//   projectId: "mobile2025-ef648",
//   storageBucket: "mobile2025-ef648.firebasestorage.app",
//   messagingSenderId: "247487208082",
//   appId: "1:247487208082:web:007be3f0aaf553b5e4644b",
// };

// export const app = initializeApp(firebaseConfig);
// console.log("Firebase initialized", app);

import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDV5Rqfn-LeYHe4nPEVpEOSCjuLyLy9irs",
  authDomain: "mobile2025-ef648.firebaseapp.com",
  projectId: "mobile2025-ef648",
  storageBucket: "mobile2025-ef648.firebasestorage.app",
  messagingSenderId: "247487208082",
  appId: "1:247487208082:web:007be3f0aaf553b5e4644b",
};

export const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

let _auth;
try {
  _auth = getAuth(app);
} catch {
  _auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}
export const auth = _auth;

export const db = getFirestore(app);
