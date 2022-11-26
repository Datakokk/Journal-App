// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration Production
// const firebaseConfig = {
//   apiKey: "AIzaSyB5UEXOv_ZNJnFJVFjcmc2hOwp4Fliz0rY",
//   authDomain: "react-course-426aa.firebaseapp.com",
//   projectId: "react-course-426aa",
//   storageBucket: "react-course-426aa.appspot.com",
//   messagingSenderId: "153803977311",
//   appId: "1:153803977311:web:47cdc2d9a56ec8500961ea"
// };
  const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID,
    VITE_MEASUREMENTID,
  } = getEnvironments();
  
// Testing Development
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
  measurementId: VITE_MEASUREMENTID,
};

// Initialize Firebase
export const FirebaseApp  = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );

