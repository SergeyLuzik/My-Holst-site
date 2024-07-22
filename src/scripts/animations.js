import { getMainWidth } from "./utils.js";
import { throttle } from "./utils.js";
import { animateCurvedStepsTrack } from "./steps-track/curved-track.js";
import { animateStraightStepsTrack } from "./steps-track/straight-track.js";
import { stepsLine } from "./steps-track/steps-line-vars.js";
//let stepsLine.startY, stepsLine.endY, stepsLine.pathLength;

function animNumber(numObj, duration) {
  const num = parseInt(numObj.innerHTML.replace(" ", ""), 10);
  let startTime;

  const step = (timestamp) => {
    if (startTime === undefined) startTime = timestamp;
    const progress = parseFloat(
      Math.min((timestamp - startTime) / duration, 1).toFixed(2)
    );
    numObj.innerHTML =
      Math.floor(progress * num).toLocaleString("ru-RU", {
        useGrouping: true,
      }) + "+";

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

export function animateElements(elements, targetPosition, handlerFunc) {
  let elementsClassesCount = {};
  elements.forEach((element) => {
    if (element.classList.contains("scrolled-in")) {
      return;
    }
    const elementPosition = element.getBoundingClientRect().top;
    if (elementPosition < targetPosition) {
      const elementClass = element.classList[0];

      if (elementClass in elementsClassesCount) {
        setTimeout(() => {
          element.classList.add("scrolled-in");
        }, 100 * elementsClassesCount[elementClass]);
        elementsClassesCount[elementClass] += 1;
      } else {
        elementsClassesCount[elementClass] = 1;
        element.classList.add("scrolled-in");
      }

      if (element.classList.contains("promo__statistics")) {
        element
          .querySelectorAll(".promo__statistics-description")
          .forEach((el) => {
            animNumber(el, 2500);
          });
      }
      if (element.classList.contains("animate-childs")) {
        const children = element.children;
        for (let child of children) {
          if (child.classList.contains("line-start")) {
            const currentScrollPosition = window.scrollY;
            const animateArguments = [
              currentScrollPosition,
              stepsLine.startY,
              stepsLine.endY,
              stepsLine.pathLength,
            ];
            const animateFunction =
              getMainWidth() <= 1300
                ? animateStraightStepsTrack
                : animateCurvedStepsTrack;

            const throttledAnimateStepsTrack = throttle(() => {
              animateFunction(...animateArguments, throttledAnimateStepsTrack);
            }, 50);

            /*  const throttledAnimateStepsTrack = throttle(() => {
              animateCurvedStepsTrack(
                currentScrollPosition,
                stepsLine.startY,
                stepsLine.endY,
                stepsLine.pathLength,
                throttledAnimateStepsTrack
              );
            }, 50);*/

            window.addEventListener("scroll", throttledAnimateStepsTrack);
          }
          child.classList.add("scrolled-in");
        }
      }
    }
    if (
      window.scrollY >
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight * 1.2
    ) {
      elements[elements.length - 1].classList.add("scrolled-in");

      window.removeEventListener("scroll", handlerFunc);
    }
  });
}
