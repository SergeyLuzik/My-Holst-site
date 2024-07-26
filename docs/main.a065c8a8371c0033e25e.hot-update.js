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
    console.log("startScrollPosition" + lineHeight);
    console.log("lineHeight" + lineHeight);
    console.log("window.scrollY" + window.scrollY);
    console.log("lineScrollProgres" + lineScrollProgres);
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
/******/ 	__webpack_require__.h = () => ("ad6cda8ffe9e27c53e59")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hMDY1YzhhODM3MWMwMDMzZTI1ZS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0U7QUFDbkI7QUFDMUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx3QkFBd0I7QUFDdEUsS0FBSztBQUNMLElBQUksMERBQVM7QUFDYixJQUFJLDBEQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEJBQTBCLEVBQUUseUJBQXlCO0FBQ3RFLG9CQUFvQixnQ0FBZ0M7QUFDcEQsZUFBZSw4QkFBOEI7QUFDN0M7QUFDQSxRQUFRLEVBQUUsMEJBQTBCO0FBQ3BDO0FBQ0EsUUFBUSxFQUFFLDBCQUEwQixFQUFFLHlCQUF5QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLDBEQUFTO0FBQ2IsMENBQTBDLDBEQUFTO0FBQ25ELDJDQUEyQywwREFBUztBQUNwRDtBQUNBO0FBQ0EsTUFBTSx5REFBVztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxvRUFBc0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQ2xGQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc2NyaXB0cy9zdGVwcy10cmFjay9jdXJ2ZWQtdHJhY2suanMiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWRkVHJpYW5nbGUsIG1vdmVUcmlhbmdsZUFsb25nQ3VydmUgfSBmcm9tIFwiLi90cmlhbmdsZS5qc1wiO1xuaW1wb3J0IHsgc3RlcHNMaW5lIH0gZnJvbSBcIi4vc3RlcHMtbGluZS12YXJzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gYWRkQ3VydmVkVHJhY2soKSB7XG4gICAgY29uc3Qgc3RlcHNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc1wiKTtcbiAgICBjb25zdCBpbml0aWFsWCA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54O1xuICAgIGNvbnN0IGluaXRpYWxZID0gc3RlcHNTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnkgKyB3aW5kb3cuc2Nyb2xsWTtcbiAgICBjb25zdCBjb250cm9sUG9pbnRPZmZzZXRZID0gNTMzO1xuICAgIGNvbnN0IG1hcmtlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1hcmtlclwiKTtcbiAgICBjb25zdCBtYXJrZXJzQ2VudGVyQ29vcmRzID0gW107XG4gIFxuICAgIG1hcmtlcnMuZm9yRWFjaCgobWFya2VyKSA9PiB7XG4gICAgICAvLyB0b2RvINC/0LXRgNC10LTQsNCy0LDRgtGMINGD0LbQtSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qg0YfRgtC+0LHRiyDQutCw0LbQtNGL0Lkg0YDQsNC3INC90LUg0LLRi9C30YvQstCw0YLRjFxuICAgICAgY29uc3QgbWFya2VyUmVjdCA9IG1hcmtlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGxldCBjZW50ZXJDb29yZHMgPSB7fTtcbiAgXG4gICAgICBjZW50ZXJDb29yZHMueCA9IG1hcmtlclJlY3QueCAtIGluaXRpYWxYICsgbWFya2VyUmVjdC53aWR0aCAvIDI7XG4gICAgICBjZW50ZXJDb29yZHMueSA9XG4gICAgICAgIG1hcmtlclJlY3QueSAtIGluaXRpYWxZICsgbWFya2VyUmVjdC5oZWlnaHQgLyAyICsgd2luZG93LnNjcm9sbFk7XG4gIFxuICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkcy5wdXNoKGNlbnRlckNvb3Jkcyk7IC8vIHRvZG8g0L/Rg9GI0LjRgtGMINGB0YDQsNC30YMge30g0LHQtdC3INGB0L7Qt9C00LDQvdC40Y8g0L/QtdGA0LXQvNC10L3QvdGL0YVcbiAgICB9KTtcbiAgICBzdGVwc0xpbmUuc3RhcnRZID0gbWFya2Vyc0NlbnRlckNvb3Jkc1swXS55ICsgaW5pdGlhbFk7XG4gICAgc3RlcHNMaW5lLmVuZFkgPVxuICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1ttYXJrZXJzQ2VudGVyQ29vcmRzLmxlbmd0aCAtIDFdLnkgKyBpbml0aWFsWTtcbiAgXG4gICAgY29uc3QgTlNzdHJpbmcgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG4gICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKE5Tc3RyaW5nLCBcInN2Z1wiKTtcbiAgICBzdmcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fdHJhY2tcIik7XG4gICAgY29uc3QgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJwYXRoXCIpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGVwc19fbWFpbi10cmFja1wiKTtcbiAgICBsZXQgZCA9IGBNICR7bWFya2Vyc0NlbnRlckNvb3Jkc1swXS54fSAke21hcmtlcnNDZW50ZXJDb29yZHNbMF0ueX1gO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWFya2Vyc0NlbnRlckNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgZCArPSBgQyR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpIC0gMV0ueH0gJHtcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1tpIC0gMV0ueSArIGNvbnRyb2xQb2ludE9mZnNldFlcbiAgICAgIH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbaV0ueSAtIGNvbnRyb2xQb2ludE9mZnNldFlcbiAgICAgIH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnh9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS55fWA7XG4gICAgfVxuICAgIHBhdGguc2V0QXR0cmlidXRlKFwiZFwiLCBkKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImZpbGxcIiwgXCJub25lXCIpO1xuICAgIHN0ZXBzTGluZS5wYXRoTGVuZ3RoID0gTWF0aC5yb3VuZChwYXRoLmdldFRvdGFsTGVuZ3RoKCkpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBzdGVwc0xpbmUucGF0aExlbmd0aCk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKHBhdGgpO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChcbiAgICAgIGFkZFRyaWFuZ2xlKFxuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzWzBdLngsXG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbMF0ueSxcbiAgICAgICAgMTUgLyosIHN2ZyovXG4gICAgICApXG4gICAgKTtcbiAgXG4gICAgc3RlcHNTZWN0aW9uLmFwcGVuZENoaWxkKHN2Zyk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gYW5pbWF0ZUN1cnZlZFN0ZXBzVHJhY2soXG4gICAgc3RhcnRTY3JvbGxQb3NpdGlvbixcbiAgICBzdGFydFBvaW50LFxuICAgIGVuZFBvaW50LFxuICAgIHBhdGhMZW5naHQsXG4gICAgaGFuZGxlckZ1bmNcbiAgKSB7XG4gICAgY29uc3QgdHJhY2tQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGVwc19fbWFpbi10cmFja1wiKTtcbiAgICBjb25zdCBsaW5lSGVpZ2h0ID0gZW5kUG9pbnQgLSBzdGFydFBvaW50O1xuICAgIGNvbnN0IGxpbmVTY3JvbGxQcm9ncmVzID0gKHdpbmRvdy5zY3JvbGxZIC0gc3RhcnRTY3JvbGxQb3NpdGlvbikgLyBsaW5lSGVpZ2h0O1xuICAgIGNvbnNvbGUubG9nKFwic3RhcnRTY3JvbGxQb3NpdGlvblwiICsgbGluZUhlaWdodCk7XG4gICAgY29uc29sZS5sb2coXCJsaW5lSGVpZ2h0XCIgKyBsaW5lSGVpZ2h0KTtcbiAgICBjb25zb2xlLmxvZyhcIndpbmRvdy5zY3JvbGxZXCIgKyB3aW5kb3cuc2Nyb2xsWSk7XG4gICAgY29uc29sZS5sb2coXCJsaW5lU2Nyb2xsUHJvZ3Jlc1wiICsgbGluZVNjcm9sbFByb2dyZXMpO1xuICAgIGxldCBvZmZzZXQgPSBwYXRoTGVuZ2h0ICogKDEgLSBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gIFxuICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICAgIHRyYWNrUGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBvZmZzZXQpO1xuICAgIG1vdmVUcmlhbmdsZUFsb25nQ3VydmUoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX190cmFjay1hcnJvd1wiKSxcbiAgICAgIHRyYWNrUGF0aCxcbiAgICAgIHBhdGhMZW5naHQsXG4gICAgICBvZmZzZXRcbiAgICApO1xuICB9IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiYWQ2Y2RhOGZmZTllMjdjNTNlNTlcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=