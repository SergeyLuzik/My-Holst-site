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
        stepsTrackAnimateFunction(_steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.startY - document.documentElement.clientHeight, _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.startY,
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
/******/ 	__webpack_require__.h = () => ("8af745ea64b6b46d5900")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zMzgwOGUxNWQ2OWZiZGEwN2IxZS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW9EO0FBQ2Q7QUFDa0M7QUFDSTtBQUNmO0FBQzdEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBUTtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGFBQWE7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGFBQWE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxvQkFBb0I7QUFDM0Q7QUFDQTtBQUNBOztBQUVBLEVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0Isc0VBQXNFO0FBQ3RFO0FBQ0EsNkJBQTZCLGtCQUFrQixRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGtCQUFrQjtB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOzs7Ozs7Ozs7VUNoREEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvYW5pbWF0aW9ucy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvYnVyZ2VyLW1lbnUuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL2ZlZWRiYWNrLXNsaWRlci5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvaGVyby1zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL2ltZy10aHVtYm5haWxzLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9zdGVwcy10cmFjay9zdGVwcy1saW5lLXZhcnMuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3N0ZXBzLXRyYWNrL3N0cmFpZ2h0LXRyYWNrLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9zdGVwcy10cmFjay90cmlhbmdsZS5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0TWFpbldpZHRoLCBpblRhcmdldCB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlQ3VydmVkU3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL2N1cnZlZC10cmFjay5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0cmFpZ2h0LXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBzdGVwc0xpbmUgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdGVwcy1saW5lLXZhcnMuanNcIjtcbi8vbGV0IHN0ZXBzTGluZS5zdGFydFksIHN0ZXBzTGluZS5lbmRZLCBzdGVwc0xpbmUucGF0aExlbmd0aDtcblxuXG5mdW5jdGlvbiBhbmltTnVtYmVyKG51bU9iaiwgZHVyYXRpb24pIHtcbiAgY29uc3QgbnVtID0gcGFyc2VJbnQobnVtT2JqLmlubmVySFRNTC5yZXBsYWNlKFwiIFwiLCBcIlwiKSwgMTApO1xuICBsZXQgc3RhcnRUaW1lO1xuXG4gIGNvbnN0IHN0ZXAgPSAodGltZXN0YW1wKSA9PiB7XG4gICAgaWYgKHN0YXJ0VGltZSA9PT0gdW5kZWZpbmVkKSBzdGFydFRpbWUgPSB0aW1lc3RhbXA7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBwYXJzZUZsb2F0KFxuICAgICAgTWF0aC5taW4oKHRpbWVzdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvbiwgMSkudG9GaXhlZCgyKVxuICAgICk7XG4gICAgbnVtT2JqLmlubmVySFRNTCA9XG4gICAgICBNYXRoLmZsb29yKHByb2dyZXNzICogbnVtKS50b0xvY2FsZVN0cmluZyhcInJ1LVJVXCIsIHtcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICB9KSArIFwiK1wiO1xuXG4gICAgaWYgKHByb2dyZXNzIDwgMSkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICB9XG4gIH07XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRlRWxlbWVudHMoZWxlbWVudHMsIHRhcmdldFBvc2l0aW9uLCBoYW5kbGVyRnVuYykge1xuICBsZXQgZWxlbWVudHNDbGFzc2VzQ291bnQgPSB7fTtcbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNjcm9sbGVkLWluXCIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgLy8gY29uc3QgZWxlbWVudFBvc2l0aW9uID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgaWYgKGluVGFyZ2V0KGVsZW1lbnQsIHRhcmdldFBvc2l0aW9uKS8qZWxlbWVudFBvc2l0aW9uIDw9IHRhcmdldFBvc2l0aW9uKi8pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRDbGFzcyA9IGVsZW1lbnQuY2xhc3NMaXN0WzBdO1xuXG4gICAgICBpZiAoZWxlbWVudENsYXNzIGluIGVsZW1lbnRzQ2xhc3Nlc0NvdW50KSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNjcm9sbGVkLWluXCIpO1xuICAgICAgICB9LCAxMDAgKiBlbGVtZW50c0NsYXNzZXNDb3VudFtlbGVtZW50Q2xhc3NdKTtcbiAgICAgICAgZWxlbWVudHNDbGFzc2VzQ291bnRbZWxlbWVudENsYXNzXSArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudHNDbGFzc2VzQ291bnRbZWxlbWVudENsYXNzXSA9IDE7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNjcm9sbGVkLWluXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9tb19fc3RhdGlzdGljc1wiKSkge1xuICAgICAgICBlbGVtZW50XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvbW9fX3N0YXRpc3RpY3MtZGVzY3JpcHRpb25cIilcbiAgICAgICAgICAuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIGFuaW1OdW1iZXIoZWwsIDI1MDApO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbWF0ZS1jaGlsZHNcIikpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBlbGVtZW50LmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgIC8qaWYgKGNoaWxkLmNsYXNzTGlzdC5jb250YWlucyhcImxpbmUtc3RhcnRcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICAgICAgY29uc3QgYW5pbWF0ZUFyZ3VtZW50cyA9IFtcbiAgICAgICAgICAgICAgY3VycmVudFNjcm9sbFBvc2l0aW9uLFxuICAgICAgICAgICAgICBzdGVwc0xpbmUuc3RhcnRZLFxuICAgICAgICAgICAgICBzdGVwc0xpbmUuZW5kWSxcbiAgICAgICAgICAgICAgc3RlcHNMaW5lLnBhdGhMZW5ndGgsXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgY29uc3QgYW5pbWF0ZUZ1bmN0aW9uID1cbiAgICAgICAgICAgICAgZ2V0TWFpbldpZHRoKCkgPD0gMTMwMFxuICAgICAgICAgICAgICAgID8gYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFja1xuICAgICAgICAgICAgICAgIDogYW5pbWF0ZUN1cnZlZFN0ZXBzVHJhY2s7XG5cbiAgICAgICAgICAgIGNvbnN0IHRocm90dGxlZEFuaW1hdGVTdGVwc1RyYWNrID0gdGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICAgICAgICBhbmltYXRlRnVuY3Rpb24oLi4uYW5pbWF0ZUFyZ3VtZW50cywgdGhyb3R0bGVkQW5pbWF0ZVN0ZXBzVHJhY2spO1xuICAgICAgICAgICAgfSwgNTApO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aHJvdHRsZWRBbmltYXRlU3RlcHNUcmFjayk7XG4gICAgICAgICAgfSovXG4gICAgICAgICAgY2hpbGQuY2xhc3NMaXN0LmFkZChcInNjcm9sbGVkLWluXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHdpbmRvdy5zY3JvbGxZID5cbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgLVxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICogMS4yXG4gICAgKSB7XG4gICAgICBlbGVtZW50c1tlbGVtZW50cy5sZW5ndGggLSAxXS5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG5cbiAgICAgIC8vd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlckZ1bmMpO1xuICAgIH1cbiAgfSk7XG59XG4iLCIgIGNvbnN0IGhlYWRlckhlaWdodCA9IGAke1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJcIikub2Zmc2V0SGVpZ2h0XG4gIH1weGA7XG4gIFxuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKFwiOnJvb3RcIilcbiAgICAuc3R5bGUuc2V0UHJvcGVydHkoXCItLWhlYWRlci1oaWdodFwiLCBgJHtoZWFkZXJIZWlnaHR9YCk7XG5cbiAgY29uc3QgYnVyZ2VyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvblwiKTtcbiAgZnVuY3Rpb24gbWVudUhhbmRsZXIobWVudVNlbGVjdG9yKSB7XG4gICAgbWVudS5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3RvcC1zY3JvbGxcIik7XG4gICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoYCR7bWVudVNlbGVjdG9yfV9vcGVuYCk7XG4gICAgICBidXJnZXJCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcInBhZ2UtaGVhZGVyX19idXJnZXItYnV0dG9uX29wZW5cIik7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCB0YXJnZXRJZCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCk7XG4gICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xuICAgICAgICB0YXJnZXRFbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBidXJnZXJNZW51SGFuZGxlcihtYWluV2lkdGgpIHtcbiAgYnVyZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIChlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcItC60LvQuNC6INC90LAg0LrQvdC+0L/QutGDINCyINC+0LHRgNCw0LHQvtGC0YfQuNC60LUg0LrQvdC+0L/QutC4XCIpO1xuICAgICAgY29uc3QgbWVudSA9XG4gICAgICBtYWluV2lkdGggPD0gNjgwXG4gICAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19tZW51XCIpXG4gICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19uYXZcIik7XG4gICAgICAvL21lbnUuc3R5bGUudG9wID0gaGVhZGVySGVpZ2h0O1xuICAgICAgLyplLnN0b3BQcm9wYWdhdGlvbigpOyAvLyB0b2RvINGC0LDQutC+0LUg0YHQtdCx0LUg0YDQtdGI0LXQvdC40LUgKNC/0YDQuCDQutC70LjQutC1INC90LAg0LrQvdC+0L/QutGDINCy0LXRiNCw0YLRjCDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvdCwIGRvY3VtZW50INC4INGD0LbQtSDQsiDQvdC10Lwg0L7QsdGA0LDQsdCw0YLRi9Cy0LDRgtGMINC4INC60L3QvtC/0LrRgyDQuCDRgtCw0L8g0L/QviDRgdGB0YvQu9C60LUg0Lgg0L7QutC90YM/KVxuICAgIGJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwicGFnZS1oZWFkZXJfX2J1cmdlci1idXR0b25fb3BlblwiKTsgLy8g0LLRi9C90LXRgdGC0Lgg0LIg0YTRg9C90LrRhtC40Y4gbWVudVRvZ2dsZVxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwic3RvcC1zY3JvbGxcIik7XG4gICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKGAke21lbnUuY2xhc3NMaXN0WzBdfV9vcGVuYCk7Ki9cbiAgICAgIC8vYnVyZ2VyQnV0dG9uLm9uY2xpY2sgPSBudWxsO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwi0YHQvtCx0YvRgtC40LUgY2xpY2sg0LIg0L7QsdGA0LDQsdC+0YLRh9C40LrQtSDQtNC+0LrRg9C80LXQvdGC0LBcIik7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWUudGFyZ2V0LmNsb3Nlc3QoXCIucGFnZS1oZWFkZXJfX2J1cmdlci1idXR0b25cIikgJiZcbiAgICAgICAgICAgICFtZW51LmNsYXNzTGlzdC5jb250YWlucyhgJHttZW51LmNsYXNzTGlzdFswXX1fb3BlbmApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcItC60LvQuNC6INC90LUg0L3QsCDQutC90L7Qv9C60YMg0L/RgNC4INC30LDQutGA0YvRgtC+0Lwg0LzQtdC90Y5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHRvZG8g0L/RgNC4INC60LvQuNC60LUg0L/QvtGB0LvQtSDQvtGC0LrRgNGL0YLQuNGPINGB0YDQsNCx0LDRgtGL0LLQsNC10YIg0YHQviAy0LPQviDRgNCw0LfQsFxuICAgICAgICAgIGJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwicGFnZS1oZWFkZXJfX2J1cmdlci1idXR0b25fb3BlblwiKTtcbiAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcInN0b3Atc2Nyb2xsXCIpO1xuICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShgJHttZW51LmNsYXNzTGlzdFswXX1fb3BlbmApO1xuXG4gICAgICAgICAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoXCIucGFnZS1oZWFkZXJfX25hdi1saXN0XCIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcItC60LvQuNC6INC90LAg0YHRgdGL0LvQutGDINCyINC80LXQvdGOXCIpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSlcbiAgICAgICAgICAgICAgLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8veyBvbmNlOiB0cnVlIH1cbiAgICAgICk7XG4gICAgfSxcbiAgICB7IG9uY2U6IHRydWUgfVxuICApO1xuIH0iLCJjb25zdCBzbGlkZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVkYmFja19fbGlzdFwiKSxcbnNsaWRlcyA9IHNsaWRlc0xpc3QuY2hpbGRyZW4sXG5sZWZ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVkYmFjayA+LnNsaWRlci1idXR0b25fbGVmdFwiKSxcbnJpZ2h0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVkYmFjayA+IC5zbGlkZXItYnV0dG9uX3JpZ2h0XCIpLFxudHJhbnNpdGlvblRpbWUgPSBcIjFzXCI7XG5cbmxldCBpbkFjdGlvbiA9IGZhbHNlO1xuXG5mdW5jdGlvbiBtb3ZMZWZ0KGFtb3VudFNsaWRlc09uTGlzdCwgb2Zmc2V0LCBnYXBWYWx1ZSkge1xuc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gIHNsaWRlc0xpc3Qub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbW91bnRTbGlkZXNPbkxpc3Q7IGkrKykge1xuICAgIHNsaWRlc0xpc3QuYXBwZW5kKHNsaWRlc1swXSk7XG4gIH1cbiAgc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXR9cHgpYDtcblxuICBpbkFjdGlvbiA9IGZhbHNlO1xufTtcbnNsaWRlc0xpc3Quc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXQgKiAyIC0gZ2FwVmFsdWV9cHgpYDtcbn1cbmZ1bmN0aW9uIG1vdlJpZ2h0KGFtb3VudFNsaWRlc09uTGlzdCwgb2Zmc2V0LCBnYXBWYWx1ZSkge1xuc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gIHNsaWRlc0xpc3Qub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbW91bnRTbGlkZXNPbkxpc3Q7IGkrKykge1xuICAgIHNsaWRlc0xpc3QucHJlcGVuZChzbGlkZXNMaXN0Lmxhc3RFbGVtZW50Q2hpbGQpO1xuICB9XG4gIHNsaWRlc0xpc3Quc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstb2Zmc2V0fXB4KWA7XG5cbiAgaW5BY3Rpb24gPSBmYWxzZTtcbn07XG5cbnNsaWRlc0xpc3Quc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke2dhcFZhbHVlfXB4KWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZWVkYmFja1NsaWRlckhhbmRsZXIoKSB7XG4vL2xldCBNdXRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyICgoKSA9PiB7XG4gY29uc3Qgc2xpZGVXaWR0aCA9IHNsaWRlc1swXS5vZmZzZXRXaWR0aCxcbiAgc2xpZGVzTGlzdFdpZHRoID0gc2xpZGVzTGlzdC5vZmZzZXRXaWR0aCxcbiAgZ2FwVmFsdWUgPVxuICAgIChzbGlkZXNMaXN0V2lkdGggLyAxMDApICpcbiAgICBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoc2xpZGVzTGlzdCkuZ2FwKSxcbiAgYW1vdW50U2xpZGVzT25MaXN0ID0gTWF0aC5mbG9vcihzbGlkZXNMaXN0V2lkdGggLyAoc2xpZGVXaWR0aCArIGdhcFZhbHVlKSksXG4gIC8qc2xpZGVMaXN0c0Ftb3VudCA9IE1hdGguY2VpbChzbGlkZXMubGVuZ3RoIC8gYW1vdW50U2xpZGVzT25MaXN0KSwqL1xuICBvZmZzZXQgPSA0ICogc2xpZGVXaWR0aCArIDMgKiBnYXBWYWx1ZTtcblxuICAvLyBJbml0aWFsaXplIHNsaWRlciBzdGFydCBwb3NpdGlvblxuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXR9cHgpYDtcblxuICByaWdodEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4geyAvLyB0b2RvINC/0L7QstGC0L7RgNGP0LXRgtGB0Y8g0L7RgiBoZXJvIHNsaWRlcj8g0YPQvdC40YTQuNGG0LjRgNC+0LLQsNGC0Ywg0YfQtdGA0LXQtyDQvtGC0LTQtdC70YzQvdGL0Lkg0LzQvtC00YPQu9GMP1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZMZWZ0KGFtb3VudFNsaWRlc09uTGlzdCwgb2Zmc2V0LCBnYXBWYWx1ZSk7XG4gIH07XG4gIGxlZnRCdXR0b24ub25jbGljayA9ICgpID0+IHsgLy8gdG9kbyDQv9C+0LLRgtC+0YDRj9C10YLRgdGPINC+0YIgaGVybyBzbGlkZXI/INGD0L3QuNGE0LjRhtC40YDQvtCy0LDRgtGMINGH0LXRgNC10Lcg0L7RgtC00LXQu9GM0L3Ri9C5INC80L7QtNGD0LvRjD9cbiAgICBpZiAoaW5BY3Rpb24pIHJldHVybjtcbiAgICBpbkFjdGlvbiA9IHRydWU7XG4gICAgbW92UmlnaHQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKTtcbiAgfTtcbiAgLy99KVxuXG4gLy8gTXV0T2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHthdHRyaWJ1dGVGaWx0ZXI6IFtcImNsYXNzXCJdfSk7XG59XG5cbiIsImNvbnN0IHNsaWRlc1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcl9fc2xpZGVzLWxpc3RcIiksXG4gIGFjdGl2U2xpZGVXaWR0aCA9IHBhcnNlSW50KFxuICAgIGdldENvbXB1dGVkU3R5bGUoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fX3NsaWRlclwiKVxuICAgICkuZ3JpZFRlbXBsYXRlQ29sdW1ucy5zcGxpdChcIiBcIilbMF0sXG4gICAgMTBcbiAgKSxcbiAgZ2FwVmFsdWUgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHNsaWRlc1dyYXBwZXIpLmdhcCksXG4gIHNsaWRlcyA9IHNsaWRlc1dyYXBwZXIuY2hpbGRyZW4sXG4gIHNsaWRlV2lkdGggPSBzbGlkZXNbMF0ub2Zmc2V0V2lkdGgsXG4gIGluaXRpYWxPZmZzZXQgPSBzbGlkZVdpZHRoICogMiArIGdhcFZhbHVlIC0gYWN0aXZTbGlkZVdpZHRoLFxuICBvZmZzZXQgPSBzbGlkZVdpZHRoICsgZ2FwVmFsdWUsXG4gIHRyYW5zaXRpb25UaW1lID0gXCIwLjNzXCIsXG4gIHNsaWRlU2NhbGUgPVxuICAgIFwidHJhbnNsYXRlKC0xMi41JSwgY2FsYygxMi41JSAtIDE2cHgpKSBzY2FsZSgxLjI1KVwiLFxuICBsZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXItYnV0dG9uX2xlZnRcIiksXG4gIHJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXItYnV0dG9uX3JpZ2h0XCIpO1xuXG5sZXQgaW5BY3Rpb24gPSBmYWxzZTtcblxuZnVuY3Rpb24gbW92TGVmdChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpIHtcbiAgc2xpZGVzV3JhcHBlci5vbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gICAgc2xpZGVzV3JhcHBlci5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiO1xuICAgIHNsaWRlc1swXS5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcblxuICAgIHNsaWRlc1dyYXBwZXIuYXBwZW5kKHNsaWRlc1swXSk7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1pbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgICBpbkFjdGlvbiA9IGZhbHNlO1xuICB9O1xuICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTsgLy90b2RvINC30LDQtNCw0LLQsNGC0YwgdHJhbnNpdGlvbiDRh9C10YDQtdC3INC30LDQv9GP0YLRg9GOINCy0YHQtdC8INGB0YDQsNC30YM/XG4gIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstb2Zmc2V0IC0gaW5pdGlhbE9mZnNldH1weClgO1xuXG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gIHNsaWRlc1sxXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDApXCI7IC8vIHNjYWxlKDAuMylcblxuICBzbGlkZXNbMl0uc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuICBzbGlkZXNbMl0uc3R5bGUudHJhbnNmb3JtID0gc2xpZGVTY2FsZTtcbiAgc2xpZGVzWzJdLnN0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiA9IFwiY3ViaWMtYmV6aWVyKC43MiwuMDcsLjk1LC43KVwiOyAvLy43NSwwLDEsLjAyIGVhc2UtaW5cbn1cbmZ1bmN0aW9uIG1vdlJpZ2h0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCkge1xuICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG4gICAgc2xpZGVzWzFdLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuXG4gICAgc2xpZGVzV3JhcHBlci5sYXN0RWxlbWVudENoaWxkLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHNsaWRlc1dyYXBwZXIucHJlcGVuZChzbGlkZXNXcmFwcGVyLmxhc3RFbGVtZW50Q2hpbGQpO1xuICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstaW5pdGlhbE9mZnNldH1weClgO1xuXG4gICAgaW5BY3Rpb24gPSBmYWxzZTtcbiAgfTtcbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXQgLSBpbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgc2xpZGVzWzBdLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzWzBdLnN0eWxlLm9wYWNpdHkgPSAxO1xuICBzbGlkZXNbMF0uc3R5bGUudHJhbnNmb3JtID0gc2xpZGVTY2FsZTtcbiAgc2xpZGVzWzBdLnN0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiA9IFwiZWFzZS1pblwiO1xuXG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZSgwKSBzY2FsZSgxKVwiO1xuICBzbGlkZXNbMV0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJjdWJpYy1iZXppZXIoMCwuNzUsLjAyLDEpXCI7IC8vMCwuNzUsLjAyLDEgIC8vIDAsMCwuMDIsMSAvLyAuNzUsMCwxLC4wMlxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGVyb1NsaWRlckhhbmRsZXIoKSB7XG4gIC8vIEluaXRpYWxpemUgc2xpZGVyIHN0YXJ0IHBvc2l0aW9uXG4gIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstaW5pdGlhbE9mZnNldH1weClgO1xuICBzbGlkZXNbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2Zvcm0gPSBzbGlkZVNjYWxlO1xuXG4gIGxlZnQub25jbGljayA9ICgpID0+IHtcbiAgICBpZiAoaW5BY3Rpb24pIHJldHVybjtcbiAgICBpbkFjdGlvbiA9IHRydWU7XG4gICAgbW92UmlnaHQoc2xpZGVzV3JhcHBlciwgb2Zmc2V0KTtcbiAgfTtcbiAgcmlnaHQub25jbGljayA9ICgpID0+IHtcbiAgICBpZiAoaW5BY3Rpb24pIHJldHVybjtcbiAgICBpbkFjdGlvbiA9IHRydWU7XG4gICAgbW92TGVmdChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpO1xuICB9O1xufVxuIiwiZnVuY3Rpb24gc3dhcFBsYWNlaG9sZGVyKHBpY3R1cmUpIHtcbiAgY29uc3QgaW1nID0gcGljdHVyZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xuICBjb25zdCBzb3VyY2VzID0gcGljdHVyZS5xdWVyeVNlbGVjdG9yQWxsKFwic291cmNlXCIpO1xuXG4gIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgcGljdHVyZS5kYXRhc2V0LmxvYWRlZCA9IHRydWU7XG4gICAgLy9pbWcuIHJlbW92ZUF0dHJpYnV0ZShcIlwiKVxuICB9O1xuICBpbWcub25lcnJvciA9ICgpID0+IHtcbiAgICBwaWN0dXJlLmRhdGFzZXQubG9hZGVkID0gZmFsc2U7XG4gIH07XG4gIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgc291cmNlLnNyY3NldCA9IHNvdXJjZS5kYXRhc2V0LnNyY3NldDtcbiAgICBzb3VyY2Uuc2l6ZXMgPSBzb3VyY2UuZGF0YXNldC5zaXplcztcbiAgfSk7XG4gIGltZy5zcmNzZXQgPSBpbWcuZGF0YXNldC5zcmNzZXQ7XG4gIGltZy5zaXplcyA9IGltZy5kYXRhc2V0LnNpemVzO1xuICAvL2ltZy5zcmMgPSBpbWcuZGF0YXNldC5zcmNzZXQubWF0Y2goLywgKC4qKSAuKyQvKVsxXTsgLy8gdG9kbyDQv9GA0Lgg0LXQtNC40L3RgdGC0LLQtdC90L3QvtC8INCy0LDRgNC40LDQvdGC0LUg0LLRi9Cx0YDQsNGB0YvQstCw0LXRgiBudWxsXG4gIGNvbnN0IHNyY3NldEFyciA9IGltZy5kYXRhc2V0LnNyY3NldC5zcGxpdChcIiBcIik7XG4gIGltZy5zcmMgPSBzcmNzZXRBcnJbc3Jjc2V0QXJyLmxlbmd0aCAtIDJdO1xuICAvL2NvbnNvbGUubG9nKHNyY3NldEFyciwgc3Jjc2V0QXJyW3NyY3NldEFyci5sZW5ndGggLSAyXSk7XG59XG5cbmNvbnN0IHBpY3R1cmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInBpY3R1cmVcIik7XG5cbmNvbnN0IGNhbGxiYWNrID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcbiAgICAgIHN3YXBQbGFjZWhvbGRlcihlbnRyeS50YXJnZXQpO1xuICAgICAgLy9jb25zb2xlLmxvZyhlbnRyeS50YXJnZXQpO1xuICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpbWdUaHVtYm5haWxzSGFuZGxlcigpIHtcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuXG5waWN0dXJlcy5mb3JFYWNoKChwaWN0dXJlKSA9PiB7XG4gIG9ic2VydmVyLm9ic2VydmUocGljdHVyZSk7XG59KTtcbn0iLCJpbXBvcnQgeyBnZXRNYWluV2lkdGgsIHNjcm9sbERhdGEsIGluVGFyZ2V0IH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVFbGVtZW50cyB9IGZyb20gXCIuL2FuaW1hdGlvbnMuanNcIjtcbmltcG9ydCB7IGFkZEN1cnZlZFRyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhZGRTdHJhaWdodFRyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmltcG9ydCB7IGltZ1RodW1ibmFpbHNIYW5kbGVyIH0gZnJvbSBcIi4vaW1nLXRodW1ibmFpbHMuanNcIjtcbmltcG9ydCB7IGJ1cmdlck1lbnVIYW5kbGVyIH0gZnJvbSBcIi4vYnVyZ2VyLW1lbnUuanNcIjtcbmltcG9ydCB7IGhlcm9TbGlkZXJIYW5kbGVyIH0gZnJvbSBcIi4vaGVyby1zbGlkZXIuanNcIjtcbmltcG9ydCB7IGZlZWRiYWNrU2xpZGVySGFuZGxlciB9IGZyb20gXCIuL2ZlZWRiYWNrLXNsaWRlci5qc1wiO1xuaW1wb3J0IHsgc3RlcHNMaW5lIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RlcHMtbGluZS12YXJzLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlQ3VydmVkU3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL2N1cnZlZC10cmFjay5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0cmFpZ2h0LXRyYWNrLmpzXCI7XG5jb25zdCBtYWluV2lkdGggPSBnZXRNYWluV2lkdGgoKTtcbmltZ1RodW1ibmFpbHNIYW5kbGVyKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIGNvbnN0IHByZWxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlbG9hZGVyXCIpO1xuXG4gIHByZWxvYWRlci5vbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gICAgcHJlbG9hZGVyLm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzdG9wLXNjcm9sbFwiKTtcbiAgICBwcmVsb2FkZXIucmVtb3ZlKCk7XG5cbiAgICBpZiAobWFpbldpZHRoIDw9IDEzMDApIHtcbiAgICAgIGFkZFN0cmFpZ2h0VHJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkQ3VydmVkVHJhY2soKTtcbiAgICB9XG4gICAgaWYgKG1haW5XaWR0aCA8PSAxMjUwKSB7XG4gICAgICBidXJnZXJNZW51SGFuZGxlcihtYWluV2lkdGgpO1xuICAgIH1cbiAgICBpZiAobWFpbldpZHRoID4gMTIwMCkge1xuICAgICAgZmVlZGJhY2tTbGlkZXJIYW5kbGVyKCk7XG4gICAgfVxuICAgIGlmIChtYWluV2lkdGggPiA4MDApIHtcbiAgICAgIGhlcm9TbGlkZXJIYW5kbGVyKCk7XG4gICAgfVxuY29uc29sZS5sb2coc3RlcHNMaW5lKTtcbiAgICAvKmNvbnN0IGVyID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgZXIoKTtcbiAgICB9KTsqL1xuXG4gICAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LDQvdC40LzQsNGG0LjQuVxuICAgIGNvbnN0IGFuaW1hdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hbmltYXRlXCIpOyAvLyB0b2RvPyDQv9C+0LzQtdC90Y/RgtGMINC90LAgYnljbGFzc25hbWUgOm5vdCBzY3JvbGxlZCDRh9GC0L7QsdGLINC60L7Qu9C70LXQutGG0LjRjyDQvtCx0L3QvtCy0LvRj9C70LDRgdGMINGB0LDQvNCwP1xuICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAqIDAuODtcblxuICAgIGFuaW1hdGVFbGVtZW50cyhhbmltYXRpb25FbGVtZW50cywgdGFyZ2V0UG9zaXRpb24pO1xuXG4gICAgY29uc3Qgc3RlcHNUcmFja0FuaW1hdGVGdW5jdGlvbiA9XG4gICAgbWFpbldpZHRoIDw9IDEzMDBcbiAgICAgID8gYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFja1xuICAgICAgOiBhbmltYXRlQ3VydmVkU3RlcHNUcmFjaztcblxuICAgIGNvbnN0IHRocm90dGxlZFNjcm9sbEFuaW1hdGlvbkhhbmRsZXIgPSB0aHJvdHRsZSgoKSA9PiB7XG5cbiAgICAgIGNvbnN0IHNjcm9sbCA9IHNjcm9sbERhdGEoKTtcbiAgICAgIGlmKHNjcm9sbC5kaXJlY3Rpb24gPT09IFwiZG93blwiKXtcbiAgICAgICAgdGhyb3R0bGUoYW5pbWF0ZUVsZW1lbnRzKFxuICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uKSwgMTAwKVxuICAgICAgfVxuICAgICAgaWYoaW5UYXJnZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5lLXN0YXJ0XCIpLCB0YXJnZXRQb3NpdGlvbikpe1xuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsgc3RhcnQtbGl0ZVwiKTtcbiAgICAgICAgc3RlcHNUcmFja0FuaW1hdGVGdW5jdGlvbihzdGVwc0xpbmUuc3RhcnRZIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgc3RlcHNMaW5lLnN0YXJ0WSxcbiAgICAgICAgICBzdGVwc0xpbmUuZW5kWSxcbiAgICAgICAgICBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgICB9XG4gICAgfSwgNTApO1xuICAgIFxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhyb3R0bGVkU2Nyb2xsQW5pbWF0aW9uSGFuZGxlcik7XG5cbiAgICAvL2xldCBsYXN0U2Nyb2xsUG9zaXRpb24gPSAwO1xuICAgIC8qY29uc3QgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzID0gdGhyb3R0bGUoYW5pbWF0ZUVsZW1lbnRzLCAyMDApOyovXG5cbiAgICAvKmNvbnN0IHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyA9IHRocm90dGxlKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHNjcm9sbERhdGEoKSk7XG4gICAgICAvLyB0b2RvINCy0YvQvdC10YHRgtC4INC/0YDQvtCy0LXRgNC60YMg0L3QsNC/0YDQsNCy0LvQtdC90LjRjyDRgdC60YDQvtC70LvQsCwg0YLRg9GCINC00L7Qu9C20L3QsCDQsdGL0YLRjCDRgtC+0LvRjNC60L4g0YTRg9C90LrRhtC40Y9cbiAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgaWYgKGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA+IGxhc3RTY3JvbGxQb3NpdGlvbikge1xuICAgICAgICBhbmltYXRlRWxlbWVudHMoXG4gICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb24sXG4gICAgICAgICAgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBsYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG4gICAgfSwgMTAwKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyk7XG4gICAgKi9cbiAgfTtcbiAgcHJlbG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJwcmVsb2FkZXJfaGlkZVwiKTsgLy90b2RvINC/0LXRgNC10L3QtdGB0YLQuCDQv9C+0YHQu9C1IHRyYW5zaXRpb25lbmQ/INC/0L7RgtC+0LzRgyDRh9GC0L4g0YHQvdCw0YfQsNC70LAg0LfQsNC/0YPRgdC60LDQtdC8INCw0L3QuNC80LDRhtC40Y4g0LAg0L/QvtGC0L7QvCDRgtC+0LvRjNC60L4g0LTQvtCx0LDQstC70Y/QtdC8INGB0L7QsdGL0YLQuNC1P1xufSk7XG5cbi8vd2luZG93Lm9ubG9hZCA9IDtcbiIsImltcG9ydCB7IGFkZFRyaWFuZ2xlLCBtb3ZlVHJpYW5nbGVBbG9uZ0N1cnZlIH0gZnJvbSBcIi4vdHJpYW5nbGUuanNcIjtcbmltcG9ydCB7IHN0ZXBzTGluZSB9IGZyb20gXCIuL3N0ZXBzLWxpbmUtdmFycy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEN1cnZlZFRyYWNrKCkge1xuICAgIGNvbnN0IHN0ZXBzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNcIik7XG4gICAgY29uc3QgaW5pdGlhbFggPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcbiAgICBjb25zdCBpbml0aWFsWSA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICsgd2luZG93LnNjcm9sbFk7XG4gICAgY29uc3QgY29udHJvbFBvaW50T2Zmc2V0WSA9IDUzMztcbiAgICBjb25zdCBtYXJrZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYXJrZXJcIik7XG4gICAgY29uc3QgbWFya2Vyc0NlbnRlckNvb3JkcyA9IFtdO1xuICBcbiAgICBtYXJrZXJzLmZvckVhY2goKG1hcmtlcikgPT4ge1xuICAgICAgLy8gdG9kbyDQv9C10YDQtdC00LDQstCw0YLRjCDRg9C20LUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0INGH0YLQvtCx0Ysg0LrQsNC20LTRi9C5INGA0LDQtyDQvdC1INCy0YvQt9GL0LLQsNGC0YxcbiAgICAgIGNvbnN0IG1hcmtlclJlY3QgPSBtYXJrZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBsZXQgY2VudGVyQ29vcmRzID0ge307XG4gIFxuICAgICAgY2VudGVyQ29vcmRzLnggPSBtYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIG1hcmtlclJlY3Qud2lkdGggLyAyO1xuICAgICAgY2VudGVyQ29vcmRzLnkgPVxuICAgICAgICBtYXJrZXJSZWN0LnkgLSBpbml0aWFsWSArIG1hcmtlclJlY3QuaGVpZ2h0IC8gMiArIHdpbmRvdy5zY3JvbGxZO1xuICBcbiAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHMucHVzaChjZW50ZXJDb29yZHMpOyAvLyB0b2RvINC/0YPRiNC40YLRjCDRgdGA0LDQt9GDIHt9INCx0LXQtyDRgdC+0LfQtNCw0L3QuNGPINC/0LXRgNC10LzQtdC90L3Ri9GFXG4gICAgfSk7XG4gICAgc3RlcHNMaW5lLnN0YXJ0WSA9IG1hcmtlcnNDZW50ZXJDb29yZHNbMF0ueSArIGluaXRpYWxZO1xuICAgIHN0ZXBzTGluZS5lbmRZID1cbiAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbbWFya2Vyc0NlbnRlckNvb3Jkcy5sZW5ndGggLSAxXS55ICsgaW5pdGlhbFk7XG4gIFxuICAgIGNvbnN0IE5Tc3RyaW5nID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJzdmdcIik7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrXCIpO1xuICAgIGNvbnN0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwicGF0aFwiKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX21haW4tdHJhY2tcIik7XG4gICAgbGV0IGQgPSBgTSAke21hcmtlcnNDZW50ZXJDb29yZHNbMF0ueH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnl9YDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1hcmtlcnNDZW50ZXJDb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGQgKz0gYEMke21hcmtlcnNDZW50ZXJDb29yZHNbaSAtIDFdLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbaSAtIDFdLnkgKyBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS54fSAke1xuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnkgLSBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS54fSAke21hcmtlcnNDZW50ZXJDb29yZHNbaV0ueX1gO1xuICAgIH1cbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgZCk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwibm9uZVwiKTtcbiAgICBzdGVwc0xpbmUucGF0aExlbmd0aCA9IE1hdGgucm91bmQocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChwYXRoKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQoXG4gICAgICBhZGRUcmlhbmdsZShcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1swXS54LFxuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnksXG4gICAgICAgIDE1IC8qLCBzdmcqL1xuICAgICAgKVxuICAgICk7XG4gIFxuICAgIHN0ZXBzU2VjdGlvbi5hcHBlbmRDaGlsZChzdmcpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrKFxuICAgIHN0YXJ0U2Nyb2xsUG9zaXRpb24sXG4gICAgc3RhcnRQb2ludCxcbiAgICBlbmRQb2ludCxcbiAgICBwYXRoTGVuZ2h0LFxuICAgIGhhbmRsZXJGdW5jXG4gICkge1xuICAgIGNvbnN0IHRyYWNrUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX21haW4tdHJhY2tcIik7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IGVuZFBvaW50IC0gc3RhcnRQb2ludDtcbiAgICBjb25zdCBsaW5lU2Nyb2xsUHJvZ3JlcyA9ICh3aW5kb3cuc2Nyb2xsWSAtIHN0YXJ0U2Nyb2xsUG9zaXRpb24pIC8gbGluZUhlaWdodDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhcIndpbmRvdy5zY3JvbGxZIFwiICsgd2luZG93LnNjcm9sbFkpO1xuICAgIGNvbnNvbGUubG9nKFwic3RhcnRTY3JvbGxQb3NpdGlvbiBcIiArIHN0YXJ0U2Nyb2xsUG9zaXRpb24pO1xuICAgIGNvbnNvbGUubG9nKFwibGluZUhlaWdodCBcIiArIGxpbmVIZWlnaHQpO1xuICAgIGNvbnNvbGUubG9nKFwibGluZVNjcm9sbFByb2dyZXMgXCIgKyBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgIGxldCBvZmZzZXQgPSBwYXRoTGVuZ2h0ICogKDEgLSBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gIFxuICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICAgIHRyYWNrUGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBvZmZzZXQpO1xuICAgIG1vdmVUcmlhbmdsZUFsb25nQ3VydmUoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX190cmFjay1hcnJvd1wiKSxcbiAgICAgIHRyYWNrUGF0aCxcbiAgICAgIHBhdGhMZW5naHQsXG4gICAgICBvZmZzZXRcbiAgICApO1xuICB9IiwiZXhwb3J0IGxldCBzdGVwc0xpbmUgPSB7c3RhcnRZOiBcIlwiLCBlbmRZOlwiXCIsIHBhdGhMZW5ndGg6XCJcIn07IiwiaW1wb3J0IHsgYWRkVHJpYW5nbGUsIG1vdmVUcmlhbmdsZUFsb25nU3RyYWlnaHQgfSBmcm9tIFwiLi90cmlhbmdsZS5qc1wiO1xuaW1wb3J0IHsgc3RlcHNMaW5lIH0gZnJvbSBcIi4vc3RlcHMtbGluZS12YXJzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gYWRkU3RyYWlnaHRUcmFjaygpIHtcbiAgICBjb25zdCBzdGVwc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzXCIpO1xuICAgIGNvbnN0IGdhcCA9IHBhcnNlSW50KFxuICAgICAgd2luZG93XG4gICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKHN0ZXBzU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX19saXN0XCIpKVxuICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShcImdhcFwiKVxuICAgICk7XG4gICAgY29uc3QgaW5pdGlhbFggPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcbiAgICBjb25zdCBpbml0aWFsWSA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICsgd2luZG93LnNjcm9sbFk7XG4gICAgLy9jb25zb2xlLmxvZyhzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHdpbmRvdy5zY3JvbGxZKTtcbiAgICBsZXQgbWFya2Vyc1JlY3QgPSBbXTtcbiAgICBjb25zdCBtYXJrZXJzQ29vcmRzID0gW107XG4gIFxuICAgIGNvbnN0IGZpcnN0TWFya2VyUmVjdCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5tYXJrZXJcIilcbiAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBtYXJrZXJzUmVjdC5wdXNoKGZpcnN0TWFya2VyUmVjdCk7XG4gIFxuICAgIGNvbnN0IGxpbmVQYWRkaW5nID0gZmlyc3RNYXJrZXJSZWN0LmhlaWdodCAvIDIgLSA1OyAvLyB0b2RvINC+0YLQvdC40LzQsNC90LjQtSA1INGD0LHQuNGA0LDQtdGCINC30LDQt9C+0YAg0LzQtdC20LTRgyDQu9C40L3QuNC10Lkg0Lgg0LzQsNGA0LrQtdGA0L7QvCAo0LrQvtGB0YLRi9C70YzQvdC+KVxuICBcbiAgICAvKmNvbnN0IGZpcnN0TWFya2VyQ29vcmRzID0ge1xuICAgICAgeDogZmlyc3RNYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIGZpcnN0TWFya2VyUmVjdC53aWR0aCAvIDIsXG4gICAgICB5OiBmaXJzdE1hcmtlclJlY3QueSAtIGluaXRpYWxZLFxuICAgIH07XG4gICAgZmlyc3RNYXJrZXJDb29yZHMucHVzaChtYXJrZXJzQ29vcmRzKTsqL1xuICBcbiAgICBjb25zdCBsYXN0TWFya2VyUmVjdCA9IGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5zdGVwc19faXRlbTpsYXN0LWNoaWxkID4ubWFya2VyXCIpXG4gICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbWFya2Vyc1JlY3QucHVzaChsYXN0TWFya2VyUmVjdCk7XG4gIFxuICAgIC8qIGNvbnN0IGxhc3RNYXJrZXJDb29yZHMgPSB7XG4gICAgICB4OiBsYXN0TWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBsYXN0TWFya2VyUmVjdC53aWR0aCAvIDIsXG4gICAgICB5OiBsYXN0TWFya2VyUmVjdC55IC0gaW5pdGlhbFksXG4gICAgfTtcbiAgICBsYXN0TWFya2VyQ29vcmRzLnB1c2gobWFya2Vyc0Nvb3Jkcyk7Ki9cbiAgXG4gICAgbWFya2Vyc1JlY3QuZm9yRWFjaCgobWFya2VyUmVjdCkgPT4ge1xuICAgICAgLypjb25zdCBtYXJrZXJSZWN0ID0gbWFya2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGV0IGNlbnRlckNvb3JkcyA9IHt9O1xuICBcbiAgICAgIGNlbnRlckNvb3Jkcy54ID0gbWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBtYXJrZXJSZWN0LndpZHRoIC8gMjtcbiAgICAgIGNlbnRlckNvb3Jkcy55ID0gbWFya2VyUmVjdC55IC0gaW5pdGlhbFkgKyBtYXJrZXJSZWN0LmhlaWdodCAvIDI7XG4gICovXG4gICAgICBtYXJrZXJzQ29vcmRzLnB1c2goe1xuICAgICAgICB4OiBtYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIG1hcmtlclJlY3Qud2lkdGggLyAyLFxuICAgICAgICB5OiBtYXJrZXJSZWN0LnkgLSBpbml0aWFsWSArIG1hcmtlclJlY3QuaGVpZ2h0IC8gMiArIHdpbmRvdy5zY3JvbGxZLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc3RlcHNMaW5lLnN0YXJ0WSA9IG1hcmtlcnNDb29yZHNbMF0ueSArIGluaXRpYWxZO1xuICAgIHN0ZXBzTGluZS5lbmRZID0gbWFya2Vyc0Nvb3Jkc1ttYXJrZXJzQ29vcmRzLmxlbmd0aCAtIDFdLnkgKyBpbml0aWFsWTtcbiAgICBjb25zb2xlLmxvZyhpbml0aWFsWCwgaW5pdGlhbFksIG1hcmtlcnNSZWN0LCBtYXJrZXJzQ29vcmRzKTtcbiAgICBjb25zdCBOU3N0cmluZyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbiAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwic3ZnXCIpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFja1wiKTtcbiAgICBjb25zdCBtYWluVHJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwicGF0aFwiKTtcbiAgICBsZXQgZCA9IGBNICR7bWFya2Vyc0Nvb3Jkc1swXS54fSAke21hcmtlcnNDb29yZHNbMF0ueX0gTCAke21hcmtlcnNDb29yZHNbMV0ueH0gJHttYXJrZXJzQ29vcmRzWzFdLnl9YDtcbiAgICAvKiBmb3IgKGxldCBpID0gMTsgaSA8IG1hcmtlcnNDb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGQgKz0gYEMke21hcmtlcnNDb29yZHNbaSAtIDFdLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDb29yZHNbaSAtIDFdLnkgKyBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0Nvb3Jkc1tpXS54fSAke1xuICAgICAgICBtYXJrZXJzQ29vcmRzW2ldLnkgLSBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0Nvb3Jkc1tpXS54fSAke21hcmtlcnNDb29yZHNbaV0ueX1gO1xuICAgIH0qL1xuICAgIGNvbnN0IHN0ZXBzSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN0ZXBzX19pdGVtXCIpO1xuICAgIGxldCBvZmZzZXRBcnJheSA9IFswXTtcbiAgICBjb25zdCBkYXNoTGVuZ2h0ID0gZ2FwIC0gbGluZVBhZGRpbmc7XG4gICAgLy8gdG9kbyDQvtC60YDRg9Cz0LvRj9GC0Ywg0LfQvdCw0YfQtdC90LjRjyBkYXNoTGVuZ2h0INC4IGl0ZW1IZWlnaHQg0LIg0LHQvtC70YzRiNGD0Y4g0YHRgtC+0YDQvtC90YM/XG4gICAgc3RlcHNJdGVtcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICBjb25zdCBpdGVtSGVpZ2h0ID0gcGFyc2VJbnQoXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGl0ZW0pLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIilcbiAgICAgICk7XG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBvZmZzZXRBcnJheS5wdXNoKGl0ZW1IZWlnaHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2Zmc2V0QXJyYXkucHVzaChpdGVtSGVpZ2h0ICsgbGluZVBhZGRpbmcpO1xuICAgICAgfVxuICAgICAgb2Zmc2V0QXJyYXkucHVzaChkYXNoTGVuZ2h0KTtcbiAgICB9KTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fbWFpbi10cmFja1wiKTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwiZFwiLCBkKTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG4gICAgc3RlcHNMaW5lLnBhdGhMZW5ndGggPSBNYXRoLnJvdW5kKG1haW5UcmFjay5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICBtYWluVHJhY2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBvZmZzZXRBcnJheS5qb2luKFwiIFwiKSk7XG4gICAgLy8gcGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKG1haW5UcmFjayk7XG4gICAgY29uc3QgdHJhY2tNYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInBhdGhcIik7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrLW1hc2tcIik7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcImRcIiwgZCk7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJub25lXCIpO1xuICAgIHRyYWNrTWFzay5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICB0cmFja01hc2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgMCk7XG4gIFxuICAgIHN2Zy5hcHBlbmRDaGlsZCh0cmFja01hc2spO1xuICBcbiAgICAvKnVzZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFjay0tbWFza1wiKTtcbiAgICB1c2Uuc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgdXNlLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIDApO1xuICAgIHN2Zy5hcHBlbmRDaGlsZCh1c2UpOyovXG4gICAgc3ZnLmFwcGVuZENoaWxkKFxuICAgICAgYWRkVHJpYW5nbGUobWFya2Vyc0Nvb3Jkc1swXS54LCBtYXJrZXJzQ29vcmRzWzBdLnksIDE1IC8qLCBzdmcqLylcbiAgICApO1xuICAgIGNvbnN0IHRyaWFuZ2xlTWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJwYXRoXCIpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmlhbmdsZS1tYXNrXCIpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwibm9uZVwiKTtcbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFxuICAgICAgXCJzdHJva2Utd2lkdGhcIixcbiAgICAgIFwiMjBweFwiXG4gICAgKTsgLyogMjBweCDQtNC70Y8g0L/QtdGA0LXQutGA0YvRgtC40Y8g0YLRgNC10YPQs9C+0LvRjNC90LjQutCwINCyIDE1cHggKi9cbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBvZmZzZXRBcnJheS5zbGljZSgxKS5qb2luKFwiIFwiKSk7XG4gICAgdHJpYW5nbGVNYXNrLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIDApO1xuICAgIHN2Zy5hcHBlbmRDaGlsZCh0cmlhbmdsZU1hc2spO1xuICBcbiAgICBzdGVwc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrKFxuICAgIHN0YXJ0U2Nyb2xsUG9zaXRpb24sXG4gICAgc3RhcnRQb2ludCxcbiAgICBlbmRQb2ludCxcbiAgICBwYXRoTGVuZ2h0LFxuICAgIGhhbmRsZXJGdW5jXG4gICkge1xuICAgIGNvbnN0IHRyYWNrUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX3RyYWNrLW1hc2tcIik7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IGVuZFBvaW50IC0gc3RhcnRQb2ludDtcbiAgICBjb25zdCBsaW5lU2Nyb2xsUHJvZ3JlcyA9ICh3aW5kb3cuc2Nyb2xsWSAtIHN0YXJ0U2Nyb2xsUG9zaXRpb24pIC8gbGluZUhlaWdodDtcbiAgICBsZXQgb2Zmc2V0ID0gLXBhdGhMZW5naHQgKiBsaW5lU2Nyb2xsUHJvZ3JlcztcbiAgXG4gICAgaWYgKG9mZnNldCA8IC1wYXRoTGVuZ2h0KSB7XG4gICAgICBvZmZzZXQgPSAtcGF0aExlbmdodDtcbiAgICAgIC8vd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlckZ1bmMpO1xuICAgIH1cbiAgICB0cmFja1BhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgb2Zmc2V0KTtcbiAgICBtb3ZlVHJpYW5nbGVBbG9uZ1N0cmFpZ2h0KFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc19fdHJhY2stYXJyb3dcIiksXG4gICAgICB0cmFja1BhdGgsXG4gICAgICBvZmZzZXQsXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX19tYWluLXRyYWNrXCIpXG4gICAgKTtcbiAgfSIsImV4cG9ydCBmdW5jdGlvbiBhZGRUcmlhbmdsZShpbml0aWFsWCwgaW5pdGlhbFksIHNpZGVMZW5naHQgLyosIHBhcmVudE5vZGUqLykge1xuICAgIGNvbnN0IHRyaWFuZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgICAgXCJwb2x5Z29uXCJcbiAgICApO1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrLWFycm93XCIpOyAvL3pvb20taW4gc2hvdyAgYW5pbWF0ZSBzaG93LWZhc3RlclxuICAgIC8vKE1hdGguc3FydCgzKSAvIDIpID0gMCw4NjZcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIm9wYWNpdHk6IDA7XCIpO1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwicG9pbnRzXCIsXG4gICAgICBgJHtpbml0aWFsWCAtIHNpZGVMZW5naHQgLyAyfSwke2luaXRpYWxZfSAke2luaXRpYWxYfSwke1xuICAgICAgICBpbml0aWFsWSArIChNYXRoLnNxcnQoMykgLyAyKSAqIHNpZGVMZW5naHRcbiAgICAgIH0gJHtpbml0aWFsWCArIHNpZGVMZW5naHQgLyAyfSwke2luaXRpYWxZfWBcbiAgICApO1xuICAgIC8vICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKHRyaWFuZ2xlKTtcbiAgICByZXR1cm4gdHJpYW5nbGU7XG4gIH1cbiAgXG4gIGV4cG9ydCBmdW5jdGlvbiBtb3ZlVHJpYW5nbGVBbG9uZ0N1cnZlKHRyaWFuZ2xlLCBwYXRoLCB0b3RhbFBhdGhMZW5naHQsIG9mZnNldCkge1xuICAgIGNvbnN0IGN1cnJlbnRMZW5naHQgPSB0b3RhbFBhdGhMZW5naHQgLSBvZmZzZXQ7XG4gICAgY29uc3QgaW5pdGlhbFBvaW50ID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKDApO1xuICAgIGNvbnN0IGN1cnJlbnRQb2ludCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aChjdXJyZW50TGVuZ2h0KTtcbiAgICBjb25zdCB0cmlhbmdsZUhlaWdodFBvaW50cyA9IHRyaWFuZ2xlXG4gICAgICAuZ2V0QXR0cmlidXRlKFwicG9pbnRzXCIpXG4gICAgICAubWF0Y2goL1xcUyssKFxcUyspXFxzLlxcUyssKFxcUyspLyk7XG4gICAgY29uc3QgZnV0dXJlUG9pbnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoXG4gICAgICBjdXJyZW50TGVuZ2h0ICsgKHRyaWFuZ2xlSGVpZ2h0UG9pbnRzWzJdIC0gdHJpYW5nbGVIZWlnaHRQb2ludHNbMV0pXG4gICAgKTtcbiAgICBjb25zdCBhbmdsZSA9XG4gICAgICAoTWF0aC5hdGFuMihcbiAgICAgICAgZnV0dXJlUG9pbnQueSAtIGN1cnJlbnRQb2ludC55LFxuICAgICAgICBmdXR1cmVQb2ludC54IC0gY3VycmVudFBvaW50LnhcbiAgICAgICkgLVxuICAgICAgICBNYXRoLmF0YW4yKDAsIGN1cnJlbnRQb2ludC54ICsgMSkpICpcbiAgICAgICAgKDE4MCAvIE1hdGguUEkpIC1cbiAgICAgIDkwO1xuICBcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgYHRyYW5zbGF0ZSgke2N1cnJlbnRQb2ludC54IC0gaW5pdGlhbFBvaW50Lnh9LCAke1xuICAgICAgICBjdXJyZW50UG9pbnQueSAtIGluaXRpYWxQb2ludC55XG4gICAgICB9KSByb3RhdGUoJHthbmdsZX0gJHtpbml0aWFsUG9pbnQueH0gJHtpbml0aWFsUG9pbnQueX0pYFxuICAgICk7XG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJvcGFjaXR5OiAxO1wiKTtcbiAgfVxuICBcbiAgZXhwb3J0IGZ1bmN0aW9uIG1vdmVUcmlhbmdsZUFsb25nU3RyYWlnaHQodHJpYW5nbGUsIG1hc2tUcmFjaywgb2Zmc2V0LCBtYWluVHJhY2spIHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ2h0ID0gLW9mZnNldDtcbiAgICBjb25zdCBpbml0aWFsUG9pbnQgPSBtYXNrVHJhY2suZ2V0UG9pbnRBdExlbmd0aCgwKTtcbiAgICBjb25zdCBjdXJyZW50UG9pbnQgPSBtYXNrVHJhY2suZ2V0UG9pbnRBdExlbmd0aChjdXJyZW50TGVuZ2h0KTtcbiAgICAvL2NvbnN0IGRhc2hlc0FycmF5ID0gbWFpblRyYWNrLmdldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIikuc3BsaXQoXCIgXCIpO1xuICAgIC8qIGNvbnNvbGUubG9nKGN1cnJlbnRMZW5naHQpO1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoc3VtIDwgY3VycmVudExlbmdodCkge1xuICAgICAgaSsrO1xuICAgICAgc3VtICs9IE51bWJlcihkYXNoZXNBcnJheVtpXSk7XG4gICAgICBjb25zb2xlLmxvZyhpLCBzdW0pO1xuICAgIH1cbiAgICBpZiAoaSAlIDIgPT09IDApIHtcbiAgICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgYHRyYW5zbGF0ZSgke2N1cnJlbnRQb2ludC54IC0gaW5pdGlhbFBvaW50Lnh9LCAke1xuICAgICAgICAgIGN1cnJlbnRQb2ludC55IC0gaW5pdGlhbFBvaW50LnlcbiAgICAgICAgfSlgXG4gICAgICApO1xuICAgIH0qL1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcbiAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICBgdHJhbnNsYXRlKCR7Y3VycmVudFBvaW50LnggLSBpbml0aWFsUG9pbnQueH0sICR7XG4gICAgICAgIGN1cnJlbnRQb2ludC55IC0gaW5pdGlhbFBvaW50LnlcbiAgICAgIH0pYFxuICAgICk7XG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJvcGFjaXR5OiAxO1wiKTtcbiAgfSIsImxldCBsYXN0U2Nyb2xsUG9zaXRpb24gPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsRGF0YSgpIHtcbiAgbGV0IHJlc3VsdCA9IHsgcG9zaXRpb246IHdpbmRvdy5zY3JvbGxZLCBkaXJlY3Rpb246IFwiXCIgfTtcbiAgcmVzdWx0LmRpcmVjdGlvbiA9IHJlc3VsdC5wb3NpdGlvbiA+IGxhc3RTY3JvbGxQb3NpdGlvbiA/IFwiZG93blwiIDogXCJ1cFwiO1xuICBsYXN0U2Nyb2xsUG9zaXRpb24gPSByZXN1bHQucG9zaXRpb247XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpblRhcmdldChlbGVtZW50LCB0YXJnZXQpIHtcbiAgY29uc3QgZWxlbWVudFBvc2l0aW9uID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gIGlmIChlbGVtZW50UG9zaXRpb24gPD0gdGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYWluV2lkdGgoKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtbWFpblwiKS5vZmZzZXRXaWR0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIG1zKSB7XG4gIGxldCBpc1Rocm90dGxlZCA9IGZhbHNlLFxuICAgIHNhdmVkQXJncyxcbiAgICBzYXZlZFRoaXM7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICBpZiAoaXNUaHJvdHRsZWQpIHtcbiAgICAgIHNhdmVkQXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHNhdmVkVGhpcyA9IHRoaXM7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaXNUaHJvdHRsZWQgPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpc1Rocm90dGxlZCA9IGZhbHNlO1xuICAgICAgaWYgKHNhdmVkQXJncykge1xuICAgICAgICB3cmFwcGVyLmFwcGx5KHNhdmVkVGhpcywgc2F2ZWRBcmdzKTtcbiAgICAgICAgc2F2ZWRBcmdzID0gc2F2ZWRUaGlzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCBtcyk7XG4gIH1cblxuICByZXR1cm4gd3JhcHBlcjtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjhhZjc0NWVhNjRiNmI0NmQ1OTAwXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9