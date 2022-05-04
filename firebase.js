// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCadD736elpsch3cktEt7EEsuvb5Bwrm6Q",
  authDomain: "task-man-29cad.firebaseapp.com",
  projectId: "task-man-29cad",
  storageBucket: "task-man-29cad.appspot.com",
  messagingSenderId: "535557441725",
  appId: "1:535557441725:web:74c813fff704bdf7f58fd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }