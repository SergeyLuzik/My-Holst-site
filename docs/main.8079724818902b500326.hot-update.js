"use strict";
self["webpackHotUpdatemy_holst_site"]("main",{

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
if (element.classList.contains("line-start")) {
  console.log(elementPosition, target);
}
  if (elementPosition <= target) {
    if (element.classList.contains("line-start")) {
      console.log(elementPosition, target);
    }
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
/******/ 	__webpack_require__.h = () => ("5f020eb88d27106261fe")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi44MDc5NzI0ODE4OTAyYjUwMDMyNi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFTztBQUNQLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7Ozs7Ozs7O1VDdERBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3V0aWxzLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBsYXN0U2Nyb2xsUG9zaXRpb24gPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsRGF0YSgpIHtcbiAgbGV0IHJlc3VsdCA9IHsgcG9zaXRpb246IHdpbmRvdy5zY3JvbGxZLCBkaXJlY3Rpb246IFwiXCIgfTtcbiAgcmVzdWx0LmRpcmVjdGlvbiA9IHJlc3VsdC5wb3NpdGlvbiA+IGxhc3RTY3JvbGxQb3NpdGlvbiA/IFwiZG93blwiIDogXCJ1cFwiO1xuICBsYXN0U2Nyb2xsUG9zaXRpb24gPSByZXN1bHQucG9zaXRpb247XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpblRhcmdldChlbGVtZW50LCB0YXJnZXQpIHtcbiAgY29uc3QgZWxlbWVudFBvc2l0aW9uID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5pZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJsaW5lLXN0YXJ0XCIpKSB7XG4gIGNvbnNvbGUubG9nKGVsZW1lbnRQb3NpdGlvbiwgdGFyZ2V0KTtcbn1cbiAgaWYgKGVsZW1lbnRQb3NpdGlvbiA8PSB0YXJnZXQpIHtcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJsaW5lLXN0YXJ0XCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhlbGVtZW50UG9zaXRpb24sIHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFpbldpZHRoKCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLW1haW5cIikub2Zmc2V0V2lkdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCBtcykge1xuICBsZXQgaXNUaHJvdHRsZWQgPSBmYWxzZSxcbiAgICBzYXZlZEFyZ3MsXG4gICAgc2F2ZWRUaGlzO1xuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgaWYgKGlzVGhyb3R0bGVkKSB7XG4gICAgICBzYXZlZEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBzYXZlZFRoaXMgPSB0aGlzO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlzVGhyb3R0bGVkID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaXNUaHJvdHRsZWQgPSBmYWxzZTtcbiAgICAgIGlmIChzYXZlZEFyZ3MpIHtcbiAgICAgICAgd3JhcHBlci5hcHBseShzYXZlZFRoaXMsIHNhdmVkQXJncyk7XG4gICAgICAgIHNhdmVkQXJncyA9IHNhdmVkVGhpcyA9IG51bGw7XG4gICAgICB9XG4gICAgfSwgbXMpO1xuICB9XG5cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI1ZjAyMGViODhkMjcxMDYyNjFmZVwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==