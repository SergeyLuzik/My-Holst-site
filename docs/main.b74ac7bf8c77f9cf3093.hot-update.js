"use strict";
self["webpackHotUpdatemy_holst_site"]("main",{

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

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("eb1cef53eb1d48f982ed")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iNzRhYzdiZjhjNzdmOWNmMzA5My5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0U7QUFDbkI7QUFDMUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx3QkFBd0I7QUFDdEUsS0FBSztBQUNMLElBQUksMERBQVM7QUFDYixJQUFJLDBEQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEJBQTBCLEVBQUUseUJBQXlCO0FBQ3RFLG9CQUFvQixnQ0FBZ0M7QUFDcEQsZUFBZSw4QkFBOEI7QUFDN0M7QUFDQSxRQUFRLEVBQUUsMEJBQTBCO0FBQ3BDO0FBQ0EsUUFBUSxFQUFFLDBCQUEwQixFQUFFLHlCQUF5QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLDBEQUFTO0FBQ2IsMENBQTBDLDBEQUFTO0FBQ25ELDJDQUEyQywwREFBUztBQUNwRDtBQUNBO0FBQ0EsTUFBTSx5REFBVztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9FQUFzQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDbkZBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL3N0ZXBzLXRyYWNrL2N1cnZlZC10cmFjay5qcyIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhZGRUcmlhbmdsZSwgbW92ZVRyaWFuZ2xlQWxvbmdDdXJ2ZSB9IGZyb20gXCIuL3RyaWFuZ2xlLmpzXCI7XG5pbXBvcnQgeyBzdGVwc0xpbmUgfSBmcm9tIFwiLi9zdGVwcy1saW5lLXZhcnMuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBhZGRDdXJ2ZWRUcmFjaygpIHtcbiAgICBjb25zdCBzdGVwc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzXCIpO1xuICAgIGNvbnN0IGluaXRpYWxYID0gc3RlcHNTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLng7XG4gICAgY29uc3QgaW5pdGlhbFkgPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueSArIHdpbmRvdy5zY3JvbGxZO1xuICAgIGNvbnN0IGNvbnRyb2xQb2ludE9mZnNldFkgPSA1MzM7XG4gICAgY29uc3QgbWFya2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWFya2VyXCIpO1xuICAgIGNvbnN0IG1hcmtlcnNDZW50ZXJDb29yZHMgPSBbXTtcbiAgXG4gICAgbWFya2Vycy5mb3JFYWNoKChtYXJrZXIpID0+IHtcbiAgICAgIC8vIHRvZG8g0L/QtdGA0LXQtNCw0LLQsNGC0Ywg0YPQttC1IGdldEJvdW5kaW5nQ2xpZW50UmVjdCDRh9GC0L7QsdGLINC60LDQttC00YvQuSDRgNCw0Lcg0L3QtSDQstGL0LfRi9Cy0LDRgtGMXG4gICAgICBjb25zdCBtYXJrZXJSZWN0ID0gbWFya2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGV0IGNlbnRlckNvb3JkcyA9IHt9O1xuICBcbiAgICAgIGNlbnRlckNvb3Jkcy54ID0gbWFya2VyUmVjdC54IC0gaW5pdGlhbFggKyBtYXJrZXJSZWN0LndpZHRoIC8gMjtcbiAgICAgIGNlbnRlckNvb3Jkcy55ID1cbiAgICAgICAgbWFya2VyUmVjdC55IC0gaW5pdGlhbFkgKyBtYXJrZXJSZWN0LmhlaWdodCAvIDIgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgXG4gICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzLnB1c2goY2VudGVyQ29vcmRzKTsgLy8gdG9kbyDQv9GD0YjQuNGC0Ywg0YHRgNCw0LfRgyB7fSDQsdC10Lcg0YHQvtC30LTQsNC90LjRjyDQv9C10YDQtdC80LXQvdC90YvRhVxuICAgIH0pO1xuICAgIHN0ZXBzTGluZS5zdGFydFkgPSBtYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnkgKyBpbml0aWFsWTtcbiAgICBzdGVwc0xpbmUuZW5kWSA9XG4gICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzW21hcmtlcnNDZW50ZXJDb29yZHMubGVuZ3RoIC0gMV0ueSArIGluaXRpYWxZO1xuICBcbiAgICBjb25zdCBOU3N0cmluZyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbiAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwic3ZnXCIpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX190cmFja1wiKTtcbiAgICBjb25zdCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInBhdGhcIik7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN0ZXBzX19tYWluLXRyYWNrXCIpO1xuICAgIGxldCBkID0gYE0gJHttYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnh9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1swXS55fWA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBtYXJrZXJzQ2VudGVyQ29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkICs9IGBDJHttYXJrZXJzQ2VudGVyQ29vcmRzW2kgLSAxXS54fSAke1xuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzW2kgLSAxXS55ICsgY29udHJvbFBvaW50T2Zmc2V0WVxuICAgICAgfSAke21hcmtlcnNDZW50ZXJDb29yZHNbaV0ueH0gJHtcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1tpXS55IC0gY29udHJvbFBvaW50T2Zmc2V0WVxuICAgICAgfSAke21hcmtlcnNDZW50ZXJDb29yZHNbaV0ueH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnl9YDtcbiAgICB9XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG4gICAgc3RlcHNMaW5lLnBhdGhMZW5ndGggPSBNYXRoLnJvdW5kKHBhdGguZ2V0VG90YWxMZW5ndGgoKSk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNob2Zmc2V0XCIsIHN0ZXBzTGluZS5wYXRoTGVuZ3RoKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQocGF0aCk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKFxuICAgICAgYWRkVHJpYW5nbGUoXG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbMF0ueCxcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1swXS55LFxuICAgICAgICAxNSAvKiwgc3ZnKi9cbiAgICAgIClcbiAgICApO1xuICBcbiAgICBzdGVwc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc3ZnKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBhbmltYXRlQ3VydmVkU3RlcHNUcmFjayhcbiAgICBzdGFydFNjcm9sbFBvc2l0aW9uLFxuICAgIHN0YXJ0UG9pbnQsXG4gICAgZW5kUG9pbnQsXG4gICAgcGF0aExlbmdodCxcbiAgICBoYW5kbGVyRnVuY1xuICApIHtcbiAgICBjb25zdCB0cmFja1BhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX19tYWluLXRyYWNrXCIpO1xuICAgIGNvbnN0IGxpbmVIZWlnaHQgPSBlbmRQb2ludCAtIHN0YXJ0UG9pbnQ7XG4gICAgY29uc3QgbGluZVNjcm9sbFByb2dyZXMgPSAod2luZG93LnNjcm9sbFkgLSBzdGFydFNjcm9sbFBvc2l0aW9uKSAvIGxpbmVIZWlnaHQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coXCJ3aW5kb3cuc2Nyb2xsWSBcIiArIHdpbmRvdy5zY3JvbGxZKTtcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0U2Nyb2xsUG9zaXRpb24gXCIgKyBzdGFydFNjcm9sbFBvc2l0aW9uKTtcbiAgICBjb25zb2xlLmxvZyhcImxpbmVIZWlnaHQgXCIgKyBsaW5lSGVpZ2h0KTtcbiAgICBjb25zb2xlLmxvZyhcImxpbmVTY3JvbGxQcm9ncmVzIFwiICsgbGluZVNjcm9sbFByb2dyZXMpO1xuICAgIGxldCBvZmZzZXQgPSBwYXRoTGVuZ2h0ICogKDEgLSBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gIFxuICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICAgIHRyYWNrUGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBvZmZzZXQpO1xuICAgIG1vdmVUcmlhbmdsZUFsb25nQ3VydmUoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX190cmFjay1hcnJvd1wiKSxcbiAgICAgIHRyYWNrUGF0aCxcbiAgICAgIHBhdGhMZW5naHQsXG4gICAgICBvZmZzZXRcbiAgICApO1xuICB9IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZWIxY2VmNTNlYjFkNDhmOTgyZWRcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=