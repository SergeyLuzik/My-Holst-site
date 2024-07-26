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

      const scroll = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.scrollData)();
      if(scroll.direction === "down"){
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.throttle)((0,_animations_js__WEBPACK_IMPORTED_MODULE_1__.animateElements)(
          animationElements,
          targetPosition), 100)
      }
      if((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.inTarget)(document.querySelector(".line-start"), targetPosition)){
        console.log("Сработал start-lite");
        stepsTrackAnimateFunction(scroll, _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.startY,
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
/******/ 	__webpack_require__.h = () => ("e1f4599ba344f70de6da")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wYzhhZTdhZjllMWMwZThjNjJjNS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW9EO0FBQ2Q7QUFDa0M7QUFDSTtBQUNmO0FBQzdEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBUTtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGFBQWE7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGFBQWE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxvQkFBb0I7QUFDM0Q7QUFDQTtBQUNBOztBQUVBLEVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0Isc0VBQXNFO0FBQ3RFO0FBQ0EsNkJBQTZCLGtCQUFrQixRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGtCQUFrQjtB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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7Ozs7Ozs7OztVQ2hEQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9hbmltYXRpb25zLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9idXJnZXItbWVudS5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvZmVlZGJhY2stc2xpZGVyLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9oZXJvLXNsaWRlci5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvaW1nLXRodW1ibmFpbHMuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9zdGVwcy10cmFjay9jdXJ2ZWQtdHJhY2suanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3N0ZXBzLXRyYWNrL3N0ZXBzLWxpbmUtdmFycy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3N0ZXBzLXRyYWNrL3RyaWFuZ2xlLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRNYWluV2lkdGgsIGluVGFyZ2V0IH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmltcG9ydCB7IHN0ZXBzTGluZSB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0ZXBzLWxpbmUtdmFycy5qc1wiO1xuLy9sZXQgc3RlcHNMaW5lLnN0YXJ0WSwgc3RlcHNMaW5lLmVuZFksIHN0ZXBzTGluZS5wYXRoTGVuZ3RoO1xuXG5cbmZ1bmN0aW9uIGFuaW1OdW1iZXIobnVtT2JqLCBkdXJhdGlvbikge1xuICBjb25zdCBudW0gPSBwYXJzZUludChudW1PYmouaW5uZXJIVE1MLnJlcGxhY2UoXCIgXCIsIFwiXCIpLCAxMCk7XG4gIGxldCBzdGFydFRpbWU7XG5cbiAgY29uc3Qgc3RlcCA9ICh0aW1lc3RhbXApID0+IHtcbiAgICBpZiAoc3RhcnRUaW1lID09PSB1bmRlZmluZWQpIHN0YXJ0VGltZSA9IHRpbWVzdGFtcDtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHBhcnNlRmxvYXQoXG4gICAgICBNYXRoLm1pbigodGltZXN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uLCAxKS50b0ZpeGVkKDIpXG4gICAgKTtcbiAgICBudW1PYmouaW5uZXJIVE1MID1cbiAgICAgIE1hdGguZmxvb3IocHJvZ3Jlc3MgKiBudW0pLnRvTG9jYWxlU3RyaW5nKFwicnUtUlVcIiwge1xuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgIH0pICsgXCIrXCI7XG5cbiAgICBpZiAocHJvZ3Jlc3MgPCAxKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVFbGVtZW50cyhlbGVtZW50cywgdGFyZ2V0UG9zaXRpb24sIGhhbmRsZXJGdW5jKSB7XG4gIGxldCBlbGVtZW50c0NsYXNzZXNDb3VudCA9IHt9O1xuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2Nyb2xsZWQtaW5cIikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAvLyBjb25zdCBlbGVtZW50UG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICBpZiAoaW5UYXJnZXQoZWxlbWVudCwgdGFyZ2V0UG9zaXRpb24pLyplbGVtZW50UG9zaXRpb24gPD0gdGFyZ2V0UG9zaXRpb24qLykge1xuICAgICAgY29uc3QgZWxlbWVudENsYXNzID0gZWxlbWVudC5jbGFzc0xpc3RbMF07XG5cbiAgICAgIGlmIChlbGVtZW50Q2xhc3MgaW4gZWxlbWVudHNDbGFzc2VzQ291bnQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG4gICAgICAgIH0sIDEwMCAqIGVsZW1lbnRzQ2xhc3Nlc0NvdW50W2VsZW1lbnRDbGFzc10pO1xuICAgICAgICBlbGVtZW50c0NsYXNzZXNDb3VudFtlbGVtZW50Q2xhc3NdICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50c0NsYXNzZXNDb3VudFtlbGVtZW50Q2xhc3NdID0gMTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInByb21vX19zdGF0aXN0aWNzXCIpKSB7XG4gICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5wcm9tb19fc3RhdGlzdGljcy1kZXNjcmlwdGlvblwiKVxuICAgICAgICAgIC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgYW5pbU51bWJlcihlbCwgMjUwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltYXRlLWNoaWxkc1wiKSkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGVsZW1lbnQuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgLyppZiAoY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGluZS1zdGFydFwiKSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgICAgICBjb25zdCBhbmltYXRlQXJndW1lbnRzID0gW1xuICAgICAgICAgICAgICBjdXJyZW50U2Nyb2xsUG9zaXRpb24sXG4gICAgICAgICAgICAgIHN0ZXBzTGluZS5zdGFydFksXG4gICAgICAgICAgICAgIHN0ZXBzTGluZS5lbmRZLFxuICAgICAgICAgICAgICBzdGVwc0xpbmUucGF0aExlbmd0aCxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBjb25zdCBhbmltYXRlRnVuY3Rpb24gPVxuICAgICAgICAgICAgICBnZXRNYWluV2lkdGgoKSA8PSAxMzAwXG4gICAgICAgICAgICAgICAgPyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrXG4gICAgICAgICAgICAgICAgOiBhbmltYXRlQ3VydmVkU3RlcHNUcmFjaztcblxuICAgICAgICAgICAgY29uc3QgdGhyb3R0bGVkQW5pbWF0ZVN0ZXBzVHJhY2sgPSB0aHJvdHRsZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGFuaW1hdGVGdW5jdGlvbiguLi5hbmltYXRlQXJndW1lbnRzLCB0aHJvdHRsZWRBbmltYXRlU3RlcHNUcmFjayk7XG4gICAgICAgICAgICB9LCA1MCk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRocm90dGxlZEFuaW1hdGVTdGVwc1RyYWNrKTtcbiAgICAgICAgICB9Ki9cbiAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgd2luZG93LnNjcm9sbFkgPlxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKiAxLjJcbiAgICApIHtcbiAgICAgIGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoXCJzY3JvbGxlZC1pblwiKTtcblxuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICB9KTtcbn1cbiIsIiAgY29uc3QgaGVhZGVySGVpZ2h0ID0gYCR7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWhlYWRlclwiKS5vZmZzZXRIZWlnaHRcbiAgfXB4YDtcbiAgXG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKVxuICAgIC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taGVhZGVyLWhpZ2h0XCIsIGAke2hlYWRlckhlaWdodH1gKTtcblxuICBjb25zdCBidXJnZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19idXJnZXItYnV0dG9uXCIpO1xuICBmdW5jdGlvbiBtZW51SGFuZGxlcihtZW51U2VsZWN0b3IpIHtcbiAgICBtZW51Lm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzdG9wLXNjcm9sbFwiKTtcbiAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShgJHttZW51U2VsZWN0b3J9X29wZW5gKTtcbiAgICAgIGJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwicGFnZS1oZWFkZXJfX2J1cmdlci1idXR0b25fb3BlblwiKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHRhcmdldElkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKTtcbiAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGJ1cmdlck1lbnVIYW5kbGVyKG1haW5XaWR0aCkge1xuICBidXJnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKGUpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwi0LrQu9C40Log0L3QsCDQutC90L7Qv9C60YMg0LIg0L7QsdGA0LDQsdC+0YLRh9C40LrQtSDQutC90L7Qv9C60LhcIik7XG4gICAgICBjb25zdCBtZW51ID1cbiAgICAgIG1haW5XaWR0aCA8PSA2ODBcbiAgICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX21lbnVcIilcbiAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX25hdlwiKTtcbiAgICAgIC8vbWVudS5zdHlsZS50b3AgPSBoZWFkZXJIZWlnaHQ7XG4gICAgICAvKmUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIHRvZG8g0YLQsNC60L7QtSDRgdC10LHQtSDRgNC10YjQtdC90LjQtSAo0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0LLQtdGI0LDRgtGMINC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAgZG9jdW1lbnQg0Lgg0YPQttC1INCyINC90LXQvCDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0Lgg0LrQvdC+0L/QutGDINC4INGC0LDQvyDQv9C+INGB0YHRi9C70LrQtSDQuCDQvtC60L3Rgz8pXG4gICAgYnVyZ2VyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJwYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvbl9vcGVuXCIpOyAvLyDQstGL0L3QtdGB0YLQuCDQsiDRhNGD0L3QutGG0LjRjiBtZW51VG9nZ2xlXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJzdG9wLXNjcm9sbFwiKTtcbiAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoYCR7bWVudS5jbGFzc0xpc3RbMF19X29wZW5gKTsqL1xuICAgICAgLy9idXJnZXJCdXR0b24ub25jbGljayA9IG51bGw7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCLRgdC+0LHRi9GC0LjQtSBjbGljayDQsiDQvtCx0YDQsNCx0L7RgtGH0LjQutC1INC00L7QutGD0LzQtdC90YLQsFwiKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhZS50YXJnZXQuY2xvc2VzdChcIi5wYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvblwiKSAmJlxuICAgICAgICAgICAgIW1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKGAke21lbnUuY2xhc3NMaXN0WzBdfV9vcGVuYClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0LrQu9C40Log0L3QtSDQvdCwINC60L3QvtC/0LrRgyDQv9GA0Lgg0LfQsNC60YDRi9GC0L7QvCDQvNC10L3RjlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gdG9kbyDQv9GA0Lgg0LrQu9C40LrQtSDQv9C+0YHQu9C1INC+0YLQutGA0YvRgtC40Y8g0YHRgNCw0LHQsNGC0YvQstCw0LXRgiDRgdC+IDLQs9C+INGA0LDQt9CwXG4gICAgICAgICAgYnVyZ2VyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJwYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvbl9vcGVuXCIpO1xuICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwic3RvcC1zY3JvbGxcIik7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKGAke21lbnUuY2xhc3NMaXN0WzBdfV9vcGVuYCk7XG5cbiAgICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdChcIi5wYWdlLWhlYWRlcl9fbmF2LWxpc3RcIikpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0LrQu9C40Log0L3QsCDRgdGB0YvQu9C60YMg0LIg0LzQtdC90Y5cIik7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKVxuICAgICAgICAgICAgICAuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy97IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG4gfSIsImNvbnN0IHNsaWRlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrX19saXN0XCIpLFxuc2xpZGVzID0gc2xpZGVzTGlzdC5jaGlsZHJlbixcbmxlZnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrID4uc2xpZGVyLWJ1dHRvbl9sZWZ0XCIpLFxucmlnaHRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrID4gLnNsaWRlci1idXR0b25fcmlnaHRcIiksXG50cmFuc2l0aW9uVGltZSA9IFwiMXNcIjtcblxubGV0IGluQWN0aW9uID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG1vdkxlZnQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKSB7XG5zbGlkZXNMaXN0Lm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICBzbGlkZXNMaXN0LnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudFNsaWRlc09uTGlzdDsgaSsrKSB7XG4gICAgc2xpZGVzTGlzdC5hcHBlbmQoc2xpZGVzWzBdKTtcbiAgfVxuICBzbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldH1weClgO1xuXG4gIGluQWN0aW9uID0gZmFsc2U7XG59O1xuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG5zbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldCAqIDIgLSBnYXBWYWx1ZX1weClgO1xufVxuZnVuY3Rpb24gbW92UmlnaHQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKSB7XG5zbGlkZXNMaXN0Lm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICBzbGlkZXNMaXN0LnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudFNsaWRlc09uTGlzdDsgaSsrKSB7XG4gICAgc2xpZGVzTGlzdC5wcmVwZW5kKHNsaWRlc0xpc3QubGFzdEVsZW1lbnRDaGlsZCk7XG4gIH1cbiAgc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXR9cHgpYDtcblxuICBpbkFjdGlvbiA9IGZhbHNlO1xufTtcblxuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG5zbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7Z2FwVmFsdWV9cHgpYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZlZWRiYWNrU2xpZGVySGFuZGxlcigpIHtcbi8vbGV0IE11dE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIgKCgpID0+IHtcbiBjb25zdCBzbGlkZVdpZHRoID0gc2xpZGVzWzBdLm9mZnNldFdpZHRoLFxuICBzbGlkZXNMaXN0V2lkdGggPSBzbGlkZXNMaXN0Lm9mZnNldFdpZHRoLFxuICBnYXBWYWx1ZSA9XG4gICAgKHNsaWRlc0xpc3RXaWR0aCAvIDEwMCkgKlxuICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShzbGlkZXNMaXN0KS5nYXApLFxuICBhbW91bnRTbGlkZXNPbkxpc3QgPSBNYXRoLmZsb29yKHNsaWRlc0xpc3RXaWR0aCAvIChzbGlkZVdpZHRoICsgZ2FwVmFsdWUpKSxcbiAgLypzbGlkZUxpc3RzQW1vdW50ID0gTWF0aC5jZWlsKHNsaWRlcy5sZW5ndGggLyBhbW91bnRTbGlkZXNPbkxpc3QpLCovXG4gIG9mZnNldCA9IDQgKiBzbGlkZVdpZHRoICsgMyAqIGdhcFZhbHVlO1xuXG4gIC8vIEluaXRpYWxpemUgc2xpZGVyIHN0YXJ0IHBvc2l0aW9uXG5zbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldH1weClgO1xuXG4gIHJpZ2h0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7IC8vIHRvZG8g0L/QvtCy0YLQvtGA0Y/QtdGC0YHRjyDQvtGCIGhlcm8gc2xpZGVyPyDRg9C90LjRhNC40YbQuNGA0L7QstCw0YLRjCDRh9C10YDQtdC3INC+0YLQtNC10LvRjNC90YvQuSDQvNC+0LTRg9C70Yw/XG4gICAgaWYgKGluQWN0aW9uKSByZXR1cm47XG4gICAgaW5BY3Rpb24gPSB0cnVlO1xuICAgIG1vdkxlZnQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKTtcbiAgfTtcbiAgbGVmdEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4geyAvLyB0b2RvINC/0L7QstGC0L7RgNGP0LXRgtGB0Y8g0L7RgiBoZXJvIHNsaWRlcj8g0YPQvdC40YTQuNGG0LjRgNC+0LLQsNGC0Ywg0YfQtdGA0LXQtyDQvtGC0LTQtdC70YzQvdGL0Lkg0LzQvtC00YPQu9GMP1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZSaWdodChhbW91bnRTbGlkZXNPbkxpc3QsIG9mZnNldCwgZ2FwVmFsdWUpO1xuICB9O1xuICAvL30pXG5cbiAvLyBNdXRPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2F0dHJpYnV0ZUZpbHRlcjogW1wiY2xhc3NcIl19KTtcbn1cblxuIiwiY29uc3Qgc2xpZGVzV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyX19zbGlkZXMtbGlzdFwiKSxcbiAgYWN0aXZTbGlkZVdpZHRoID0gcGFyc2VJbnQoXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZShcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb19fc2xpZGVyXCIpXG4gICAgKS5ncmlkVGVtcGxhdGVDb2x1bW5zLnNwbGl0KFwiIFwiKVswXSxcbiAgICAxMFxuICApLFxuICBnYXBWYWx1ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoc2xpZGVzV3JhcHBlcikuZ2FwKSxcbiAgc2xpZGVzID0gc2xpZGVzV3JhcHBlci5jaGlsZHJlbixcbiAgc2xpZGVXaWR0aCA9IHNsaWRlc1swXS5vZmZzZXRXaWR0aCxcbiAgaW5pdGlhbE9mZnNldCA9IHNsaWRlV2lkdGggKiAyICsgZ2FwVmFsdWUgLSBhY3RpdlNsaWRlV2lkdGgsXG4gIG9mZnNldCA9IHNsaWRlV2lkdGggKyBnYXBWYWx1ZSxcbiAgdHJhbnNpdGlvblRpbWUgPSBcIjAuM3NcIixcbiAgc2xpZGVTY2FsZSA9XG4gICAgXCJ0cmFuc2xhdGUoLTEyLjUlLCBjYWxjKDEyLjUlIC0gMTZweCkpIHNjYWxlKDEuMjUpXCIsXG4gIGxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1idXR0b25fbGVmdFwiKSxcbiAgcmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1idXR0b25fcmlnaHRcIik7XG5cbmxldCBpbkFjdGlvbiA9IGZhbHNlO1xuXG5mdW5jdGlvbiBtb3ZMZWZ0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCkge1xuICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG4gICAgc2xpZGVzWzBdLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuXG4gICAgc2xpZGVzV3JhcHBlci5hcHBlbmQoc2xpZGVzWzBdKTtcbiAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LWluaXRpYWxPZmZzZXR9cHgpYDtcblxuICAgIGluQWN0aW9uID0gZmFsc2U7XG4gIH07XG4gIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lOyAvL3RvZG8g0LfQsNC00LDQstCw0YLRjCB0cmFuc2l0aW9uINGH0LXRgNC10Lcg0LfQsNC/0Y/RgtGD0Y4g0LLRgdC10Lwg0YHRgNCw0LfRgz9cbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXQgLSBpbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzWzFdLnN0eWxlLm9wYWNpdHkgPSAwO1xuICBzbGlkZXNbMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMClcIjsgLy8gc2NhbGUoMC4zKVxuXG4gIHNsaWRlc1syXS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gIHNsaWRlc1syXS5zdHlsZS50cmFuc2Zvcm0gPSBzbGlkZVNjYWxlO1xuICBzbGlkZXNbMl0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJjdWJpYy1iZXppZXIoLjcyLC4wNywuOTUsLjcpXCI7IC8vLjc1LDAsMSwuMDIgZWFzZS1pblxufVxuZnVuY3Rpb24gbW92UmlnaHQoc2xpZGVzV3JhcHBlciwgb2Zmc2V0KSB7XG4gIHNsaWRlc1dyYXBwZXIub250cmFuc2l0aW9uZW5kID0gKCkgPT4ge1xuICAgIHNsaWRlc1dyYXBwZXIub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcbiAgICBzbGlkZXNbMV0ucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG5cbiAgICBzbGlkZXNXcmFwcGVyLmxhc3RFbGVtZW50Q2hpbGQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgc2xpZGVzV3JhcHBlci5wcmVwZW5kKHNsaWRlc1dyYXBwZXIubGFzdEVsZW1lbnRDaGlsZCk7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1pbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgICBpbkFjdGlvbiA9IGZhbHNlO1xuICB9O1xuICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldCAtIGluaXRpYWxPZmZzZXR9cHgpYDtcblxuICBzbGlkZXNbMF0uc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuICBzbGlkZXNbMF0uc3R5bGUub3BhY2l0eSA9IDE7XG4gIHNsaWRlc1swXS5zdHlsZS50cmFuc2Zvcm0gPSBzbGlkZVNjYWxlO1xuICBzbGlkZXNbMF0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJlYXNlLWluXCI7XG5cbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDApIHNjYWxlKDEpXCI7XG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb24gPSBcImN1YmljLWJlemllcigwLC43NSwuMDIsMSlcIjsgLy8wLC43NSwuMDIsMSAgLy8gMCwwLC4wMiwxIC8vIC43NSwwLDEsLjAyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXJvU2xpZGVySGFuZGxlcigpIHtcbiAgLy8gSW5pdGlhbGl6ZSBzbGlkZXIgc3RhcnQgcG9zaXRpb25cbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1pbml0aWFsT2Zmc2V0fXB4KWA7XG4gIHNsaWRlc1swXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IHNsaWRlU2NhbGU7XG5cbiAgbGVmdC5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZSaWdodChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpO1xuICB9O1xuICByaWdodC5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZMZWZ0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCk7XG4gIH07XG59XG4iLCJmdW5jdGlvbiBzd2FwUGxhY2Vob2xkZXIocGljdHVyZSkge1xuICBjb25zdCBpbWcgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XG4gIGNvbnN0IHNvdXJjZXMgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzb3VyY2VcIik7XG5cbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBwaWN0dXJlLmRhdGFzZXQubG9hZGVkID0gdHJ1ZTtcbiAgICAvL2ltZy4gcmVtb3ZlQXR0cmlidXRlKFwiXCIpXG4gIH07XG4gIGltZy5vbmVycm9yID0gKCkgPT4ge1xuICAgIHBpY3R1cmUuZGF0YXNldC5sb2FkZWQgPSBmYWxzZTtcbiAgfTtcbiAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICBzb3VyY2Uuc3Jjc2V0ID0gc291cmNlLmRhdGFzZXQuc3Jjc2V0O1xuICAgIHNvdXJjZS5zaXplcyA9IHNvdXJjZS5kYXRhc2V0LnNpemVzO1xuICB9KTtcbiAgaW1nLnNyY3NldCA9IGltZy5kYXRhc2V0LnNyY3NldDtcbiAgaW1nLnNpemVzID0gaW1nLmRhdGFzZXQuc2l6ZXM7XG4gIC8vaW1nLnNyYyA9IGltZy5kYXRhc2V0LnNyY3NldC5tYXRjaCgvLCAoLiopIC4rJC8pWzFdOyAvLyB0b2RvINC/0YDQuCDQtdC00LjQvdGB0YLQstC10L3QvdC+0Lwg0LLQsNGA0LjQsNC90YLQtSDQstGL0LHRgNCw0YHRi9Cy0LDQtdGCIG51bGxcbiAgY29uc3Qgc3Jjc2V0QXJyID0gaW1nLmRhdGFzZXQuc3Jjc2V0LnNwbGl0KFwiIFwiKTtcbiAgaW1nLnNyYyA9IHNyY3NldEFycltzcmNzZXRBcnIubGVuZ3RoIC0gMl07XG4gIC8vY29uc29sZS5sb2coc3Jjc2V0QXJyLCBzcmNzZXRBcnJbc3Jjc2V0QXJyLmxlbmd0aCAtIDJdKTtcbn1cblxuY29uc3QgcGljdHVyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicGljdHVyZVwiKTtcblxuY29uc3QgY2FsbGJhY2sgPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgc3dhcFBsYWNlaG9sZGVyKGVudHJ5LnRhcmdldCk7XG4gICAgICAvL2NvbnNvbGUubG9nKGVudHJ5LnRhcmdldCk7XG4gICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGltZ1RodW1ibmFpbHNIYW5kbGVyKCkge1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihjYWxsYmFjayk7XG5cbnBpY3R1cmVzLmZvckVhY2goKHBpY3R1cmUpID0+IHtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShwaWN0dXJlKTtcbn0pO1xufSIsImltcG9ydCB7IGdldE1haW5XaWR0aCwgc2Nyb2xsRGF0YSwgaW5UYXJnZXQgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZUVsZW1lbnRzIH0gZnJvbSBcIi4vYW5pbWF0aW9ucy5qc1wiO1xuaW1wb3J0IHsgYWRkQ3VydmVkVHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9jdXJ2ZWQtdHJhY2suanNcIjtcbmltcG9ydCB7IGFkZFN0cmFpZ2h0VHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdHJhaWdodC10cmFjay5qc1wiO1xuaW1wb3J0IHsgaW1nVGh1bWJuYWlsc0hhbmRsZXIgfSBmcm9tIFwiLi9pbWctdGh1bWJuYWlscy5qc1wiO1xuaW1wb3J0IHsgYnVyZ2VyTWVudUhhbmRsZXIgfSBmcm9tIFwiLi9idXJnZXItbWVudS5qc1wiO1xuaW1wb3J0IHsgaGVyb1NsaWRlckhhbmRsZXIgfSBmcm9tIFwiLi9oZXJvLXNsaWRlci5qc1wiO1xuaW1wb3J0IHsgZmVlZGJhY2tTbGlkZXJIYW5kbGVyIH0gZnJvbSBcIi4vZmVlZGJhY2stc2xpZGVyLmpzXCI7XG5pbXBvcnQgeyBzdGVwc0xpbmUgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdGVwcy1saW5lLXZhcnMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmNvbnN0IG1haW5XaWR0aCA9IGdldE1haW5XaWR0aCgpO1xuaW1nVGh1bWJuYWlsc0hhbmRsZXIoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgY29uc3QgcHJlbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVsb2FkZXJcIik7XG5cbiAgcHJlbG9hZGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBwcmVsb2FkZXIub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN0b3Atc2Nyb2xsXCIpO1xuICAgIHByZWxvYWRlci5yZW1vdmUoKTtcblxuICAgIGlmIChtYWluV2lkdGggPD0gMTMwMCkge1xuICAgICAgYWRkU3RyYWlnaHRUcmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRDdXJ2ZWRUcmFjaygpO1xuICAgIH1cbiAgICBpZiAobWFpbldpZHRoIDw9IDEyNTApIHtcbiAgICAgIGJ1cmdlck1lbnVIYW5kbGVyKG1haW5XaWR0aCk7XG4gICAgfVxuICAgIGlmIChtYWluV2lkdGggPiAxMjAwKSB7XG4gICAgICBmZWVkYmFja1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG4gICAgaWYgKG1haW5XaWR0aCA+IDgwMCkge1xuICAgICAgaGVyb1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG5jb25zb2xlLmxvZyhzdGVwc0xpbmUpO1xuICAgIC8qY29uc3QgZXIgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICBlcigpO1xuICAgIH0pOyovXG5cbiAgICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQsNC90LjQvNCw0YbQuNC5XG4gICAgY29uc3QgYW5pbWF0aW9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFuaW1hdGVcIik7IC8vIHRvZG8/INC/0L7QvNC10L3Rj9GC0Ywg0L3QsCBieWNsYXNzbmFtZSA6bm90IHNjcm9sbGVkINGH0YLQvtCx0Ysg0LrQvtC70LvQtdC60YbQuNGPINC+0LHQvdC+0LLQu9GP0LvQsNGB0Ywg0YHQsNC80LA/XG4gICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICogMC44O1xuXG4gICAgYW5pbWF0ZUVsZW1lbnRzKGFuaW1hdGlvbkVsZW1lbnRzLCB0YXJnZXRQb3NpdGlvbik7XG5cbiAgICBjb25zdCBzdGVwc1RyYWNrQW5pbWF0ZUZ1bmN0aW9uID1cbiAgICBtYWluV2lkdGggPD0gMTMwMFxuICAgICAgPyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrXG4gICAgICA6IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrO1xuXG4gICAgY29uc3QgdGhyb3R0bGVkU2Nyb2xsQW5pbWF0aW9uSGFuZGxlciA9IHRocm90dGxlKCgpID0+IHtcblxuICAgICAgY29uc3Qgc2Nyb2xsID0gc2Nyb2xsRGF0YSgpO1xuICAgICAgaWYoc2Nyb2xsLmRpcmVjdGlvbiA9PT0gXCJkb3duXCIpe1xuICAgICAgICB0aHJvdHRsZShhbmltYXRlRWxlbWVudHMoXG4gICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb24pLCAxMDApXG4gICAgICB9XG4gICAgICBpZihpblRhcmdldChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpbmUtc3RhcnRcIiksIHRhcmdldFBvc2l0aW9uKSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyBzdGFydC1saXRlXCIpO1xuICAgICAgICBzdGVwc1RyYWNrQW5pbWF0ZUZ1bmN0aW9uKHNjcm9sbCwgc3RlcHNMaW5lLnN0YXJ0WSxcbiAgICAgICAgICBzdGVwc0xpbmUuZW5kWSxcbiAgICAgICAgICBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgICB9XG4gICAgfSwgNTApO1xuICAgIFxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhyb3R0bGVkU2Nyb2xsQW5pbWF0aW9uSGFuZGxlcik7XG5cbiAgICAvL2xldCBsYXN0U2Nyb2xsUG9zaXRpb24gPSAwO1xuICAgIC8qY29uc3QgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzID0gdGhyb3R0bGUoYW5pbWF0ZUVsZW1lbnRzLCAyMDApOyovXG5cbiAgICAvKmNvbnN0IHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyA9IHRocm90dGxlKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHNjcm9sbERhdGEoKSk7XG4gICAgICAvLyB0b2RvINCy0YvQvdC10YHRgtC4INC/0YDQvtCy0LXRgNC60YMg0L3QsNC/0YDQsNCy0LvQtdC90LjRjyDRgdC60YDQvtC70LvQsCwg0YLRg9GCINC00L7Qu9C20L3QsCDQsdGL0YLRjCDRgtC+0LvRjNC60L4g0YTRg9C90LrRhtC40Y9cbiAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgaWYgKGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA+IGxhc3RTY3JvbGxQb3NpdGlvbikge1xuICAgICAgICBhbmltYXRlRWxlbWVudHMoXG4gICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb24sXG4gICAgICAgICAgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBsYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG4gICAgfSwgMTAwKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyk7XG4gICAgKi9cbiAgfTtcbiAgcHJlbG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJwcmVsb2FkZXJfaGlkZVwiKTsgLy90b2RvINC/0LXRgNC10L3QtdGB0YLQuCDQv9C+0YHQu9C1IHRyYW5zaXRpb25lbmQ/INC/0L7RgtC+0LzRgyDRh9GC0L4g0YHQvdCw0YfQsNC70LAg0LfQsNC/0YPRgdC60LDQtdC8INCw0L3QuNC80LDRhtC40Y4g0LAg0L/QvtGC0L7QvCDRgtC+0LvRjNC60L4g0LTQvtCx0LDQstC70Y/QtdC8INGB0L7QsdGL0YLQuNC1P1xufSk7XG5cbi8vd2luZG93Lm9ubG9hZCA9IDtcbiIsImltcG9ydCB7IGFkZFRyaWFuZ2xlLCBtb3ZlVHJpYW5nbGVBbG9uZ0N1cnZlIH0gZnJvbSBcIi4vdHJpYW5nbGUuanNcIjtcbmltcG9ydCB7IHN0ZXBzTGluZSB9IGZyb20gXCIuL3N0ZXBzLWxpbmUtdmFycy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEN1cnZlZFRyYWNrKCkge1xuICAgIGNvbnN0IHN0ZXBzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNcIik7XG4gICAgY29uc3QgaW5pdGlhbFggPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcbiAgICBjb25zdCBpbml0aWFsWSA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICsgd2luZG93LnNjcm9sbFk7XG4gICAgY29uc3QgY29udHJvbFBvaW50T2Zmc2V0WSA9IDUzMztcbiAgICBjb25zdCBtYXJrZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYXJrZXJcIik7XG4gICAgY29uc3QgbWFya2Vyc0NlbnRlckNvb3JkcyA9IFtdO1xuICBcbiAgICBtYXJrZXJzLmZvckVhY2goKG1hcmtlcikgPT4ge1xuICAgICAgLy8gdG9kbyDQv9C10YDQtdC00LDQstCw0YLRjCDRg9C20LUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0INGH0YLQvtCx0Ysg0LrQsNC20LTRi9C5INGA0LDQtyDQvdC1INCy0YvQt9GL0LLQsNGC0YxcbiAgICAgIGNvbnN0IG1hcmtlclJlY3QgPSBtYXJrZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBsZXQgY2VudGVyQ29vcmRzID0ge307XG4gIFxuICAgICAgY2VudGVyQ29vcmRzLnggPSBtYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIG1hcmtlclJlY3Qud2lkdGggLyAyO1xuICAgICAgY2VudGVyQ29vcmRzLnkgPVxuICAgICAgICBtYXJrZXJSZWN0LnkgLSBpbml0aWFsWSArIG1hcmtlclJlY3QuaGVpZ2h0IC8gMiArIHdpbmRvdy5zY3JvbGxZO1xuICBcbiAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHMucHVzaChjZW50ZXJDb29yZHMpOyAvLyB0b2RvINC/0YPRiNC40YLRjCDRgdGA0LDQt9GDIHt9INCx0LXQtyDRgdC+0LfQtNCw0L3QuNGPINC/0LXRgNC10LzQtdC90L3Ri9GFXG4gICAgfSk7XG4gICAgc3RlcHNMaW5lLnN0YXJ0WSA9IG1hcmtlcnNDZW50ZXJDb29yZHNbMF0ueSArIGluaXRpYWxZO1xuICAgIHN0ZXBzTGluZS5lbmRZID1cbiAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbbWFya2Vyc0NlbnRlckNvb3Jkcy5sZW5ndGggLSAxXS55ICsgaW5pdGlhbFk7XG4gIFxuICAgIGNvbnN0IE5Tc3RyaW5nID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJzdmdcIik7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrXCIpO1xuICAgIGNvbnN0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwicGF0aFwiKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX21haW4tdHJhY2tcIik7XG4gICAgbGV0IGQgPSBgTSAke21hcmtlcnNDZW50ZXJDb29yZHNbMF0ueH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnl9YDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1hcmtlcnNDZW50ZXJDb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGQgKz0gYEMke21hcmtlcnNDZW50ZXJDb29yZHNbaSAtIDFdLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbaSAtIDFdLnkgKyBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS54fSAke1xuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnkgLSBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS54fSAke21hcmtlcnNDZW50ZXJDb29yZHNbaV0ueX1gO1xuICAgIH1cbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgZCk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwibm9uZVwiKTtcbiAgICBzdGVwc0xpbmUucGF0aExlbmd0aCA9IE1hdGgucm91bmQocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChwYXRoKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQoXG4gICAgICBhZGRUcmlhbmdsZShcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1swXS54LFxuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnksXG4gICAgICAgIDE1IC8qLCBzdmcqL1xuICAgICAgKVxuICAgICk7XG4gIFxuICAgIHN0ZXBzU2VjdGlvbi5hcHBlbmRDaGlsZChzdmcpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrKFxuICAgIHN0YXJ0U2Nyb2xsUG9zaXRpb24sXG4gICAgc3RhcnRQb2ludCxcbiAgICBlbmRQb2ludCxcbiAgICBwYXRoTGVuZ2h0LFxuICAgIGhhbmRsZXJGdW5jXG4gICkge1xuICAgIGNvbnN0IHRyYWNrUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX21haW4tdHJhY2tcIik7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IGVuZFBvaW50IC0gc3RhcnRQb2ludDtcbiAgICBjb25zdCBsaW5lU2Nyb2xsUHJvZ3JlcyA9ICh3aW5kb3cuc2Nyb2xsWSAtIHN0YXJ0U2Nyb2xsUG9zaXRpb24pIC8gbGluZUhlaWdodDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhcIndpbmRvdy5zY3JvbGxZIFwiICsgd2luZG93LnNjcm9sbFkpO1xuICAgIGNvbnNvbGUubG9nKFwic3RhcnRTY3JvbGxQb3NpdGlvbiBcIiArIHN0YXJ0U2Nyb2xsUG9zaXRpb24pO1xuICAgIGNvbnNvbGUubG9nKFwibGluZUhlaWdodCBcIiArIGxpbmVIZWlnaHQpO1xuICAgIGNvbnNvbGUubG9nKFwibGluZVNjcm9sbFByb2dyZXMgXCIgKyBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgIGxldCBvZmZzZXQgPSBwYXRoTGVuZ2h0ICogKDEgLSBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gIFxuICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICAgIHRyYWNrUGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBvZmZzZXQpO1xuICAgIG1vdmVUcmlhbmdsZUFsb25nQ3VydmUoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX190cmFjay1hcnJvd1wiKSxcbiAgICAgIHRyYWNrUGF0aCxcbiAgICAgIHBhdGhMZW5naHQsXG4gICAgICBvZmZzZXRcbiAgICApO1xuICB9IiwiZXhwb3J0IGxldCBzdGVwc0xpbmUgPSB7c3RhcnRZOiBcIlwiLCBlbmRZOlwiXCIsIHBhdGhMZW5ndGg6XCJcIn07IiwiaW1wb3J0IHsgYWRkVHJpYW5nbGUsIG1vdmVUcmlhbmdsZUFsb25nU3RyYWlnaHQgfSBmcm9tIFwiLi90cmlhbmdsZS5qc1wiO1xuaW1wb3J0IHsgc3RlcHNMaW5lIH0gZnJvbSBcIi4vc3RlcHMtbGluZS12YXJzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gYWRkU3RyYWlnaHRUcmFjaygpIHtcbiAgICBjb25zdCBzdGVwc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzXCIpO1xuICAgIGNvbnN0IGdhcCA9IHBhcnNlSW50KFxuICAgICAgd2luZG93XG4gICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKHN0ZXBzU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX19saXN0XCIpKVxuICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShcImdhcFwiKVxuICAgICk7XG4gICAgY29uc3QgaW5pdGlhbFggPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcbiAgICBjb25zdCBpbml0aWFsWSA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICsgd2luZG93LnNjcm9sbFk7XG4gICAgLy9jb25zb2xlLmxvZyhzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHdpbmRvdy5zY3JvbGxZKTtcbiAgICBsZXQgbWFya2Vyc1JlY3QgPSBbXTtcbiAgICBjb25zdCBtYXJrZXJzQ29vcmRzID0gW107XG4gIFxuICAgIGNvbnN0IGZpcnN0TWFya2VyUmVjdCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5tYXJrZXJcIilcbiAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBtYXJrZXJzUmVjdC5wdXNoKGZpcnN0TWFya2VyUmVjdCk7XG4gIFxuICAgIGNvbnN0IGxpbmVQYWRkaW5nID0gZmlyc3RNYXJrZXJSZWN0LmhlaWdodCAvIDIgLSA1OyAvLyB0b2RvINC+0YLQvdC40LzQsNC90LjQtSA1INGD0LHQuNGA0LDQtdGCINC30LDQt9C+0YAg0LzQtdC20LTRgyDQu9C40L3QuNC10Lkg0Lgg0LzQsNGA0LrQtdGA0L7QvCAo0LrQvtGB0YLRi9C70YzQvdC+KVxuICBcbiAgICAvKmNvbnN0IGZpcnN0TWFya2VyQ29vcmRzID0ge1xuICAgICAgeDogZmlyc3RNYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIGZpcnN0TWFya2VyUmVjdC53aWR0aCAvIDIsXG4gICAgICB5OiBmaXJzdE1hcmtlclJlY3QueSAtIGluaXRpYWxZLFxuICAgIH07XG4gICAgZmlyc3RNYXJrZXJDb29yZHMucHVzaChtYXJrZXJzQ29vcmRzKTsqL1xuICBcbiAgICBjb25zdCBsYXN0TWFya2VyUmVjdCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5zdGVwc19faXRlbTpsYXN0LWNoaWxkID4ubWFya2VyXCIpXG4gICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbWFya2Vyc1JlY3QucHVzaChsYXN0TWFya2VyUmVjdCk7XG4gIFxuICAgIC8qIGNvbnN0IGxhc3RNYXJrZXJDb29yZHMgPSB7XG4gICAgICB4OiBsYXN0TWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBsYXN0TWFya2VyUmVjdC53aWR0aCAvIDIsXG4gICAgICB5OiBsYXN0TWFya2VyUmVjdC55IC0gaW5pdGlhbFksXG4gICAgfTtcbiAgICBsYXN0TWFya2VyQ29vcmRzLnB1c2gobWFya2Vyc0Nvb3Jkcyk7Ki9cbiAgXG4gICAgbWFya2Vyc1JlY3QuZm9yRWFjaCgobWFya2VyUmVjdCkgPT4ge1xuICAgICAgLypjb25zdCBtYXJrZXJSZWN0ID0gbWFya2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGV0IGNlbnRlckNvb3JkcyA9IHt9O1xuICBcbiAgICAgIGNlbnRlckNvb3Jkcy54ID0gbWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBtYXJrZXJSZWN0LndpZHRoIC8gMjtcbiAgICAgIGNlbnRlckNvb3Jkcy55ID0gbWFya2VyUmVjdC55IC0gaW5pdGlhbFkgKyBtYXJrZXJSZWN0LmhlaWdodCAvIDI7XG4gICovXG4gICAgICBtYXJrZXJzQ29vcmRzLnB1c2goe1xuICAgICAgICB4OiBtYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIG1hcmtlclJlY3Qud2lkdGggLyAyLFxuICAgICAgICB5OiBtYXJrZXJSZWN0LnkgLSBpbml0aWFsWSArIG1hcmtlclJlY3QuaGVpZ2h0IC8gMiArIHdpbmRvdy5zY3JvbGxZLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc3RlcHNMaW5lLnN0YXJ0WSA9IG1hcmtlcnNDb29yZHNbMF0ueSArIGluaXRpYWxZO1xuICAgIHN0ZXBzTGluZS5lbmRZID0gbWFya2Vyc0Nvb3Jkc1ttYXJrZXJzQ29vcmRzLmxlbmd0aCAtIDFdLnkgKyBpbml0aWFsWTtcbiAgICBjb25zb2xlLmxvZyhpbml0aWFsWCwgaW5pdGlhbFksIG1hcmtlcnNSZWN0LCBtYXJrZXJzQ29vcmRzKTtcbiAgICBjb25zdCBOU3N0cmluZyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbiAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwic3ZnXCIpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFja1wiKTtcbiAgICBjb25zdCBtYWluVHJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwicGF0aFwiKTtcbiAgICBsZXQgZCA9IGBNICR7bWFya2Vyc0Nvb3Jkc1swXS54fSAke21hcmtlcnNDb29yZHNbMF0ueX0gTCAke21hcmtlcnNDb29yZHNbMV0ueH0gJHttYXJrZXJzQ29vcmRzWzFdLnl9YDtcbiAgICAvKiBmb3IgKGxldCBpID0gMTsgaSA8IG1hcmtlcnNDb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGQgKz0gYEMke21hcmtlcnNDb29yZHNbaSAtIDFdLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDb29yZHNbaSAtIDFdLnkgKyBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0Nvb3Jkc1tpXS54fSAke1xuICAgICAgICBtYXJrZXJzQ29vcmRzW2ldLnkgLSBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0Nvb3Jkc1tpXS54fSAke21hcmtlcnNDb29yZHNbaV0ueX1gO1xuICAgIH0qL1xuICAgIGNvbnN0IHN0ZXBzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN0ZXBzX19pdGVtXCIpO1xuICAgIGxldCBvZmZzZXRBcnJheSA9IFswXTtcbiAgICBjb25zdCBkYXNoTGVuZ2h0ID0gZ2FwIC0gbGluZVBhZGRpbmc7XG4gICAgLy8gdG9kbyDQvtC60YDRg9Cz0LvRj9GC0Ywg0LfQvdCw0YfQtdC90LjRjyBkYXNoTGVuZ2h0INC4IGl0ZW1IZWlnaHQg0LIg0LHQvtC70YzRiNGD0Y4g0YHRgtC+0YDQvtC90YM/XG4gICAgc3RlcHNJdGVtcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICBjb25zdCBpdGVtSGVpZ2h0ID0gcGFyc2VJbnQoXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGl0ZW0pLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIilcbiAgICAgICk7XG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBvZmZzZXRBcnJheS5wdXNoKGl0ZW1IZWlnaHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2Zmc2V0QXJyYXkucHVzaChpdGVtSGVpZ2h0ICsgbGluZVBhZGRpbmcpO1xuICAgICAgfVxuICAgICAgb2Zmc2V0QXJyYXkucHVzaChkYXNoTGVuZ2h0KTtcbiAgICB9KTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fbWFpbi10cmFja1wiKTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwiZFwiLCBkKTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG4gICAgc3RlcHNMaW5lLnBhdGhMZW5ndGggPSBNYXRoLnJvdW5kKG1haW5UcmFjay5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBvZmZzZXRBcnJheS5qb2luKFwiIFwiKSk7XG4gICAgLy8gcGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKG1haW5UcmFjayk7XG4gICAgY29uc3QgdHJhY2tNYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInBhdGhcIik7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrLW1hc2tcIik7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcImRcIiwgZCk7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJub25lXCIpO1xuICAgIHRyYWNrTWFzay5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICB0cmFja01hc2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgMCk7XG4gIFxuICAgIHN2Zy5hcHBlbmRDaGlsZCh0cmFja01hc2spO1xuICBcbiAgICAvKnVzZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFjay0tbWFza1wiKTtcbiAgICB1c2Uuc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgdXNlLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIDApO1xuICAgIHN2Zy5hcHBlbmRDaGlsZCh1c2UpOyovXG4gICAgc3ZnLmFwcGVuZENoaWxkKFxuICAgICAgYWRkVHJpYW5nbGUobWFya2Vyc0Nvb3Jkc1swXS54LCBtYXJrZXJzQ29vcmRzWzBdLnksIDE1IC8qLCBzdmcqLylcbiAgICApO1xuICAgIGNvbnN0IHRyaWFuZ2xlTWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJwYXRoXCIpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmlhbmdsZS1tYXNrXCIpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwibm9uZVwiKTtcbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFxuICAgICAgXCJzdHJva2Utd2lkdGhcIixcbiAgICAgIFwiMjBweFwiXG4gICAgKTsgLyogMjBweCDQtNC70Y8g0L/QtdGA0LXQutGA0YvRgtC40Y8g0YLRgNC10YPQs9C+0LvRjNC90LjQutCwINCyIDE1cHggKi9cbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBvZmZzZXRBcnJheS5zbGljZSgxKS5qb2luKFwiIFwiKSk7XG4gICAgdHJpYW5nbGVNYXNrLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIDApO1xuICAgIHN2Zy5hcHBlbmRDaGlsZCh0cmlhbmdsZU1hc2spO1xuICBcbiAgICBzdGVwc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrKFxuICAgIHN0YXJ0U2Nyb2xsUG9zaXRpb24sXG4gICAgc3RhcnRQb2ludCxcbiAgICBlbmRQb2ludCxcbiAgICBwYXRoTGVuZ2h0LFxuICAgIGhhbmRsZXJGdW5jXG4gICkge1xuICAgIGNvbnN0IHRyYWNrUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX3RyYWNrLW1hc2tcIik7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IGVuZFBvaW50IC0gc3RhcnRQb2ludDtcbiAgICBjb25zdCBsaW5lU2Nyb2xsUHJvZ3JlcyA9ICh3aW5kb3cuc2Nyb2xsWSAtIHN0YXJ0U2Nyb2xsUG9zaXRpb24pIC8gbGluZUhlaWdodDtcbiAgICBsZXQgb2Zmc2V0ID0gLXBhdGhMZW5naHQgKiBsaW5lU2Nyb2xsUHJvZ3JlcztcbiAgXG4gICAgaWYgKG9mZnNldCA8IC1wYXRoTGVuZ2h0KSB7XG4gICAgICBvZmZzZXQgPSAtcGF0aExlbmdodDtcbiAgICAgIC8vd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlckZ1bmMpO1xuICAgIH1cbiAgICB0cmFja1BhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgb2Zmc2V0KTtcbiAgICBtb3ZlVHJpYW5nbGVBbG9uZ1N0cmFpZ2h0KFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc19fdHJhY2stYXJyb3dcIiksXG4gICAgICB0cmFja1BhdGgsXG4gICAgICBvZmZzZXQsXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX19tYWluLXRyYWNrXCIpXG4gICAgKTtcbiAgfSIsImV4cG9ydCBmdW5jdGlvbiBhZGRUcmlhbmdsZShpbml0aWFsWCwgaW5pdGlhbFksIHNpZGVMZW5naHQgLyosIHBhcmVudE5vZGUqLykge1xuICAgIGNvbnN0IHRyaWFuZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgICAgXCJwb2x5Z29uXCJcbiAgICApO1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrLWFycm93XCIpOyAvL3pvb20taW4gc2hvdyAgYW5pbWF0ZSBzaG93LWZhc3RlclxuICAgIC8vKE1hdGguc3FydCgzKSAvIDIpID0gMCw4NjZcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm9wYWNpdHk6IDA7XCIpO1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwicG9pbnRzXCIsXG4gICAgICBgJHtpbml0aWFsWCAtIHNpZGVMZW5naHQgLyAyfSwke2luaXRpYWxZfSAke2luaXRpYWxYfSwke1xuICAgICAgICBpbml0aWFsWSArIChNYXRoLnNxcnQoMykgLyAyKSAqIHNpZGVMZW5naHRcbiAgICAgIH0gJHtpbml0aWFsWCArIHNpZGVMZW5naHQgLyAyfSwke2luaXRpYWxZfWBcbiAgICApO1xuICAgIC8vICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKHRyaWFuZ2xlKTtcbiAgICByZXR1cm4gdHJpYW5nbGU7XG4gIH1cbiAgXG4gIGV4cG9ydCBmdW5jdGlvbiBtb3ZlVHJpYW5nbGVBbG9uZ0N1cnZlKHRyaWFuZ2xlLCBwYXRoLCB0b3RhbFBhdGhMZW5naHQsIG9mZnNldCkge1xuICAgIGNvbnN0IGN1cnJlbnRMZW5naHQgPSB0b3RhbFBhdGhMZW5naHQgLSBvZmZzZXQ7XG4gICAgY29uc3QgaW5pdGlhbFBvaW50ID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKDApO1xuICAgIGNvbnN0IGN1cnJlbnRQb2ludCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aChjdXJyZW50TGVuZ2h0KTtcbiAgICBjb25zdCB0cmlhbmdsZUhlaWdodFBvaW50cyA9IHRyaWFuZ2xlXG4gICAgICAuZ2V0QXR0cmlidXRlKFwicG9pbnRzXCIpXG4gICAgICAubWF0Y2goL1xcUyssKFxcUyspXFxzLlxcUyssKFxcUyspLyk7XG4gICAgY29uc3QgZnV0dXJlUG9pbnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoXG4gICAgICBjdXJyZW50TGVuZ2h0ICsgKHRyaWFuZ2xlSGVpZ2h0UG9pbnRzWzJdIC0gdHJpYW5nbGVIZWlnaHRQb2ludHNbMV0pXG4gICAgKTtcbiAgICBjb25zdCBhbmdsZSA9XG4gICAgICAoTWF0aC5hdGFuMihcbiAgICAgICAgZnV0dXJlUG9pbnQueSAtIGN1cnJlbnRQb2ludC55LFxuICAgICAgICBmdXR1cmVQb2ludC54IC0gY3VycmVudFBvaW50LnhcbiAgICAgICkgLVxuICAgICAgICBNYXRoLmF0YW4yKDAsIGN1cnJlbnRQb2ludC54ICsgMSkpICpcbiAgICAgICAgKDE4MCAvIE1hdGguUEkpIC1cbiAgICAgIDkwO1xuICBcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgYHRyYW5zbGF0ZSgke2N1cnJlbnRQb2ludC54IC0gaW5pdGlhbFBvaW50Lnh9LCAke1xuICAgICAgICBjdXJyZW50UG9pbnQueSAtIGluaXRpYWxQb2ludC55XG4gICAgICB9KSByb3RhdGUoJHthbmdsZX0gJHtpbml0aWFsUG9pbnQueH0gJHtpbml0aWFsUG9pbnQueX0pYFxuICAgICk7XG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJvcGFjaXR5OiAxO1wiKTtcbiAgfVxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIG1vdmVUcmlhbmdsZUFsb25nU3RyYWlnaHQodHJpYW5nbGUsIG1hc2tUcmFjaywgb2Zmc2V0LCBtYWluVHJhY2spIHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ2h0ID0gLW9mZnNldDtcbiAgICBjb25zdCBpbml0aWFsUG9pbnQgPSBtYXNrVHJhY2suZ2V0UG9pbnRBdExlbmd0aCgwKTtcbiAgICBjb25zdCBjdXJyZW50UG9pbnQgPSBtYXNrVHJhY2suZ2V0UG9pbnRBdExlbmd0aChjdXJyZW50TGVuZ2h0KTtcbiAgICAvL2NvbnN0IGRhc2hlc0FycmF5ID0gbWFpblRyYWNrLmdldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIikuc3BsaXQoXCIgXCIpO1xuICAgIC8qIGNvbnNvbGUubG9nKGN1cnJlbnRMZW5naHQpO1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoc3VtIDwgY3VycmVudExlbmdodCkge1xuICAgICAgaSsrO1xuICAgICAgc3VtICs9IE51bWJlcihkYXNoZXNBcnJheVtpXSk7XG4gICAgICBjb25zb2xlLmxvZyhpLCBzdW0pO1xuICAgIH1cbiAgICBpZiAoaSAlIDIgPT09IDApIHtcbiAgICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgYHRyYW5zbGF0ZSgke2N1cnJlbnRQb2ludC54IC0gaW5pdGlhbFBvaW50Lnh9LCAke1xuICAgICAgICAgIGN1cnJlbnRQb2ludC55IC0gaW5pdGlhbFBvaW50LnlcbiAgICAgICAgfSlgXG4gICAgICApO1xuICAgIH0qL1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICBgdHJhbnNsYXRlKCR7Y3VycmVudFBvaW50LnggLSBpbml0aWFsUG9pbnQueH0sICR7XG4gICAgICAgIGN1cnJlbnRQb2ludC55IC0gaW5pdGlhbFBvaW50LnlcbiAgICAgIH0pYFxuICAgICk7XG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJvcGFjaXR5OiAxO1wiKTtcbiAgfSIsImxldCBsYXN0U2Nyb2xsUG9zaXRpb24gPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsRGF0YSgpIHtcbiAgbGV0IHJlc3VsdCA9IHsgcG9zaXRpb246IHdpbmRvdy5zY3JvbGxZLCBkaXJlY3Rpb246IFwiXCIgfTtcbiAgcmVzdWx0LmRpcmVjdGlvbiA9IHJlc3VsdC5wb3NpdGlvbiA+IGxhc3RTY3JvbGxQb3NpdGlvbiA/IFwiZG93blwiIDogXCJ1cFwiO1xuICBsYXN0U2Nyb2xsUG9zaXRpb24gPSByZXN1bHQucG9zaXRpb247XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpblRhcmdldChlbGVtZW50LCB0YXJnZXQpIHtcbiAgY29uc3QgZWxlbWVudFBvc2l0aW9uID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gIGlmIChlbGVtZW50UG9zaXRpb24gPD0gdGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYWluV2lkdGgoKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtbWFpblwiKS5vZmZzZXRXaWR0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIG1zKSB7XG4gIGxldCBpc1Rocm90dGxlZCA9IGZhbHNlLFxuICAgIHNhdmVkQXJncyxcbiAgICBzYXZlZFRoaXM7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICBpZiAoaXNUaHJvdHRsZWQpIHtcbiAgICAgIHNhdmVkQXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHNhdmVkVGhpcyA9IHRoaXM7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaXNUaHJvdHRsZWQgPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpc1Rocm90dGxlZCA9IGZhbHNlO1xuICAgICAgaWYgKHNhdmVkQXJncykge1xuICAgICAgICB3cmFwcGVyLmFwcGx5KHNhdmVkVGhpcywgc2F2ZWRBcmdzKTtcbiAgICAgICAgc2F2ZWRBcmdzID0gc2F2ZWRUaGlzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCBtcyk7XG4gIH1cblxuICByZXR1cm4gd3JhcHBlcjtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImUxZjQ1OTliYTM0NGY3MGRlNmRhXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9