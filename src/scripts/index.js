/* todo прелоадер
отключать обработку события скролл?
или просто по умолчанию вешать в html класс stop-scroll?
*/



import { getMainWidth } from "./utils.js";
import { imgThumbnailsHandler } from "./img-thumbnails.js";
import { burgerMenuHandler } from "./burger-menu.js";
import { heroSliderHandler } from "./hero-slider.js";
import { feedbackSliderHandler } from "./feedback-slider.js";
import { animateElements } from "./animations.js";
import { addCurvedTrack } from "./steps-track/curved-track.js";
import { addStraightTrack } from "./steps-track/straight-track.js";
import { throttle } from "./utils.js";

imgThumbnailsHandler();

const mainWidth = getMainWidth();

if (mainWidth <= 1250) {
  burgerMenuHandler(mainWidth);
}
if (mainWidth > 1200) {
  feedbackSliderHandler();
}
if (mainWidth > 800) {
  heroSliderHandler();
}

window.onload = () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("preloader_hide"); //todo перенести после transitionend? потому что сначала запускаем анимацию а потом только добавляем событие?

  preloader.addEventListener("transitionend", () => {// todo убрать слушатель когда все установлено
    // todo тоже бы убирать когда все установлено добавить все в функцию initAnimation?

    document.documentElement.classList.remove("stop-scroll");
    preloader.remove();

    if (mainWidth <= 1300) {
      addStraightTrack();
    } else {
      addCurvedTrack();
    }

    // Инициализация анимаций
    const animationElements = document.querySelectorAll(".animate"); // todo? поменять на byclassname :not scrolled чтобы коллекция обновлялась сама?
    const targetPosition = document.documentElement.clientHeight * 0.8;

    animateElements(animationElements, targetPosition);

    let lastScrollPosition = 0;
    /*const throttledAnimateElements = throttle(animateElements, 200);*/

    const throttledAnimateElements = throttle(() => {
      // todo вынести проверку направления скролла, тут должна быть только функция
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > lastScrollPosition) {
        animateElements(
          animationElements,
          targetPosition,
          throttledAnimateElements
        );
      }
      lastScrollPosition = currentScrollPosition;
    }, 200);

    window.addEventListener("scroll", throttledAnimateElements);
  });
};