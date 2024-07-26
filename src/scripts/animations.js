import { inTarget } from "./utils.js";
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

export function animateElements(elements, targetPosition) {
  let elementsClassesCount = {};
  elements.forEach((element) => {
    if (element.classList.contains("scrolled-in")) {
      return;
    }

    if (inTarget(element, targetPosition)) {
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
    }
  });
}
