  const headerHeight = `${
    document.querySelector(".page-header").offsetHeight
  }px`;
  
  document
    .querySelector(":root")
    .style.setProperty("--header-hight", `${headerHeight}`);

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

  export function burgerMenuHandler(mainWidth) {
  burgerButton.addEventListener(
    "click",
    (e) => {
      console.log("клик на кнопку в обработчике кнопки");
      const menu =
      mainWidth <= 760
          ? document.querySelector(".page-header__menu")
          : document.querySelector(".page-header__nav");
      //menu.style.top = headerHeight;
      /*e.stopPropagation(); // todo такое себе решение (при клике на кнопку вешать обработчик на document и уже в нем обрабатывать и кнопку и тап по ссылке и окну?)
    burgerButton.classList.toggle("page-header__burger-button_open"); // вынести в функцию menuToggle
    document.documentElement.classList.toggle("stop-scroll");
    menu.classList.toggle(`${menu.classList[0]}_open`);*/
      //burgerButton.onclick = null;
      document.addEventListener(
        "click",
        (e) => {
          console.log("событие click в обработчике документа");
          if (
            !e.target.closest(".page-header__burger-button") &&
            !menu.classList.contains(`${menu.classList[0]}_open`)
          ) {
            console.log("клик не на кнопку при закрытом меню");
            return;
          }
          // todo при клике после открытия срабатывает со 2го раза
          burgerButton.classList.toggle("page-header__burger-button_open");
          document.documentElement.classList.toggle("stop-scroll");
          menu.classList.toggle(`${menu.classList[0]}_open`);

          if (e.target.closest(".page-header__nav-list")) {
            console.log("клик на ссылку в меню");
            e.preventDefault();
            document
              .querySelector(e.target.getAttribute("href"))
              .scrollIntoView({ behavior: "smooth" });
          }
        }
        //{ once: true }
      );
    },
    { once: true }
  );
 }