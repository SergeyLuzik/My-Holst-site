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
        stepsTrackAnimateFunction(_steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.startY - targetPosition, _steps_track_steps_line_vars_js__WEBPACK_IMPORTED_MODULE_8__.stepsLine.startY,
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
/******/ 	__webpack_require__.h = () => ("7a49c92b2d76572b0998")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wODZhM2JkNWU0NTZiYjA5ZDFmYi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZ0U7QUFDMUI7QUFDWTtBQUNhO0FBQ0k7QUFDUjtBQUNOO0FBQ0E7QUFDUTtBQUNBO0FBQ1c7QUFDSTs7QUFFNUUsa0JBQWtCLHVEQUFZO0FBQzlCLHdFQUFvQjs7QUFFcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sZ0ZBQWdCO0FBQ3RCLE1BQU07QUFDTixNQUFNLDRFQUFjO0FBQ3BCO0FBQ0E7QUFDQSxNQUFNLGtFQUFpQjtBQUN2QjtBQUNBO0FBQ0EsTUFBTSwwRUFBcUI7QUFDM0I7QUFDQTtBQUNBLE1BQU0sa0VBQWlCO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSyxFQUFFOztBQUVQO0FBQ0EscUVBQXFFO0FBQ3JFOztBQUVBLElBQUksK0RBQWU7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLHFGQUF5QjtBQUNqQyxRQUFRLGlGQUF1Qjs7QUFFL0IsNENBQTRDLG1EQUFROztBQUVwRCxxQkFBcUIscURBQVU7QUFDL0I7QUFDQSxRQUFRLG1EQUFRLENBQUMsK0RBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsU0FBUyxtREFBUTtBQUNqQjtBQUNBLGtDQUFrQyxzRUFBUywwQkFBMEIsc0VBQVM7QUFDOUUsVUFBVSxzRUFBUztBQUNuQixVQUFVLHNFQUFTO0FBQ25CO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxzRUFBc0U7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDLENBQUM7O0FBRUQ7Ozs7Ozs7OztVQ25HQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRNYWluV2lkdGgsIHNjcm9sbERhdGEsIGluVGFyZ2V0IH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVFbGVtZW50cyB9IGZyb20gXCIuL2FuaW1hdGlvbnMuanNcIjtcbmltcG9ydCB7IGFkZEN1cnZlZFRyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhZGRTdHJhaWdodFRyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmltcG9ydCB7IGltZ1RodW1ibmFpbHNIYW5kbGVyIH0gZnJvbSBcIi4vaW1nLXRodW1ibmFpbHMuanNcIjtcbmltcG9ydCB7IGJ1cmdlck1lbnVIYW5kbGVyIH0gZnJvbSBcIi4vYnVyZ2VyLW1lbnUuanNcIjtcbmltcG9ydCB7IGhlcm9TbGlkZXJIYW5kbGVyIH0gZnJvbSBcIi4vaGVyby1zbGlkZXIuanNcIjtcbmltcG9ydCB7IGZlZWRiYWNrU2xpZGVySGFuZGxlciB9IGZyb20gXCIuL2ZlZWRiYWNrLXNsaWRlci5qc1wiO1xuaW1wb3J0IHsgc3RlcHNMaW5lIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RlcHMtbGluZS12YXJzLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlQ3VydmVkU3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL2N1cnZlZC10cmFjay5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0cmFpZ2h0LXRyYWNrLmpzXCI7XG5cbmNvbnN0IG1haW5XaWR0aCA9IGdldE1haW5XaWR0aCgpO1xuaW1nVGh1bWJuYWlsc0hhbmRsZXIoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgY29uc3QgcHJlbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVsb2FkZXJcIik7XG5cbiAgcHJlbG9hZGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBwcmVsb2FkZXIub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN0b3Atc2Nyb2xsXCIpO1xuICAgIHByZWxvYWRlci5yZW1vdmUoKTtcblxuICAgIGlmIChtYWluV2lkdGggPD0gMTMwMCkge1xuICAgICAgYWRkU3RyYWlnaHRUcmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRDdXJ2ZWRUcmFjaygpO1xuICAgIH1cbiAgICBpZiAobWFpbldpZHRoIDw9IDEyNTApIHtcbiAgICAgIGJ1cmdlck1lbnVIYW5kbGVyKG1haW5XaWR0aCk7XG4gICAgfVxuICAgIGlmIChtYWluV2lkdGggPiAxMjAwKSB7XG4gICAgICBmZWVkYmFja1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG4gICAgaWYgKG1haW5XaWR0aCA+IDgwMCkge1xuICAgICAgaGVyb1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG5cbiAgICAvKmNvbnN0IGVyID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgZXIoKTtcbiAgICB9KTsqL1xuXG4gICAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LDQvdC40LzQsNGG0LjQuVxuICAgIGNvbnN0IGFuaW1hdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hbmltYXRlXCIpOyAvLyB0b2RvPyDQv9C+0LzQtdC90Y/RgtGMINC90LAgYnljbGFzc25hbWUgOm5vdCBzY3JvbGxlZCDRh9GC0L7QsdGLINC60L7Qu9C70LXQutGG0LjRjyDQvtCx0L3QvtCy0LvRj9C70LDRgdGMINGB0LDQvNCwP1xuICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAqIDAuODtcblxuICAgIGFuaW1hdGVFbGVtZW50cyhhbmltYXRpb25FbGVtZW50cywgdGFyZ2V0UG9zaXRpb24pO1xuXG4gICAgY29uc3Qgc3RlcHNUcmFja0FuaW1hdGVGdW5jdGlvbiA9XG4gICAgbWFpbldpZHRoIDw9IDEzMDBcbiAgICAgID8gYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFja1xuICAgICAgOiBhbmltYXRlQ3VydmVkU3RlcHNUcmFjaztcblxuICAgIGNvbnN0IHRocm90dGxlZFNjcm9sbEFuaW1hdGlvbkhhbmRsZXIgPSB0aHJvdHRsZSgoKSA9PiB7XG5cbiAgICAgIGNvbnN0IHNjcm9sbCA9IHNjcm9sbERhdGEoKTtcbiAgICAgIGlmKHNjcm9sbC5kaXJlY3Rpb24gPT09IFwiZG93blwiKXtcbiAgICAgICAgdGhyb3R0bGUoYW5pbWF0ZUVsZW1lbnRzKFxuICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uKSwgMTAwKVxuICAgICAgfVxuICAgICAgaWYoaW5UYXJnZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5lLXN0YXJ0XCIpLCB0YXJnZXRQb3NpdGlvbikpe1xuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsgc3RhcnQtbGl0ZVwiKTtcbiAgICAgICAgc3RlcHNUcmFja0FuaW1hdGVGdW5jdGlvbihzdGVwc0xpbmUuc3RhcnRZIC0gdGFyZ2V0UG9zaXRpb24sIHN0ZXBzTGluZS5zdGFydFksXG4gICAgICAgICAgc3RlcHNMaW5lLmVuZFksXG4gICAgICAgICAgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgICAgfVxuICAgIH0sIDUwKTtcbiAgICBcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRocm90dGxlZFNjcm9sbEFuaW1hdGlvbkhhbmRsZXIpO1xuXG4gICAgLy9sZXQgbGFzdFNjcm9sbFBvc2l0aW9uID0gMDtcbiAgICAvKmNvbnN0IHRocm90dGxlZEFuaW1hdGVFbGVtZW50cyA9IHRocm90dGxlKGFuaW1hdGVFbGVtZW50cywgMjAwKTsqL1xuXG4gICAgLypjb25zdCB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHMgPSB0aHJvdHRsZSgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhzY3JvbGxEYXRhKCkpO1xuICAgICAgLy8gdG9kbyDQstGL0L3QtdGB0YLQuCDQv9GA0L7QstC10YDQutGDINC90LDQv9GA0LDQstC70LXQvdC40Y8g0YHQutGA0L7Qu9C70LAsINGC0YPRgiDQtNC+0LvQttC90LAg0LHRi9GC0Ywg0YLQvtC70YzQutC+INGE0YPQvdC60YbQuNGPXG4gICAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgIGlmIChjdXJyZW50U2Nyb2xsUG9zaXRpb24gPiBsYXN0U2Nyb2xsUG9zaXRpb24pIHtcbiAgICAgICAgYW5pbWF0ZUVsZW1lbnRzKFxuICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uLFxuICAgICAgICAgIHRocm90dGxlZEFuaW1hdGVFbGVtZW50c1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgbGFzdFNjcm9sbFBvc2l0aW9uID0gY3VycmVudFNjcm9sbFBvc2l0aW9uO1xuICAgIH0sIDEwMCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHMpO1xuICAgICovXG4gIH07XG4gIHByZWxvYWRlci5jbGFzc0xpc3QuYWRkKFwicHJlbG9hZGVyX2hpZGVcIik7IC8vdG9kbyDQv9C10YDQtdC90LXRgdGC0Lgg0L/QvtGB0LvQtSB0cmFuc2l0aW9uZW5kPyDQv9C+0YLQvtC80YMg0YfRgtC+INGB0L3QsNGH0LDQu9CwINC30LDQv9GD0YHQutCw0LXQvCDQsNC90LjQvNCw0YbQuNGOINCwINC/0L7RgtC+0Lwg0YLQvtC70YzQutC+INC00L7QsdCw0LLQu9GP0LXQvCDRgdC+0LHRi9GC0LjQtT9cbn0pO1xuXG4vL3dpbmRvdy5vbmxvYWQgPSA7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI3YTQ5YzkyYjJkNzY1NzJiMDk5OFwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==