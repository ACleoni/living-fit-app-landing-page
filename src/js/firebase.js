// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from '@firebase/auth';
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
let auth;
let firestore;

function initializeFirebase(firebaseConfig) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  firestore = getFirestore(app);
}

export { initializeFirebase, auth, firestore }

