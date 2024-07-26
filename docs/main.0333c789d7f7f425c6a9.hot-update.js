"use strict";
self["webpackHotUpdatemy_holst_site"]("main",{

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


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f92ad57bab22e0cd3b33")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wMzMzYzc4OWQ3ZjdmNDI1YzZhOS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZ0U7QUFDMUI7QUFDWTtBQUNhO0FBQ0k7QUFDUjtBQUNOO0FBQ0E7QUFDUTtBQUNBO0FBQ1c7QUFDSTtBQUM1RSxrQkFBa0IsdURBQVk7QUFDOUIsd0VBQW9COztBQUVwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxnRkFBZ0I7QUFDdEIsTUFBTTtBQUNOLE1BQU0sNEVBQWM7QUFDcEI7QUFDQTtBQUNBLE1BQU0sa0VBQWlCO0FBQ3ZCO0FBQ0E7QUFDQSxNQUFNLDBFQUFxQjtBQUMzQjtBQUNBO0FBQ0EsTUFBTSxrRUFBaUI7QUFDdkI7QUFDQSxZQUFZLHNFQUFTO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSyxFQUFFOztBQUVQO0FBQ0EscUVBQXFFO0FBQ3JFOztBQUVBLElBQUksK0RBQWU7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLHFGQUF5QjtBQUNqQyxRQUFRLGlGQUF1Qjs7QUFFL0IsNENBQTRDLG1EQUFROztBQUVwRCxxQkFBcUIscURBQVU7QUFDL0I7QUFDQSxRQUFRLG1EQUFRLENBQUMsK0RBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsU0FBUyxtREFBUTtBQUNqQjtBQUNBLGtDQUFrQyxzRUFBUyxTQUFTLHNFQUFTO0FBQzdELFVBQVUsc0VBQVM7QUFDbkIsVUFBVSxzRUFBUztBQUNuQjtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0Esc0VBQXNFOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QyxDQUFDOztBQUVEOzs7Ozs7Ozs7VUNsR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0TWFpbldpZHRoLCBzY3JvbGxEYXRhLCBpblRhcmdldCB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlRWxlbWVudHMgfSBmcm9tIFwiLi9hbmltYXRpb25zLmpzXCI7XG5pbXBvcnQgeyBhZGRDdXJ2ZWRUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL2N1cnZlZC10cmFjay5qc1wiO1xuaW1wb3J0IHsgYWRkU3RyYWlnaHRUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0cmFpZ2h0LXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBpbWdUaHVtYm5haWxzSGFuZGxlciB9IGZyb20gXCIuL2ltZy10aHVtYm5haWxzLmpzXCI7XG5pbXBvcnQgeyBidXJnZXJNZW51SGFuZGxlciB9IGZyb20gXCIuL2J1cmdlci1tZW51LmpzXCI7XG5pbXBvcnQgeyBoZXJvU2xpZGVySGFuZGxlciB9IGZyb20gXCIuL2hlcm8tc2xpZGVyLmpzXCI7XG5pbXBvcnQgeyBmZWVkYmFja1NsaWRlckhhbmRsZXIgfSBmcm9tIFwiLi9mZWVkYmFjay1zbGlkZXIuanNcIjtcbmltcG9ydCB7IHN0ZXBzTGluZSB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0ZXBzLWxpbmUtdmFycy5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZUN1cnZlZFN0ZXBzVHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9jdXJ2ZWQtdHJhY2suanNcIjtcbmltcG9ydCB7IGFuaW1hdGVTdHJhaWdodFN0ZXBzVHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdHJhaWdodC10cmFjay5qc1wiO1xuY29uc3QgbWFpbldpZHRoID0gZ2V0TWFpbldpZHRoKCk7XG5pbWdUaHVtYm5haWxzSGFuZGxlcigpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBjb25zdCBwcmVsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWxvYWRlclwiKTtcblxuICBwcmVsb2FkZXIub250cmFuc2l0aW9uZW5kID0gKCkgPT4ge1xuICAgIHByZWxvYWRlci5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3RvcC1zY3JvbGxcIik7XG4gICAgcHJlbG9hZGVyLnJlbW92ZSgpO1xuXG4gICAgaWYgKG1haW5XaWR0aCA8PSAxMzAwKSB7XG4gICAgICBhZGRTdHJhaWdodFRyYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZEN1cnZlZFRyYWNrKCk7XG4gICAgfVxuICAgIGlmIChtYWluV2lkdGggPD0gMTI1MCkge1xuICAgICAgYnVyZ2VyTWVudUhhbmRsZXIobWFpbldpZHRoKTtcbiAgICB9XG4gICAgaWYgKG1haW5XaWR0aCA+IDEyMDApIHtcbiAgICAgIGZlZWRiYWNrU2xpZGVySGFuZGxlcigpO1xuICAgIH1cbiAgICBpZiAobWFpbldpZHRoID4gODAwKSB7XG4gICAgICBoZXJvU2xpZGVySGFuZGxlcigpO1xuICAgIH1cbmNvbnNvbGUubG9nKHN0ZXBzTGluZSk7XG4gICAgLypjb25zdCBlciA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgIGVyKCk7XG4gICAgfSk7Ki9cblxuICAgIC8vINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINCw0L3QuNC80LDRhtC40LlcbiAgICBjb25zdCBhbmltYXRpb25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYW5pbWF0ZVwiKTsgLy8gdG9kbz8g0L/QvtC80LXQvdGP0YLRjCDQvdCwIGJ5Y2xhc3NuYW1lIDpub3Qgc2Nyb2xsZWQg0YfRgtC+0LHRiyDQutC+0LvQu9C10LrRhtC40Y8g0L7QsdC90L7QstC70Y/Qu9Cw0YHRjCDRgdCw0LzQsD9cbiAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgKiAwLjg7XG5cbiAgICBhbmltYXRlRWxlbWVudHMoYW5pbWF0aW9uRWxlbWVudHMsIHRhcmdldFBvc2l0aW9uKTtcblxuICAgIGNvbnN0IHN0ZXBzVHJhY2tBbmltYXRlRnVuY3Rpb24gPVxuICAgIG1haW5XaWR0aCA8PSAxMzAwXG4gICAgICA/IGFuaW1hdGVTdHJhaWdodFN0ZXBzVHJhY2tcbiAgICAgIDogYW5pbWF0ZUN1cnZlZFN0ZXBzVHJhY2s7XG5cbiAgICBjb25zdCB0aHJvdHRsZWRTY3JvbGxBbmltYXRpb25IYW5kbGVyID0gdGhyb3R0bGUoKCkgPT4ge1xuXG4gICAgICBjb25zdCBzY3JvbGwgPSBzY3JvbGxEYXRhKCk7XG4gICAgICBpZihzY3JvbGwuZGlyZWN0aW9uID09PSBcImRvd25cIil7XG4gICAgICAgIHRocm90dGxlKGFuaW1hdGVFbGVtZW50cyhcbiAgICAgICAgICBhbmltYXRpb25FbGVtZW50cyxcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbiksIDEwMClcbiAgICAgIH1cbiAgICAgIGlmKGluVGFyZ2V0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGluZS1zdGFydFwiKSwgdGFyZ2V0UG9zaXRpb24pKXtcbiAgICAgICAgY29uc29sZS5sb2coXCLQodGA0LDQsdC+0YLQsNC7IHN0YXJ0LWxpdGVcIik7XG4gICAgICAgIHN0ZXBzVHJhY2tBbmltYXRlRnVuY3Rpb24oc3RlcHNMaW5lLnN0YXJ0WSwgc3RlcHNMaW5lLnN0YXJ0WSxcbiAgICAgICAgICBzdGVwc0xpbmUuZW5kWSxcbiAgICAgICAgICBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgICB9XG4gICAgfSwgNTApO1xuICAgIFxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhyb3R0bGVkU2Nyb2xsQW5pbWF0aW9uSGFuZGxlcik7XG5cbiAgICAvL2xldCBsYXN0U2Nyb2xsUG9zaXRpb24gPSAwO1xuICAgIC8qY29uc3QgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzID0gdGhyb3R0bGUoYW5pbWF0ZUVsZW1lbnRzLCAyMDApOyovXG5cbiAgICAvKmNvbnN0IHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyA9IHRocm90dGxlKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHNjcm9sbERhdGEoKSk7XG4gICAgICAvLyB0b2RvINCy0YvQvdC10YHRgtC4INC/0YDQvtCy0LXRgNC60YMg0L3QsNC/0YDQsNCy0LvQtdC90LjRjyDRgdC60YDQvtC70LvQsCwg0YLRg9GCINC00L7Qu9C20L3QsCDQsdGL0YLRjCDRgtC+0LvRjNC60L4g0YTRg9C90LrRhtC40Y9cbiAgICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgaWYgKGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA+IGxhc3RTY3JvbGxQb3NpdGlvbikge1xuICAgICAgICBhbmltYXRlRWxlbWVudHMoXG4gICAgICAgICAgYW5pbWF0aW9uRWxlbWVudHMsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb24sXG4gICAgICAgICAgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBsYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG4gICAgfSwgMTAwKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyk7XG4gICAgKi9cbiAgfTtcbiAgcHJlbG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJwcmVsb2FkZXJfaGlkZVwiKTsgLy90b2RvINC/0LXRgNC10L3QtdGB0YLQuCDQv9C+0YHQu9C1IHRyYW5zaXRpb25lbmQ/INC/0L7RgtC+0LzRgyDRh9GC0L4g0YHQvdCw0YfQsNC70LAg0LfQsNC/0YPRgdC60LDQtdC8INCw0L3QuNC80LDRhtC40Y4g0LAg0L/QvtGC0L7QvCDRgtC+0LvRjNC60L4g0LTQvtCx0LDQstC70Y/QtdC8INGB0L7QsdGL0YLQuNC1P1xufSk7XG5cbi8vd2luZG93Lm9ubG9hZCA9IDtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImY5MmFkNTdiYWIyMmUwY2QzYjMzXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9