// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5UEXOv_ZNJnFJVFjcmc2hOwp4Fliz0rY",
  authDomain: "react-course-426aa.firebaseapp.com",
  projectId: "react-course-426aa",
  storageBucket: "react-course-426aa.appspot.com",
  messagingSenderId: "153803977311",
  appId: "1:153803977311:web:47cdc2d9a56ec8500961ea"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );

