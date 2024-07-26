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
      console.log(window.scrollY);
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
/******/ 	__webpack_require__.h = () => ("98c8696dcf0a212fd3f8")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lZjIzZDE1OTExMWNkNzg5NmZiMC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZ0U7QUFDMUI7QUFDWTtBQUNhO0FBQ0k7QUFDUjtBQUNOO0FBQ0E7QUFDUTtBQUNBO0FBQ1c7QUFDSTtBQUM1RSxrQkFBa0IsdURBQVk7QUFDOUIsd0VBQW9COztBQUVwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxnRkFBZ0I7QUFDdEIsTUFBTTtBQUNOLE1BQU0sNEVBQWM7QUFDcEI7QUFDQTtBQUNBLE1BQU0sa0VBQWlCO0FBQ3ZCO0FBQ0E7QUFDQSxNQUFNLDBFQUFxQjtBQUMzQjtBQUNBO0FBQ0EsTUFBTSxrRUFBaUI7QUFDdkI7QUFDQSxZQUFZLHNFQUFTO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSyxFQUFFOztBQUVQO0FBQ0EscUVBQXFFO0FBQ3JFOztBQUVBLElBQUksK0RBQWU7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLHFGQUF5QjtBQUNqQyxRQUFRLGlGQUF1Qjs7QUFFL0IsNENBQTRDLG1EQUFRO0FBQ3BEO0FBQ0EscUJBQXFCLHFEQUFVO0FBQy9CO0FBQ0EsUUFBUSxtREFBUSxDQUFDLCtEQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLFNBQVMsbURBQVE7QUFDakI7QUFDQSxrQ0FBa0Msc0VBQVMsU0FBUyxzRUFBUztBQUM3RCxVQUFVLHNFQUFTO0FBQ25CLFVBQVUsc0VBQVM7QUFDbkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLHNFQUFzRTs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0MsQ0FBQzs7QUFFRDs7Ozs7Ozs7O1VDbEdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldE1haW5XaWR0aCwgc2Nyb2xsRGF0YSwgaW5UYXJnZXQgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZUVsZW1lbnRzIH0gZnJvbSBcIi4vYW5pbWF0aW9ucy5qc1wiO1xuaW1wb3J0IHsgYWRkQ3VydmVkVHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9jdXJ2ZWQtdHJhY2suanNcIjtcbmltcG9ydCB7IGFkZFN0cmFpZ2h0VHJhY2sgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdHJhaWdodC10cmFjay5qc1wiO1xuaW1wb3J0IHsgaW1nVGh1bWJuYWlsc0hhbmRsZXIgfSBmcm9tIFwiLi9pbWctdGh1bWJuYWlscy5qc1wiO1xuaW1wb3J0IHsgYnVyZ2VyTWVudUhhbmRsZXIgfSBmcm9tIFwiLi9idXJnZXItbWVudS5qc1wiO1xuaW1wb3J0IHsgaGVyb1NsaWRlckhhbmRsZXIgfSBmcm9tIFwiLi9oZXJvLXNsaWRlci5qc1wiO1xuaW1wb3J0IHsgZmVlZGJhY2tTbGlkZXJIYW5kbGVyIH0gZnJvbSBcIi4vZmVlZGJhY2stc2xpZGVyLmpzXCI7XG5pbXBvcnQgeyBzdGVwc0xpbmUgfSBmcm9tIFwiLi9zdGVwcy10cmFjay9zdGVwcy1saW5lLXZhcnMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmNvbnN0IG1haW5XaWR0aCA9IGdldE1haW5XaWR0aCgpO1xuaW1nVGh1bWJuYWlsc0hhbmRsZXIoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgY29uc3QgcHJlbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVsb2FkZXJcIik7XG5cbiAgcHJlbG9hZGVyLm9udHJhbnNpdGlvbmVuZCA9ICgpID0+IHtcbiAgICBwcmVsb2FkZXIub250cmFuc2l0aW9uZW5kID0gbnVsbDtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN0b3Atc2Nyb2xsXCIpO1xuICAgIHByZWxvYWRlci5yZW1vdmUoKTtcblxuICAgIGlmIChtYWluV2lkdGggPD0gMTMwMCkge1xuICAgICAgYWRkU3RyYWlnaHRUcmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRDdXJ2ZWRUcmFjaygpO1xuICAgIH1cbiAgICBpZiAobWFpbldpZHRoIDw9IDEyNTApIHtcbiAgICAgIGJ1cmdlck1lbnVIYW5kbGVyKG1haW5XaWR0aCk7XG4gICAgfVxuICAgIGlmIChtYWluV2lkdGggPiAxMjAwKSB7XG4gICAgICBmZWVkYmFja1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG4gICAgaWYgKG1haW5XaWR0aCA+IDgwMCkge1xuICAgICAgaGVyb1NsaWRlckhhbmRsZXIoKTtcbiAgICB9XG5jb25zb2xlLmxvZyhzdGVwc0xpbmUpO1xuICAgIC8qY29uc3QgZXIgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICBlcigpO1xuICAgIH0pOyovXG5cbiAgICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQsNC90LjQvNCw0YbQuNC5XG4gICAgY29uc3QgYW5pbWF0aW9uRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFuaW1hdGVcIik7IC8vIHRvZG8/INC/0L7QvNC10L3Rj9GC0Ywg0L3QsCBieWNsYXNzbmFtZSA6bm90IHNjcm9sbGVkINGH0YLQvtCx0Ysg0LrQvtC70LvQtdC60YbQuNGPINC+0LHQvdC+0LLQu9GP0LvQsNGB0Ywg0YHQsNC80LA/XG4gICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ICogMC44O1xuXG4gICAgYW5pbWF0ZUVsZW1lbnRzKGFuaW1hdGlvbkVsZW1lbnRzLCB0YXJnZXRQb3NpdGlvbik7XG5cbiAgICBjb25zdCBzdGVwc1RyYWNrQW5pbWF0ZUZ1bmN0aW9uID1cbiAgICBtYWluV2lkdGggPD0gMTMwMFxuICAgICAgPyBhbmltYXRlU3RyYWlnaHRTdGVwc1RyYWNrXG4gICAgICA6IGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrO1xuXG4gICAgY29uc3QgdGhyb3R0bGVkU2Nyb2xsQW5pbWF0aW9uSGFuZGxlciA9IHRocm90dGxlKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHdpbmRvdy5zY3JvbGxZKTtcbiAgICAgIGNvbnN0IHNjcm9sbCA9IHNjcm9sbERhdGEoKTtcbiAgICAgIGlmKHNjcm9sbC5kaXJlY3Rpb24gPT09IFwiZG93blwiKXtcbiAgICAgICAgdGhyb3R0bGUoYW5pbWF0ZUVsZW1lbnRzKFxuICAgICAgICAgIGFuaW1hdGlvbkVsZW1lbnRzLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uKSwgMTAwKVxuICAgICAgfVxuICAgICAgaWYoaW5UYXJnZXQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5lLXN0YXJ0XCIpLCB0YXJnZXRQb3NpdGlvbikpe1xuICAgICAgICBjb25zb2xlLmxvZyhcItCh0YDQsNCx0L7RgtCw0Lsgc3RhcnQtbGl0ZVwiKTtcbiAgICAgICAgc3RlcHNUcmFja0FuaW1hdGVGdW5jdGlvbihzdGVwc0xpbmUuc3RhcnRZLCBzdGVwc0xpbmUuc3RhcnRZLFxuICAgICAgICAgIHN0ZXBzTGluZS5lbmRZLFxuICAgICAgICAgIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9LCA1MCk7XG4gICAgXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aHJvdHRsZWRTY3JvbGxBbmltYXRpb25IYW5kbGVyKTtcblxuICAgIC8vbGV0IGxhc3RTY3JvbGxQb3NpdGlvbiA9IDA7XG4gICAgLypjb25zdCB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHMgPSB0aHJvdHRsZShhbmltYXRlRWxlbWVudHMsIDIwMCk7Ki9cblxuICAgIC8qY29uc3QgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzID0gdGhyb3R0bGUoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coc2Nyb2xsRGF0YSgpKTtcbiAgICAgIC8vIHRvZG8g0LLRi9C90LXRgdGC0Lgg0L/RgNC+0LLQtdGA0LrRgyDQvdCw0L/RgNCw0LLQu9C10L3QuNGPINGB0LrRgNC+0LvQu9CwLCDRgtGD0YIg0LTQvtC70LbQvdCwINCx0YvRgtGMINGC0L7Qu9GM0LrQviDRhNGD0L3QutGG0LjRj1xuICAgICAgY29uc3QgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XG4gICAgICBpZiAoY3VycmVudFNjcm9sbFBvc2l0aW9uID4gbGFzdFNjcm9sbFBvc2l0aW9uKSB7XG4gICAgICAgIGFuaW1hdGVFbGVtZW50cyhcbiAgICAgICAgICBhbmltYXRpb25FbGVtZW50cyxcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGxhc3RTY3JvbGxQb3NpdGlvbiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbjtcbiAgICB9LCAxMDApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzKTtcbiAgICAqL1xuICB9O1xuICBwcmVsb2FkZXIuY2xhc3NMaXN0LmFkZChcInByZWxvYWRlcl9oaWRlXCIpOyAvL3RvZG8g0L/QtdGA0LXQvdC10YHRgtC4INC/0L7RgdC70LUgdHJhbnNpdGlvbmVuZD8g0L/QvtGC0L7QvNGDINGH0YLQviDRgdC90LDRh9Cw0LvQsCDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjiDQsCDQv9C+0YLQvtC8INGC0L7Qu9GM0LrQviDQtNC+0LHQsNCy0LvRj9C10Lwg0YHQvtCx0YvRgtC40LU/XG59KTtcblxuLy93aW5kb3cub25sb2FkID0gO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiOThjODY5NmRjZjBhMjEyZmQzZjhcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=