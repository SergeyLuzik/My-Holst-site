"use strict";
self["webpackHotUpdatemy_holst_site"]("main",{

/***/ "./src/scripts/animations.js":
/*!***********************************!*\
  !*** ./src/scripts/animations.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateElements: () => (/* binding */ animateElements)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/scripts/utils.js");
/* harmony import */ var _steps_track_curved_track_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps-track/curved-track.js */ "./src/scripts/steps-track/curved-track.js");
/* harmony import */ var _steps_track_straight_track_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./steps-track/straight-track.js */ "./src/scripts/steps-track/straight-track.js");
/* harmony import */ var _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./steps-track/steps-line-vars.js */ "./src/scripts/steps-track/steps-line-vars.js");





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

function animateElements(elements, targetPosition, handlerFunc) {
  let elementsClassesCount = {};
  elements.forEach((element) => {
    if (element.classList.contains("scrolled-in")) {
      return;
    }
   // const elementPosition = element.getBoundingClientRect().top;
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.inTarget)(element, targetPosition)/*elementPosition <= targetPosition*/) {
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
          /*if (child.classList.contains("line-start")) {
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

            window.addEventListener("scroll", throttledAnimateStepsTrack);
          }*/
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

      //window.removeEventListener("scroll", handlerFunc);
    }
  });
}


/***/ }),

/***/ "./src/scripts/burger-menu.js":
/*!************************************!*\
  !*** ./src/scripts/burger-menu.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   burgerMenuHandler: () => (/* binding */ burgerMenuHandler)
/* harmony export */ });
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

  function burgerMenuHandler(mainWidth) {
  burgerButton.addEventListener(
    "click",
    (e) => {
      console.log("клик на кнопку в обработчике кнопки");
      const menu =
      mainWidth <= 680
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

/***/ }),

/***/ "./src/scripts/feedback-slider.js":
/*!****************************************!*\
  !*** ./src/scripts/feedback-slider.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   feedbackSliderHandler: () => (/* binding */ feedbackSliderHandler)
/* harmony export */ });
const slidesList = document.querySelector(".feedback__list"),
slides = slidesList.children,
leftButton = document.querySelector(".feedback >.slider-button_left"),
rightButton = document.querySelector(".feedback > .slider-button_right"),
transitionTime = "1s";

let inAction = false;

function movLeft(amountSlidesOnList, offset, gapValue) {
slidesList.ontransitionend = () => {
  slidesList.ontransitionend = null;
  slidesList.style.transition = "none";

  for (let i = 0; i < amountSlidesOnList; i++) {
    slidesList.append(slides[0]);
  }
  slidesList.style.transform = `translateX(${-offset}px)`;

  inAction = false;
};
slidesList.style.transition = transitionTime;
slidesList.style.transform = `translateX(${-offset * 2 - gapValue}px)`;
}
function movRight(amountSlidesOnList, offset, gapValue) {
slidesList.ontransitionend = () => {
  slidesList.ontransitionend = null;
  slidesList.style.transition = "none";

  for (let i = 0; i < amountSlidesOnList; i++) {
    slidesList.prepend(slidesList.lastElementChild);
  }
  slidesList.style.transform = `translateX(${-offset}px)`;

  inAction = false;
};

slidesList.style.transition = transitionTime;
slidesList.style.transform = `translateX(${gapValue}px)`;
}

function feedbackSliderHandler() {
//let MutObserver = new MutationObserver (() => {
 const slideWidth = slides[0].offsetWidth,
  slidesListWidth = slidesList.offsetWidth,
  gapValue =
    (slidesListWidth / 100) *
    parseFloat(getComputedStyle(slidesList).gap),
  amountSlidesOnList = Math.floor(slidesListWidth / (slideWidth + gapValue)),
  /*slideListsAmount = Math.ceil(slides.length / amountSlidesOnList),*/
  offset = 4 * slideWidth + 3 * gapValue;

  // Initialize slider start position
slidesList.style.transform = `translateX(${-offset}px)`;

  rightButton.onclick = () => { // todo повторяется от hero slider? унифицировать через отдельный модуль?
    if (inAction) return;
    inAction = true;
    movLeft(amountSlidesOnList, offset, gapValue);
  };
  leftButton.onclick = () => { // todo повторяется от hero slider? унифицировать через отдельный модуль?
    if (inAction) return;
    inAction = true;
    movRight(amountSlidesOnList, offset, gapValue);
  };
  //})

 // MutObserver.observe(document.documentElement, {attributeFilter: ["class"]});
}



/***/ }),

/***/ "./src/scripts/hero-slider.js":
/*!************************************!*\
  !*** ./src/scripts/hero-slider.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   heroSliderHandler: () => (/* binding */ heroSliderHandler)
/* harmony export */ });
const slidesWrapper = document.querySelector(".slider__slides-list"),
  activSlideWidth = parseInt(
    getComputedStyle(
      document.querySelector(".hero__slider")
    ).gridTemplateColumns.split(" ")[0],
    10
  ),
  gapValue = parseInt(getComputedStyle(slidesWrapper).gap),
  slides = slidesWrapper.children,
  slideWidth = slides[0].offsetWidth,
  initialOffset = slideWidth * 2 + gapValue - activSlideWidth,
  offset = slideWidth + gapValue,
  transitionTime = "0.3s",
  slideScale =
    "translate(-12.5%, calc(12.5% - 16px)) scale(1.25)",
  left = document.querySelector(".slider-button_left"),
  right = document.querySelector(".slider-button_right");

let inAction = false;

function movLeft(slidesWrapper, offset) {
  slidesWrapper.ontransitionend = () => {
    slidesWrapper.ontransitionend = null;
    slidesWrapper.style.transition = "none";
    slides[0].removeAttribute("style");

    slidesWrapper.append(slides[0]);
    slidesWrapper.style.transform = `translateX(${-initialOffset}px)`;

    inAction = false;
  };
  slidesWrapper.style.transition = transitionTime; //todo задавать transition через запятую всем сразу?
  slidesWrapper.style.transform = `translateX(${-offset - initialOffset}px)`;

  slides[1].style.transition = transitionTime;
  slides[1].style.opacity = 0;
  slides[1].style.transform = "translate(0)"; // scale(0.3)

  slides[2].style.transition = transitionTime;
  slides[2].style.transform = slideScale;
  slides[2].style.transitionTimingFunction = "cubic-bezier(.72,.07,.95,.7)"; //.75,0,1,.02 ease-in
}
function movRight(slidesWrapper, offset) {
  slidesWrapper.ontransitionend = () => {
    slidesWrapper.ontransitionend = null;
    slidesWrapper.style.transition = "none";
    slides[1].removeAttribute("style");

    slidesWrapper.lastElementChild.style.opacity = 0;
    slidesWrapper.prepend(slidesWrapper.lastElementChild);
    slidesWrapper.style.transform = `translateX(${-initialOffset}px)`;

    inAction = false;
  };
  slidesWrapper.style.transition = transitionTime;
  slidesWrapper.style.transform = `translateX(${offset - initialOffset}px)`;

  slides[0].style.transition = transitionTime;
  slides[0].style.opacity = 1;
  slides[0].style.transform = slideScale;
  slides[0].style.transitionTimingFunction = "ease-in";

  slides[1].style.transition = transitionTime;
  slides[1].style.transform = "translate(0) scale(1)";
  slides[1].style.transitionTimingFunction = "cubic-bezier(0,.75,.02,1)"; //0,.75,.02,1  // 0,0,.02,1 // .75,0,1,.02
}

function heroSliderHandler() {
  // Initialize slider start position
  slidesWrapper.style.transform = `translateX(${-initialOffset}px)`;
  slides[0].style.opacity = 0;
  slides[1].style.transform = slideScale;

  left.onclick = () => {
    if (inAction) return;
    inAction = true;
    movRight(slidesWrapper, offset);
  };
  right.onclick = () => {
    if (inAction) return;
    inAction = true;
    movLeft(slidesWrapper, offset);
  };
}


/***/ }),

/***/ "./src/scripts/img-thumbnails.js":
/*!***************************************!*\
  !*** ./src/scripts/img-thumbnails.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   imgThumbnailsHandler: () => (/* binding */ imgThumbnailsHandler)
/* harmony export */ });
function swapPlaceholder(picture) {
  const img = picture.querySelector("img");
  const sources = picture.querySelectorAll("source");

  img.onload = () => {
    picture.dataset.loaded = true;
    //img. removeAttribute("")
  };
  img.onerror = () => {
    picture.dataset.loaded = false;
  };
  sources.forEach((source) => {
    source.srcset = source.dataset.srcset;
    source.sizes = source.dataset.sizes;
  });
  img.srcset = img.dataset.srcset;
  img.sizes = img.dataset.sizes;
  //img.src = img.dataset.srcset.match(/, (.*) .+$/)[1]; // todo при единственном варианте выбрасывает null
  const srcsetArr = img.dataset.srcset.split(" ");
  img.src = srcsetArr[srcsetArr.length - 2];
  //console.log(srcsetArr, srcsetArr[srcsetArr.length - 2]);
}

const pictures = document.querySelectorAll("picture");

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      swapPlaceholder(entry.target);
      //console.log(entry.target);
      observer.unobserve(entry.target);
    }
  });
};

function imgThumbnailsHandler() {
  const observer = new IntersectionObserver(callback);

pictures.forEach((picture) => {
  observer.observe(picture);
});
}

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/scripts/utils.js");
/* harmony import */ var _animations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animations.js */ "./src/scripts/animations.js");
/* harmony import */ var _steps_track_curved_track_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./steps-track/curved-track.js */ "./src/scripts/steps-track/curved-track.js");
/* harmony import */ var _steps_track_straight_track_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./steps-track/straight-track.js */ "./src/scripts/steps-track/straight-track.js");
/* harmony import */ var _img_thumbnails_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img-thumbnails.js */ "./src/scripts/img-thumbnails.js");
/* harmony import */ var _burger_menu_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./burger-menu.js */ "./src/scripts/burger-menu.js");
/* harmony import */ var _hero_slider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hero-slider.js */ "./src/scripts/hero-slider.js");
/* harmony import */ var _feedback_slider_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./feedback-slider.js */ "./src/scripts/feedback-slider.js");
/* harmony import */ var _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./steps-track/steps-line-vars.js */ "./src/scripts/steps-track/steps-line-vars.js");












const mainWidth = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getMainWidth)();
(0,_img_thumbnails_js__WEBPACK_IMPORTED_MODULE_4__.imgThumbnailsHandler)();

window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");

  preloader.ontransitionend = () => {
    preloader.ontransitionend = null;
    document.documentElement.classList.remove("stop-scroll");
    preloader.remove();

    if (mainWidth <= 1300) {
      (0,_steps_track_straight_track_js__WEBPACK_IMPORTED_MODULE_3__.addStraightTrack)();
    } else {
      (0,_steps_track_curved_track_js__WEBPACK_IMPORTED_MODULE_2__.addCurvedTrack)();
    }
    if (mainWidth <= 1250) {
      (0,_burger_menu_js__WEBPACK_IMPORTED_MODULE_5__.burgerMenuHandler)(mainWidth);
    }
    if (mainWidth > 1200) {
      (0,_feedback_slider_js__WEBPACK_IMPORTED_MODULE_7__.feedbackSliderHandler)();
    }
    if (mainWidth > 800) {
      (0,_hero_slider_js__WEBPACK_IMPORTED_MODULE_6__.heroSliderHandler)();
    }
console.log(_steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine);
    /*const er = () => {
      console.log("error");
    };

    window.addEventListener("scroll", () => {
      er();
    });*/

    // Инициализация анимаций
    const animationElements = document.querySelectorAll(".animate"); // todo? поменять на byclassname :not scrolled чтобы коллекция обновлялась сама?
    const targetPosition = document.documentElement.clientHeight * 0.8;

    (0,_animations_js__WEBPACK_IMPORTED_MODULE_1__.animateElements)(animationElements, targetPosition);

    const stepsTrackAnimateFunction =
    mainWidth <= 1300
      ? _steps_track_straight_track_js__WEBPACK_IMPORTED_MODULE_3__.animateStraightStepsTrack
      : _steps_track_curved_track_js__WEBPACK_IMPORTED_MODULE_2__.animateCurvedStepsTrack;

    const throttledScrollAnimationHandler = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.throttle)(() => {
      console.log("Скролл" +window.scrollY);
      const scroll = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.scrollData)();
      if(scroll.direction === "down"){
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.throttle)((0,_animations_js__WEBPACK_IMPORTED_MODULE_1__.animateElements)(
          animationElements,
          targetPosition), 100)
      }
      if((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.inTarget)(document.querySelector(".line-start"), targetPosition)){
        console.log("Сработал start-lite");
        stepsTrackAnimateFunction(_steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.startY, _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.startY,
          _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.endY,
          _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.pathLength);
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


/***/ }),

/***/ "./src/scripts/steps-track/curved-track.js":
/*!*************************************************!*\
  !*** ./src/scripts/steps-track/curved-track.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCurvedTrack: () => (/* binding */ addCurvedTrack),
/* harmony export */   animateCurvedStepsTrack: () => (/* binding */ animateCurvedStepsTrack)
/* harmony export */ });
/* harmony import */ var _triangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangle.js */ "./src/scripts/steps-track/triangle.js");
/* harmony import */ var _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps-line-vars.js */ "./src/scripts/steps-track/steps-line-vars.js");


function addCurvedTrack() {
    const stepsSection = document.querySelector(".steps");
    const initialX = stepsSection.getBoundingClientRect().x;
    const initialY = stepsSection.getBoundingClientRect().y + window.scrollY;
    const controlPointOffsetY = 533;
    const markers = document.querySelectorAll(".marker");
    const markersCenterCoords = [];
  
    markers.forEach((marker) => {
      // todo передавать уже getBoundingClientRect чтобы каждый раз не вызывать
      const markerRect = marker.getBoundingClientRect();
      let centerCoords = {};
  
      centerCoords.x = markerRect.x - initialX + markerRect.width / 2;
      centerCoords.y =
        markerRect.y - initialY + markerRect.height / 2 + window.scrollY;
  
      markersCenterCoords.push(centerCoords); // todo пушить сразу {} без создания переменных
    });
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.startY = markersCenterCoords[0].y + initialY;
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.endY =
      markersCenterCoords[markersCenterCoords.length - 1].y + initialY;
  
    const NSstring = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NSstring, "svg");
    svg.setAttribute("class", "steps__track");
    const path = document.createElementNS(NSstring, "path");
    path.setAttribute("class", "steps__main-track");
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
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength = Math.round(path.getTotalLength());
    path.setAttribute("stroke-dasharray", _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength);
    path.setAttribute("stroke-dashoffset", _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength);
    svg.appendChild(path);
    svg.appendChild(
      (0,_triangle_js__WEBPACK_IMPORTED_MODULE_0__.addTriangle)(
        markersCenterCoords[0].x,
        markersCenterCoords[0].y,
        15 /*, svg*/
      )
    );
  
    stepsSection.appendChild(svg);
  }

  function animateCurvedStepsTrack(
    startScrollPosition,
    startPoint,
    endPoint,
    pathLenght,
    handlerFunc
  ) {
    const trackPath = document.querySelector(".steps__main-track");
    const lineHeight = endPoint - startPoint;
    const lineScrollProgres = (window.scrollY - startScrollPosition) / lineHeight;
    
    console.log("window.scrollY " + window.scrollY);
    console.log("startScrollPosition " + startScrollPosition);
    console.log("lineHeight " + lineHeight);
    console.log("lineScrollProgres " + lineScrollProgres);
    console.log("-------------------------------------");
    let offset = pathLenght * (1 - lineScrollProgres);
  
    if (offset < 0) {
      offset = 0;
      //window.removeEventListener("scroll", handlerFunc);
    }
    trackPath.setAttribute("stroke-dashoffset", offset);
    (0,_triangle_js__WEBPACK_IMPORTED_MODULE_0__.moveTriangleAlongCurve)(
      document.querySelector(".steps__track-arrow"),
      trackPath,
      pathLenght,
      offset
    );
  }

/***/ }),

/***/ "./src/scripts/steps-track/steps-line-vars.js":
/*!****************************************************!*\
  !*** ./src/scripts/steps-track/steps-line-vars.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stepsLine: () => (/* binding */ stepsLine)
/* harmony export */ });
let stepsLine = {startY: "", endY:"", pathLength:""};

/***/ }),

/***/ "./src/scripts/steps-track/straight-track.js":
/*!***************************************************!*\
  !*** ./src/scripts/steps-track/straight-track.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addStraightTrack: () => (/* binding */ addStraightTrack),
/* harmony export */   animateStraightStepsTrack: () => (/* binding */ animateStraightStepsTrack)
/* harmony export */ });
/* harmony import */ var _triangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triangle.js */ "./src/scripts/steps-track/triangle.js");
/* harmony import */ var _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./steps-line-vars.js */ "./src/scripts/steps-track/steps-line-vars.js");


function addStraightTrack() {
    const stepsSection = document.querySelector(".steps");
    const gap = parseInt(
      window
        .getComputedStyle(stepsSection.querySelector(".steps__list"))
        .getPropertyValue("gap")
    );
    const initialX = stepsSection.getBoundingClientRect().x;
    const initialY = stepsSection.getBoundingClientRect().y + window.scrollY;
    //console.log(stepsSection.getBoundingClientRect(), window.scrollY);
    let markersRect = [];
    const markersCoords = [];
  
    const firstMarkerRect = document
      .querySelector(".marker")
      .getBoundingClientRect();
    markersRect.push(firstMarkerRect);
  
    const linePadding = firstMarkerRect.height / 2 - 5; // todo отнимание 5 убирает зазор между линией и маркером (костыльно)
  
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
        x: markerRect.x - initialX + markerRect.width / 2,
        y: markerRect.y - initialY + markerRect.height / 2 + window.scrollY,
      });
    });
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.startY = markersCoords[0].y + initialY;
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.endY = markersCoords[markersCoords.length - 1].y + initialY;
    console.log(initialX, initialY, markersRect, markersCoords);
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
    _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength = Math.round(mainTrack.getTotalLength());
    mainTrack.setAttribute("stroke-dasharray", offsetArray.join(" "));
    // path.setAttribute("stroke-dashoffset", stepsLine.pathLength);
    svg.appendChild(mainTrack);
    const trackMask = document.createElementNS(NSstring, "path");
    trackMask.setAttribute("class", "steps__track-mask");
    trackMask.setAttribute("d", d);
    trackMask.setAttribute("fill", "none");
    trackMask.setAttribute("stroke-dasharray", _steps_line_vars_js__WEBPACK_IMPORTED_MODULE_1__.stepsLine.pathLength);
    trackMask.setAttribute("stroke-dashoffset", 0);
  
    svg.appendChild(trackMask);
  
    /*use.setAttribute("class", "steps__track--mask");
    use.setAttribute("stroke-dasharray", stepsLine.pathLength);
    use.setAttribute("stroke-dashoffset", 0);
    svg.appendChild(use);*/
    svg.appendChild(
      (0,_triangle_js__WEBPACK_IMPORTED_MODULE_0__.addTriangle)(markersCoords[0].x, markersCoords[0].y, 15 /*, svg*/)
    );
    const triangleMask = document.createElementNS(NSstring, "path");
    triangleMask.setAttribute("class", "steps__triangle-mask");
    triangleMask.setAttribute("d", d);
    triangleMask.setAttribute("fill", "none");
    triangleMask.setAttribute(
      "stroke-width",
      "20px"
    ); /* 20px для перекрытия треугольника в 15px */
    triangleMask.setAttribute("stroke-dasharray", offsetArray.slice(1).join(" "));
    triangleMask.setAttribute("stroke-dashoffset", 0);
    svg.appendChild(triangleMask);
  
    stepsSection.appendChild(svg);
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
      //window.removeEventListener("scroll", handlerFunc);
    }
    trackPath.setAttribute("stroke-dashoffset", offset);
    (0,_triangle_js__WEBPACK_IMPORTED_MODULE_0__.moveTriangleAlongStraight)(
      document.querySelector(".steps__track-arrow"),
      trackPath,
      offset,
      document.querySelector(".steps__main-track")
    );
  }

/***/ }),

/***/ "./src/scripts/steps-track/triangle.js":
/*!*********************************************!*\
  !*** ./src/scripts/steps-track/triangle.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTriangle: () => (/* binding */ addTriangle),
/* harmony export */   moveTriangleAlongCurve: () => (/* binding */ moveTriangleAlongCurve),
/* harmony export */   moveTriangleAlongStraight: () => (/* binding */ moveTriangleAlongStraight)
/* harmony export */ });
function addTriangle(initialX, initialY, sideLenght /*, parentNode*/) {
    const triangle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    triangle.setAttribute("class", "steps__track-arrow"); //zoom-in show  animate show-faster
    //(Math.sqrt(3) / 2) = 0,866
    triangle.setAttribute("style", "opacity: 0;");
    triangle.setAttribute(
      "points",
      `${initialX - sideLenght / 2},${initialY} ${initialX},${
        initialY + (Math.sqrt(3) / 2) * sideLenght
      } ${initialX + sideLenght / 2},${initialY}`
    );
    //  parentNode.appendChild(triangle);
    return triangle;
  }
  
  function moveTriangleAlongCurve(triangle, path, totalPathLenght, offset) {
    const currentLenght = totalPathLenght - offset;
    const initialPoint = path.getPointAtLength(0);
    const currentPoint = path.getPointAtLength(currentLenght);
    const triangleHeightPoints = triangle
      .getAttribute("points")
      .match(/\S+,(\S+)\s.\S+,(\S+)/);
    const futurePoint = path.getPointAtLength(
      currentLenght + (triangleHeightPoints[2] - triangleHeightPoints[1])
    );
    const angle =
      (Math.atan2(
        futurePoint.y - currentPoint.y,
        futurePoint.x - currentPoint.x
      ) -
        Math.atan2(0, currentPoint.x + 1)) *
        (180 / Math.PI) -
      90;
  
    triangle.setAttribute(
      "transform",
      `translate(${currentPoint.x - initialPoint.x}, ${
        currentPoint.y - initialPoint.y
      }) rotate(${angle} ${initialPoint.x} ${initialPoint.y})`
    );
    triangle.setAttribute("style", "opacity: 1;");
  }
  
  function moveTriangleAlongStraight(triangle, maskTrack, offset, mainTrack) {
    const currentLenght = -offset;
    const initialPoint = maskTrack.getPointAtLength(0);
    const currentPoint = maskTrack.getPointAtLength(currentLenght);
    //const dashesArray = mainTrack.getAttribute("stroke-dasharray").split(" ");
    /* console.log(currentLenght);
    let sum = 0;
    let i = 0;
    while (sum < currentLenght) {
      i++;
      sum += Number(dashesArray[i]);
      console.log(i, sum);
    }
    if (i % 2 === 0) {
      triangle.setAttribute(
        "transform",
        `translate(${currentPoint.x - initialPoint.x}, ${
          currentPoint.y - initialPoint.y
        })`
      );
    }*/
    triangle.setAttribute(
      "transform",
      `translate(${currentPoint.x - initialPoint.x}, ${
        currentPoint.y - initialPoint.y
      })`
    );
    triangle.setAttribute("style", "opacity: 1;");
  }

/***/ }),

/***/ "./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMainWidth: () => (/* binding */ getMainWidth),
/* harmony export */   inTarget: () => (/* binding */ inTarget),
/* harmony export */   scrollData: () => (/* binding */ scrollData),
/* harmony export */   throttle: () => (/* binding */ throttle)
/* harmony export */ });
let lastScrollPosition = 0;

function scrollData() {
  let result = { position: window.scrollY, direction: "" };
  result.direction = result.position > lastScrollPosition ? "down" : "up";
  lastScrollPosition = result.position;
  return result;
}

function inTarget(element, target) {
  const elementPosition = element.getBoundingClientRect().top;
  if (elementPosition <= target) {
    return true;
  } else {
    return false;
  }
}

function getMainWidth() {
  return document.querySelector(".page-main").offsetWidth;
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


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ba329fb8b41e6f9b5aad")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4yYzE2ZTRlNGM0ZDJmNjljMTg0My5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW9EO0FBQ2Q7QUFDa0M7QUFDSTtBQUNmO0FBQzdEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBUTtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGFBQWE7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGFBQWE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxvQkFBb0I7QUFDM0Q7QUFDQTtBQUNBOztBQUVBLEVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0Isc0VBQXNFO0FBQ3RFO0FBQ0EsNkJBQTZCLGtCQUFrQixRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGtCQUFrQjtB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7Ozs7Ozs7OztVQ2hEQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9hbmltYXRpb25zLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9idXJnZXItbWVudS5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvZmVlZGJhY2stc2xpZGVyLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9oZXJvLXNsaWRlci5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvaW1nLXRodW1ibmFpbHMuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9zdGVwcy10cmFjay9jdXJ2ZWQtdHJhY2suanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3N0ZXBzLXRyYWNrL3N0ZXBzLWxpbmUtdmFycy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3N0ZXBzLXRyYWNrL3RyaWFuZ2xlLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRNYWluV2lkdGgsIGluVGFyZ2V0IH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmltcG9ydCB7IHN0ZXBzTGluZSB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0ZXBzLWxpbmUtdmFycy5qc1wiO1xuLy9sZXQgc3RlcHNMaW5lLnN0YXJ0WSwgc3RlcHNMaW5lLmVuZFksIHN0ZXBzTGluZS5wYXRoTGVuZ3RoO1xuXG5cbmZ1bmN0aW9uIGFuaW1OdW1iZXIobnVtT2JqLCBkdXJhdGlvbikge1xuICBjb25zdCBudW0gPSBwYXJzZUludChudW1PYmouaW5uZXJIVE1MLnJlcGxhY2UoXCIgXCIsIFwiXCIpLCAxMCk7XG4gIGxldCBzdGFydFRpbWU7XG5cbiAgY29uc3Qgc3RlcCA9ICh0aW1lc3RhbXApID0+IHtcbiAgICBpZiAoc3RhcnRUaW1lID09PSB1bmRlZmluZWQpIHN0YXJ0VGltZSA9IHRpbWVzdGFtcDtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHBhcnNlRmxvYXQoXG4gICAgICBNYXRoLm1pbigodGltZXN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uLCAxKS50b0ZpeGVkKDIpXG4gICAgKTtcbiAgICBudW1PYmouaW5uZXJIVE1MID1cbiAgICAgIE1hdGguZmxvb3IocHJvZ3Jlc3MgKiBudW0pLnRvTG9jYWxlU3RyaW5nKFwicnUtUlVcIiwge1xuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgIH0pICsgXCIrXCI7XG5cbiAgICBpZiAocHJvZ3Jlc3MgPCAxKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVFbGVtZW50cyhlbGVtZW50cywgdGFyZ2V0UG9zaXRpb24sIGhhbmRsZXJGdW5jKSB7XG4gIGxldCBlbGVtZW50c0NsYXNzZXNDb3VudCA9IHt9O1xuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2Nyb2xsZWQtaW5cIikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAvLyBjb25zdCBlbGVtZW50UG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICBpZiAoaW5UYXJnZXQoZWxlbWVudCwgdGFyZ2V0UG9zaXRpb24pLyplbGVtZW50UG9zaXRpb24gPD0gdGFyZ2V0UG9zaXRpb24qLykge1xuICAgICAgY29uc3QgZWxlbWVudENsYXNzID0gZWxlbWVudC5jbGFzc0xpc3RbMF07XG5cbiAgICAgIGlmIChlbGVtZW50Q2xhc3MgaW4gZWxlbWVudHNDbGFzc2VzQ291bnQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG4gICAgICAgIH0sIDEwMCAqIGVsZW1lbnRzQ2xhc3Nlc0NvdW50W2VsZW1lbnRDbGFzc10pO1xuICAgICAgICBlbGVtZW50c0NsYXNzZXNDb3VudFtlbGVtZW50Q2xhc3NdICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50c0NsYXNzZXNDb3VudFtlbGVtZW50Q2xhc3NdID0gMTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInByb21vX19zdGF0aXN0aWNzXCIpKSB7XG4gICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5wcm9tb19fc3RhdGlzdGljcy1kZXNjcmlwdGlvblwiKVxuICAgICAgICAgIC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgYW5pbU51bWJlcihlbCwgMjUwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltYXRlLWNoaWxkc1wiKSkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGVsZW1lbnQuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgLyppZiAoY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGluZS1zdGFydFwiKSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgICAgICBjb25zdCBhbmltYXRlQXJndW1lbnRzID0gW1xuICAgICAgICAgICAgICBjdXJyZW50U2Nyb2xsUG9zaXRpb24sXG4gICAgICAgICAgICAgIHN0ZXBzTGluZS5zdGFydFksXG4gICAgICAgICAgICAgIHN0ZXBzTGluZS5lbmRZLFxuICAgICAgICAgICAgICBzdGVwc0xpbmUucGF0aExlbmd0aCxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBjb25zdCBhbmltYXRlRnVuY3Rpb24gPVxuICAgICAgICAgICAgICBnZXRNYWluV2lkdGgoKSA8PSAxMzAwXG4gICAgICAgICAgICAgICAgPyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrXG4gICAgICAgICAgICAgICAgOiBhbmltYXRlQ3VydmVkU3RlcHNUcmFjaztcblxuICAgICAgICAgICAgY29uc3QgdGhyb3R0bGVkQW5pbWF0ZVN0ZXBzVHJhY2sgPSB0aHJvdHRsZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGFuaW1hdGVGdW5jdGlvbiguLi5hbmltYXRlQXJndW1lbnRzLCB0aHJvdHRsZWRBbmltYXRlU3RlcHNUcmFjayk7XG4gICAgICAgICAgICB9LCA1MCk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRocm90dGxlZEFuaW1hdGVTdGVwc1RyYWNrKTtcbiAgICAgICAgICB9Ki9cbiAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgd2luZG93LnNjcm9sbFkgPlxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKiAxLjJcbiAgICApIHtcbiAgICAgIGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoXCJzY3JvbGxlZC1pblwiKTtcblxuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICB9KTtcbn1cbiIsIiAgY29uc3QgaGVhZGVySGVpZ2h0ID0gYCR7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWhlYWRlclwiKS5vZmZzZXRIZWlnaHRcbiAgfXB4YDtcbiAgXG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKVxuICAgIC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taGVhZGVyLWhpZ2h0XCIsIGAke2hlYWRlckhlaWdodH1gKTtcblxuICBjb25zdCBidXJnZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19idXJnZXItYnV0dG9uXCIpO1xuICBmdW5jdGlvbiBtZW51SGFuZGxlcihtZW51U2VsZWN0b3IpIHtcbiAgICBtZW51Lm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzdG9wLXNjcm9sbFwiKTtcbiAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShgJHttZW51U2VsZWN0b3J9X29wZW5gKTtcbiAgICAgIGJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwicGFnZS1oZWFkZXJfX2J1cmdlci1idXR0b25fb3BlblwiKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHRhcmdldElkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKTtcbiAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGJ1cmdlck1lbnVIYW5kbGVyKG1haW5XaWR0aCkge1xuICBidXJnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKGUpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwi0LrQu9C40Log0L3QsCDQutC90L7Qv9C60YMg0LIg0L7QsdGA0LDQsdC+0YLRh9C40LrQtSDQutC90L7Qv9C60LhcIik7XG4gICAgICBjb25zdCBtZW51ID1cbiAgICAgIG1haW5XaWR0aCA8PSA2ODBcbiAgICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX21lbnVcIilcbiAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX25hdlwiKTtcbiAgICAgIC8vbWVudS5zdHlsZS50b3AgPSBoZWFkZXJIZWlnaHQ7XG4gICAgICAvKmUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIHRvZG8g0YLQsNC60L7QtSDRgdC10LHQtSDRgNC10YjQtdC90LjQtSAo0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0LLQtdGI0LDRgtGMINC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAgZG9jdW1lbnQg0Lgg0YPQttC1INCyINC90LXQvCDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0Lgg0LrQvdC+0L/QutGDINC4INGC0LDQvyDQv9C+INGB0YHRi9C70LrQtSDQuCDQvtC60L3Rgz8pXG4gICAgYnVyZ2VyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJwYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvbl9vcGVuXCIpOyAvLyDQstGL0L3QtdGB0YLQuCDQsiDRhNGD0L3QutGG0LjRjiBtZW51VG9nZ2xlXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJzdG9wLXNjcm9sbFwiKTtcbiAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoYCR7bWVudS5jbGFzc0xpc3RbMF19X29wZW5gKTsqL1xuICAgICAgLy9idXJnZXJCdXR0b24ub25jbGljayA9IG51bGw7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCLRgdC+0LHRi9GC0LjQtSBjbGljayDQsiDQvtCx0YDQsNCx0L7RgtGH0LjQutC1INC00L7QutGD0LzQtdC90YLQsFwiKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhZS50YXJnZXQuY2xvc2VzdChcIi5wYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvblwiKSAmJlxuICAgICAgICAgICAgIW1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKGAke21lbnUuY2xhc3NMaXN0WzBdfV9vcGVuYClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0LrQu9C40Log0L3QtSDQvdCwINC60L3QvtC/0LrRgyDQv9GA0Lgg0LfQsNC60YDRi9GC0L7QvCDQvNC10L3RjlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gdG9kbyDQv9GA0Lgg0LrQu9C40LrQtSDQv9C+0YHQu9C1INC+0YLQutGA0YvRgtC40Y8g0YHRgNCw0LHQsNGC0YvQstCw0LXRgiDRgdC+IDLQs9C+INGA0LDQt9CwXG4gICAgICAgICAgYnVyZ2VyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJwYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvbl9vcGVuXCIpO1xuICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwic3RvcC1zY3JvbGxcIik7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKGAke21lbnUuY2xhc3NMaXN0WzBdfV9vcGVuYCk7XG5cbiAgICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdChcIi5wYWdlLWhlYWRlcl9fbmF2LWxpc3RcIikpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0LrQu9C40Log0L3QsCDRgdGB0YvQu9C60YMg0LIg0LzQtdC90Y5cIik7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKVxuICAgICAgICAgICAgICAuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy97IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG4gfSIsImNvbnN0IHNsaWRlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrX19saXN0XCIpLFxuc2xpZGVzID0gc2xpZGVzTGlzdC5jaGlsZHJlbixcbmxlZnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrID4uc2xpZGVyLWJ1dHRvbl9sZWZ0XCIpLFxucmlnaHRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrID4gLnNsaWRlci1idXR0b25fcmlnaHRcIiksXG50cmFuc2l0aW9uVGltZSA9IFwiMXNcIjtcblxubGV0IGluQWN0aW9uID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG1vdkxlZnQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKSB7XG5zbGlkZXNMaXN0Lm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICBzbGlkZXNMaXN0LnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudFNsaWRlc09uTGlzdDsgaSsrKSB7XG4gICAgc2xpZGVzTGlzdC5hcHBlbmQoc2xpZGVzWzBdKTtcbiAgfVxuICBzbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldH1weClgO1xuXG4gIGluQWN0aW9uID0gZmFsc2U7XG59O1xuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG5zbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldCAqIDIgLSBnYXBWYWx1ZX1weClgO1xufVxuZnVuY3Rpb24gbW92UmlnaHQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKSB7XG5zbGlkZXNMaXN0Lm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICBzbGlkZXNMaXN0LnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudFNsaWRlc09uTGlzdDsgaSsrKSB7XG4gICAgc2xpZGVzTGlzdC5wcmVwZW5kKHNsaWRlc0xpc3QubGFzdEVsZW1lbnRDaGlsZCk7XG4gIH1cbiAgc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXR9cHgpYDtcblxuICBpbkFjdGlvbiA9IGZhbHNlO1xufTtcblxuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG5zbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7Z2FwVmFsdWV9cHgpYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZlZWRiYWNrU2xpZGVySGFuZGxlcigpIHtcbi8vbGV0IE11dE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIgKCgpID0+IHtcbiBjb25zdCBzbGlkZVdpZHRoID0gc2xpZGVzWzBdLm9mZnNldFdpZHRoLFxuICBzbGlkZXNMaXN0V2lkdGggPSBzbGlkZXNMaXN0Lm9mZnNldFdpZHRoLFxuICBnYXBWYWx1ZSA9XG4gICAgKHNsaWRlc0xpc3RXaWR0aCAvIDEwMCkgKlxuICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShzbGlkZXNMaXN0KS5nYXApLFxuICBhbW91bnRTbGlkZXNPbkxpc3QgPSBNYXRoLmZsb29yKHNsaWRlc0xpc3RXaWR0aCAvIChzbGlkZVdpZHRoICsgZ2FwVmFsdWUpKSxcbiAgLypzbGlkZUxpc3RzQW1vdW50ID0gTWF0aC5jZWlsKHNsaWRlcy5sZW5ndGggLyBhbW91bnRTbGlkZXNPbkxpc3QpLCovXG4gIG9mZnNldCA9IDQgKiBzbGlkZVdpZHRoICsgMyAqIGdhcFZhbHVlO1xuXG4gIC8vIEluaXRpYWxpemUgc2xpZGVyIHN0YXJ0IHBvc2l0aW9uXG5zbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldH1weClgO1xuXG4gIHJpZ2h0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7IC8vIHRvZG8g0L/QvtCy0YLQvtGA0Y/QtdGC0YHRjyDQvtGCIGhlcm8gc2xpZGVyPyDRg9C90LjRhNC40YbQuNGA0L7QstCw0YLRjCDRh9C10YDQtdC3INC+0YLQtNC10LvRjNC90YvQuSDQvNC+0LTRg9C70Yw/XG4gICAgaWYgKGluQWN0aW9uKSByZXR1cm47XG4gICAgaW5BY3Rpb24gPSB0cnVlO1xuICAgIG1vdkxlZnQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKTtcbiAgfTtcbiAgbGVmdEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4geyAvLyB0b2RvINC/0L7QstGC0L7RgNGP0LXRgtGB0Y8g0L7RgiBoZXJvIHNsaWRlcj8g0YPQvdC40YTQuNGG0LjRgNC+0LLQsNGC0Ywg0YfQtdGA0LXQtyDQvtGC0LTQtdC70YzQvdGL0Lkg0LzQvtC00YPQu9GMP1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZSaWdodChhbW91bnRTbGlkZXNPbkxpc3QsIG9mZnNldCwgZ2FwVmFsdWUpO1xuICB9O1xuICAvL30pXG5cbiAvLyBNdXRPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2F0dHJpYnV0ZUZpbHRlcjogW1wiY2xhc3NcIl19KTtcbn1cblxuIiwiY29uc3Qgc2xpZGVzV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyX19zbGlkZXMtbGlzdFwiKSxcbiAgYWN0aXZTbGlkZVdpZHRoID0gcGFyc2VJbnQoXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZShcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb19fc2xpZGVyXCIpXG4gICAgKS5ncmlkVGVtcGxhdGVDb2x1bW5zLnNwbGl0KFwiIFwiKVswXSxcbiAgICAxMFxuICApLFxuICBnYXBWYWx1ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoc2xpZGVzV3JhcHBlcikuZ2FwKSxcbiAgc2xpZGVzID0gc2xpZGVzV3JhcHBlci5jaGlsZHJlbixcbiAgc2xpZGVXaWR0aCA9IHNsaWRlc1swXS5vZmZzZXRXaWR0aCxcbiAgaW5pdGlhbE9mZnNldCA9IHNsaWRlV2lkdGggKiAyICsgZ2FwVmFsdWUgLSBhY3RpdlNsaWRlV2lkdGgsXG4gIG9mZnNldCA9IHNsaWRlV2lkdGggKyBnYXBWYWx1ZSxcbiAgdHJhbnNpdGlvblRpbWUgPSBcIjAuM3NcIixcbiAgc2xpZGVTY2FsZSA9XG4gICAgXCJ0cmFuc2xhdGUoLTEyLjUlLCBjYWxjKDEyLjUlIC0gMTZweCkpIHNjYWxlKDEuMjUpXCIsXG4gIGxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1idXR0b25fbGVmdFwiKSxcbiAgcmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1idXR0b25fcmlnaHRcIik7XG5cbmxldCBpbkFjdGlvbiA9IGZhbHNlO1xuXG5mdW5jdGlvbiBtb3ZMZWZ0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCkge1xuICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG4gICAgc2xpZGVzWzBdLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuXG4gICAgc2xpZGVzV3JhcHBlci5hcHBlbmQoc2xpZGVzWzBdKTtcbiAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LWluaXRpYWxPZmZzZXR9cHgpYDtcblxuICAgIGluQWN0aW9uID0gZmFsc2U7XG4gIH07XG4gIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lOyAvL3RvZG8g0LfQsNC00LDQstCw0YLRjCB0cmFuc2l0aW9uINGH0LXRgNC10Lcg0LfQsNC/0Y/RgtGD0Y4g0LLRgdC10Lwg0YHRgNCw0LfRgz9cbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXQgLSBpbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzWzFdLnN0eWxlLm9wYWNpdHkgPSAwO1xuICBzbGlkZXNbMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMClcIjsgLy8gc2NhbGUoMC4zKVxuXG4gIHNsaWRlc1syXS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gIHNsaWRlc1syXS5zdHlsZS50cmFuc2Zvcm0gPSBzbGlkZVNjYWxlO1xuICBzbGlkZXNbMl0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJjdWJpYy1iZXppZXIoLjcyLC4wNywuOTUsLjcpXCI7IC8vLjc1LDAsMSwuMDIgZWFzZS1pblxufVxuZnVuY3Rpb24gbW92UmlnaHQoc2xpZGVzV3JhcHBlciwgb2Zmc2V0KSB7XG4gIHNsaWRlc1dyYXBwZXIub250cmFuc2l0aW9uZW5kID0gKCkgPT4ge1xuICAgIHNsaWRlc1dyYXBwZXIub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcbiAgICBzbGlkZXNbMV0ucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG5cbiAgICBzbGlkZXNXcmFwcGVyLmxhc3RFbGVtZW50Q2hpbGQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgc2xpZGVzV3JhcHBlci5wcmVwZW5kKHNsaWRlc1dyYXBwZXIubGFzdEVsZW1lbnRDaGlsZCk7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1pbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgICBpbkFjdGlvbiA9IGZhbHNlO1xuICB9O1xuICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldCAtIGluaXRpYWxPZmZzZXR9cHgpYDtcblxuICBzbGlkZXNbMF0uc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuICBzbGlkZXNbMF0uc3R5bGUub3BhY2l0eSA9IDE7XG4gIHNsaWRlc1swXS5zdHlsZS50cmFuc2Zvcm0gPSBzbGlkZVNjYWxlO1xuICBzbGlkZXNbMF0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJlYXNlLWluXCI7XG5cbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDApIHNjYWxlKDEpXCI7XG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb24gPSBcImN1YmljLWJlemllcigwLC43NSwuMDIsMSlcIjsgLy8wLC43NSwuMDIsMSAgLy8gMCwwLC4wMiwxIC8vIC43NSwwLDEsLjAyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXJvU2xpZGVySGFuZGxlcigpIHtcbiAgLy8gSW5pdGlhbGl6ZSBzbGlkZXIgc3RhcnQgcG9zaXRpb25cbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1pbml0aWFsT2Zmc2V0fXB4KWA7XG4gIHNsaWRlc1swXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IHNsaWRlU2NhbGU7XG5cbiAgbGVmdC5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZSaWdodChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpO1xuICB9O1xuICByaWdodC5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZMZWZ0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCk7XG4gIH07XG59XG4iLCJmdW5jdGlvbiBzd2FwUGxhY2Vob2xkZXIocGljdHVyZSkge1xuICBjb25zdCBpbWcgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XG4gIGNvbnN0IHNvdXJjZXMgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzb3VyY2VcIik7XG5cbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBwaWN0dXJlLmRhdGFzZXQubG9hZGVkID0gdHJ1ZTtcbiAgICAvL2ltZy4gcmVtb3ZlQXR0cmlidXRlKFwiXCIpXG4gIH07XG4gIGltZy5vbmVycm9yID0gKCkgPT4ge1xuICAgIHBpY3R1cmUuZGF0YXNldC5sb2FkZWQgPSBmYWxzZTtcbiAgfTtcbiAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICBzb3VyY2Uuc3Jjc2V0ID0gc291cmNlLmRhdGFzZXQuc3Jjc2V0O1xuICAgIHNvdXJjZS5zaXplcyA9IHNvdXJjZS5kYXRhc2V0LnNpemVzO1xuICB9KTtcbiAgaW1nLnNyY3NldCA9IGltZy5kYXRhc2V0LnNyY3NldDtcbiAgaW1nLnNpemVzID0gaW1nLmRhdGFzZXQuc2l6ZXM7XG4gIC8vaW1nLnNyYyA9IGltZy5kYXRhc2V0LnNyY3NldC5tYXRjaCgvLCAoLiopIC4rJC8pWzFdOyAvLyB0b2RvINC/0YDQuCDQtdC00LjQvdGB0YLQstC10L3QvdC+0Lwg0LLQsNGA0LjQsNC90YLQtSDQstGL0LHRgNCw0YHRi9Cy0LDQtdGCIG51bGxcbiAgY29uc3Qgc3Jjc2V0QXJyID0gaW1nLmRhdGFzZXQuc3Jjc2V0LnNwbGl0KFwiIFwiKTtcbiAgaW1nLnNyYyA9IHNyY3NldEFycltzcmNzZXRBcnIubGVuZ3RoIC0gMl07XG4gIC8vY29uc29sZS5sb2coc3Jjc2V0QXJyLCBzcmNzZXRBcnJbc3Jjc2V0QXJyLmxlbmd0aCAtIDJdKTtcbn1cblxuY29uc3QgcGljdHVyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicGljdHVyZVwiKTtcblxuY29uc3QgY2FsbGJhY2sgPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgc3dhcFBsYWNlaG9sZGVyKGVudHJ5LnRhcmdldCk7XG4gICAgICAvL2NvbnNvbGUubG9nKGVudHJ5LnRhcmdldCk7XG4gICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGltZ1RodW1ibmFpbHNIYW5kbGVyKCkge1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihjYWxsYmFjayk7XG5cbnBpY3R1cmVzLmZvckVhY2goKHBpY3R1cmUpID0+IHtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShwaWN0dXJlKTtcbn0pO1xufSIsImltcG9ydCB7IGdldE1haW5XaWR0aCwgc2Nyb2xsRGF0YSwgaW5UYXJnZXQgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZUVsZW1lbnRzIH0gZnJvbSBcIi4vYW5pbWF0aW9ucy5qc1wiO1xuaW1wb3J0IHsgYWRkQ3VydmVkVHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9jdXJ2ZWQtdHJhY2suanNcIjtcbmltcG9ydCB7IGFkZFN0cmFpZ2h0VHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdHJhaWdodC10cmFjay5qc1wiO1xuaW1wb3J0IHsgaW1nVGh1bWJuYWlsc0hhbmRsZXIgfSBmcm9tIFwiLi9pbWctdGh1bWJuYWlscy5qc1wiO1xuaW1wb3J0IHsgYnVyZ2VyTWVudUhhbmRsZXIgfSBmcm9tIFwiLi9idXJnZXItbWVudS5qc1wiO1xuaW1wb3J0IHsgaGVyb1NsaWRlckhhbmRsZXIgfSBmcm9tIFwiLi9oZXJvLXNsaWRlci5qc1wiO1xuaW1wb3J0IHsgZmVlZGJhY2tTbGlkZXJIYW5kbGVyIH0gZnJvbSBcIi4vZmVlZGJhY2stc2xpZGVyLmpzXCI7XG5pbXBvcnQgeyBzdGVwc0xpbmUgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdGVwcy1saW5lLXZhcnMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmNvbnN0IG1haW5XaWR0aCA9IGdldE1haW5XaWR0aCgpO1xuaW1nVGh1bWJuYWlsc0hhbmRsZXIoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgY29uc3QgcHJlbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVsb2FkZXJcIik7XG5cbiAgcHJlbG9hZGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBwcmVsb2FkZXIub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN0b3Atc2Nyb2xsXCIpO1xuICAgIHByZWxvYWRlci5yZW1vdmUoKTtcblxuICAgIGlmIChtYWluV2lkdGggPD0gMTMwMCkge1xuICAgICAgYWRkU3RyYWlnaHRUcmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRDdXJ2ZWRUcmFjaygpO1xuICAgIH1cbiAgICBpZiAobWFpbldpZHRoIDw9IDEyNTApIHtcbiAgICAgIGJ1cmdlck1lbnVIYW5kbGVyKG1haW5XaWR0aCk7XG4gICAgfVxuICAgIGlmIChtYWluV2lkdGggPiAxMjAwKSB7XG4gICAgICBmZWVkYmFja1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG4gICAgaWYgKG1haW5XaWR0aCA+IDgwMCkge1xuICAgICAgaGVyb1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG5jb25zb2xlLmxvZyhzdGVwc0xpbmUpO1xuICAgIC8qY29uc3QgZXIgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICBlcigpO1xuICAgIH0pOyovXG5cbiAgICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQsNC90LjQvNCw0YbQuNC5XG4gICAgY29uc3QgYW5pbWF0aW9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFuaW1hdGVcIik7IC8vIHRvZG8/INC/0L7QvNC10L3Rj9GC0Ywg0L3QsCBieWNsYXNzbmFtZSA6bm90IHNjcm9sbGVkINGH0YLQvtCx0Ysg0LrQvtC70LvQtdC60YbQuNGPINC+0LHQvdC+0LLQu9GP0LvQsNGB0Ywg0YHQsNC80LA/XG4gICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICogMC44O1xuXG4gICAgYW5pbWF0ZUVsZW1lbnRzKGFuaW1hdGlvbkVsZW1lbnRzLCB0YXJnZXRQb3NpdGlvbik7XG5cbiAgICBjb25zdCBzdGVwc1RyYWNrQW5pbWF0ZUZ1bmN0aW9uID1cbiAgICBtYWluV2lkdGggPD0gMTMwMFxuICAgICAgPyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrXG4gICAgICA6IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrO1xuXG4gICAgY29uc3QgdGhyb3R0bGVkU2Nyb2xsQW5pbWF0aW9uSGFuZGxlciA9IHRocm90dGxlKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwi0KHQutGA0L7Qu9C7XCIgK3dpbmRvdy5zY3JvbGxZKTtcbiAgICAgIGNvbnN0IHNjcm9sbCA9IHNjcm9sbERhdGEoKTtcbiAgICAgIGlmKHNjcm9sbC5kaXJlY3Rpb24gPT09IFwiZG93blwiKXtcbiAgICAgICAgdGhyb3R0bGUoYW5pbWF0ZUVsZW1lbnRzKFxuICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uKSwgMTAwKVxuICAgICAgfVxuICAgICAgaWYoaW5UYXJnZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5lLXN0YXJ0XCIpLCB0YXJnZXRQb3NpdGlvbikpe1xuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsgc3RhcnQtbGl0ZVwiKTtcbiAgICAgICAgc3RlcHNUcmFja0FuaW1hdGVGdW5jdGlvbihzdGVwc0xpbmUuc3RhcnRZLCBzdGVwc0xpbmUuc3RhcnRZLFxuICAgICAgICAgIHN0ZXBzTGluZS5lbmRZLFxuICAgICAgICAgIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9LCA1MCk7XG4gICAgXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aHJvdHRsZWRTY3JvbGxBbmltYXRpb25IYW5kbGVyKTtcblxuICAgIC8vbGV0IGxhc3RTY3JvbGxQb3NpdGlvbiA9IDA7XG4gICAgLypjb25zdCB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHMgPSB0aHJvdHRsZShhbmltYXRlRWxlbWVudHMsIDIwMCk7Ki9cblxuICAgIC8qY29uc3QgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzID0gdGhyb3R0bGUoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coc2Nyb2xsRGF0YSgpKTtcbiAgICAgIC8vIHRvZG8g0LLRi9C90LXRgdGC0Lgg0L/RgNC+0LLQtdGA0LrRgyDQvdCw0L/RgNCw0LLQu9C10L3QuNGPINGB0LrRgNC+0LvQu9CwLCDRgtGD0YIg0LTQvtC70LbQvdCwINCx0YvRgtGMINGC0L7Qu9GM0LrQviDRhNGD0L3QutGG0LjRj1xuICAgICAgY29uc3QgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XG4gICAgICBpZiAoY3VycmVudFNjcm9sbFBvc2l0aW9uID4gbGFzdFNjcm9sbFBvc2l0aW9uKSB7XG4gICAgICAgIGFuaW1hdGVFbGVtZW50cyhcbiAgICAgICAgICBhbmltYXRpb25FbGVtZW50cyxcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGxhc3RTY3JvbGxQb3NpdGlvbiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbjtcbiAgICB9LCAxMDApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzKTtcbiAgICAqL1xuICB9O1xuICBwcmVsb2FkZXIuY2xhc3NMaXN0LmFkZChcInByZWxvYWRlcl9oaWRlXCIpOyAvL3RvZG8g0L/QtdGA0LXQvdC10YHRgtC4INC/0L7RgdC70LUgdHJhbnNpdGlvbmVuZD8g0L/QvtGC0L7QvNGDINGH0YLQviDRgdC90LDRh9Cw0LvQsCDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjiDQsCDQv9C+0YLQvtC8INGC0L7Qu9GM0LrQviDQtNC+0LHQsNCy0LvRj9C10Lwg0YHQvtCx0YvRgtC40LU/XG59KTtcblxuLy93aW5kb3cub25sb2FkID0gO1xuIiwiaW1wb3J0IHsgYWRkVHJpYW5nbGUsIG1vdmVUcmlhbmdsZUFsb25nQ3VydmUgfSBmcm9tIFwiLi90cmlhbmdsZS5qc1wiO1xuaW1wb3J0IHsgc3RlcHNMaW5lIH0gZnJvbSBcIi4vc3RlcHMtbGluZS12YXJzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gYWRkQ3VydmVkVHJhY2soKSB7XG4gICAgY29uc3Qgc3RlcHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc1wiKTtcbiAgICBjb25zdCBpbml0aWFsWCA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54O1xuICAgIGNvbnN0IGluaXRpYWxZID0gc3RlcHNTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgICBjb25zdCBjb250cm9sUG9pbnRPZmZzZXRZID0gNTMzO1xuICAgIGNvbnN0IG1hcmtlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1hcmtlclwiKTtcbiAgICBjb25zdCBtYXJrZXJzQ2VudGVyQ29vcmRzID0gW107XG4gIFxuICAgIG1hcmtlcnMuZm9yRWFjaCgobWFya2VyKSA9PiB7XG4gICAgICAvLyB0b2RvINC/0LXRgNC10LTQsNCy0LDRgtGMINGD0LbQtSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qg0YfRgtC+0LHRiyDQutCw0LbQtNGL0Lkg0YDQsNC3INC90LUg0LLRi9C30YvQstCw0YLRjFxuICAgICAgY29uc3QgbWFya2VyUmVjdCA9IG1hcmtlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGxldCBjZW50ZXJDb29yZHMgPSB7fTtcbiAgXG4gICAgICBjZW50ZXJDb29yZHMueCA9IG1hcmtlclJlY3QueCAtIGluaXRpYWxYICsgbWFya2VyUmVjdC53aWR0aCAvIDI7XG4gICAgICBjZW50ZXJDb29yZHMueSA9XG4gICAgICAgIG1hcmtlclJlY3QueSAtIGluaXRpYWxZICsgbWFya2VyUmVjdC5oZWlnaHQgLyAyICsgd2luZG93LnNjcm9sbFk7XG4gIFxuICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkcy5wdXNoKGNlbnRlckNvb3Jkcyk7IC8vIHRvZG8g0L/Rg9GI0LjRgtGMINGB0YDQsNC30YMge30g0LHQtdC3INGB0L7Qt9C00LDQvdC40Y8g0L/QtdGA0LXQvNC10L3QvdGL0YVcbiAgICB9KTtcbiAgICBzdGVwc0xpbmUuc3RhcnRZID0gbWFya2Vyc0NlbnRlckNvb3Jkc1swXS55ICsgaW5pdGlhbFk7XG4gICAgc3RlcHNMaW5lLmVuZFkgPVxuICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1ttYXJrZXJzQ2VudGVyQ29vcmRzLmxlbmd0aCAtIDFdLnkgKyBpbml0aWFsWTtcbiAgXG4gICAgY29uc3QgTlNzdHJpbmcgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG4gICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInN2Z1wiKTtcbiAgICBzdmcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fdHJhY2tcIik7XG4gICAgY29uc3QgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJwYXRoXCIpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fbWFpbi10cmFja1wiKTtcbiAgICBsZXQgZCA9IGBNICR7bWFya2Vyc0NlbnRlckNvb3Jkc1swXS54fSAke21hcmtlcnNDZW50ZXJDb29yZHNbMF0ueX1gO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWFya2Vyc0NlbnRlckNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZCArPSBgQyR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpIC0gMV0ueH0gJHtcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1tpIC0gMV0ueSArIGNvbnRyb2xQb2ludE9mZnNldFlcbiAgICAgIH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbaV0ueSAtIGNvbnRyb2xQb2ludE9mZnNldFlcbiAgICAgIH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnh9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS55fWA7XG4gICAgfVxuICAgIHBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBkKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJub25lXCIpO1xuICAgIHN0ZXBzTGluZS5wYXRoTGVuZ3RoID0gTWF0aC5yb3VuZChwYXRoLmdldFRvdGFsTGVuZ3RoKCkpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKHBhdGgpO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChcbiAgICAgIGFkZFRyaWFuZ2xlKFxuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzWzBdLngsXG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbMF0ueSxcbiAgICAgICAgMTUgLyosIHN2ZyovXG4gICAgICApXG4gICAgKTtcbiAgXG4gICAgc3RlcHNTZWN0aW9uLmFwcGVuZENoaWxkKHN2Zyk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYW5pbWF0ZUN1cnZlZFN0ZXBzVHJhY2soXG4gICAgc3RhcnRTY3JvbGxQb3NpdGlvbixcbiAgICBzdGFydFBvaW50LFxuICAgIGVuZFBvaW50LFxuICAgIHBhdGhMZW5naHQsXG4gICAgaGFuZGxlckZ1bmNcbiAgKSB7XG4gICAgY29uc3QgdHJhY2tQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc19fbWFpbi10cmFja1wiKTtcbiAgICBjb25zdCBsaW5lSGVpZ2h0ID0gZW5kUG9pbnQgLSBzdGFydFBvaW50O1xuICAgIGNvbnN0IGxpbmVTY3JvbGxQcm9ncmVzID0gKHdpbmRvdy5zY3JvbGxZIC0gc3RhcnRTY3JvbGxQb3NpdGlvbikgLyBsaW5lSGVpZ2h0O1xuICAgIFxuICAgIGNvbnNvbGUubG9nKFwid2luZG93LnNjcm9sbFkgXCIgKyB3aW5kb3cuc2Nyb2xsWSk7XG4gICAgY29uc29sZS5sb2coXCJzdGFydFNjcm9sbFBvc2l0aW9uIFwiICsgc3RhcnRTY3JvbGxQb3NpdGlvbik7XG4gICAgY29uc29sZS5sb2coXCJsaW5lSGVpZ2h0IFwiICsgbGluZUhlaWdodCk7XG4gICAgY29uc29sZS5sb2coXCJsaW5lU2Nyb2xsUHJvZ3JlcyBcIiArIGxpbmVTY3JvbGxQcm9ncmVzKTtcbiAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgbGV0IG9mZnNldCA9IHBhdGhMZW5naHQgKiAoMSAtIGxpbmVTY3JvbGxQcm9ncmVzKTtcbiAgXG4gICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgIG9mZnNldCA9IDA7XG4gICAgICAvL3dpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZXJGdW5jKTtcbiAgICB9XG4gICAgdHJhY2tQYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIG9mZnNldCk7XG4gICAgbW92ZVRyaWFuZ2xlQWxvbmdDdXJ2ZShcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX3RyYWNrLWFycm93XCIpLFxuICAgICAgdHJhY2tQYXRoLFxuICAgICAgcGF0aExlbmdodCxcbiAgICAgIG9mZnNldFxuICAgICk7XG4gIH0iLCJleHBvcnQgbGV0IHN0ZXBzTGluZSA9IHtzdGFydFk6IFwiXCIsIGVuZFk6XCJcIiwgcGF0aExlbmd0aDpcIlwifTsiLCJpbXBvcnQgeyBhZGRUcmlhbmdsZSwgbW92ZVRyaWFuZ2xlQWxvbmdTdHJhaWdodCB9IGZyb20gXCIuL3RyaWFuZ2xlLmpzXCI7XG5pbXBvcnQgeyBzdGVwc0xpbmUgfSBmcm9tIFwiLi9zdGVwcy1saW5lLXZhcnMuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBhZGRTdHJhaWdodFRyYWNrKCkge1xuICAgIGNvbnN0IHN0ZXBzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNcIik7XG4gICAgY29uc3QgZ2FwID0gcGFyc2VJbnQoXG4gICAgICB3aW5kb3dcbiAgICAgICAgLmdldENvbXB1dGVkU3R5bGUoc3RlcHNTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX2xpc3RcIikpXG4gICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKFwiZ2FwXCIpXG4gICAgKTtcbiAgICBjb25zdCBpbml0aWFsWCA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54O1xuICAgIGNvbnN0IGluaXRpYWxZID0gc3RlcHNTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgICAvL2NvbnNvbGUubG9nKHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgd2luZG93LnNjcm9sbFkpO1xuICAgIGxldCBtYXJrZXJzUmVjdCA9IFtdO1xuICAgIGNvbnN0IG1hcmtlcnNDb29yZHMgPSBbXTtcbiAgXG4gICAgY29uc3QgZmlyc3RNYXJrZXJSZWN0ID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm1hcmtlclwiKVxuICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIG1hcmtlcnNSZWN0LnB1c2goZmlyc3RNYXJrZXJSZWN0KTtcbiAgXG4gICAgY29uc3QgbGluZVBhZGRpbmcgPSBmaXJzdE1hcmtlclJlY3QuaGVpZ2h0IC8gMiAtIDU7IC8vIHRvZG8g0L7RgtC90LjQvNCw0L3QuNC1IDUg0YPQsdC40YDQsNC10YIg0LfQsNC30L7RgCDQvNC10LbQtNGDINC70LjQvdC40LXQuSDQuCDQvNCw0YDQutC10YDQvtC8ICjQutC+0YHRgtGL0LvRjNC90L4pXG4gIFxuICAgIC8qY29uc3QgZmlyc3RNYXJrZXJDb29yZHMgPSB7XG4gICAgICB4OiBmaXJzdE1hcmtlclJlY3QueCAtIGluaXRpYWxYICsgZmlyc3RNYXJrZXJSZWN0LndpZHRoIC8gMixcbiAgICAgIHk6IGZpcnN0TWFya2VyUmVjdC55IC0gaW5pdGlhbFksXG4gICAgfTtcbiAgICBmaXJzdE1hcmtlckNvb3Jkcy5wdXNoKG1hcmtlcnNDb29yZHMpOyovXG4gIFxuICAgIGNvbnN0IGxhc3RNYXJrZXJSZWN0ID0gZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX19pdGVtOmxhc3QtY2hpbGQgPi5tYXJrZXJcIilcbiAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBtYXJrZXJzUmVjdC5wdXNoKGxhc3RNYXJrZXJSZWN0KTtcbiAgXG4gICAgLyogY29uc3QgbGFzdE1hcmtlckNvb3JkcyA9IHtcbiAgICAgIHg6IGxhc3RNYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIGxhc3RNYXJrZXJSZWN0LndpZHRoIC8gMixcbiAgICAgIHk6IGxhc3RNYXJrZXJSZWN0LnkgLSBpbml0aWFsWSxcbiAgICB9O1xuICAgIGxhc3RNYXJrZXJDb29yZHMucHVzaChtYXJrZXJzQ29vcmRzKTsqL1xuICBcbiAgICBtYXJrZXJzUmVjdC5mb3JFYWNoKChtYXJrZXJSZWN0KSA9PiB7XG4gICAgICAvKmNvbnN0IG1hcmtlclJlY3QgPSBtYXJrZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBsZXQgY2VudGVyQ29vcmRzID0ge307XG4gIFxuICAgICAgY2VudGVyQ29vcmRzLnggPSBtYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIG1hcmtlclJlY3Qud2lkdGggLyAyO1xuICAgICAgY2VudGVyQ29vcmRzLnkgPSBtYXJrZXJSZWN0LnkgLSBpbml0aWFsWSArIG1hcmtlclJlY3QuaGVpZ2h0IC8gMjtcbiAgKi9cbiAgICAgIG1hcmtlcnNDb29yZHMucHVzaCh7XG4gICAgICAgIHg6IG1hcmtlclJlY3QueCAtIGluaXRpYWxYICsgbWFya2VyUmVjdC53aWR0aCAvIDIsXG4gICAgICAgIHk6IG1hcmtlclJlY3QueSAtIGluaXRpYWxZICsgbWFya2VyUmVjdC5oZWlnaHQgLyAyICsgd2luZG93LnNjcm9sbFksXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBzdGVwc0xpbmUuc3RhcnRZID0gbWFya2Vyc0Nvb3Jkc1swXS55ICsgaW5pdGlhbFk7XG4gICAgc3RlcHNMaW5lLmVuZFkgPSBtYXJrZXJzQ29vcmRzW21hcmtlcnNDb29yZHMubGVuZ3RoIC0gMV0ueSArIGluaXRpYWxZO1xuICAgIGNvbnNvbGUubG9nKGluaXRpYWxYLCBpbml0aWFsWSwgbWFya2Vyc1JlY3QsIG1hcmtlcnNDb29yZHMpO1xuICAgIGNvbnN0IE5Tc3RyaW5nID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJzdmdcIik7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrXCIpO1xuICAgIGNvbnN0IG1haW5UcmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJwYXRoXCIpO1xuICAgIGxldCBkID0gYE0gJHttYXJrZXJzQ29vcmRzWzBdLnh9ICR7bWFya2Vyc0Nvb3Jkc1swXS55fSBMICR7bWFya2Vyc0Nvb3Jkc1sxXS54fSAke21hcmtlcnNDb29yZHNbMV0ueX1gO1xuICAgIC8qIGZvciAobGV0IGkgPSAxOyBpIDwgbWFya2Vyc0Nvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZCArPSBgQyR7bWFya2Vyc0Nvb3Jkc1tpIC0gMV0ueH0gJHtcbiAgICAgICAgbWFya2Vyc0Nvb3Jkc1tpIC0gMV0ueSArIGNvbnRyb2xQb2ludE9mZnNldFlcbiAgICAgIH0gJHttYXJrZXJzQ29vcmRzW2ldLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDb29yZHNbaV0ueSAtIGNvbnRyb2xQb2ludE9mZnNldFlcbiAgICAgIH0gJHttYXJrZXJzQ29vcmRzW2ldLnh9ICR7bWFya2Vyc0Nvb3Jkc1tpXS55fWA7XG4gICAgfSovXG4gICAgY29uc3Qgc3RlcHNJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3RlcHNfX2l0ZW1cIik7XG4gICAgbGV0IG9mZnNldEFycmF5ID0gWzBdO1xuICAgIGNvbnN0IGRhc2hMZW5naHQgPSBnYXAgLSBsaW5lUGFkZGluZztcbiAgICAvLyB0b2RvINC+0LrRgNGD0LPQu9GP0YLRjCDQt9C90LDRh9C10L3QuNGPIGRhc2hMZW5naHQg0LggaXRlbUhlaWdodCDQsiDQsdC+0LvRjNGI0YPRjiDRgdGC0L7RgNC+0L3Rgz9cbiAgICBzdGVwc0l0ZW1zLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1IZWlnaHQgPSBwYXJzZUludChcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoaXRlbSkuZ2V0UHJvcGVydHlWYWx1ZShcImhlaWdodFwiKVxuICAgICAgKTtcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIG9mZnNldEFycmF5LnB1c2goaXRlbUhlaWdodCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZmZzZXRBcnJheS5wdXNoKGl0ZW1IZWlnaHQgKyBsaW5lUGFkZGluZyk7XG4gICAgICB9XG4gICAgICBvZmZzZXRBcnJheS5wdXNoKGRhc2hMZW5naHQpO1xuICAgIH0pO1xuICAgIG1haW5UcmFjay5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX19tYWluLXRyYWNrXCIpO1xuICAgIG1haW5UcmFjay5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuICAgIG1haW5UcmFjay5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwibm9uZVwiKTtcbiAgICBzdGVwc0xpbmUucGF0aExlbmd0aCA9IE1hdGgucm91bmQobWFpblRyYWNrLmdldFRvdGFsTGVuZ3RoKCkpO1xuICAgIG1haW5UcmFjay5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIG9mZnNldEFycmF5LmpvaW4oXCIgXCIpKTtcbiAgICAvLyBwYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQobWFpblRyYWNrKTtcbiAgICBjb25zdCB0cmFja01hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwicGF0aFwiKTtcbiAgICB0cmFja01hc2suc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fdHJhY2stbWFza1wiKTtcbiAgICB0cmFja01hc2suc2V0QXR0cmlidXRlKFwiZFwiLCBkKTtcbiAgICB0cmFja01hc2suc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHRyYWNrTWFzay5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCAwKTtcbiAgXG4gICAgc3ZnLmFwcGVuZENoaWxkKHRyYWNrTWFzayk7XG4gIFxuICAgIC8qdXNlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrLS1tYXNrXCIpO1xuICAgIHVzZS5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICB1c2Uuc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgMCk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKHVzZSk7Ki9cbiAgICBzdmcuYXBwZW5kQ2hpbGQoXG4gICAgICBhZGRUcmlhbmdsZShtYXJrZXJzQ29vcmRzWzBdLngsIG1hcmtlcnNDb29yZHNbMF0ueSwgMTUgLyosIHN2ZyovKVxuICAgICk7XG4gICAgY29uc3QgdHJpYW5nbGVNYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInBhdGhcIik7XG4gICAgdHJpYW5nbGVNYXNrLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyaWFuZ2xlLW1hc2tcIik7XG4gICAgdHJpYW5nbGVNYXNrLnNldEF0dHJpYnV0ZShcImRcIiwgZCk7XG4gICAgdHJpYW5nbGVNYXNrLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJub25lXCIpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXG4gICAgICBcInN0cm9rZS13aWR0aFwiLFxuICAgICAgXCIyMHB4XCJcbiAgICApOyAvKiAyMHB4INC00LvRjyDQv9C10YDQtdC60YDRi9GC0LjRjyDRgtGA0LXRg9Cz0L7Qu9GM0L3QuNC60LAg0LIgMTVweCAqL1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIG9mZnNldEFycmF5LnNsaWNlKDEpLmpvaW4oXCIgXCIpKTtcbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgMCk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKHRyaWFuZ2xlTWFzayk7XG4gIFxuICAgIHN0ZXBzU2VjdGlvbi5hcHBlbmRDaGlsZChzdmcpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVTdHJhaWdodFN0ZXBzVHJhY2soXG4gICAgc3RhcnRTY3JvbGxQb3NpdGlvbixcbiAgICBzdGFydFBvaW50LFxuICAgIGVuZFBvaW50LFxuICAgIHBhdGhMZW5naHQsXG4gICAgaGFuZGxlckZ1bmNcbiAgKSB7XG4gICAgY29uc3QgdHJhY2tQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc19fdHJhY2stbWFza1wiKTtcbiAgICBjb25zdCBsaW5lSGVpZ2h0ID0gZW5kUG9pbnQgLSBzdGFydFBvaW50O1xuICAgIGNvbnN0IGxpbmVTY3JvbGxQcm9ncmVzID0gKHdpbmRvdy5zY3JvbGxZIC0gc3RhcnRTY3JvbGxQb3NpdGlvbikgLyBsaW5lSGVpZ2h0O1xuICAgIGxldCBvZmZzZXQgPSAtcGF0aExlbmdodCAqIGxpbmVTY3JvbGxQcm9ncmVzO1xuICBcbiAgICBpZiAob2Zmc2V0IDwgLXBhdGhMZW5naHQpIHtcbiAgICAgIG9mZnNldCA9IC1wYXRoTGVuZ2h0O1xuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICAgIHRyYWNrUGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBvZmZzZXQpO1xuICAgIG1vdmVUcmlhbmdsZUFsb25nU3RyYWlnaHQoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX190cmFjay1hcnJvd1wiKSxcbiAgICAgIHRyYWNrUGF0aCxcbiAgICAgIG9mZnNldCxcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX21haW4tdHJhY2tcIilcbiAgICApO1xuICB9IiwiZXhwb3J0IGZ1bmN0aW9uIGFkZFRyaWFuZ2xlKGluaXRpYWxYLCBpbml0aWFsWSwgc2lkZUxlbmdodCAvKiwgcGFyZW50Tm9kZSovKSB7XG4gICAgY29uc3QgdHJpYW5nbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgICBcInBvbHlnb25cIlxuICAgICk7XG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fdHJhY2stYXJyb3dcIik7IC8vem9vbS1pbiBzaG93ICBhbmltYXRlIHNob3ctZmFzdGVyXG4gICAgLy8oTWF0aC5zcXJ0KDMpIC8gMikgPSAwLDg2NlxuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwib3BhY2l0eTogMDtcIik7XG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFxuICAgICAgXCJwb2ludHNcIixcbiAgICAgIGAke2luaXRpYWxYIC0gc2lkZUxlbmdodCAvIDJ9LCR7aW5pdGlhbFl9ICR7aW5pdGlhbFh9LCR7XG4gICAgICAgIGluaXRpYWxZICsgKE1hdGguc3FydCgzKSAvIDIpICogc2lkZUxlbmdodFxuICAgICAgfSAke2luaXRpYWxYICsgc2lkZUxlbmdodCAvIDJ9LCR7aW5pdGlhbFl9YFxuICAgICk7XG4gICAgLy8gIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodHJpYW5nbGUpO1xuICAgIHJldHVybiB0cmlhbmdsZTtcbiAgfVxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIG1vdmVUcmlhbmdsZUFsb25nQ3VydmUodHJpYW5nbGUsIHBhdGgsIHRvdGFsUGF0aExlbmdodCwgb2Zmc2V0KSB7XG4gICAgY29uc3QgY3VycmVudExlbmdodCA9IHRvdGFsUGF0aExlbmdodCAtIG9mZnNldDtcbiAgICBjb25zdCBpbml0aWFsUG9pbnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoMCk7XG4gICAgY29uc3QgY3VycmVudFBvaW50ID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKGN1cnJlbnRMZW5naHQpO1xuICAgIGNvbnN0IHRyaWFuZ2xlSGVpZ2h0UG9pbnRzID0gdHJpYW5nbGVcbiAgICAgIC5nZXRBdHRyaWJ1dGUoXCJwb2ludHNcIilcbiAgICAgIC5tYXRjaCgvXFxTKywoXFxTKylcXHMuXFxTKywoXFxTKykvKTtcbiAgICBjb25zdCBmdXR1cmVQb2ludCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aChcbiAgICAgIGN1cnJlbnRMZW5naHQgKyAodHJpYW5nbGVIZWlnaHRQb2ludHNbMl0gLSB0cmlhbmdsZUhlaWdodFBvaW50c1sxXSlcbiAgICApO1xuICAgIGNvbnN0IGFuZ2xlID1cbiAgICAgIChNYXRoLmF0YW4yKFxuICAgICAgICBmdXR1cmVQb2ludC55IC0gY3VycmVudFBvaW50LnksXG4gICAgICAgIGZ1dHVyZVBvaW50LnggLSBjdXJyZW50UG9pbnQueFxuICAgICAgKSAtXG4gICAgICAgIE1hdGguYXRhbjIoMCwgY3VycmVudFBvaW50LnggKyAxKSkgKlxuICAgICAgICAoMTgwIC8gTWF0aC5QSSkgLVxuICAgICAgOTA7XG4gIFxuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICBgdHJhbnNsYXRlKCR7Y3VycmVudFBvaW50LnggLSBpbml0aWFsUG9pbnQueH0sICR7XG4gICAgICAgIGN1cnJlbnRQb2ludC55IC0gaW5pdGlhbFBvaW50LnlcbiAgICAgIH0pIHJvdGF0ZSgke2FuZ2xlfSAke2luaXRpYWxQb2ludC54fSAke2luaXRpYWxQb2ludC55fSlgXG4gICAgKTtcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm9wYWNpdHk6IDE7XCIpO1xuICB9XG4gIFxuICBleHBvcnQgZnVuY3Rpb24gbW92ZVRyaWFuZ2xlQWxvbmdTdHJhaWdodCh0cmlhbmdsZSwgbWFza1RyYWNrLCBvZmZzZXQsIG1haW5UcmFjaykge1xuICAgIGNvbnN0IGN1cnJlbnRMZW5naHQgPSAtb2Zmc2V0O1xuICAgIGNvbnN0IGluaXRpYWxQb2ludCA9IG1hc2tUcmFjay5nZXRQb2ludEF0TGVuZ3RoKDApO1xuICAgIGNvbnN0IGN1cnJlbnRQb2ludCA9IG1hc2tUcmFjay5nZXRQb2ludEF0TGVuZ3RoKGN1cnJlbnRMZW5naHQpO1xuICAgIC8vY29uc3QgZGFzaGVzQXJyYXkgPSBtYWluVHJhY2suZ2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiKS5zcGxpdChcIiBcIik7XG4gICAgLyogY29uc29sZS5sb2coY3VycmVudExlbmdodCk7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChzdW0gPCBjdXJyZW50TGVuZ2h0KSB7XG4gICAgICBpKys7XG4gICAgICBzdW0gKz0gTnVtYmVyKGRhc2hlc0FycmF5W2ldKTtcbiAgICAgIGNvbnNvbGUubG9nKGksIHN1bSk7XG4gICAgfVxuICAgIGlmIChpICUgMiA9PT0gMCkge1xuICAgICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBgdHJhbnNsYXRlKCR7Y3VycmVudFBvaW50LnggLSBpbml0aWFsUG9pbnQueH0sICR7XG4gICAgICAgICAgY3VycmVudFBvaW50LnkgLSBpbml0aWFsUG9pbnQueVxuICAgICAgICB9KWBcbiAgICAgICk7XG4gICAgfSovXG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFxuICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgIGB0cmFuc2xhdGUoJHtjdXJyZW50UG9pbnQueCAtIGluaXRpYWxQb2ludC54fSwgJHtcbiAgICAgICAgY3VycmVudFBvaW50LnkgLSBpbml0aWFsUG9pbnQueVxuICAgICAgfSlgXG4gICAgKTtcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm9wYWNpdHk6IDE7XCIpO1xuICB9IiwibGV0IGxhc3RTY3JvbGxQb3NpdGlvbiA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxEYXRhKCkge1xuICBsZXQgcmVzdWx0ID0geyBwb3NpdGlvbjogd2luZG93LnNjcm9sbFksIGRpcmVjdGlvbjogXCJcIiB9O1xuICByZXN1bHQuZGlyZWN0aW9uID0gcmVzdWx0LnBvc2l0aW9uID4gbGFzdFNjcm9sbFBvc2l0aW9uID8gXCJkb3duXCIgOiBcInVwXCI7XG4gIGxhc3RTY3JvbGxQb3NpdGlvbiA9IHJlc3VsdC5wb3NpdGlvbjtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluVGFyZ2V0KGVsZW1lbnQsIHRhcmdldCkge1xuICBjb25zdCBlbGVtZW50UG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgaWYgKGVsZW1lbnRQb3NpdGlvbiA8PSB0YXJnZXQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1haW5XaWR0aCgpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1tYWluXCIpLm9mZnNldFdpZHRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbXMpIHtcbiAgbGV0IGlzVGhyb3R0bGVkID0gZmFsc2UsXG4gICAgc2F2ZWRBcmdzLFxuICAgIHNhdmVkVGhpcztcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgIGlmIChpc1Rocm90dGxlZCkge1xuICAgICAgc2F2ZWRBcmdzID0gYXJndW1lbnRzO1xuICAgICAgc2F2ZWRUaGlzID0gdGhpcztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBpc1Rocm90dGxlZCA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzVGhyb3R0bGVkID0gZmFsc2U7XG4gICAgICBpZiAoc2F2ZWRBcmdzKSB7XG4gICAgICAgIHdyYXBwZXIuYXBwbHkoc2F2ZWRUaGlzLCBzYXZlZEFyZ3MpO1xuICAgICAgICBzYXZlZEFyZ3MgPSBzYXZlZFRoaXMgPSBudWxsO1xuICAgICAgfVxuICAgIH0sIG1zKTtcbiAgfVxuXG4gIHJldHVybiB3cmFwcGVyO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiYmEzMjlmYjhiNDFlNmY5YjVhYWRcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=