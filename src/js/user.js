import { auth } from './firebase.config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getCheckoutSession  } from './stripe'

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
      // Signed up 
      const user = userCredential.user;
      if (user !== null) {
        return getCheckoutSession();
      }
    })
    .then((result) => {
      console.log(result);
      window.location.assign(result?.session?.url);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
  });
}