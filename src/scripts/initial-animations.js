import { getMainWidth } from "./index.js";
let stepsLineStartY, stepsLineEndY, stepsLinePathLength;
window.onload = () => {
  if (getMainWidth() < 1300) {
    drawStraightTrack();
  } else {
    drawCurvedTrack();
  }

  const preloader = document.querySelector(".preloader");
  preloader.classList.add("preloader_hide");
  preloader.addEventListener("transitionend", () => {
    // todo тоже бы убирать когда все установлено добавить все в функцию initAnimation?
    document.documentElement.classList.remove("stop-scroll");
    preloader.remove();

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

function animateElements(elements, targetPosition, handlerFunc) {
  let elementsClassesCount = {};
  elements.forEach((element) => {
    if (element.classList.contains("scrolled-in")) {
      return;
    }
    const elementPosition = element.getBoundingClientRect().top;
    if (elementPosition < targetPosition) {
      const elementClass = element.classList[0];

      //todo реализовать через тернарник?
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
              stepsLineStartY,
              stepsLineEndY,
              stepsLinePathLength,
            ];
            const animateFunction =
              getMainWidth() < 1300
                ? animateStraightStepsTrack
                : animateStepsTrack;

            const throttledAnimateStepsTrack = throttle(() => {
              animateFunction(...animateArguments, throttledAnimateStepsTrack);
            }, 50);

            /*  const throttledAnimateStepsTrack = throttle(() => {
              animateStepsTrack(
                currentScrollPosition,
                stepsLineStartY,
                stepsLineEndY,
                stepsLinePathLength,
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

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

function drawStraightTrack() {
  const stepsSection = document.querySelector(".steps");
  const gap = parseInt(
    window
      .getComputedStyle(stepsSection.querySelector(".steps__list"))
      .getPropertyValue("gap")
  );
  const initialX = stepsSection.getBoundingClientRect().x;
  const initialY = stepsSection.getBoundingClientRect().y; /* + window.scrollY*/
  let markersRect = [];
  const markersCoords = [];

  const firstMarkerRect = document
    .querySelector(".marker")
    .getBoundingClientRect();
  markersRect.push(firstMarkerRect);

  const linePadding = firstMarkerRect.height / 2;

  /*const firstMarkerCoords = {
    x: firstMarkerRect.x - initialX + firstMarkerRect.width / 2,
    y: firstMarkerRect.y - initialY,
  };
  firstMarkerCoords.push(markersCoords);*/

  const lastMarkerRect = document
    .querySelector(".steps__item:last-child >.marker")
    .getBoundingClientRect();
  markersRect.push(lastMarkerRect);

  /* const lastMarkerCoords = {
    x: lastMarkerRect.x - initialX + lastMarkerRect.width / 2,
    y: lastMarkerRect.y - initialY,
  };
  lastMarkerCoords.push(markersCoords);*/

  markersRect.forEach((markerRect) => {
    /*const markerRect = marker.getBoundingClientRect();
    let centerCoords = {};

    centerCoords.x = markerRect.x - initialX + markerRect.width / 2;
    centerCoords.y = markerRect.y - initialY + markerRect.height / 2;
*/
    markersCoords.push({
      x: markerRect.x - initialX + firstMarkerRect.width / 2,
      y: markerRect.y - initialY + firstMarkerRect.height / 2,
    });
  });
  stepsLineStartY = markersCoords[0].y + initialY;
  stepsLineEndY = markersCoords[markersCoords.length - 1].y + initialY;

  const NSstring = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NSstring, "svg");
  svg.setAttribute("class", "steps__track");
  const mainTrack = document.createElementNS(NSstring, "path");
  let d = `M ${markersCoords[0].x} ${markersCoords[0].y} L ${markersCoords[1].x} ${markersCoords[1].y}`;
  /* for (let i = 1; i < markersCoords.length; i++) {
    d += `C${markersCoords[i - 1].x} ${
      markersCoords[i - 1].y + controlPointOffsetY
    } ${markersCoords[i].x} ${
      markersCoords[i].y - controlPointOffsetY
    } ${markersCoords[i].x} ${markersCoords[i].y}`;
  }*/
  const stepsItems = document.querySelectorAll(".steps__item");
  let offsetArray = [0];
  const dashLenght = gap - linePadding;
  // todo округлять значения dashLenght и itemHeight в большую сторону?
  stepsItems.forEach((item, i) => {
    const itemHeight = parseInt(
      window.getComputedStyle(item).getPropertyValue("height")
    );
    if (i === 0) {
      offsetArray.push(itemHeight);
    } else {
      offsetArray.push(itemHeight + linePadding);
    }
    offsetArray.push(dashLenght);
  });
  mainTrack.setAttribute("class", "steps__main-track");
  mainTrack.setAttribute("d", d);
  mainTrack.setAttribute("fill", "none");
  stepsLinePathLength = Math.round(mainTrack.getTotalLength());
  mainTrack.setAttribute("stroke-dasharray", offsetArray.join(" "));
  // path.setAttribute("stroke-dashoffset", stepsLinePathLength);
  svg.appendChild(mainTrack);
  const trackMask = document.createElementNS(NSstring, "path");
  trackMask.setAttribute("class", "steps__track-mask");
  trackMask.setAttribute("d", d);
  trackMask.setAttribute("fill", "none");
  trackMask.setAttribute("stroke", "white");
  trackMask.setAttribute("stroke-dasharray", stepsLinePathLength);
  trackMask.setAttribute("stroke-dashoffset", 0);

  svg.appendChild(trackMask);

  /*use.setAttribute("class", "steps__track--mask");
  use.setAttribute("stroke-dasharray", stepsLinePathLength);
  use.setAttribute("stroke-dashoffset", 0);
  svg.appendChild(use);*/

  stepsSection.appendChild(svg);
}

function drawCurvedTrack() {
  const stepsSection = document.querySelector(".steps");
  const initialX = stepsSection.getBoundingClientRect().x;
  const initialY = stepsSection.getBoundingClientRect().y; /* + window.scrollY*/
  const controlPointOffsetY = 533;
  const markers = document.querySelectorAll(".marker");
  const markersCenterCoords = [];

  markers.forEach((marker) => {
    // todo передавать уже getBoundingClientRect чтобы каждый раз не вызывать
    const markerRect = marker.getBoundingClientRect();
    let centerCoords = {};

    centerCoords.x = markerRect.x - initialX + markerRect.width / 2;
    centerCoords.y = markerRect.y - initialY + markerRect.height / 2;

    markersCenterCoords.push(centerCoords); // todo пушить сразу {} без создания переменных
  });
  stepsLineStartY = markersCenterCoords[0].y + initialY;
  stepsLineEndY =
    markersCenterCoords[markersCenterCoords.length - 1].y + initialY;

  const NSstring = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NSstring, "svg");
  svg.setAttribute("class", "steps__track");
  const path = document.createElementNS(NSstring, "path");
  let d = `M ${markersCenterCoords[0].x} ${markersCenterCoords[0].y}`;
  for (let i = 1; i < markersCenterCoords.length; i++) {
    d += `C${markersCenterCoords[i - 1].x} ${
      markersCenterCoords[i - 1].y + controlPointOffsetY
    } ${markersCenterCoords[i].x} ${
      markersCenterCoords[i].y - controlPointOffsetY
    } ${markersCenterCoords[i].x} ${markersCenterCoords[i].y}`;
  }
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  stepsLinePathLength = Math.round(path.getTotalLength());
  path.setAttribute("stroke-dasharray", stepsLinePathLength);
  path.setAttribute("stroke-dashoffset", stepsLinePathLength);
  svg.appendChild(path);

  stepsSection.appendChild(svg);
}

function animateStepsTrack(
  startScrollPosition,
  startPoint,
  endPoint,
  pathLenght,
  handlerFunc
) {
  const trackPath = document.querySelector(".steps__track > path");
  const lineHeight = endPoint - startPoint;
  const lineScrollProgres = (window.scrollY - startScrollPosition) / lineHeight;
  let offset = pathLenght * (1 - lineScrollProgres);

  if (offset < 0) {
    offset = 0;
    window.removeEventListener("scroll", handlerFunc);
  }
  trackPath.setAttribute("stroke-dashoffset", offset);
}

function animateStraightStepsTrack(
  startScrollPosition,
  startPoint,
  endPoint,
  pathLenght,
  handlerFunc
) {
  const trackPath = document.querySelector(".steps__track-mask");
  const lineHeight = endPoint - startPoint;
  const lineScrollProgres = (window.scrollY - startScrollPosition) / lineHeight;
  let offset = -pathLenght * lineScrollProgres;

  if (offset < -pathLenght) {
    offset = -pathLenght;
    window.removeEventListener("scroll", handlerFunc);
  }
  trackPath.setAttribute("stroke-dashoffset", offset);
  console.log("offset " + offset);
}
