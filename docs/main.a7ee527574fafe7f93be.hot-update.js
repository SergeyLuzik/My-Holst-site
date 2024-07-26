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
      console.log(Эскроллwindow.scrollY);
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
/******/ 	__webpack_require__.h = () => ("07c403eb184b951eadf2")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hN2VlNTI3NTc0ZmFmZTdmOTNiZS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW9EO0FBQ2Q7QUFDa0M7QUFDSTtBQUNmO0FBQzdEOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtREFBUTtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGFBQWE7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGFBQWE7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxvQkFBb0I7QUFDM0Q7QUFDQTtBQUNBOztBQUVBLEVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0Isc0VBQXNFO0FBQ3RFO0FBQ0EsNkJBQTZCLGtCQUFrQixRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGtCQUFrQjtB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7Ozs7Ozs7OztVQ2hEQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9hbmltYXRpb25zLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9idXJnZXItbWVudS5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvZmVlZGJhY2stc2xpZGVyLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9oZXJvLXNsaWRlci5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvaW1nLXRodW1ibmFpbHMuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9zdGVwcy10cmFjay9jdXJ2ZWQtdHJhY2suanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3N0ZXBzLXRyYWNrL3N0ZXBzLWxpbmUtdmFycy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3N0ZXBzLXRyYWNrL3RyaWFuZ2xlLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRNYWluV2lkdGgsIGluVGFyZ2V0IH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmltcG9ydCB7IHN0ZXBzTGluZSB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0ZXBzLWxpbmUtdmFycy5qc1wiO1xuLy9sZXQgc3RlcHNMaW5lLnN0YXJ0WSwgc3RlcHNMaW5lLmVuZFksIHN0ZXBzTGluZS5wYXRoTGVuZ3RoO1xuXG5cbmZ1bmN0aW9uIGFuaW1OdW1iZXIobnVtT2JqLCBkdXJhdGlvbikge1xuICBjb25zdCBudW0gPSBwYXJzZUludChudW1PYmouaW5uZXJIVE1MLnJlcGxhY2UoXCIgXCIsIFwiXCIpLCAxMCk7XG4gIGxldCBzdGFydFRpbWU7XG5cbiAgY29uc3Qgc3RlcCA9ICh0aW1lc3RhbXApID0+IHtcbiAgICBpZiAoc3RhcnRUaW1lID09PSB1bmRlZmluZWQpIHN0YXJ0VGltZSA9IHRpbWVzdGFtcDtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHBhcnNlRmxvYXQoXG4gICAgICBNYXRoLm1pbigodGltZXN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uLCAxKS50b0ZpeGVkKDIpXG4gICAgKTtcbiAgICBudW1PYmouaW5uZXJIVE1MID1cbiAgICAgIE1hdGguZmxvb3IocHJvZ3Jlc3MgKiBudW0pLnRvTG9jYWxlU3RyaW5nKFwicnUtUlVcIiwge1xuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgIH0pICsgXCIrXCI7XG5cbiAgICBpZiAocHJvZ3Jlc3MgPCAxKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVFbGVtZW50cyhlbGVtZW50cywgdGFyZ2V0UG9zaXRpb24sIGhhbmRsZXJGdW5jKSB7XG4gIGxldCBlbGVtZW50c0NsYXNzZXNDb3VudCA9IHt9O1xuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2Nyb2xsZWQtaW5cIikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAvLyBjb25zdCBlbGVtZW50UG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICBpZiAoaW5UYXJnZXQoZWxlbWVudCwgdGFyZ2V0UG9zaXRpb24pLyplbGVtZW50UG9zaXRpb24gPD0gdGFyZ2V0UG9zaXRpb24qLykge1xuICAgICAgY29uc3QgZWxlbWVudENsYXNzID0gZWxlbWVudC5jbGFzc0xpc3RbMF07XG5cbiAgICAgIGlmIChlbGVtZW50Q2xhc3MgaW4gZWxlbWVudHNDbGFzc2VzQ291bnQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG4gICAgICAgIH0sIDEwMCAqIGVsZW1lbnRzQ2xhc3Nlc0NvdW50W2VsZW1lbnRDbGFzc10pO1xuICAgICAgICBlbGVtZW50c0NsYXNzZXNDb3VudFtlbGVtZW50Q2xhc3NdICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50c0NsYXNzZXNDb3VudFtlbGVtZW50Q2xhc3NdID0gMTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInByb21vX19zdGF0aXN0aWNzXCIpKSB7XG4gICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5wcm9tb19fc3RhdGlzdGljcy1kZXNjcmlwdGlvblwiKVxuICAgICAgICAgIC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgYW5pbU51bWJlcihlbCwgMjUwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltYXRlLWNoaWxkc1wiKSkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGVsZW1lbnQuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgLyppZiAoY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGluZS1zdGFydFwiKSkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgICAgICBjb25zdCBhbmltYXRlQXJndW1lbnRzID0gW1xuICAgICAgICAgICAgICBjdXJyZW50U2Nyb2xsUG9zaXRpb24sXG4gICAgICAgICAgICAgIHN0ZXBzTGluZS5zdGFydFksXG4gICAgICAgICAgICAgIHN0ZXBzTGluZS5lbmRZLFxuICAgICAgICAgICAgICBzdGVwc0xpbmUucGF0aExlbmd0aCxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBjb25zdCBhbmltYXRlRnVuY3Rpb24gPVxuICAgICAgICAgICAgICBnZXRNYWluV2lkdGgoKSA8PSAxMzAwXG4gICAgICAgICAgICAgICAgPyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrXG4gICAgICAgICAgICAgICAgOiBhbmltYXRlQ3VydmVkU3RlcHNUcmFjaztcblxuICAgICAgICAgICAgY29uc3QgdGhyb3R0bGVkQW5pbWF0ZVN0ZXBzVHJhY2sgPSB0aHJvdHRsZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGFuaW1hdGVGdW5jdGlvbiguLi5hbmltYXRlQXJndW1lbnRzLCB0aHJvdHRsZWRBbmltYXRlU3RlcHNUcmFjayk7XG4gICAgICAgICAgICB9LCA1MCk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRocm90dGxlZEFuaW1hdGVTdGVwc1RyYWNrKTtcbiAgICAgICAgICB9Ki9cbiAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsZWQtaW5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKFxuICAgICAgd2luZG93LnNjcm9sbFkgPlxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCAtXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKiAxLjJcbiAgICApIHtcbiAgICAgIGVsZW1lbnRzW2VsZW1lbnRzLmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoXCJzY3JvbGxlZC1pblwiKTtcblxuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICB9KTtcbn1cbiIsIiAgY29uc3QgaGVhZGVySGVpZ2h0ID0gYCR7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLWhlYWRlclwiKS5vZmZzZXRIZWlnaHRcbiAgfXB4YDtcbiAgXG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKVxuICAgIC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taGVhZGVyLWhpZ2h0XCIsIGAke2hlYWRlckhlaWdodH1gKTtcblxuICBjb25zdCBidXJnZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19idXJnZXItYnV0dG9uXCIpO1xuICBmdW5jdGlvbiBtZW51SGFuZGxlcihtZW51U2VsZWN0b3IpIHtcbiAgICBtZW51Lm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzdG9wLXNjcm9sbFwiKTtcbiAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZShgJHttZW51U2VsZWN0b3J9X29wZW5gKTtcbiAgICAgIGJ1cmdlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwicGFnZS1oZWFkZXJfX2J1cmdlci1idXR0b25fb3BlblwiKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHRhcmdldElkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElkKTtcbiAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGJ1cmdlck1lbnVIYW5kbGVyKG1haW5XaWR0aCkge1xuICBidXJnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBcImNsaWNrXCIsXG4gICAgKGUpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwi0LrQu9C40Log0L3QsCDQutC90L7Qv9C60YMg0LIg0L7QsdGA0LDQsdC+0YLRh9C40LrQtSDQutC90L7Qv9C60LhcIik7XG4gICAgICBjb25zdCBtZW51ID1cbiAgICAgIG1haW5XaWR0aCA8PSA2ODBcbiAgICAgICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX21lbnVcIilcbiAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX25hdlwiKTtcbiAgICAgIC8vbWVudS5zdHlsZS50b3AgPSBoZWFkZXJIZWlnaHQ7XG4gICAgICAvKmUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIHRvZG8g0YLQsNC60L7QtSDRgdC10LHQtSDRgNC10YjQtdC90LjQtSAo0L/RgNC4INC60LvQuNC60LUg0L3QsCDQutC90L7Qv9C60YMg0LLQtdGI0LDRgtGMINC+0LHRgNCw0LHQvtGC0YfQuNC6INC90LAgZG9jdW1lbnQg0Lgg0YPQttC1INCyINC90LXQvCDQvtCx0YDQsNCx0LDRgtGL0LLQsNGC0Ywg0Lgg0LrQvdC+0L/QutGDINC4INGC0LDQvyDQv9C+INGB0YHRi9C70LrQtSDQuCDQvtC60L3Rgz8pXG4gICAgYnVyZ2VyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJwYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvbl9vcGVuXCIpOyAvLyDQstGL0L3QtdGB0YLQuCDQsiDRhNGD0L3QutGG0LjRjiBtZW51VG9nZ2xlXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJzdG9wLXNjcm9sbFwiKTtcbiAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoYCR7bWVudS5jbGFzc0xpc3RbMF19X29wZW5gKTsqL1xuICAgICAgLy9idXJnZXJCdXR0b24ub25jbGljayA9IG51bGw7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCLRgdC+0LHRi9GC0LjQtSBjbGljayDQsiDQvtCx0YDQsNCx0L7RgtGH0LjQutC1INC00L7QutGD0LzQtdC90YLQsFwiKTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhZS50YXJnZXQuY2xvc2VzdChcIi5wYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvblwiKSAmJlxuICAgICAgICAgICAgIW1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKGAke21lbnUuY2xhc3NMaXN0WzBdfV9vcGVuYClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0LrQu9C40Log0L3QtSDQvdCwINC60L3QvtC/0LrRgyDQv9GA0Lgg0LfQsNC60YDRi9GC0L7QvCDQvNC10L3RjlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gdG9kbyDQv9GA0Lgg0LrQu9C40LrQtSDQv9C+0YHQu9C1INC+0YLQutGA0YvRgtC40Y8g0YHRgNCw0LHQsNGC0YvQstCw0LXRgiDRgdC+IDLQs9C+INGA0LDQt9CwXG4gICAgICAgICAgYnVyZ2VyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJwYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvbl9vcGVuXCIpO1xuICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwic3RvcC1zY3JvbGxcIik7XG4gICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKGAke21lbnUuY2xhc3NMaXN0WzBdfV9vcGVuYCk7XG5cbiAgICAgICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdChcIi5wYWdlLWhlYWRlcl9fbmF2LWxpc3RcIikpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0LrQu9C40Log0L3QsCDRgdGB0YvQu9C60YMg0LIg0LzQtdC90Y5cIik7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcihlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKVxuICAgICAgICAgICAgICAuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy97IG9uY2U6IHRydWUgfVxuICAgICAgKTtcbiAgICB9LFxuICAgIHsgb25jZTogdHJ1ZSB9XG4gICk7XG4gfSIsImNvbnN0IHNsaWRlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrX19saXN0XCIpLFxuc2xpZGVzID0gc2xpZGVzTGlzdC5jaGlsZHJlbixcbmxlZnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrID4uc2xpZGVyLWJ1dHRvbl9sZWZ0XCIpLFxucmlnaHRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrID4gLnNsaWRlci1idXR0b25fcmlnaHRcIiksXG50cmFuc2l0aW9uVGltZSA9IFwiMXNcIjtcblxubGV0IGluQWN0aW9uID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG1vdkxlZnQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKSB7XG5zbGlkZXNMaXN0Lm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICBzbGlkZXNMaXN0LnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudFNsaWRlc09uTGlzdDsgaSsrKSB7XG4gICAgc2xpZGVzTGlzdC5hcHBlbmQoc2xpZGVzWzBdKTtcbiAgfVxuICBzbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldH1weClgO1xuXG4gIGluQWN0aW9uID0gZmFsc2U7XG59O1xuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG5zbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldCAqIDIgLSBnYXBWYWx1ZX1weClgO1xufVxuZnVuY3Rpb24gbW92UmlnaHQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKSB7XG5zbGlkZXNMaXN0Lm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgc2xpZGVzTGlzdC5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICBzbGlkZXNMaXN0LnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudFNsaWRlc09uTGlzdDsgaSsrKSB7XG4gICAgc2xpZGVzTGlzdC5wcmVwZW5kKHNsaWRlc0xpc3QubGFzdEVsZW1lbnRDaGlsZCk7XG4gIH1cbiAgc2xpZGVzTGlzdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXR9cHgpYDtcblxuICBpbkFjdGlvbiA9IGZhbHNlO1xufTtcblxuc2xpZGVzTGlzdC5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG5zbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7Z2FwVmFsdWV9cHgpYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZlZWRiYWNrU2xpZGVySGFuZGxlcigpIHtcbi8vbGV0IE11dE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIgKCgpID0+IHtcbiBjb25zdCBzbGlkZVdpZHRoID0gc2xpZGVzWzBdLm9mZnNldFdpZHRoLFxuICBzbGlkZXNMaXN0V2lkdGggPSBzbGlkZXNMaXN0Lm9mZnNldFdpZHRoLFxuICBnYXBWYWx1ZSA9XG4gICAgKHNsaWRlc0xpc3RXaWR0aCAvIDEwMCkgKlxuICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShzbGlkZXNMaXN0KS5nYXApLFxuICBhbW91bnRTbGlkZXNPbkxpc3QgPSBNYXRoLmZsb29yKHNsaWRlc0xpc3RXaWR0aCAvIChzbGlkZVdpZHRoICsgZ2FwVmFsdWUpKSxcbiAgLypzbGlkZUxpc3RzQW1vdW50ID0gTWF0aC5jZWlsKHNsaWRlcy5sZW5ndGggLyBhbW91bnRTbGlkZXNPbkxpc3QpLCovXG4gIG9mZnNldCA9IDQgKiBzbGlkZVdpZHRoICsgMyAqIGdhcFZhbHVlO1xuXG4gIC8vIEluaXRpYWxpemUgc2xpZGVyIHN0YXJ0IHBvc2l0aW9uXG5zbGlkZXNMaXN0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldH1weClgO1xuXG4gIHJpZ2h0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7IC8vIHRvZG8g0L/QvtCy0YLQvtGA0Y/QtdGC0YHRjyDQvtGCIGhlcm8gc2xpZGVyPyDRg9C90LjRhNC40YbQuNGA0L7QstCw0YLRjCDRh9C10YDQtdC3INC+0YLQtNC10LvRjNC90YvQuSDQvNC+0LTRg9C70Yw/XG4gICAgaWYgKGluQWN0aW9uKSByZXR1cm47XG4gICAgaW5BY3Rpb24gPSB0cnVlO1xuICAgIG1vdkxlZnQoYW1vdW50U2xpZGVzT25MaXN0LCBvZmZzZXQsIGdhcFZhbHVlKTtcbiAgfTtcbiAgbGVmdEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4geyAvLyB0b2RvINC/0L7QstGC0L7RgNGP0LXRgtGB0Y8g0L7RgiBoZXJvIHNsaWRlcj8g0YPQvdC40YTQuNGG0LjRgNC+0LLQsNGC0Ywg0YfQtdGA0LXQtyDQvtGC0LTQtdC70YzQvdGL0Lkg0LzQvtC00YPQu9GMP1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZSaWdodChhbW91bnRTbGlkZXNPbkxpc3QsIG9mZnNldCwgZ2FwVmFsdWUpO1xuICB9O1xuICAvL30pXG5cbiAvLyBNdXRPYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge2F0dHJpYnV0ZUZpbHRlcjogW1wiY2xhc3NcIl19KTtcbn1cblxuIiwiY29uc3Qgc2xpZGVzV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyX19zbGlkZXMtbGlzdFwiKSxcbiAgYWN0aXZTbGlkZVdpZHRoID0gcGFyc2VJbnQoXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZShcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb19fc2xpZGVyXCIpXG4gICAgKS5ncmlkVGVtcGxhdGVDb2x1bW5zLnNwbGl0KFwiIFwiKVswXSxcbiAgICAxMFxuICApLFxuICBnYXBWYWx1ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoc2xpZGVzV3JhcHBlcikuZ2FwKSxcbiAgc2xpZGVzID0gc2xpZGVzV3JhcHBlci5jaGlsZHJlbixcbiAgc2xpZGVXaWR0aCA9IHNsaWRlc1swXS5vZmZzZXRXaWR0aCxcbiAgaW5pdGlhbE9mZnNldCA9IHNsaWRlV2lkdGggKiAyICsgZ2FwVmFsdWUgLSBhY3RpdlNsaWRlV2lkdGgsXG4gIG9mZnNldCA9IHNsaWRlV2lkdGggKyBnYXBWYWx1ZSxcbiAgdHJhbnNpdGlvblRpbWUgPSBcIjAuM3NcIixcbiAgc2xpZGVTY2FsZSA9XG4gICAgXCJ0cmFuc2xhdGUoLTEyLjUlLCBjYWxjKDEyLjUlIC0gMTZweCkpIHNjYWxlKDEuMjUpXCIsXG4gIGxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1idXR0b25fbGVmdFwiKSxcbiAgcmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1idXR0b25fcmlnaHRcIik7XG5cbmxldCBpbkFjdGlvbiA9IGZhbHNlO1xuXG5mdW5jdGlvbiBtb3ZMZWZ0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCkge1xuICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gXCJub25lXCI7XG4gICAgc2xpZGVzWzBdLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuXG4gICAgc2xpZGVzV3JhcHBlci5hcHBlbmQoc2xpZGVzWzBdKTtcbiAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LWluaXRpYWxPZmZzZXR9cHgpYDtcblxuICAgIGluQWN0aW9uID0gZmFsc2U7XG4gIH07XG4gIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lOyAvL3RvZG8g0LfQsNC00LDQstCw0YLRjCB0cmFuc2l0aW9uINGH0LXRgNC10Lcg0LfQsNC/0Y/RgtGD0Y4g0LLRgdC10Lwg0YHRgNCw0LfRgz9cbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1vZmZzZXQgLSBpbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzWzFdLnN0eWxlLm9wYWNpdHkgPSAwO1xuICBzbGlkZXNbMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMClcIjsgLy8gc2NhbGUoMC4zKVxuXG4gIHNsaWRlc1syXS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gIHNsaWRlc1syXS5zdHlsZS50cmFuc2Zvcm0gPSBzbGlkZVNjYWxlO1xuICBzbGlkZXNbMl0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJjdWJpYy1iZXppZXIoLjcyLC4wNywuOTUsLjcpXCI7IC8vLjc1LDAsMSwuMDIgZWFzZS1pblxufVxuZnVuY3Rpb24gbW92UmlnaHQoc2xpZGVzV3JhcHBlciwgb2Zmc2V0KSB7XG4gIHNsaWRlc1dyYXBwZXIub250cmFuc2l0aW9uZW5kID0gKCkgPT4ge1xuICAgIHNsaWRlc1dyYXBwZXIub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcbiAgICBzbGlkZXNbMV0ucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG5cbiAgICBzbGlkZXNXcmFwcGVyLmxhc3RFbGVtZW50Q2hpbGQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgc2xpZGVzV3JhcHBlci5wcmVwZW5kKHNsaWRlc1dyYXBwZXIubGFzdEVsZW1lbnRDaGlsZCk7XG4gICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1pbml0aWFsT2Zmc2V0fXB4KWA7XG5cbiAgICBpbkFjdGlvbiA9IGZhbHNlO1xuICB9O1xuICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldCAtIGluaXRpYWxPZmZzZXR9cHgpYDtcblxuICBzbGlkZXNbMF0uc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuICBzbGlkZXNbMF0uc3R5bGUub3BhY2l0eSA9IDE7XG4gIHNsaWRlc1swXS5zdHlsZS50cmFuc2Zvcm0gPSBzbGlkZVNjYWxlO1xuICBzbGlkZXNbMF0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJlYXNlLWluXCI7XG5cbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDApIHNjYWxlKDEpXCI7XG4gIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb24gPSBcImN1YmljLWJlemllcigwLC43NSwuMDIsMSlcIjsgLy8wLC43NSwuMDIsMSAgLy8gMCwwLC4wMiwxIC8vIC43NSwwLDEsLjAyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXJvU2xpZGVySGFuZGxlcigpIHtcbiAgLy8gSW5pdGlhbGl6ZSBzbGlkZXIgc3RhcnQgcG9zaXRpb25cbiAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgkey1pbml0aWFsT2Zmc2V0fXB4KWA7XG4gIHNsaWRlc1swXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgc2xpZGVzWzFdLnN0eWxlLnRyYW5zZm9ybSA9IHNsaWRlU2NhbGU7XG5cbiAgbGVmdC5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZSaWdodChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpO1xuICB9O1xuICByaWdodC5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgIGluQWN0aW9uID0gdHJ1ZTtcbiAgICBtb3ZMZWZ0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCk7XG4gIH07XG59XG4iLCJmdW5jdGlvbiBzd2FwUGxhY2Vob2xkZXIocGljdHVyZSkge1xuICBjb25zdCBpbWcgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XG4gIGNvbnN0IHNvdXJjZXMgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzb3VyY2VcIik7XG5cbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBwaWN0dXJlLmRhdGFzZXQubG9hZGVkID0gdHJ1ZTtcbiAgICAvL2ltZy4gcmVtb3ZlQXR0cmlidXRlKFwiXCIpXG4gIH07XG4gIGltZy5vbmVycm9yID0gKCkgPT4ge1xuICAgIHBpY3R1cmUuZGF0YXNldC5sb2FkZWQgPSBmYWxzZTtcbiAgfTtcbiAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICBzb3VyY2Uuc3Jjc2V0ID0gc291cmNlLmRhdGFzZXQuc3Jjc2V0O1xuICAgIHNvdXJjZS5zaXplcyA9IHNvdXJjZS5kYXRhc2V0LnNpemVzO1xuICB9KTtcbiAgaW1nLnNyY3NldCA9IGltZy5kYXRhc2V0LnNyY3NldDtcbiAgaW1nLnNpemVzID0gaW1nLmRhdGFzZXQuc2l6ZXM7XG4gIC8vaW1nLnNyYyA9IGltZy5kYXRhc2V0LnNyY3NldC5tYXRjaCgvLCAoLiopIC4rJC8pWzFdOyAvLyB0b2RvINC/0YDQuCDQtdC00LjQvdGB0YLQstC10L3QvdC+0Lwg0LLQsNGA0LjQsNC90YLQtSDQstGL0LHRgNCw0YHRi9Cy0LDQtdGCIG51bGxcbiAgY29uc3Qgc3Jjc2V0QXJyID0gaW1nLmRhdGFzZXQuc3Jjc2V0LnNwbGl0KFwiIFwiKTtcbiAgaW1nLnNyYyA9IHNyY3NldEFycltzcmNzZXRBcnIubGVuZ3RoIC0gMl07XG4gIC8vY29uc29sZS5sb2coc3Jjc2V0QXJyLCBzcmNzZXRBcnJbc3Jjc2V0QXJyLmxlbmd0aCAtIDJdKTtcbn1cblxuY29uc3QgcGljdHVyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicGljdHVyZVwiKTtcblxuY29uc3QgY2FsbGJhY2sgPSAoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcbiAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgc3dhcFBsYWNlaG9sZGVyKGVudHJ5LnRhcmdldCk7XG4gICAgICAvL2NvbnNvbGUubG9nKGVudHJ5LnRhcmdldCk7XG4gICAgICBvYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGltZ1RodW1ibmFpbHNIYW5kbGVyKCkge1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihjYWxsYmFjayk7XG5cbnBpY3R1cmVzLmZvckVhY2goKHBpY3R1cmUpID0+IHtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShwaWN0dXJlKTtcbn0pO1xufSIsImltcG9ydCB7IGdldE1haW5XaWR0aCwgc2Nyb2xsRGF0YSwgaW5UYXJnZXQgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZUVsZW1lbnRzIH0gZnJvbSBcIi4vYW5pbWF0aW9ucy5qc1wiO1xuaW1wb3J0IHsgYWRkQ3VydmVkVHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9jdXJ2ZWQtdHJhY2suanNcIjtcbmltcG9ydCB7IGFkZFN0cmFpZ2h0VHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdHJhaWdodC10cmFjay5qc1wiO1xuaW1wb3J0IHsgaW1nVGh1bWJuYWlsc0hhbmRsZXIgfSBmcm9tIFwiLi9pbWctdGh1bWJuYWlscy5qc1wiO1xuaW1wb3J0IHsgYnVyZ2VyTWVudUhhbmRsZXIgfSBmcm9tIFwiLi9idXJnZXItbWVudS5qc1wiO1xuaW1wb3J0IHsgaGVyb1NsaWRlckhhbmRsZXIgfSBmcm9tIFwiLi9oZXJvLXNsaWRlci5qc1wiO1xuaW1wb3J0IHsgZmVlZGJhY2tTbGlkZXJIYW5kbGVyIH0gZnJvbSBcIi4vZmVlZGJhY2stc2xpZGVyLmpzXCI7XG5pbXBvcnQgeyBzdGVwc0xpbmUgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdGVwcy1saW5lLXZhcnMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmNvbnN0IG1haW5XaWR0aCA9IGdldE1haW5XaWR0aCgpO1xuaW1nVGh1bWJuYWlsc0hhbmRsZXIoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgY29uc3QgcHJlbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVsb2FkZXJcIik7XG5cbiAgcHJlbG9hZGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBwcmVsb2FkZXIub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN0b3Atc2Nyb2xsXCIpO1xuICAgIHByZWxvYWRlci5yZW1vdmUoKTtcblxuICAgIGlmIChtYWluV2lkdGggPD0gMTMwMCkge1xuICAgICAgYWRkU3RyYWlnaHRUcmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRDdXJ2ZWRUcmFjaygpO1xuICAgIH1cbiAgICBpZiAobWFpbldpZHRoIDw9IDEyNTApIHtcbiAgICAgIGJ1cmdlck1lbnVIYW5kbGVyKG1haW5XaWR0aCk7XG4gICAgfVxuICAgIGlmIChtYWluV2lkdGggPiAxMjAwKSB7XG4gICAgICBmZWVkYmFja1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG4gICAgaWYgKG1haW5XaWR0aCA+IDgwMCkge1xuICAgICAgaGVyb1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG5jb25zb2xlLmxvZyhzdGVwc0xpbmUpO1xuICAgIC8qY29uc3QgZXIgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICBlcigpO1xuICAgIH0pOyovXG5cbiAgICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQsNC90LjQvNCw0YbQuNC5XG4gICAgY29uc3QgYW5pbWF0aW9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFuaW1hdGVcIik7IC8vIHRvZG8/INC/0L7QvNC10L3Rj9GC0Ywg0L3QsCBieWNsYXNzbmFtZSA6bm90IHNjcm9sbGVkINGH0YLQvtCx0Ysg0LrQvtC70LvQtdC60YbQuNGPINC+0LHQvdC+0LLQu9GP0LvQsNGB0Ywg0YHQsNC80LA/XG4gICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICogMC44O1xuXG4gICAgYW5pbWF0ZUVsZW1lbnRzKGFuaW1hdGlvbkVsZW1lbnRzLCB0YXJnZXRQb3NpdGlvbik7XG5cbiAgICBjb25zdCBzdGVwc1RyYWNrQW5pbWF0ZUZ1bmN0aW9uID1cbiAgICBtYWluV2lkdGggPD0gMTMwMFxuICAgICAgPyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrXG4gICAgICA6IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrO1xuXG4gICAgY29uc3QgdGhyb3R0bGVkU2Nyb2xsQW5pbWF0aW9uSGFuZGxlciA9IHRocm90dGxlKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKNCt0YHQutGA0L7Qu9C7d2luZG93LnNjcm9sbFkpO1xuICAgICAgY29uc3Qgc2Nyb2xsID0gc2Nyb2xsRGF0YSgpO1xuICAgICAgaWYoc2Nyb2xsLmRpcmVjdGlvbiA9PT0gXCJkb3duXCIpe1xuICAgICAgICB0aHJvdHRsZShhbmltYXRlRWxlbWVudHMoXG4gICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb24pLCAxMDApXG4gICAgICB9XG4gICAgICBpZihpblRhcmdldChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpbmUtc3RhcnRcIiksIHRhcmdldFBvc2l0aW9uKSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KHRgNCw0LHQvtGC0LDQuyBzdGFydC1saXRlXCIpO1xuICAgICAgICBzdGVwc1RyYWNrQW5pbWF0ZUZ1bmN0aW9uKHN0ZXBzTGluZS5zdGFydFksIHN0ZXBzTGluZS5zdGFydFksXG4gICAgICAgICAgc3RlcHNMaW5lLmVuZFksXG4gICAgICAgICAgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgICAgfVxuICAgIH0sIDUwKTtcbiAgICBcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRocm90dGxlZFNjcm9sbEFuaW1hdGlvbkhhbmRsZXIpO1xuXG4gICAgLy9sZXQgbGFzdFNjcm9sbFBvc2l0aW9uID0gMDtcbiAgICAvKmNvbnN0IHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyA9IHRocm90dGxlKGFuaW1hdGVFbGVtZW50cywgMjAwKTsqL1xuXG4gICAgLypjb25zdCB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHMgPSB0aHJvdHRsZSgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhzY3JvbGxEYXRhKCkpO1xuICAgICAgLy8gdG9kbyDQstGL0L3QtdGB0YLQuCDQv9GA0L7QstC10YDQutGDINC90LDQv9GA0LDQstC70LXQvdC40Y8g0YHQutGA0L7Qu9C70LAsINGC0YPRgiDQtNC+0LvQttC90LAg0LHRi9GC0Ywg0YLQvtC70YzQutC+INGE0YPQvdC60YbQuNGPXG4gICAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgIGlmIChjdXJyZW50U2Nyb2xsUG9zaXRpb24gPiBsYXN0U2Nyb2xsUG9zaXRpb24pIHtcbiAgICAgICAgYW5pbWF0ZUVsZW1lbnRzKFxuICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uLFxuICAgICAgICAgIHRocm90dGxlZEFuaW1hdGVFbGVtZW50c1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgbGFzdFNjcm9sbFBvc2l0aW9uID0gY3VycmVudFNjcm9sbFBvc2l0aW9uO1xuICAgIH0sIDEwMCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHMpO1xuICAgICovXG4gIH07XG4gIHByZWxvYWRlci5jbGFzc0xpc3QuYWRkKFwicHJlbG9hZGVyX2hpZGVcIik7IC8vdG9kbyDQv9C10YDQtdC90LXRgdGC0Lgg0L/QvtGB0LvQtSB0cmFuc2l0aW9uZW5kPyDQv9C+0YLQvtC80YMg0YfRgtC+INGB0L3QsNGH0LDQu9CwINC30LDQv9GD0YHQutCw0LXQvCDQsNC90LjQvNCw0YbQuNGOINCwINC/0L7RgtC+0Lwg0YLQvtC70YzQutC+INC00L7QsdCw0LLQu9GP0LXQvCDRgdC+0LHRi9GC0LjQtT9cbn0pO1xuXG4vL3dpbmRvdy5vbmxvYWQgPSA7XG4iLCJpbXBvcnQgeyBhZGRUcmlhbmdsZSwgbW92ZVRyaWFuZ2xlQWxvbmdDdXJ2ZSB9IGZyb20gXCIuL3RyaWFuZ2xlLmpzXCI7XG5pbXBvcnQgeyBzdGVwc0xpbmUgfSBmcm9tIFwiLi9zdGVwcy1saW5lLXZhcnMuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBhZGRDdXJ2ZWRUcmFjaygpIHtcbiAgICBjb25zdCBzdGVwc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzXCIpO1xuICAgIGNvbnN0IGluaXRpYWxYID0gc3RlcHNTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLng7XG4gICAgY29uc3QgaW5pdGlhbFkgPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSArIHdpbmRvdy5zY3JvbGxZO1xuICAgIGNvbnN0IGNvbnRyb2xQb2ludE9mZnNldFkgPSA1MzM7XG4gICAgY29uc3QgbWFya2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFya2VyXCIpO1xuICAgIGNvbnN0IG1hcmtlcnNDZW50ZXJDb29yZHMgPSBbXTtcbiAgXG4gICAgbWFya2Vycy5mb3JFYWNoKChtYXJrZXIpID0+IHtcbiAgICAgIC8vIHRvZG8g0L/QtdGA0LXQtNCw0LLQsNGC0Ywg0YPQttC1IGdldEJvdW5kaW5nQ2xpZW50UmVjdCDRh9GC0L7QsdGLINC60LDQttC00YvQuSDRgNCw0Lcg0L3QtSDQstGL0LfRi9Cy0LDRgtGMXG4gICAgICBjb25zdCBtYXJrZXJSZWN0ID0gbWFya2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGV0IGNlbnRlckNvb3JkcyA9IHt9O1xuICBcbiAgICAgIGNlbnRlckNvb3Jkcy54ID0gbWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBtYXJrZXJSZWN0LndpZHRoIC8gMjtcbiAgICAgIGNlbnRlckNvb3Jkcy55ID1cbiAgICAgICAgbWFya2VyUmVjdC55IC0gaW5pdGlhbFkgKyBtYXJrZXJSZWN0LmhlaWdodCAvIDIgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgXG4gICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzLnB1c2goY2VudGVyQ29vcmRzKTsgLy8gdG9kbyDQv9GD0YjQuNGC0Ywg0YHRgNCw0LfRgyB7fSDQsdC10Lcg0YHQvtC30LTQsNC90LjRjyDQv9C10YDQtdC80LXQvdC90YvRhVxuICAgIH0pO1xuICAgIHN0ZXBzTGluZS5zdGFydFkgPSBtYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnkgKyBpbml0aWFsWTtcbiAgICBzdGVwc0xpbmUuZW5kWSA9XG4gICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzW21hcmtlcnNDZW50ZXJDb29yZHMubGVuZ3RoIC0gMV0ueSArIGluaXRpYWxZO1xuICBcbiAgICBjb25zdCBOU3N0cmluZyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbiAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwic3ZnXCIpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFja1wiKTtcbiAgICBjb25zdCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInBhdGhcIik7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX19tYWluLXRyYWNrXCIpO1xuICAgIGxldCBkID0gYE0gJHttYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnh9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1swXS55fWA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXJrZXJzQ2VudGVyQ29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkICs9IGBDJHttYXJrZXJzQ2VudGVyQ29vcmRzW2kgLSAxXS54fSAke1xuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzW2kgLSAxXS55ICsgY29udHJvbFBvaW50T2Zmc2V0WVxuICAgICAgfSAke21hcmtlcnNDZW50ZXJDb29yZHNbaV0ueH0gJHtcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1tpXS55IC0gY29udHJvbFBvaW50T2Zmc2V0WVxuICAgICAgfSAke21hcmtlcnNDZW50ZXJDb29yZHNbaV0ueH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnl9YDtcbiAgICB9XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG4gICAgc3RlcHNMaW5lLnBhdGhMZW5ndGggPSBNYXRoLnJvdW5kKHBhdGguZ2V0VG90YWxMZW5ndGgoKSk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQocGF0aCk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKFxuICAgICAgYWRkVHJpYW5nbGUoXG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbMF0ueCxcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1swXS55LFxuICAgICAgICAxNSAvKiwgc3ZnKi9cbiAgICAgIClcbiAgICApO1xuICBcbiAgICBzdGVwc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhbmltYXRlQ3VydmVkU3RlcHNUcmFjayhcbiAgICBzdGFydFNjcm9sbFBvc2l0aW9uLFxuICAgIHN0YXJ0UG9pbnQsXG4gICAgZW5kUG9pbnQsXG4gICAgcGF0aExlbmdodCxcbiAgICBoYW5kbGVyRnVuY1xuICApIHtcbiAgICBjb25zdCB0cmFja1BhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX19tYWluLXRyYWNrXCIpO1xuICAgIGNvbnN0IGxpbmVIZWlnaHQgPSBlbmRQb2ludCAtIHN0YXJ0UG9pbnQ7XG4gICAgY29uc3QgbGluZVNjcm9sbFByb2dyZXMgPSAod2luZG93LnNjcm9sbFkgLSBzdGFydFNjcm9sbFBvc2l0aW9uKSAvIGxpbmVIZWlnaHQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coXCJ3aW5kb3cuc2Nyb2xsWSBcIiArIHdpbmRvdy5zY3JvbGxZKTtcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0U2Nyb2xsUG9zaXRpb24gXCIgKyBzdGFydFNjcm9sbFBvc2l0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhcImxpbmVIZWlnaHQgXCIgKyBsaW5lSGVpZ2h0KTtcbiAgICBjb25zb2xlLmxvZyhcImxpbmVTY3JvbGxQcm9ncmVzIFwiICsgbGluZVNjcm9sbFByb2dyZXMpO1xuICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICBsZXQgb2Zmc2V0ID0gcGF0aExlbmdodCAqICgxIC0gbGluZVNjcm9sbFByb2dyZXMpO1xuICBcbiAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgIC8vd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlckZ1bmMpO1xuICAgIH1cbiAgICB0cmFja1BhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgb2Zmc2V0KTtcbiAgICBtb3ZlVHJpYW5nbGVBbG9uZ0N1cnZlKFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc19fdHJhY2stYXJyb3dcIiksXG4gICAgICB0cmFja1BhdGgsXG4gICAgICBwYXRoTGVuZ2h0LFxuICAgICAgb2Zmc2V0XG4gICAgKTtcbiAgfSIsImV4cG9ydCBsZXQgc3RlcHNMaW5lID0ge3N0YXJ0WTogXCJcIiwgZW5kWTpcIlwiLCBwYXRoTGVuZ3RoOlwiXCJ9OyIsImltcG9ydCB7IGFkZFRyaWFuZ2xlLCBtb3ZlVHJpYW5nbGVBbG9uZ1N0cmFpZ2h0IH0gZnJvbSBcIi4vdHJpYW5nbGUuanNcIjtcbmltcG9ydCB7IHN0ZXBzTGluZSB9IGZyb20gXCIuL3N0ZXBzLWxpbmUtdmFycy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFN0cmFpZ2h0VHJhY2soKSB7XG4gICAgY29uc3Qgc3RlcHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc1wiKTtcbiAgICBjb25zdCBnYXAgPSBwYXJzZUludChcbiAgICAgIHdpbmRvd1xuICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZShzdGVwc1NlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zdGVwc19fbGlzdFwiKSlcbiAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoXCJnYXBcIilcbiAgICApO1xuICAgIGNvbnN0IGluaXRpYWxYID0gc3RlcHNTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLng7XG4gICAgY29uc3QgaW5pdGlhbFkgPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSArIHdpbmRvdy5zY3JvbGxZO1xuICAgIC8vY29uc29sZS5sb2coc3RlcHNTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCB3aW5kb3cuc2Nyb2xsWSk7XG4gICAgbGV0IG1hcmtlcnNSZWN0ID0gW107XG4gICAgY29uc3QgbWFya2Vyc0Nvb3JkcyA9IFtdO1xuICBcbiAgICBjb25zdCBmaXJzdE1hcmtlclJlY3QgPSBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubWFya2VyXCIpXG4gICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbWFya2Vyc1JlY3QucHVzaChmaXJzdE1hcmtlclJlY3QpO1xuICBcbiAgICBjb25zdCBsaW5lUGFkZGluZyA9IGZpcnN0TWFya2VyUmVjdC5oZWlnaHQgLyAyIC0gNTsgLy8gdG9kbyDQvtGC0L3QuNC80LDQvdC40LUgNSDRg9Cx0LjRgNCw0LXRgiDQt9Cw0LfQvtGAINC80LXQttC00YMg0LvQuNC90LjQtdC5INC4INC80LDRgNC60LXRgNC+0LwgKNC60L7RgdGC0YvQu9GM0L3QvilcbiAgXG4gICAgLypjb25zdCBmaXJzdE1hcmtlckNvb3JkcyA9IHtcbiAgICAgIHg6IGZpcnN0TWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBmaXJzdE1hcmtlclJlY3Qud2lkdGggLyAyLFxuICAgICAgeTogZmlyc3RNYXJrZXJSZWN0LnkgLSBpbml0aWFsWSxcbiAgICB9O1xuICAgIGZpcnN0TWFya2VyQ29vcmRzLnB1c2gobWFya2Vyc0Nvb3Jkcyk7Ki9cbiAgXG4gICAgY29uc3QgbGFzdE1hcmtlclJlY3QgPSBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX2l0ZW06bGFzdC1jaGlsZCA+Lm1hcmtlclwiKVxuICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIG1hcmtlcnNSZWN0LnB1c2gobGFzdE1hcmtlclJlY3QpO1xuICBcbiAgICAvKiBjb25zdCBsYXN0TWFya2VyQ29vcmRzID0ge1xuICAgICAgeDogbGFzdE1hcmtlclJlY3QueCAtIGluaXRpYWxYICsgbGFzdE1hcmtlclJlY3Qud2lkdGggLyAyLFxuICAgICAgeTogbGFzdE1hcmtlclJlY3QueSAtIGluaXRpYWxZLFxuICAgIH07XG4gICAgbGFzdE1hcmtlckNvb3Jkcy5wdXNoKG1hcmtlcnNDb29yZHMpOyovXG4gIFxuICAgIG1hcmtlcnNSZWN0LmZvckVhY2goKG1hcmtlclJlY3QpID0+IHtcbiAgICAgIC8qY29uc3QgbWFya2VyUmVjdCA9IG1hcmtlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGxldCBjZW50ZXJDb29yZHMgPSB7fTtcbiAgXG4gICAgICBjZW50ZXJDb29yZHMueCA9IG1hcmtlclJlY3QueCAtIGluaXRpYWxYICsgbWFya2VyUmVjdC53aWR0aCAvIDI7XG4gICAgICBjZW50ZXJDb29yZHMueSA9IG1hcmtlclJlY3QueSAtIGluaXRpYWxZICsgbWFya2VyUmVjdC5oZWlnaHQgLyAyO1xuICAqL1xuICAgICAgbWFya2Vyc0Nvb3Jkcy5wdXNoKHtcbiAgICAgICAgeDogbWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBtYXJrZXJSZWN0LndpZHRoIC8gMixcbiAgICAgICAgeTogbWFya2VyUmVjdC55IC0gaW5pdGlhbFkgKyBtYXJrZXJSZWN0LmhlaWdodCAvIDIgKyB3aW5kb3cuc2Nyb2xsWSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHN0ZXBzTGluZS5zdGFydFkgPSBtYXJrZXJzQ29vcmRzWzBdLnkgKyBpbml0aWFsWTtcbiAgICBzdGVwc0xpbmUuZW5kWSA9IG1hcmtlcnNDb29yZHNbbWFya2Vyc0Nvb3Jkcy5sZW5ndGggLSAxXS55ICsgaW5pdGlhbFk7XG4gICAgY29uc29sZS5sb2coaW5pdGlhbFgsIGluaXRpYWxZLCBtYXJrZXJzUmVjdCwgbWFya2Vyc0Nvb3Jkcyk7XG4gICAgY29uc3QgTlNzdHJpbmcgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG4gICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInN2Z1wiKTtcbiAgICBzdmcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fdHJhY2tcIik7XG4gICAgY29uc3QgbWFpblRyYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInBhdGhcIik7XG4gICAgbGV0IGQgPSBgTSAke21hcmtlcnNDb29yZHNbMF0ueH0gJHttYXJrZXJzQ29vcmRzWzBdLnl9IEwgJHttYXJrZXJzQ29vcmRzWzFdLnh9ICR7bWFya2Vyc0Nvb3Jkc1sxXS55fWA7XG4gICAgLyogZm9yIChsZXQgaSA9IDE7IGkgPCBtYXJrZXJzQ29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkICs9IGBDJHttYXJrZXJzQ29vcmRzW2kgLSAxXS54fSAke1xuICAgICAgICBtYXJrZXJzQ29vcmRzW2kgLSAxXS55ICsgY29udHJvbFBvaW50T2Zmc2V0WVxuICAgICAgfSAke21hcmtlcnNDb29yZHNbaV0ueH0gJHtcbiAgICAgICAgbWFya2Vyc0Nvb3Jkc1tpXS55IC0gY29udHJvbFBvaW50T2Zmc2V0WVxuICAgICAgfSAke21hcmtlcnNDb29yZHNbaV0ueH0gJHttYXJrZXJzQ29vcmRzW2ldLnl9YDtcbiAgICB9Ki9cbiAgICBjb25zdCBzdGVwc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zdGVwc19faXRlbVwiKTtcbiAgICBsZXQgb2Zmc2V0QXJyYXkgPSBbMF07XG4gICAgY29uc3QgZGFzaExlbmdodCA9IGdhcCAtIGxpbmVQYWRkaW5nO1xuICAgIC8vIHRvZG8g0L7QutGA0YPQs9C70Y/RgtGMINC30L3QsNGH0LXQvdC40Y8gZGFzaExlbmdodCDQuCBpdGVtSGVpZ2h0INCyINCx0L7Qu9GM0YjRg9GOINGB0YLQvtGA0L7QvdGDP1xuICAgIHN0ZXBzSXRlbXMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgY29uc3QgaXRlbUhlaWdodCA9IHBhcnNlSW50KFxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpdGVtKS5nZXRQcm9wZXJ0eVZhbHVlKFwiaGVpZ2h0XCIpXG4gICAgICApO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgb2Zmc2V0QXJyYXkucHVzaChpdGVtSGVpZ2h0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZnNldEFycmF5LnB1c2goaXRlbUhlaWdodCArIGxpbmVQYWRkaW5nKTtcbiAgICAgIH1cbiAgICAgIG9mZnNldEFycmF5LnB1c2goZGFzaExlbmdodCk7XG4gICAgfSk7XG4gICAgbWFpblRyYWNrLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX21haW4tdHJhY2tcIik7XG4gICAgbWFpblRyYWNrLnNldEF0dHJpYnV0ZShcImRcIiwgZCk7XG4gICAgbWFpblRyYWNrLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJub25lXCIpO1xuICAgIHN0ZXBzTGluZS5wYXRoTGVuZ3RoID0gTWF0aC5yb3VuZChtYWluVHJhY2suZ2V0VG90YWxMZW5ndGgoKSk7XG4gICAgbWFpblRyYWNrLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgb2Zmc2V0QXJyYXkuam9pbihcIiBcIikpO1xuICAgIC8vIHBhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChtYWluVHJhY2spO1xuICAgIGNvbnN0IHRyYWNrTWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJwYXRoXCIpO1xuICAgIHRyYWNrTWFzay5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFjay1tYXNrXCIpO1xuICAgIHRyYWNrTWFzay5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuICAgIHRyYWNrTWFzay5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwibm9uZVwiKTtcbiAgICB0cmFja01hc2suc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgdHJhY2tNYXNrLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIDApO1xuICBcbiAgICBzdmcuYXBwZW5kQ2hpbGQodHJhY2tNYXNrKTtcbiAgXG4gICAgLyp1c2Uuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fdHJhY2stLW1hc2tcIik7XG4gICAgdXNlLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHVzZS5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCAwKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQodXNlKTsqL1xuICAgIHN2Zy5hcHBlbmRDaGlsZChcbiAgICAgIGFkZFRyaWFuZ2xlKG1hcmtlcnNDb29yZHNbMF0ueCwgbWFya2Vyc0Nvb3Jkc1swXS55LCAxNSAvKiwgc3ZnKi8pXG4gICAgKTtcbiAgICBjb25zdCB0cmlhbmdsZU1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwicGF0aFwiKTtcbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fdHJpYW5nbGUtbWFza1wiKTtcbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFwiZFwiLCBkKTtcbiAgICB0cmlhbmdsZU1hc2suc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG4gICAgdHJpYW5nbGVNYXNrLnNldEF0dHJpYnV0ZShcbiAgICAgIFwic3Ryb2tlLXdpZHRoXCIsXG4gICAgICBcIjIwcHhcIlxuICAgICk7IC8qIDIwcHgg0LTQu9GPINC/0LXRgNC10LrRgNGL0YLQuNGPINGC0YDQtdGD0LPQvtC70YzQvdC40LrQsCDQsiAxNXB4ICovXG4gICAgdHJpYW5nbGVNYXNrLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgb2Zmc2V0QXJyYXkuc2xpY2UoMSkuam9pbihcIiBcIikpO1xuICAgIHRyaWFuZ2xlTWFzay5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCAwKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQodHJpYW5nbGVNYXNrKTtcbiAgXG4gICAgc3RlcHNTZWN0aW9uLmFwcGVuZENoaWxkKHN2Zyk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFjayhcbiAgICBzdGFydFNjcm9sbFBvc2l0aW9uLFxuICAgIHN0YXJ0UG9pbnQsXG4gICAgZW5kUG9pbnQsXG4gICAgcGF0aExlbmdodCxcbiAgICBoYW5kbGVyRnVuY1xuICApIHtcbiAgICBjb25zdCB0cmFja1BhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX190cmFjay1tYXNrXCIpO1xuICAgIGNvbnN0IGxpbmVIZWlnaHQgPSBlbmRQb2ludCAtIHN0YXJ0UG9pbnQ7XG4gICAgY29uc3QgbGluZVNjcm9sbFByb2dyZXMgPSAod2luZG93LnNjcm9sbFkgLSBzdGFydFNjcm9sbFBvc2l0aW9uKSAvIGxpbmVIZWlnaHQ7XG4gICAgbGV0IG9mZnNldCA9IC1wYXRoTGVuZ2h0ICogbGluZVNjcm9sbFByb2dyZXM7XG4gIFxuICAgIGlmIChvZmZzZXQgPCAtcGF0aExlbmdodCkge1xuICAgICAgb2Zmc2V0ID0gLXBhdGhMZW5naHQ7XG4gICAgICAvL3dpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZXJGdW5jKTtcbiAgICB9XG4gICAgdHJhY2tQYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIG9mZnNldCk7XG4gICAgbW92ZVRyaWFuZ2xlQWxvbmdTdHJhaWdodChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX3RyYWNrLWFycm93XCIpLFxuICAgICAgdHJhY2tQYXRoLFxuICAgICAgb2Zmc2V0LFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc19fbWFpbi10cmFja1wiKVxuICAgICk7XG4gIH0iLCJleHBvcnQgZnVuY3Rpb24gYWRkVHJpYW5nbGUoaW5pdGlhbFgsIGluaXRpYWxZLCBzaWRlTGVuZ2h0IC8qLCBwYXJlbnROb2RlKi8pIHtcbiAgICBjb25zdCB0cmlhbmdsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgIFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICAgIFwicG9seWdvblwiXG4gICAgKTtcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFjay1hcnJvd1wiKTsgLy96b29tLWluIHNob3cgIGFuaW1hdGUgc2hvdy1mYXN0ZXJcbiAgICAvLyhNYXRoLnNxcnQoMykgLyAyKSA9IDAsODY2XG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJvcGFjaXR5OiAwO1wiKTtcbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcInBvaW50c1wiLFxuICAgICAgYCR7aW5pdGlhbFggLSBzaWRlTGVuZ2h0IC8gMn0sJHtpbml0aWFsWX0gJHtpbml0aWFsWH0sJHtcbiAgICAgICAgaW5pdGlhbFkgKyAoTWF0aC5zcXJ0KDMpIC8gMikgKiBzaWRlTGVuZ2h0XG4gICAgICB9ICR7aW5pdGlhbFggKyBzaWRlTGVuZ2h0IC8gMn0sJHtpbml0aWFsWX1gXG4gICAgKTtcbiAgICAvLyAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0cmlhbmdsZSk7XG4gICAgcmV0dXJuIHRyaWFuZ2xlO1xuICB9XG4gIFxuICBleHBvcnQgZnVuY3Rpb24gbW92ZVRyaWFuZ2xlQWxvbmdDdXJ2ZSh0cmlhbmdsZSwgcGF0aCwgdG90YWxQYXRoTGVuZ2h0LCBvZmZzZXQpIHtcbiAgICBjb25zdCBjdXJyZW50TGVuZ2h0ID0gdG90YWxQYXRoTGVuZ2h0IC0gb2Zmc2V0O1xuICAgIGNvbnN0IGluaXRpYWxQb2ludCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aCgwKTtcbiAgICBjb25zdCBjdXJyZW50UG9pbnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoY3VycmVudExlbmdodCk7XG4gICAgY29uc3QgdHJpYW5nbGVIZWlnaHRQb2ludHMgPSB0cmlhbmdsZVxuICAgICAgLmdldEF0dHJpYnV0ZShcInBvaW50c1wiKVxuICAgICAgLm1hdGNoKC9cXFMrLChcXFMrKVxccy5cXFMrLChcXFMrKS8pO1xuICAgIGNvbnN0IGZ1dHVyZVBvaW50ID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKFxuICAgICAgY3VycmVudExlbmdodCArICh0cmlhbmdsZUhlaWdodFBvaW50c1syXSAtIHRyaWFuZ2xlSGVpZ2h0UG9pbnRzWzFdKVxuICAgICk7XG4gICAgY29uc3QgYW5nbGUgPVxuICAgICAgKE1hdGguYXRhbjIoXG4gICAgICAgIGZ1dHVyZVBvaW50LnkgLSBjdXJyZW50UG9pbnQueSxcbiAgICAgICAgZnV0dXJlUG9pbnQueCAtIGN1cnJlbnRQb2ludC54XG4gICAgICApIC1cbiAgICAgICAgTWF0aC5hdGFuMigwLCBjdXJyZW50UG9pbnQueCArIDEpKSAqXG4gICAgICAgICgxODAgLyBNYXRoLlBJKSAtXG4gICAgICA5MDtcbiAgXG4gICAgdHJpYW5nbGUuc2V0QXR0cmlidXRlKFxuICAgICAgXCJ0cmFuc2Zvcm1cIixcbiAgICAgIGB0cmFuc2xhdGUoJHtjdXJyZW50UG9pbnQueCAtIGluaXRpYWxQb2ludC54fSwgJHtcbiAgICAgICAgY3VycmVudFBvaW50LnkgLSBpbml0aWFsUG9pbnQueVxuICAgICAgfSkgcm90YXRlKCR7YW5nbGV9ICR7aW5pdGlhbFBvaW50Lnh9ICR7aW5pdGlhbFBvaW50Lnl9KWBcbiAgICApO1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwib3BhY2l0eTogMTtcIik7XG4gIH1cbiAgXG4gIGV4cG9ydCBmdW5jdGlvbiBtb3ZlVHJpYW5nbGVBbG9uZ1N0cmFpZ2h0KHRyaWFuZ2xlLCBtYXNrVHJhY2ssIG9mZnNldCwgbWFpblRyYWNrKSB7XG4gICAgY29uc3QgY3VycmVudExlbmdodCA9IC1vZmZzZXQ7XG4gICAgY29uc3QgaW5pdGlhbFBvaW50ID0gbWFza1RyYWNrLmdldFBvaW50QXRMZW5ndGgoMCk7XG4gICAgY29uc3QgY3VycmVudFBvaW50ID0gbWFza1RyYWNrLmdldFBvaW50QXRMZW5ndGgoY3VycmVudExlbmdodCk7XG4gICAgLy9jb25zdCBkYXNoZXNBcnJheSA9IG1haW5UcmFjay5nZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIpLnNwbGl0KFwiIFwiKTtcbiAgICAvKiBjb25zb2xlLmxvZyhjdXJyZW50TGVuZ2h0KTtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKHN1bSA8IGN1cnJlbnRMZW5naHQpIHtcbiAgICAgIGkrKztcbiAgICAgIHN1bSArPSBOdW1iZXIoZGFzaGVzQXJyYXlbaV0pO1xuICAgICAgY29uc29sZS5sb2coaSwgc3VtKTtcbiAgICB9XG4gICAgaWYgKGkgJSAyID09PSAwKSB7XG4gICAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwidHJhbnNmb3JtXCIsXG4gICAgICAgIGB0cmFuc2xhdGUoJHtjdXJyZW50UG9pbnQueCAtIGluaXRpYWxQb2ludC54fSwgJHtcbiAgICAgICAgICBjdXJyZW50UG9pbnQueSAtIGluaXRpYWxQb2ludC55XG4gICAgICAgIH0pYFxuICAgICAgKTtcbiAgICB9Ki9cbiAgICB0cmlhbmdsZS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgYHRyYW5zbGF0ZSgke2N1cnJlbnRQb2ludC54IC0gaW5pdGlhbFBvaW50Lnh9LCAke1xuICAgICAgICBjdXJyZW50UG9pbnQueSAtIGluaXRpYWxQb2ludC55XG4gICAgICB9KWBcbiAgICApO1xuICAgIHRyaWFuZ2xlLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwib3BhY2l0eTogMTtcIik7XG4gIH0iLCJsZXQgbGFzdFNjcm9sbFBvc2l0aW9uID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbERhdGEoKSB7XG4gIGxldCByZXN1bHQgPSB7IHBvc2l0aW9uOiB3aW5kb3cuc2Nyb2xsWSwgZGlyZWN0aW9uOiBcIlwiIH07XG4gIHJlc3VsdC5kaXJlY3Rpb24gPSByZXN1bHQucG9zaXRpb24gPiBsYXN0U2Nyb2xsUG9zaXRpb24gPyBcImRvd25cIiA6IFwidXBcIjtcbiAgbGFzdFNjcm9sbFBvc2l0aW9uID0gcmVzdWx0LnBvc2l0aW9uO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5UYXJnZXQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gIGNvbnN0IGVsZW1lbnRQb3NpdGlvbiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICBpZiAoZWxlbWVudFBvc2l0aW9uIDw9IHRhcmdldCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFpbldpZHRoKCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLW1haW5cIikub2Zmc2V0V2lkdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCBtcykge1xuICBsZXQgaXNUaHJvdHRsZWQgPSBmYWxzZSxcbiAgICBzYXZlZEFyZ3MsXG4gICAgc2F2ZWRUaGlzO1xuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgaWYgKGlzVGhyb3R0bGVkKSB7XG4gICAgICBzYXZlZEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBzYXZlZFRoaXMgPSB0aGlzO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlzVGhyb3R0bGVkID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaXNUaHJvdHRsZWQgPSBmYWxzZTtcbiAgICAgIGlmIChzYXZlZEFyZ3MpIHtcbiAgICAgICAgd3JhcHBlci5hcHBseShzYXZlZFRoaXMsIHNhdmVkQXJncyk7XG4gICAgICAgIHNhdmVkQXJncyA9IHNhdmVkVGhpcyA9IG51bGw7XG4gICAgICB9XG4gICAgfSwgbXMpO1xuICB9XG5cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIwN2M0MDNlYjE4NGI5NTFlYWRmMlwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==