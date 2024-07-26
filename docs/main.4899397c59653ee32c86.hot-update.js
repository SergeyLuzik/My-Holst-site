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
/******/ 	__webpack_require__.h = () => ("c6c8e12ed3ac480f1700")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40ODk5Mzk3YzU5NjUzZWUzMmM4Ni5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFTztBQUNQLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7Ozs7Ozs7OztVQ3JEQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbGFzdFNjcm9sbFBvc2l0aW9uID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbERhdGEoKSB7XG4gIGxldCByZXN1bHQgPSB7IHBvc2l0aW9uOiB3aW5kb3cuc2Nyb2xsWSwgZGlyZWN0aW9uOiBcIlwiIH07XG4gIHJlc3VsdC5kaXJlY3Rpb24gPSByZXN1bHQucG9zaXRpb24gPiBsYXN0U2Nyb2xsUG9zaXRpb24gPyBcImRvd25cIiA6IFwidXBcIjtcbiAgbGFzdFNjcm9sbFBvc2l0aW9uID0gcmVzdWx0LnBvc2l0aW9uO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5UYXJnZXQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gIGNvbnN0IGVsZW1lbnRQb3NpdGlvbiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGluZS1zdGFydFwiKSkge1xuICBjb25zb2xlLmxvZyhlbGVtZW50UG9zaXRpb24sIHRhcmdldCk7XG4gIFxufVxuICBpZiAoZWxlbWVudFBvc2l0aW9uIDw9IHRhcmdldCkge1xuICAgIFxuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFpbldpZHRoKCkge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYWdlLW1haW5cIikub2Zmc2V0V2lkdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCBtcykge1xuICBsZXQgaXNUaHJvdHRsZWQgPSBmYWxzZSxcbiAgICBzYXZlZEFyZ3MsXG4gICAgc2F2ZWRUaGlzO1xuXG4gIGZ1bmN0aW9uIHdyYXBwZXIoKSB7XG4gICAgaWYgKGlzVGhyb3R0bGVkKSB7XG4gICAgICBzYXZlZEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBzYXZlZFRoaXMgPSB0aGlzO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlzVGhyb3R0bGVkID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaXNUaHJvdHRsZWQgPSBmYWxzZTtcbiAgICAgIGlmIChzYXZlZEFyZ3MpIHtcbiAgICAgICAgd3JhcHBlci5hcHBseShzYXZlZFRoaXMsIHNhdmVkQXJncyk7XG4gICAgICAgIHNhdmVkQXJncyA9IHNhdmVkVGhpcyA9IG51bGw7XG4gICAgICB9XG4gICAgfSwgbXMpO1xuICB9XG5cbiAgcmV0dXJuIHdyYXBwZXI7XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJjNmM4ZTEyZWQzYWM0ODBmMTcwMFwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==