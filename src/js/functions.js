
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { initializeFirebase } from './firebase';

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

function fetchFirebaseConfig() {
  fetch('/env')
  .then((response) => response.json())
  .then((env) => env);
}

function init() {
  initializeSwiper()
  fetchFirebaseConfig()
  .then((config) => {
    console.log("App config: ", config)
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: config.FIREBASE_API_KEY,
      authDomain: config.FIREBASE_AUTH_DOMAIN,
      databaseURL: config.FIREBASE_DATABASE_URL,
      projectId: config.FIREBASE_PROJECT_ID,
      storageBucket: config.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
      appId: config.FIREBASE_APP_ID
    };
    
    initializeFirebase(firebaseConfig)
  })
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