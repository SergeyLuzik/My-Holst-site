import { getMainWidth } from "./index.js";
if (getMainWidth() <= 1250) {
  const burgerButton = document.querySelector(".page-header__burger-button"),
    headerHeigth = document.querySelector(".page-header").offsetHeight;

  console.log("headerHeigth " + headerHeigth);

  burgerButton.onclick = () => {
    burgerButton.classList.toggle("page-header__burger-button_open");

    if (getMainWidth() <= 680) {
      const headerMenu = document.querySelector(".page-header__menu");
      headerMenu.style.top = `${headerHeigth}px`;
      headerMenu.classList.toggle("page-header__menu_open");

      headerMenu.querySelectorAll("a").forEach((link) => {
        link.onclick = () => {
          headerMenu.classList.remove("page-header__menu_open");
          burgerButton.classList.remove("page-header__burger-button_open");
        };
      });
      // todo убирать обработчики при закрытии меню?
    } else {
      const headerNav = document.querySelector(".page-header__nav");
      headerNav.style.top = `${headerHeigth}px`;
      headerNav.classList.toggle("page-header__nav_open");

      headerNav.querySelectorAll("a").forEach((link) => {
        link.onclick = () => {
          headerNav.classList.remove("page-header__nav_open");
          burgerButton.classList.remove("page-header__burger-button_open");
        };
      });
    }
  };
}
