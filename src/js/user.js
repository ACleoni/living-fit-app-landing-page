import { 
  auth,  
} from './firebase';

import { 
  createUserWithEmailAndPassword,
  
} from "firebase/auth";

import { 
  getCheckoutSession,   
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


