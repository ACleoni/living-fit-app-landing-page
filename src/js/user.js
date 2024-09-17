import {
  auth,
  firestore
} from './firebase';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "@firebase/auth";

import { 
  doc, 
  getDoc 
} from "@firebase/firestore";

import {
  getCheckoutSession,
  getPortalSession,
} from './checkout'

import {
  hideOverlay,
  showOverlay,
  setErrorMessage
} from './functions';

import { firebaseErrors } from './constants';

export function createUser(event) {
  event.preventDefault()
  const form = document.getElementById('signup-form');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const {
    email,
    password
  } = data

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showOverlay()
      // Signed up 
      const user = userCredential.user;
      if (user !== null) {
        return getCheckoutSession();
      }
    })
    .then((session) => {
      hideOverlay();
      window.location.assign(session.url);
    })
    .catch((error) => {
      hideOverlay()
      switch (error.code) {
        case firebaseErrors.EMAIL_ALREADY_EXISTS:
          setErrorMessage("This email is already in use. Please try again.");
          break;
        case firebaseErrors.WEAK_PASSWORD:
          setErrorMessage("Password must be at least 6 characters.");
          break;
        default:
          setErrorMessage("An unknown error has occured. Please try again later.")
      }
    });
}

export function getUser(event) {
  event.preventDefault();
  const form = document.getElementById('signin-form');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries())

  const {
    email,
    password
  } = data

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showOverlay()
      const user = userCredential.user;
      if (user !== null) {
        const docRef = doc(firestore, "users", user.uid);
        return getDoc(docRef);
      }
    })
    .then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        const customer = data.stripeId;
        return getPortalSession(customer);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .then((session) => {
      hideOverlay();
      window.location.assign(session.url);
    })
    .catch((error) => {
      hideOverlay()
      switch (error.code) {
        case firebaseErrors.USER_NOT_FOUND:
          setErrorMessage("User not found with this email. Please try again.");
          break;
        case firebaseErrors.WRONG_PASSWORD:
          setErrorMessage("Password is incorrect. Please try again.");
          break;
        default:
          setErrorMessage("An unknown error has occured. Please try again later.")
      }
    });
}


