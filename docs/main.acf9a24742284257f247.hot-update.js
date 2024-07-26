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
        console.log("Сработал ");
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
/******/ 	__webpack_require__.h = () => ("8435378620849cdccb07")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hY2Y5YTI0NzQyMjg0MjU3ZjI0Ny5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZ0U7QUFDMUI7QUFDWTtBQUNhO0FBQ0k7QUFDUjtBQUNOO0FBQ0E7QUFDUTtBQUNBO0FBQ1c7QUFDSTtBQUM1RSxrQkFBa0IsdURBQVk7QUFDOUIsd0VBQW9COztBQUVwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxnRkFBZ0I7QUFDdEIsTUFBTTtBQUNOLE1BQU0sNEVBQWM7QUFDcEI7QUFDQTtBQUNBLE1BQU0sa0VBQWlCO0FBQ3ZCO0FBQ0E7QUFDQSxNQUFNLDBFQUFxQjtBQUMzQjtBQUNBO0FBQ0EsTUFBTSxrRUFBaUI7QUFDdkI7QUFDQSxZQUFZLHNFQUFTO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSyxFQUFFOztBQUVQO0FBQ0EscUVBQXFFO0FBQ3JFOztBQUVBLElBQUksK0RBQWU7O0FBRW5CO0FBQ0E7QUFDQSxRQUFRLHFGQUF5QjtBQUNqQyxRQUFRLGlGQUF1Qjs7QUFFL0IsNENBQTRDLG1EQUFRO0FBQ3BELHFCQUFxQixxREFBVTtBQUMvQjtBQUNBLFFBQVEsbURBQVEsQ0FBQywrREFBZTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxTQUFTLG1EQUFRO0FBQ2pCO0FBQ0Esa0NBQWtDLHNFQUFTLFNBQVMsc0VBQVM7QUFDN0QsVUFBVSxzRUFBUztBQUNuQixVQUFVLHNFQUFTO0FBQ25CO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxzRUFBc0U7O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDLENBQUM7O0FBRUQ7Ozs7Ozs7OztVQ2pHQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRNYWluV2lkdGgsIHNjcm9sbERhdGEsIGluVGFyZ2V0IH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSBcIi4vdXRpbHMuanNcIjtcbmltcG9ydCB7IGFuaW1hdGVFbGVtZW50cyB9IGZyb20gXCIuL2FuaW1hdGlvbnMuanNcIjtcbmltcG9ydCB7IGFkZEN1cnZlZFRyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzXCI7XG5pbXBvcnQgeyBhZGRTdHJhaWdodFRyYWNrIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RyYWlnaHQtdHJhY2suanNcIjtcbmltcG9ydCB7IGltZ1RodW1ibmFpbHNIYW5kbGVyIH0gZnJvbSBcIi4vaW1nLXRodW1ibmFpbHMuanNcIjtcbmltcG9ydCB7IGJ1cmdlck1lbnVIYW5kbGVyIH0gZnJvbSBcIi4vYnVyZ2VyLW1lbnUuanNcIjtcbmltcG9ydCB7IGhlcm9TbGlkZXJIYW5kbGVyIH0gZnJvbSBcIi4vaGVyby1zbGlkZXIuanNcIjtcbmltcG9ydCB7IGZlZWRiYWNrU2xpZGVySGFuZGxlciB9IGZyb20gXCIuL2ZlZWRiYWNrLXNsaWRlci5qc1wiO1xuaW1wb3J0IHsgc3RlcHNMaW5lIH0gZnJvbSBcIi4vc3RlcHMtdHJhY2svc3RlcHMtbGluZS12YXJzLmpzXCI7XG5pbXBvcnQgeyBhbmltYXRlQ3VydmVkU3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL2N1cnZlZC10cmFjay5qc1wiO1xuaW1wb3J0IHsgYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFjayB9IGZyb20gXCIuL3N0ZXBzLXRyYWNrL3N0cmFpZ2h0LXRyYWNrLmpzXCI7XG5jb25zdCBtYWluV2lkdGggPSBnZXRNYWluV2lkdGgoKTtcbmltZ1RodW1ibmFpbHNIYW5kbGVyKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIGNvbnN0IHByZWxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlbG9hZGVyXCIpO1xuXG4gIHByZWxvYWRlci5vbnRyYW5zaXRpb25lbmQgPSAoKSA9PiB7XG4gICAgcHJlbG9hZGVyLm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzdG9wLXNjcm9sbFwiKTtcbiAgICBwcmVsb2FkZXIucmVtb3ZlKCk7XG5cbiAgICBpZiAobWFpbldpZHRoIDw9IDEzMDApIHtcbiAgICAgIGFkZFN0cmFpZ2h0VHJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkQ3VydmVkVHJhY2soKTtcbiAgICB9XG4gICAgaWYgKG1haW5XaWR0aCA8PSAxMjUwKSB7XG4gICAgICBidXJnZXJNZW51SGFuZGxlcihtYWluV2lkdGgpO1xuICAgIH1cbiAgICBpZiAobWFpbldpZHRoID4gMTIwMCkge1xuICAgICAgZmVlZGJhY2tTbGlkZXJIYW5kbGVyKCk7XG4gICAgfVxuICAgIGlmIChtYWluV2lkdGggPiA4MDApIHtcbiAgICAgIGhlcm9TbGlkZXJIYW5kbGVyKCk7XG4gICAgfVxuY29uc29sZS5sb2coc3RlcHNMaW5lKTtcbiAgICAvKmNvbnN0IGVyID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgZXIoKTtcbiAgICB9KTsqL1xuXG4gICAgLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LDQvdC40LzQsNGG0LjQuVxuICAgIGNvbnN0IGFuaW1hdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hbmltYXRlXCIpOyAvLyB0b2RvPyDQv9C+0LzQtdC90Y/RgtGMINC90LAgYnljbGFzc25hbWUgOm5vdCBzY3JvbGxlZCDRh9GC0L7QsdGLINC60L7Qu9C70LXQutGG0LjRjyDQvtCx0L3QvtCy0LvRj9C70LDRgdGMINGB0LDQvNCwP1xuICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAqIDAuODtcblxuICAgIGFuaW1hdGVFbGVtZW50cyhhbmltYXRpb25FbGVtZW50cywgdGFyZ2V0UG9zaXRpb24pO1xuXG4gICAgY29uc3Qgc3RlcHNUcmFja0FuaW1hdGVGdW5jdGlvbiA9XG4gICAgbWFpbldpZHRoIDw9IDEzMDBcbiAgICAgID8gYW5pbWF0ZVN0cmFpZ2h0U3RlcHNUcmFja1xuICAgICAgOiBhbmltYXRlQ3VydmVkU3RlcHNUcmFjaztcblxuICAgIGNvbnN0IHRocm90dGxlZFNjcm9sbEFuaW1hdGlvbkhhbmRsZXIgPSB0aHJvdHRsZSgoKSA9PiB7XG4gICAgICBjb25zdCBzY3JvbGwgPSBzY3JvbGxEYXRhKCk7XG4gICAgICBpZihzY3JvbGwuZGlyZWN0aW9uID09PSBcImRvd25cIil7XG4gICAgICAgIHRocm90dGxlKGFuaW1hdGVFbGVtZW50cyhcbiAgICAgICAgICBhbmltYXRpb25FbGVtZW50cyxcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbiksIDEwMClcbiAgICAgIH1cbiAgICAgIGlmKGluVGFyZ2V0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGluZS1zdGFydFwiKSwgdGFyZ2V0UG9zaXRpb24pKXtcbiAgICAgICAgY29uc29sZS5sb2coXCLQodGA0LDQsdC+0YLQsNC7IFwiKTtcbiAgICAgICAgc3RlcHNUcmFja0FuaW1hdGVGdW5jdGlvbihzdGVwc0xpbmUuc3RhcnRZLCBzdGVwc0xpbmUuc3RhcnRZLFxuICAgICAgICAgIHN0ZXBzTGluZS5lbmRZLFxuICAgICAgICAgIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9LCA1MCk7XG4gICAgXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aHJvdHRsZWRTY3JvbGxBbmltYXRpb25IYW5kbGVyKTtcblxuICAgIC8vbGV0IGxhc3RTY3JvbGxQb3NpdGlvbiA9IDA7XG4gICAgLypjb25zdCB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHMgPSB0aHJvdHRsZShhbmltYXRlRWxlbWVudHMsIDIwMCk7Ki9cblxuICAgIC8qY29uc3QgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzID0gdGhyb3R0bGUoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coc2Nyb2xsRGF0YSgpKTtcbiAgICAgIC8vIHRvZG8g0LLRi9C90LXRgdGC0Lgg0L/RgNC+0LLQtdGA0LrRgyDQvdCw0L/RgNCw0LLQu9C10L3QuNGPINGB0LrRgNC+0LvQu9CwLCDRgtGD0YIg0LTQvtC70LbQvdCwINCx0YvRgtGMINGC0L7Qu9GM0LrQviDRhNGD0L3QutGG0LjRj1xuICAgICAgY29uc3QgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFk7XG4gICAgICBpZiAoY3VycmVudFNjcm9sbFBvc2l0aW9uID4gbGFzdFNjcm9sbFBvc2l0aW9uKSB7XG4gICAgICAgIGFuaW1hdGVFbGVtZW50cyhcbiAgICAgICAgICBhbmltYXRpb25FbGVtZW50cyxcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICB0aHJvdHRsZWRBbmltYXRlRWxlbWVudHNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGxhc3RTY3JvbGxQb3NpdGlvbiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbjtcbiAgICB9LCAxMDApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhyb3R0bGVkQW5pbWF0ZUVsZW1lbnRzKTtcbiAgICAqL1xuICB9O1xuICBwcmVsb2FkZXIuY2xhc3NMaXN0LmFkZChcInByZWxvYWRlcl9oaWRlXCIpOyAvL3RvZG8g0L/QtdGA0LXQvdC10YHRgtC4INC/0L7RgdC70LUgdHJhbnNpdGlvbmVuZD8g0L/QvtGC0L7QvNGDINGH0YLQviDRgdC90LDRh9Cw0LvQsCDQt9Cw0L/Rg9GB0LrQsNC10Lwg0LDQvdC40LzQsNGG0LjRjiDQsCDQv9C+0YLQvtC8INGC0L7Qu9GM0LrQviDQtNC+0LHQsNCy0LvRj9C10Lwg0YHQvtCx0YvRgtC40LU/XG59KTtcblxuLy93aW5kb3cub25sb2FkID0gO1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiODQzNTM3ODYyMDg0OWNkY2NiMDdcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=