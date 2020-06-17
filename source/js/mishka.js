"use strict"

var menu = document.querySelector('.site-list');
var button = document.querySelector('.page-header__toggle');
button.addEventListener('click', function toggleMenu() {
  if (menu.classList.contains('site-list--closed')) {
    menu.classList.remove('site-list--closed');
    button.classList.add('page-header__toggle--opened');
  } else {
    menu.classList.add('site-list--closed');
    button.classList.remove('page-header__toggle--opened');
  }
});

function closeMenu() {
  menu.classList.add('site-list--closed');
  button.classList.remove('page-header__toggle--hide');
  button.classList.remove('page-header__toggle--opened');

}
closeMenu()
