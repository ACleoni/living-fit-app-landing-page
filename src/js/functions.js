
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { initializeFirebase } from './firebase';
import { initializeStripe } from './stripe';

let env;

// back-to-top
let mybutton = document.getElementById("back-to-top");

function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}

function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

function setErrorMessage(message) {
  document.getElementById('dangerAlert').textContent = message
  document.getElementById('dangerAlert').style.display = 'block';
  document.getElementById('dangerAlert').style.zIndex = 10000
  setTimeout(() => {
    document.getElementById('dangerAlert').style.display = 'none';
  }, 5000)
}

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      mybutton.style.display = "block";
  } else {
      mybutton.style.display = "none";
  }
}

// Sticky Navbar
function windowScroll() {
  const navbar = document.getElementById("navbar-sticky");
  if (navbar) {
      if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
          navbar.classList.add("nav-sticky");
      } else {
          navbar.classList.remove("nav-sticky");
      }
  }
}

function configureFirebase() {
  fetch('/env')
  .then((response) => response.json())
  .then((envJson) => {
      env = envJson
      const firebaseConfig = {
        apiKey: env.FIREBASE_API_KEY,
        authDomain: env.FIREBASE_AUTH_DOMAIN,
        databaseURL: env.FIREBASE_DATABASE_URL,
        projectId: env.FIREBASE_PROJECT_ID,
        storageBucket: env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
        appId: env.FIREBASE_APP_ID
      }

      initializeFirebase(firebaseConfig);
      initializeStripe(env.STRIPE_API_KEY, env.STRIPE_PRICE_ID);
  });
}

function init() {
  initializeSwiper();
  configureFirebase();
}

function initializeSwiper() {
  return new Swiper('.screen-slider', {
    modules: [Pagination],
    // slidesPerView: 5,
    centeredSlides: true,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3.5,
      },
      // 991: {
      //   slidesPerView: 3,
      // },
      1024: {
        slidesPerView: 4.2,
      },
    }
  });
}

export {
  showOverlay,
  hideOverlay,
  setErrorMessage,
  scrollFunction,
  windowScroll,
  init
}