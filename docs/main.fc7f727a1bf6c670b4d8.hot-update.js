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
    console.log("lineScrollProgres " + lineScrollProgres);
    console.log("lineHeight" + lineHeight);

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
/******/ 	__webpack_require__.h = () => ("d5d29aefe9a443fe5630")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5mYzdmNzI3YTFiZjZjNjcwYjRkOC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0U7QUFDbkI7QUFDMUM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx3QkFBd0I7QUFDdEUsS0FBSztBQUNMLElBQUksMERBQVM7QUFDYixJQUFJLDBEQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEJBQTBCLEVBQUUseUJBQXlCO0FBQ3RFLG9CQUFvQixnQ0FBZ0M7QUFDcEQsZUFBZSw4QkFBOEI7QUFDN0M7QUFDQSxRQUFRLEVBQUUsMEJBQTBCO0FBQ3BDO0FBQ0EsUUFBUSxFQUFFLDBCQUEwQixFQUFFLHlCQUF5QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLDBEQUFTO0FBQ2IsMENBQTBDLDBEQUFTO0FBQ25ELDJDQUEyQywwREFBUztBQUNwRDtBQUNBO0FBQ0EsTUFBTSx5REFBVztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQXNCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUNuRkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlLy4vc3JjL3NjcmlwdHMvc3RlcHMtdHJhY2svY3VydmVkLXRyYWNrLmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFkZFRyaWFuZ2xlLCBtb3ZlVHJpYW5nbGVBbG9uZ0N1cnZlIH0gZnJvbSBcIi4vdHJpYW5nbGUuanNcIjtcbmltcG9ydCB7IHN0ZXBzTGluZSB9IGZyb20gXCIuL3N0ZXBzLWxpbmUtdmFycy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEN1cnZlZFRyYWNrKCkge1xuICAgIGNvbnN0IHN0ZXBzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNcIik7XG4gICAgY29uc3QgaW5pdGlhbFggPSBzdGVwc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcbiAgICBjb25zdCBpbml0aWFsWSA9IHN0ZXBzU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55ICsgd2luZG93LnNjcm9sbFk7XG4gICAgY29uc3QgY29udHJvbFBvaW50T2Zmc2V0WSA9IDUzMztcbiAgICBjb25zdCBtYXJrZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tYXJrZXJcIik7XG4gICAgY29uc3QgbWFya2Vyc0NlbnRlckNvb3JkcyA9IFtdO1xuICBcbiAgICBtYXJrZXJzLmZvckVhY2goKG1hcmtlcikgPT4ge1xuICAgICAgLy8gdG9kbyDQv9C10YDQtdC00LDQstCw0YLRjCDRg9C20LUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0INGH0YLQvtCx0Ysg0LrQsNC20LTRi9C5INGA0LDQtyDQvdC1INCy0YvQt9GL0LLQsNGC0YxcbiAgICAgIGNvbnN0IG1hcmtlclJlY3QgPSBtYXJrZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBsZXQgY2VudGVyQ29vcmRzID0ge307XG4gIFxuICAgICAgY2VudGVyQ29vcmRzLnggPSBtYXJrZXJSZWN0LnggLSBpbml0aWFsWCArIG1hcmtlclJlY3Qud2lkdGggLyAyO1xuICAgICAgY2VudGVyQ29vcmRzLnkgPVxuICAgICAgICBtYXJrZXJSZWN0LnkgLSBpbml0aWFsWSArIG1hcmtlclJlY3QuaGVpZ2h0IC8gMiArIHdpbmRvdy5zY3JvbGxZO1xuICBcbiAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHMucHVzaChjZW50ZXJDb29yZHMpOyAvLyB0b2RvINC/0YPRiNC40YLRjCDRgdGA0LDQt9GDIHt9INCx0LXQtyDRgdC+0LfQtNCw0L3QuNGPINC/0LXRgNC10LzQtdC90L3Ri9GFXG4gICAgfSk7XG4gICAgc3RlcHNMaW5lLnN0YXJ0WSA9IG1hcmtlcnNDZW50ZXJDb29yZHNbMF0ueSArIGluaXRpYWxZO1xuICAgIHN0ZXBzTGluZS5lbmRZID1cbiAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbbWFya2Vyc0NlbnRlckNvb3Jkcy5sZW5ndGggLSAxXS55ICsgaW5pdGlhbFk7XG4gIFxuICAgIGNvbnN0IE5Tc3RyaW5nID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhOU3N0cmluZywgXCJzdmdcIik7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX3RyYWNrXCIpO1xuICAgIGNvbnN0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTlNzdHJpbmcsIFwicGF0aFwiKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RlcHNfX21haW4tdHJhY2tcIik7XG4gICAgbGV0IGQgPSBgTSAke21hcmtlcnNDZW50ZXJDb29yZHNbMF0ueH0gJHttYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnl9YDtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1hcmtlcnNDZW50ZXJDb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGQgKz0gYEMke21hcmtlcnNDZW50ZXJDb29yZHNbaSAtIDFdLnh9ICR7XG4gICAgICAgIG1hcmtlcnNDZW50ZXJDb29yZHNbaSAtIDFdLnkgKyBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS54fSAke1xuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzW2ldLnkgLSBjb250cm9sUG9pbnRPZmZzZXRZXG4gICAgICB9ICR7bWFya2Vyc0NlbnRlckNvb3Jkc1tpXS54fSAke21hcmtlcnNDZW50ZXJDb29yZHNbaV0ueX1gO1xuICAgIH1cbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgZCk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsIFwibm9uZVwiKTtcbiAgICBzdGVwc0xpbmUucGF0aExlbmd0aCA9IE1hdGgucm91bmQocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgc3RlcHNMaW5lLnBhdGhMZW5ndGgpO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChwYXRoKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQoXG4gICAgICBhZGRUcmlhbmdsZShcbiAgICAgICAgbWFya2Vyc0NlbnRlckNvb3Jkc1swXS54LFxuICAgICAgICBtYXJrZXJzQ2VudGVyQ29vcmRzWzBdLnksXG4gICAgICAgIDE1IC8qLCBzdmcqL1xuICAgICAgKVxuICAgICk7XG4gIFxuICAgIHN0ZXBzU2VjdGlvbi5hcHBlbmRDaGlsZChzdmcpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGVDdXJ2ZWRTdGVwc1RyYWNrKFxuICAgIHN0YXJ0U2Nyb2xsUG9zaXRpb24sXG4gICAgc3RhcnRQb2ludCxcbiAgICBlbmRQb2ludCxcbiAgICBwYXRoTGVuZ2h0LFxuICAgIGhhbmRsZXJGdW5jXG4gICkge1xuICAgIGNvbnN0IHRyYWNrUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RlcHNfX21haW4tdHJhY2tcIik7XG4gICAgY29uc3QgbGluZUhlaWdodCA9IGVuZFBvaW50IC0gc3RhcnRQb2ludDtcbiAgICBjb25zdCBsaW5lU2Nyb2xsUHJvZ3JlcyA9ICh3aW5kb3cuc2Nyb2xsWSAtIHN0YXJ0U2Nyb2xsUG9zaXRpb24pIC8gbGluZUhlaWdodDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhcIndpbmRvdy5zY3JvbGxZIFwiICsgd2luZG93LnNjcm9sbFkpO1xuICAgIGNvbnNvbGUubG9nKFwibGluZVNjcm9sbFByb2dyZXMgXCIgKyBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gICAgY29uc29sZS5sb2coXCJsaW5lSGVpZ2h0XCIgKyBsaW5lSGVpZ2h0KTtcblxuICAgIGxldCBvZmZzZXQgPSBwYXRoTGVuZ2h0ICogKDEgLSBsaW5lU2Nyb2xsUHJvZ3Jlcyk7XG4gIFxuICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgICAgLy93aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVyRnVuYyk7XG4gICAgfVxuICAgIHRyYWNrUGF0aC5zZXRBdHRyaWJ1dGUoXCJzdHJva2UtZGFzaG9mZnNldFwiLCBvZmZzZXQpO1xuICAgIG1vdmVUcmlhbmdsZUFsb25nQ3VydmUoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0ZXBzX190cmFjay1hcnJvd1wiKSxcbiAgICAgIHRyYWNrUGF0aCxcbiAgICAgIHBhdGhMZW5naHQsXG4gICAgICBvZmZzZXRcbiAgICApO1xuICB9IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZDVkMjlhZWZlOWE0NDNmZTU2MzBcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=