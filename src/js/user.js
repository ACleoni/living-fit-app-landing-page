import { auth } from './firebase.config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getCheckoutSession  } from './stripe'
import { 
  hideOverlay, 
  showOverlay,
  setErrorMessage
} from './helpers';

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
      hideOverlay()
      window.location.assign(session.url);
    })
    .catch((error) => {

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
