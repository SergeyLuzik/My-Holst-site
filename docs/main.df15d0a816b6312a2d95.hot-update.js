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
    console.log();
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
/******/ 	__webpack_require__.h = () => ("852f0bb54f5803127bac")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kZjE1ZDBhODE2YjYzMTJhMmQ5NS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFTztBQUNQLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7Ozs7Ozs7OztVQ3JEQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbGFzdFNjcm9sbFBvc2l0aW9uID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbERhdGEoKSB7XG4gIGxldCByZXN1bHQgPSB7IHBvc2l0aW9uOiB3aW5kb3cuc2Nyb2xsWSwgZGlyZWN0aW9uOiBcIlwiIH07XG4gIHJlc3VsdC5kaXJlY3Rpb24gPSByZXN1bHQucG9zaXRpb24gPiBsYXN0U2Nyb2xsUG9zaXRpb24gPyBcImRvd25cIiA6IFwidXBcIjtcbiAgbGFzdFNjcm9sbFBvc2l0aW9uID0gcmVzdWx0LnBvc2l0aW9uO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5UYXJnZXQoZWxlbWVudCwgdGFyZ2V0KSB7XG4gIGNvbnN0IGVsZW1lbnRQb3NpdGlvbiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGluZS1zdGFydFwiKSkge1xuICBjb25zb2xlLmxvZyhlbGVtZW50UG9zaXRpb24sIHRhcmdldCk7XG4gIFxufVxuICBpZiAoZWxlbWVudFBvc2l0aW9uIDw9IHRhcmdldCkge1xuICAgIGNvbnNvbGUubG9nKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYWluV2lkdGgoKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtbWFpblwiKS5vZmZzZXRXaWR0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIG1zKSB7XG4gIGxldCBpc1Rocm90dGxlZCA9IGZhbHNlLFxuICAgIHNhdmVkQXJncyxcbiAgICBzYXZlZFRoaXM7XG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICBpZiAoaXNUaHJvdHRsZWQpIHtcbiAgICAgIHNhdmVkQXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHNhdmVkVGhpcyA9IHRoaXM7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaXNUaHJvdHRsZWQgPSB0cnVlO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpc1Rocm90dGxlZCA9IGZhbHNlO1xuICAgICAgaWYgKHNhdmVkQXJncykge1xuICAgICAgICB3cmFwcGVyLmFwcGx5KHNhdmVkVGhpcywgc2F2ZWRBcmdzKTtcbiAgICAgICAgc2F2ZWRBcmdzID0gc2F2ZWRUaGlzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCBtcyk7XG4gIH1cblxuICByZXR1cm4gd3JhcHBlcjtcbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjg1MmYwYmI1NGY1ODAzMTI3YmFjXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9