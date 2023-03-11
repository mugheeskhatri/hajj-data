// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBeukaKtQHDPilXiyp31ozsRUGXLmlyg8E",
//   authDomain: "hajj-data-b0236.firebaseapp.com",
//   projectId: "hajj-data-b0236",
//   storageBucket: "hajj-data-b0236.appspot.com",
//   messagingSenderId: "657558672874",
//   appId: "1:657558672874:web:abc8727d84ed6209684e93",
// };

// const app = initializeApp(firebaseConfig);
// const firestoredb = getFirestore(app);
// const realtimedb = getDatabase(app);
// export { app, firestoredb, auth, realtimedb };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBeukaKtQHDPilXiyp31ozsRUGXLmlyg8E",
  authDomain: "hajj-data-b0236.firebaseapp.com",
  projectId: "hajj-data-b0236",
  storageBucket: "hajj-data-b0236.appspot.com",
  messagingSenderId: "657558672874",
  appId: "1:657558672874:web:abc8727d84ed6209684e93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const fireStoreDB = getFirestore(app);
export const auth = getAuth(app);
export const realtimedb = getDatabase(app);
