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
  const env = getEnvironments();
  console.log(env)
// console.log(process.env )
// console.log( import.meta.env )
// Testing Development
const firebaseConfig = {
  apiKey: "AIzaSyBXfOgHTvAAAN7Tqb0H7jU3KdUKFXvOgE4",
  authDomain: "react-course-dev-47d70.firebaseapp.com",
  projectId: "react-course-dev-47d70",
  storageBucket: "react-course-dev-47d70.appspot.com",
  messagingSenderId: "782337734761",
  appId: "1:782337734761:web:19cbb76c5a69efa26a8af8",
  measurementId: "G-QE3H6NB6YE"
};


// Initialize Firebase
export const FirebaseApp  = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );

