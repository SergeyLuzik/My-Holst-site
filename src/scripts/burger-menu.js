import { getMainWidth } from "./index.js";
if (getMainWidth() <= 1250) {
  /* document.onclick = (e) => {
    console.log(e.target);
  };*/
  const burgerButton = document.querySelector(".page-header__burger-button");
  function menuHandler(menuSelector) {
    // const menu = document.querySelector(`.${menuSelector}`);
    // menu.style.top = `${document.querySelector(".page-header").offsetHeight}px`;
    // menu.classList.toggle(`${menuSelector}_open`); // todo отдельная функция close?

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

    /* menu.querySelectorAll("a").forEach((link) => {
      link.onclick = (e) => {
        e.preventDefault();
        document.documentElement.classList.remove("stop-scroll");
        menu.classList.toggle(`${menuSelector}_open`);
        burgerButton.classList.toggle("page-header__burger-button_open");
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      };
    });*/
  }

  burgerButton.onclick = (e) => {
    e.stopPropagation(); // todo такое себе решение
    burgerButton.classList.toggle("page-header__burger-button_open");
    document.documentElement.classList.toggle("stop-scroll");
    const menu =
      getMainWidth() <= 680
        ? document.querySelector(".page-header__menu")
        : document.querySelector(".page-header__nav");

    menu.style.top = `${document.querySelector(".page-header").offsetHeight}px`;
    // console.log("menu.className " + menu.className);
    //console.log(`Название класса с open ${menu.className}_open`);
    // menu.classList.toggle(menu.className + "_open");
    menu.classList.toggle(`${menu.classList[0]}_open`);

    document.addEventListener(
      "click",
      (e) => {
        burgerButton.classList.toggle("page-header__burger-button_open");
        document.documentElement.classList.toggle("stop-scroll");
        menu.classList.toggle(`${menu.classList[0]}_open`);
        console.log(e.target.className);
        /*if (e.target === "a") {
        console.log("target: " + e.target);
      }*/
        if (toString(e.target.className) === "page-header__nav-link") {
          /*document
            .querySelector(e.target)
            .scrollIntoView({ behavior: "smooth" });*/
          console.log("target: " + e.target);
        }
      },
      { once: true }
    );

    /*if (getMainWidth() <= 680) {
      menuHandler("page-header__menu");
      // todo убирать обработчики при закрытии меню?
      /*  document.addEventListener("click", (e) => {
        if (e.target.closest(".page-header__menu")) {
          const menu = document.querySelector(".page-header__menu");
          menu.classList.toggle("page-header__menu_open");
        }
      });*/
    /*} else {
      menuHandler("page-header__nav");
    }*/
  };
}
