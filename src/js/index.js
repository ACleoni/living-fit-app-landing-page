import { 
  createUser, 
  getUser 
} from './user';
import {
  initializeSwiper,
  scrollFunction,
  windowScroll
} from './functions'

window.createUser = createUser;
window.getUser = getUser;

window.initializeSwiper = initializeSwiper;

window.addEventListener("scroll", (ev) => {
  ev.preventDefault();
  windowScroll();
});

window.onscroll = function () {
  scrollFunction();
};

window.topFunction = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
export const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
