window.onload = () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("preloader_hide");
  preloader.addEventListener("transitionend", () => {
    document.documentElement.classList.remove("stop-scroll");
    preloader.remove();
    // Инициализация анимаций
    const animationElements = document.querySelectorAll(".animate"); // todo? поменять на byclassname :not scrolled чтобы коллекция обновлялась сама?

    animateElements(animationElements);

    let lineStertCoords, lineEndCoords;
    //todo? передать их из drawTrack в заранее обьявленные пустые переменные
    drawStepsTrack();

    let lastScrollPosition = 0;
    let throttledAnimateElements = throttle(animateElements, 200);
    window.addEventListener("scroll", () => {
      const currentScrollPosition = window.scrollY;
      //console.log(currentScrollPosition);
      if (currentScrollPosition > lastScrollPosition) {
        throttledAnimateElements(animationElements);
        console.log(window.scrollY);
      }

      lastScrollPosition = currentScrollPosition;
    });
  });
};

function animateElements(elements) {
  elements.forEach((element) => {
    if (element.classList.contains("scrolled-in")) {
      return;
    }
    const elementPosition = element.getBoundingClientRect().top;
    const targetPosition = document.documentElement.clientHeight * 0.8;
    if (elementPosition < targetPosition) {
      element.classList.add("scrolled-in");
      if (element.classList.contains("promo__statistics")) {
        element
          .querySelectorAll(".promo__statistics-description")
          .forEach((el) => {
            animNumber(el, 2500);
          });
      }
      if (element.classList.contains("line-start")) {
        console.log("first child");
        const start =
          element.getBoundingClientRect().x +
          element.getBoundingClientRect().height / 2;
        const end =
          document
            .querySelector(".steps__item:last-child> .marker")
            .getBoundingClientRect().top +
          window.scrollY +
          document
            .querySelector(".steps__item:last-child> .marker")
            .getBoundingClientRect().height /
            2;
        window.addEventListener("scroll", () => {
          animateStepsTrack(start, end);
        });
      }
    }
  });
}
function animNumber(numObj, duration) {
  //const startTime = performance.now(),
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

/*
svg в html должен появляться только на разрешении где он нужен (добавлять тег с классом через js, класс и стиль для секции оставить в разметке?)
  создать объект svg 
  отрисовать линию (начальная точка --> циклы из кривых)
  при скролле анимировать ее
  добавить треугольник

на меньших разрешениях там просто стрелочки после каждого блока одинаковые (как их при скроле анимировать?)


*/

function drawStepsTrack() {
  const stepsSection = document.querySelector(".steps");
  const initialX = stepsSection.getBoundingClientRect().x;
  const initialY = stepsSection.getBoundingClientRect().y + window.scrollY;
  const controlPointOffsetY = 533;
  const markers = document.querySelectorAll(".marker");
  const markersCenterCoords = [];

  markers.forEach((marker) => {
    const markerRect = marker.getBoundingClientRect();
    let centerCoords = {};

    centerCoords.x = markerRect.x - initialX + markerRect.width / 2;
    centerCoords.y = markerRect.y - initialY + markerRect.height / 2;

    markersCenterCoords.push(centerCoords);
  });

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
  const pathLength = Math.round(path.getTotalLength());
  path.setAttribute("stroke-dasharray", pathLength);
  path.setAttribute("stroke-dashoffset", pathLength);
  svg.appendChild(path);

  stepsSection.appendChild(svg);
}

function animateStepsTrack(startPoint, endPoint) {
  const trackPath = document.querySelector(".steps__track > path");
  const pathLenght = Math.ceil(trackPath.getTotalLength());
  const lineHeight = endPoint - startPoint;
  const lineScrollProgres =
    (window.scrollY - startPoint) /
    (lineHeight - document.documentElement.clientHeight);
  const scrollMultiplier = 1 - lineScrollProgres;
  trackPath.setAttribute("stroke-dashoffset", pathLenght * scrollMultiplier);
}
