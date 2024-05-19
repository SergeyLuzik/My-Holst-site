let stepsLineStartY, stepsLineEndY, stepsLinePathLength;
window.onload = () => {
  drawStepsTrack();
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
    const throttledAnimateElements = throttle(animateElements, 200);

    window.addEventListener("scroll", () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition > lastScrollPosition) {
        throttledAnimateElements(animationElements, targetPosition);
      }
      lastScrollPosition = currentScrollPosition;
    });
  });
};

function animateElements(elements, targetPosition) {
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
            const throttledAnimateStepsTrack = throttle(() => {
              animateStepsTrack(
                currentScrollPosition,
                stepsLineStartY,
                stepsLineEndY,
                stepsLinePathLength,
                throttledAnimateStepsTrack
              );
            }, 50);

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

function drawStepsTrack() {
  const stepsSection = document.querySelector(".steps");
  const initialX = stepsSection.getBoundingClientRect().x;
  const initialY = stepsSection.getBoundingClientRect().y; /* + window.scrollY*/
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
  stepsLineStartY = markersCenterCoords[0].y + initialY;
  stepsLineEndY = markersCenterCoords[4].y + initialY;

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
