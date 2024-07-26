import { getMainWidth, scrollData, inTarget } from "./utils.js";
import { throttle } from "./utils.js";
import { animateElements } from "./animations.js";
import { addCurvedTrack } from "./steps-track/curved-track.js";
import { addStraightTrack } from "./steps-track/straight-track.js";
import { imgThumbnailsHandler } from "./img-thumbnails.js";
import { burgerMenuHandler } from "./burger-menu.js";
import { heroSliderHandler } from "./hero-slider.js";
import { feedbackSliderHandler } from "./feedback-slider.js";
import { stepsLine } from "./steps-track/steps-line-vars.js";
import { animateCurvedStepsTrack } from "./steps-track/curved-track.js";
import { animateStraightStepsTrack } from "./steps-track/straight-track.js";

const mainWidth = getMainWidth();

imgThumbnailsHandler();

window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");

  preloader.ontransitionend = () => {
    preloader.ontransitionend = null;
    document.documentElement.classList.remove("stop-scroll");
    preloader.remove();

    if (mainWidth <= 1300) {
      addStraightTrack();
    } else {
      addCurvedTrack();
    }
    if (mainWidth <= 1250) {
      burgerMenuHandler(mainWidth);
    }
    if (mainWidth > 1200) {
      feedbackSliderHandler();
    }
    if (mainWidth > 800) {
      heroSliderHandler();
    }

    /*const er = () => {
      console.log("error");
    };

    window.addEventListener("scroll", () => {
      er();
    });*/

    // Инициализация анимаций
    const animationElements = document.querySelectorAll(".animate"); // todo? поменять на byclassname :not scrolled чтобы коллекция обновлялась сама?
    const targetPosition = document.documentElement.clientHeight * 0.8;

    animateElements(animationElements, targetPosition);

    const stepsTrackAnimateFunction =
    mainWidth <= 1300
      ? animateStraightStepsTrack
      : animateCurvedStepsTrack;

    const throttledScrollAnimationHandler = throttle(() => {

      const scroll = scrollData();
      if(scroll.direction === "down"){
        throttle(animateElements(
          animationElements,
          targetPosition), 100)
      }
      if(inTarget(document.querySelector(".line-start"), targetPosition)){
        console.log("Сработал start-lite");
        stepsTrackAnimateFunction(stepsLine.startY - targetPosition, stepsLine.startY,
          stepsLine.endY,
          stepsLine.pathLength);
      }
    }, 50);
    
      window.addEventListener("scroll", throttledScrollAnimationHandler);

    //let lastScrollPosition = 0;
    /*const throttledAnimateElements = throttle(animateElements, 200);*/

    /*const throttledAnimateElements = throttle(() => {
      console.log(scrollData());
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
    }, 100);

    window.addEventListener("scroll", throttledAnimateElements);
    */
  };
  preloader.classList.add("preloader_hide"); //todo перенести после transitionend? потому что сначала запускаем анимацию а потом только добавляем событие?
});

//window.onload = ;
