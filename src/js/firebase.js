// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from '@firebase/auth';
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function initializeFirebase(firebaseConfig) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  module.exports.auth = auth;
  module.exports.firestore = firestore
}

export { initializeFirebase}

