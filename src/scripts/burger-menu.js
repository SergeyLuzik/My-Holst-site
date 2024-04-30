import { getMainWidth } from "./index.js";
if (getMainWidth() <= 1250) {
  const burgerButton = document.querySelector(".page-header__burger-button");
  function menuHandler(menuSelector) {
    const menu = document.querySelector(`.${menuSelector}`);
    menu.style.top = `${document.querySelector(".page-header").offsetHeight}px`;
    menu.classList.toggle(`${menuSelector}_open`); // todo отдельная функция close?

    menu.querySelectorAll("a").forEach((link) => {
      link.onclick = () => {
        menu.classList.toggle(`${menuSelector}_open`);
        burgerButton.classList.toggle("page-header__burger-button_open");
      };
    });
  }

  burgerButton.onclick = () => {
    burgerButton.classList.toggle("page-header__burger-button_open");

    if (getMainWidth() <= 680) {
      menuHandler("page-header__menu");
      // todo убирать обработчики при закрытии меню?
    } else {
      menuHandler("page-header__nav");
    }
  };
}
