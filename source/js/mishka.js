"use strict"

// function showMe() {
//    // alert('Jopa!');
// }

//  showMe();

// function toggleMenu(evt) {
//   var menu = document.querySelector('.site-list');
//   // evt.preventDefault();
//   if (menu.classList.contains('site-list--closed')) {
//     menu.classList.remove('site-list--closed');
//   } else {
//     menu.classList.add('site-list--closed');
//   }
// }

var button = document.querySelector('.page-header__toggle');
button.addEventListener('click', function toggleMenu() {
  var menu = document.querySelector('.site-list');
  // evt.preventDefault();
  if (menu.classList.contains('site-list--closed')) {
    menu.classList.remove('site-list--closed');
    button.classList.add('page-header__toggle--opened');
  } else {
    menu.classList.add('site-list--closed');
    button.classList.remove('page-header__toggle--opened');
  }
});
