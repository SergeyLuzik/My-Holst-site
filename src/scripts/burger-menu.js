import { getMainWidth } from "./index.js";
if (getMainWidth() <= 1250) {
  const burgerButton = document.querySelector(".page-header__burger-button");
  function menuHandler(menuSelector) {
    menu.onclick = (e) => {
      document.documentElement.classList.remove("stop-scroll");
      menu.classList.toggle(`${menuSelector}_open`);
      burgerButton.classList.toggle("page-header__burger-button_open");
      e.preventDefault();
      const targetId = e.target.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };
  }

  burgerButton.onclick = (e) => {
    const menu =
      getMainWidth() <= 680
        ? document.querySelector(".page-header__menu")
        : document.querySelector(".page-header__nav");
    menu.style.top = `${document.querySelector(".page-header").offsetHeight}px`;
    /*e.stopPropagation(); // todo такое себе решение (при клике на кнопку вешать обработчик на document и уже в нем обрабатывать и кнопку и тап по ссылке и окну?)
    burgerButton.classList.toggle("page-header__burger-button_open"); // вынести в функцию menuToggle
    document.documentElement.classList.toggle("stop-scroll");
    menu.classList.toggle(`${menu.classList[0]}_open`);*/

    document.addEventListener(
      "click",
      (e) => {
        // todo при клике после открытия срабатывает со 2го раза
        burgerButton.classList.toggle("page-header__burger-button_open");
        document.documentElement.classList.toggle("stop-scroll");
        menu.classList.toggle(`${menu.classList[0]}_open`);

        if (e.target.closest(".page-header__nav-list")) {
          e.preventDefault();
          document
            .querySelector(e.target.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
        }
      }
      //{ once: true }
    );
  };
}
