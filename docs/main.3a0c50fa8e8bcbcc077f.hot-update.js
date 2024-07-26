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
    console.log("true");
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
/******/ 	__webpack_require__.h = () => ("8079724818902b500326")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zYTBjNTBmYThlOGJjYmNjMDc3Zi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFTztBQUNQLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOzs7Ozs7Ozs7VUNwREEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGxhc3RTY3JvbGxQb3NpdGlvbiA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxEYXRhKCkge1xuICBsZXQgcmVzdWx0ID0geyBwb3NpdGlvbjogd2luZG93LnNjcm9sbFksIGRpcmVjdGlvbjogXCJcIiB9O1xuICByZXN1bHQuZGlyZWN0aW9uID0gcmVzdWx0LnBvc2l0aW9uID4gbGFzdFNjcm9sbFBvc2l0aW9uID8gXCJkb3duXCIgOiBcInVwXCI7XG4gIGxhc3RTY3JvbGxQb3NpdGlvbiA9IHJlc3VsdC5wb3NpdGlvbjtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluVGFyZ2V0KGVsZW1lbnQsIHRhcmdldCkge1xuICBjb25zdCBlbGVtZW50UG9zaXRpb24gPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbmlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImxpbmUtc3RhcnRcIikpIHtcbiAgY29uc29sZS5sb2coZWxlbWVudFBvc2l0aW9uLCB0YXJnZXQpO1xufVxuICBpZiAoZWxlbWVudFBvc2l0aW9uIDw9IHRhcmdldCkge1xuICAgIGNvbnNvbGUubG9nKFwidHJ1ZVwiKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1haW5XaWR0aCgpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1tYWluXCIpLm9mZnNldFdpZHRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgbXMpIHtcbiAgbGV0IGlzVGhyb3R0bGVkID0gZmFsc2UsXG4gICAgc2F2ZWRBcmdzLFxuICAgIHNhdmVkVGhpcztcblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgIGlmIChpc1Rocm90dGxlZCkge1xuICAgICAgc2F2ZWRBcmdzID0gYXJndW1lbnRzO1xuICAgICAgc2F2ZWRUaGlzID0gdGhpcztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBpc1Rocm90dGxlZCA9IHRydWU7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlzVGhyb3R0bGVkID0gZmFsc2U7XG4gICAgICBpZiAoc2F2ZWRBcmdzKSB7XG4gICAgICAgIHdyYXBwZXIuYXBwbHkoc2F2ZWRUaGlzLCBzYXZlZEFyZ3MpO1xuICAgICAgICBzYXZlZEFyZ3MgPSBzYXZlZFRoaXMgPSBudWxsO1xuICAgICAgfVxuICAgIH0sIG1zKTtcbiAgfVxuXG4gIHJldHVybiB3cmFwcGVyO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiODA3OTcyNDgxODkwMmI1MDAzMjZcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=