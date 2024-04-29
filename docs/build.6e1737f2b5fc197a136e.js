/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
//import "../styles/index.css";
const mainWidth = document.querySelector(".page-main").offsetWidth;

// HERO  SLIDER
if (mainWidth > 800) {
  (() => {
    const slidesWrapper = document.querySelector(".slider__slides-list"),
      activSlideWidth = parseInt(
        getComputedStyle(
          document.querySelector(".hero__slider")
        ).gridTemplateColumns.split(" ")[0],
        10
      ),
      gapValue = parseInt(getComputedStyle(slidesWrapper).gap),
      slides = slidesWrapper.children,
      slideWidth = slides[0].offsetWidth,
      initialOffset = slideWidth * 2 + gapValue - activSlideWidth,
      offset = slideWidth + gapValue,
      transitionTime = "0.3s",
      slideScale =
        "translate(-12.5%, calc(12.5% - 16px)) scale(1.25)" /*"translate(-10%, 6.5%) scale(1.2)"*/,
      left = document.querySelector(".slider-button_left"),
      right = document.querySelector(".slider-button_right");

    let inAction = false;

    // Initialize slider start position

    console.log("activSlideWidth " + activSlideWidth);
    console.log("slideWidth " + slideWidth);
    console.log("initialOffset " + initialOffset);
    console.log("offset " + offset);

    slidesWrapper.style.transform = `translateX(${-initialOffset}px)`;
    slides[0].style.opacity = 0;
    //slides[0].style.transform = "translate(0) scale(0.3)";
    slides[1].style.transform = slideScale;
    //slides[0].style.transitionTimingFunction = "ease-in";

    function movLeft(slidesWrapper, offset) {
      slidesWrapper.ontransitionend = (_) => {
        slidesWrapper.ontransitionend = null;
        slidesWrapper.style.transition = "none";
        slides[0].removeAttribute("style");

        slidesWrapper.append(slides[0]);
        slidesWrapper.style.transform = `translateX(${-initialOffset}px)`;

        inAction = false;
      };
      slidesWrapper.style.transition = transitionTime; //todo задавать transition через запятую всем сразу?
      slidesWrapper.style.transform = `translateX(${
        -offset - initialOffset
      }px)`;

      slides[1].style.transition = transitionTime;
      slides[1].style.opacity = 0;
      slides[1].style.transform = "translate(0)"; // scale(0.3)

      slides[2].style.transition = transitionTime;
      slides[2].style.transform = slideScale;
      slides[2].style.transitionTimingFunction = "cubic-bezier(.72,.07,.95,.7)"; //.75,0,1,.02 ease-in
    }
    function movRight(slidesWrapper, offset) {
      slidesWrapper.ontransitionend = (_) => {
        slidesWrapper.ontransitionend = null;
        slidesWrapper.style.transition = "none";
        slides[1].removeAttribute("style");

        slidesWrapper.lastElementChild.style.opacity = 0;
        slidesWrapper.prepend(slidesWrapper.lastElementChild);
        slidesWrapper.style.transform = `translateX(${-initialOffset}px)`;

        inAction = false;
      };
      slidesWrapper.style.transition = transitionTime;
      slidesWrapper.style.transform = `translateX(${offset - initialOffset}px)`;

      slides[0].style.transition = transitionTime;
      slides[0].style.opacity = 1;
      slides[0].style.transform = slideScale;
      slides[0].style.transitionTimingFunction = "ease-in";

      slides[1].style.transition = transitionTime;
      slides[1].style.transform = "translate(0) scale(1)";
      slides[1].style.transitionTimingFunction = "cubic-bezier(0,.75,.02,1)"; //0,.75,.02,1  // 0,0,.02,1 // .75,0,1,.02
    }

    left.onclick = (_) => {
      if (inAction) return;
      inAction = true;
      movRight(slidesWrapper, offset);
    };
    right.onclick = (_) => {
      if (inAction) return;
      inAction = true;
      movLeft(slidesWrapper, offset);
    };
  })();

  // FEEDBACK SLIDER

  //todo расширить обертку на размер gap между слайдами чтобы можно было внутрь положить размытие и слайды менялись без резкой полосы
}

if (mainWidth > 1200) {
  (() => {
    const slidesWrapper = document.querySelector(".feedback__list"),
      slides = slidesWrapper.children,
      slideWidth = slides[0].offsetWidth,
      slideWindowWidth = slidesWrapper.offsetWidth,
      gapValue =
        (slideWindowWidth / 100) *
        parseFloat(getComputedStyle(slidesWrapper).gap),
      amountSlidesOnList = Math.floor(
        slideWindowWidth / (slideWidth + gapValue)
      ),
      slideListsAmount = Math.ceil(slides.length / amountSlidesOnList),
      offset = slideWindowWidth - 2 * gapValue, //slideWindowWidth + gapValue,
      transitionTime = "1s",
      left = document.querySelector(".feedback >.slider-button_left"),
      right = document.querySelector(".feedback > .slider-button_right");

    let inAction = false;

    console.log("gapValue " + gapValue);
    console.log("slideWindowWidth " + slideWindowWidth);
    console.log(slides);
    console.log("slides.length " + slides.length);
    console.log("slideListsAmount " + slideListsAmount);
    console.log("amountSlidesOnList " + amountSlidesOnList);

    // Initialize slider start position -100%
    //slidesWrapper.style.transform = `translateX(-${offset}px)`;
    //todo учитывать gap!
    //todo как высчитать сколько листов? (ширину окна делить на ширину карточки без остатка и потом высчитывать сколько карточек на сколько листов?)
    //todo крутить slideListsAmount как index с перескоком при достижении края index = ++index % slides.length;

    // Initialize slider start position
    slidesWrapper.style.transform = `translateX(${-offset}px)`;

    function movLeft(slidesWrapper, offset) {
      slidesWrapper.ontransitionend = (_) => {
        slidesWrapper.ontransitionend = null;
        slidesWrapper.style.transition = "none";

        for (let i = 0; i < amountSlidesOnList; i++) {
          slidesWrapper.append(slides[0]);
        }
        slidesWrapper.style.transform = `translateX(${-offset}px)`;

        inAction = false;
      };
      slidesWrapper.style.transition = transitionTime;
      slidesWrapper.style.transform = `translateX(${-offset * 2 - gapValue}px)`;
    }
    function movRight(slidesWrapper, offset) {
      slidesWrapper.ontransitionend = (_) => {
        slidesWrapper.ontransitionend = null;
        slidesWrapper.style.transition = "none";

        for (let i = 0; i < amountSlidesOnList; i++) {
          slidesWrapper.prepend(slidesWrapper.lastElementChild);
        }
        slidesWrapper.style.transform = `translateX(${-offset}px)`;

        inAction = false;
      };

      slidesWrapper.style.transition = transitionTime;
      slidesWrapper.style.transform = `translateX(${gapValue}px)`;
    }

    right.onclick = (_) => {
      console.log("right");
      if (inAction) return;
      inAction = true;
      movLeft(slidesWrapper, offset);
    };
    left.onclick = (_) => {
      console.log("left");
      if (inAction) return;

      inAction = true;
      movRight(slidesWrapper, offset);
    };
  })();
}

if (mainWidth <= 1250) {
  const burgerButton = document.querySelector(".page-header__burger-button"),
    headerHeigth = document.querySelector(".page-header").offsetHeight;

  console.log("headerHeigth " + headerHeigth);

  burgerButton.onclick = () => {
    burgerButton.classList.toggle("page-header__burger-button_open");

    if (mainWidth <= 680) {
      const headerMenu = document.querySelector(".page-header__menu");
      headerMenu.style.top = `${headerHeigth}px`;
      headerMenu.classList.toggle("page-header__menu_open");

      headerMenu.querySelectorAll("a").forEach((link) => {
        link.onclick = () => {
          headerMenu.classList.remove("page-header__menu_open");
          burgerButton.classList.remove("page-header__burger-button_open");
        };
      });
      // todo убирать обработчики при закрытии меню?
    } else {
      const headerNav = document.querySelector(".page-header__nav");
      headerNav.style.top = `${headerHeigth}px`;
      headerNav.classList.toggle("page-header__nav_open");

      headerNav.querySelectorAll("a").forEach((link) => {
        link.onclick = () => {
          headerNav.classList.remove("page-header__nav_open");
          burgerButton.classList.remove("page-header__burger-button_open");
        };
      });
    }
  };
}

}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuNmUxNzM3ZjJiNWZjMTk3YTEzNmUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtEQUFrRCxlQUFlO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzREFBc0QsZUFBZTs7QUFFckU7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNELGVBQWU7O0FBRXJFO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCx1QkFBdUI7O0FBRTNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4RUFBOEU7QUFDOUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxREFBcUQsT0FBTztBQUM1RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0QsUUFBUTs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0Esc0RBQXNELFFBQVE7O0FBRTlEO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCx1QkFBdUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0Isd0JBQXdCO0FBQ2hEO0FBQ0E7QUFDQSxzREFBc0QsUUFBUTs7QUFFOUQ7QUFDQTs7QUFFQTtBQUNBLG9EQUFvRCxTQUFTO0FBQzdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxhQUFhO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxNQUFNO0FBQ047QUFDQSwrQkFBK0IsYUFBYTtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDL05BIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teS1ob2xzdC1zaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbXktaG9sc3Qtc2l0ZS8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovL215LWhvbHN0LXNpdGUvLi9zcmMvc3R5bGVzL2luZGV4LmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL2ltcG9ydCBcIi4uL3N0eWxlcy9pbmRleC5jc3NcIjtcbmNvbnN0IG1haW5XaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1tYWluXCIpLm9mZnNldFdpZHRoO1xuXG4vLyBIRVJPICBTTElERVJcbmlmIChtYWluV2lkdGggPiA4MDApIHtcbiAgKCgpID0+IHtcbiAgICBjb25zdCBzbGlkZXNXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJfX3NsaWRlcy1saXN0XCIpLFxuICAgICAgYWN0aXZTbGlkZVdpZHRoID0gcGFyc2VJbnQoXG4gICAgICAgIGdldENvbXB1dGVkU3R5bGUoXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZXJvX19zbGlkZXJcIilcbiAgICAgICAgKS5ncmlkVGVtcGxhdGVDb2x1bW5zLnNwbGl0KFwiIFwiKVswXSxcbiAgICAgICAgMTBcbiAgICAgICksXG4gICAgICBnYXBWYWx1ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoc2xpZGVzV3JhcHBlcikuZ2FwKSxcbiAgICAgIHNsaWRlcyA9IHNsaWRlc1dyYXBwZXIuY2hpbGRyZW4sXG4gICAgICBzbGlkZVdpZHRoID0gc2xpZGVzWzBdLm9mZnNldFdpZHRoLFxuICAgICAgaW5pdGlhbE9mZnNldCA9IHNsaWRlV2lkdGggKiAyICsgZ2FwVmFsdWUgLSBhY3RpdlNsaWRlV2lkdGgsXG4gICAgICBvZmZzZXQgPSBzbGlkZVdpZHRoICsgZ2FwVmFsdWUsXG4gICAgICB0cmFuc2l0aW9uVGltZSA9IFwiMC4zc1wiLFxuICAgICAgc2xpZGVTY2FsZSA9XG4gICAgICAgIFwidHJhbnNsYXRlKC0xMi41JSwgY2FsYygxMi41JSAtIDE2cHgpKSBzY2FsZSgxLjI1KVwiIC8qXCJ0cmFuc2xhdGUoLTEwJSwgNi41JSkgc2NhbGUoMS4yKVwiKi8sXG4gICAgICBsZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zbGlkZXItYnV0dG9uX2xlZnRcIiksXG4gICAgICByaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyLWJ1dHRvbl9yaWdodFwiKTtcblxuICAgIGxldCBpbkFjdGlvbiA9IGZhbHNlO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBzbGlkZXIgc3RhcnQgcG9zaXRpb25cblxuICAgIGNvbnNvbGUubG9nKFwiYWN0aXZTbGlkZVdpZHRoIFwiICsgYWN0aXZTbGlkZVdpZHRoKTtcbiAgICBjb25zb2xlLmxvZyhcInNsaWRlV2lkdGggXCIgKyBzbGlkZVdpZHRoKTtcbiAgICBjb25zb2xlLmxvZyhcImluaXRpYWxPZmZzZXQgXCIgKyBpbml0aWFsT2Zmc2V0KTtcbiAgICBjb25zb2xlLmxvZyhcIm9mZnNldCBcIiArIG9mZnNldCk7XG5cbiAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LWluaXRpYWxPZmZzZXR9cHgpYDtcbiAgICBzbGlkZXNbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgLy9zbGlkZXNbMF0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMCkgc2NhbGUoMC4zKVwiO1xuICAgIHNsaWRlc1sxXS5zdHlsZS50cmFuc2Zvcm0gPSBzbGlkZVNjYWxlO1xuICAgIC8vc2xpZGVzWzBdLnN0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiA9IFwiZWFzZS1pblwiO1xuXG4gICAgZnVuY3Rpb24gbW92TGVmdChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpIHtcbiAgICAgIHNsaWRlc1dyYXBwZXIub250cmFuc2l0aW9uZW5kID0gKF8pID0+IHtcbiAgICAgICAgc2xpZGVzV3JhcHBlci5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICAgICAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcbiAgICAgICAgc2xpZGVzWzBdLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuXG4gICAgICAgIHNsaWRlc1dyYXBwZXIuYXBwZW5kKHNsaWRlc1swXSk7XG4gICAgICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstaW5pdGlhbE9mZnNldH1weClgO1xuXG4gICAgICAgIGluQWN0aW9uID0gZmFsc2U7XG4gICAgICB9O1xuICAgICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7IC8vdG9kbyDQt9Cw0LTQsNCy0LDRgtGMIHRyYW5zaXRpb24g0YfQtdGA0LXQtyDQt9Cw0L/Rj9GC0YPRjiDQstGB0LXQvCDRgdGA0LDQt9GDP1xuICAgICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke1xuICAgICAgICAtb2Zmc2V0IC0gaW5pdGlhbE9mZnNldFxuICAgICAgfXB4KWA7XG5cbiAgICAgIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gICAgICBzbGlkZXNbMV0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICBzbGlkZXNbMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMClcIjsgLy8gc2NhbGUoMC4zKVxuXG4gICAgICBzbGlkZXNbMl0uc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuICAgICAgc2xpZGVzWzJdLnN0eWxlLnRyYW5zZm9ybSA9IHNsaWRlU2NhbGU7XG4gICAgICBzbGlkZXNbMl0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJjdWJpYy1iZXppZXIoLjcyLC4wNywuOTUsLjcpXCI7IC8vLjc1LDAsMSwuMDIgZWFzZS1pblxuICAgIH1cbiAgICBmdW5jdGlvbiBtb3ZSaWdodChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpIHtcbiAgICAgIHNsaWRlc1dyYXBwZXIub250cmFuc2l0aW9uZW5kID0gKF8pID0+IHtcbiAgICAgICAgc2xpZGVzV3JhcHBlci5vbnRyYW5zaXRpb25lbmQgPSBudWxsO1xuICAgICAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSBcIm5vbmVcIjtcbiAgICAgICAgc2xpZGVzWzFdLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuXG4gICAgICAgIHNsaWRlc1dyYXBwZXIubGFzdEVsZW1lbnRDaGlsZC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgc2xpZGVzV3JhcHBlci5wcmVwZW5kKHNsaWRlc1dyYXBwZXIubGFzdEVsZW1lbnRDaGlsZCk7XG4gICAgICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstaW5pdGlhbE9mZnNldH1weClgO1xuXG4gICAgICAgIGluQWN0aW9uID0gZmFsc2U7XG4gICAgICB9O1xuICAgICAgc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gICAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7b2Zmc2V0IC0gaW5pdGlhbE9mZnNldH1weClgO1xuXG4gICAgICBzbGlkZXNbMF0uc3R5bGUudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25UaW1lO1xuICAgICAgc2xpZGVzWzBdLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgc2xpZGVzWzBdLnN0eWxlLnRyYW5zZm9ybSA9IHNsaWRlU2NhbGU7XG4gICAgICBzbGlkZXNbMF0uc3R5bGUudHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uID0gXCJlYXNlLWluXCI7XG5cbiAgICAgIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uID0gdHJhbnNpdGlvblRpbWU7XG4gICAgICBzbGlkZXNbMV0uc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMCkgc2NhbGUoMSlcIjtcbiAgICAgIHNsaWRlc1sxXS5zdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb24gPSBcImN1YmljLWJlemllcigwLC43NSwuMDIsMSlcIjsgLy8wLC43NSwuMDIsMSAgLy8gMCwwLC4wMiwxIC8vIC43NSwwLDEsLjAyXG4gICAgfVxuXG4gICAgbGVmdC5vbmNsaWNrID0gKF8pID0+IHtcbiAgICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgICAgaW5BY3Rpb24gPSB0cnVlO1xuICAgICAgbW92UmlnaHQoc2xpZGVzV3JhcHBlciwgb2Zmc2V0KTtcbiAgICB9O1xuICAgIHJpZ2h0Lm9uY2xpY2sgPSAoXykgPT4ge1xuICAgICAgaWYgKGluQWN0aW9uKSByZXR1cm47XG4gICAgICBpbkFjdGlvbiA9IHRydWU7XG4gICAgICBtb3ZMZWZ0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCk7XG4gICAgfTtcbiAgfSkoKTtcblxuICAvLyBGRUVEQkFDSyBTTElERVJcblxuICAvL3RvZG8g0YDQsNGB0YjQuNGA0LjRgtGMINC+0LHQtdGA0YLQutGDINC90LAg0YDQsNC30LzQtdGAIGdhcCDQvNC10LbQtNGDINGB0LvQsNC4zIbQtNCw0LzQuCDRh9GC0L7QsdGLINC80L7QttC90L4g0LHRi9C70L4g0LLQvdGD0YLRgNGMINC/0L7Qu9C+0LbQuNGC0Ywg0YDQsNC30LzRi9GC0LjQtSDQuCDRgdC70LDQudC00Ysg0LzQtdC90Y/Qu9C40YHRjCDQsdC10Lcg0YDQtdC30LrQvtC5INC/0L7Qu9C+0YHRi1xufVxuXG5pZiAobWFpbldpZHRoID4gMTIwMCkge1xuICAoKCkgPT4ge1xuICAgIGNvbnN0IHNsaWRlc1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrX19saXN0XCIpLFxuICAgICAgc2xpZGVzID0gc2xpZGVzV3JhcHBlci5jaGlsZHJlbixcbiAgICAgIHNsaWRlV2lkdGggPSBzbGlkZXNbMF0ub2Zmc2V0V2lkdGgsXG4gICAgICBzbGlkZVdpbmRvd1dpZHRoID0gc2xpZGVzV3JhcHBlci5vZmZzZXRXaWR0aCxcbiAgICAgIGdhcFZhbHVlID1cbiAgICAgICAgKHNsaWRlV2luZG93V2lkdGggLyAxMDApICpcbiAgICAgICAgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKHNsaWRlc1dyYXBwZXIpLmdhcCksXG4gICAgICBhbW91bnRTbGlkZXNPbkxpc3QgPSBNYXRoLmZsb29yKFxuICAgICAgICBzbGlkZVdpbmRvd1dpZHRoIC8gKHNsaWRlV2lkdGggKyBnYXBWYWx1ZSlcbiAgICAgICksXG4gICAgICBzbGlkZUxpc3RzQW1vdW50ID0gTWF0aC5jZWlsKHNsaWRlcy5sZW5ndGggLyBhbW91bnRTbGlkZXNPbkxpc3QpLFxuICAgICAgb2Zmc2V0ID0gc2xpZGVXaW5kb3dXaWR0aCAtIDIgKiBnYXBWYWx1ZSwgLy9zbGlkZVdpbmRvd1dpZHRoICsgZ2FwVmFsdWUsXG4gICAgICB0cmFuc2l0aW9uVGltZSA9IFwiMXNcIixcbiAgICAgIGxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrID4uc2xpZGVyLWJ1dHRvbl9sZWZ0XCIpLFxuICAgICAgcmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWRiYWNrID4gLnNsaWRlci1idXR0b25fcmlnaHRcIik7XG5cbiAgICBsZXQgaW5BY3Rpb24gPSBmYWxzZTtcblxuICAgIGNvbnNvbGUubG9nKFwiZ2FwVmFsdWUgXCIgKyBnYXBWYWx1ZSk7XG4gICAgY29uc29sZS5sb2coXCJzbGlkZVdpbmRvd1dpZHRoIFwiICsgc2xpZGVXaW5kb3dXaWR0aCk7XG4gICAgY29uc29sZS5sb2coc2xpZGVzKTtcbiAgICBjb25zb2xlLmxvZyhcInNsaWRlcy5sZW5ndGggXCIgKyBzbGlkZXMubGVuZ3RoKTtcbiAgICBjb25zb2xlLmxvZyhcInNsaWRlTGlzdHNBbW91bnQgXCIgKyBzbGlkZUxpc3RzQW1vdW50KTtcbiAgICBjb25zb2xlLmxvZyhcImFtb3VudFNsaWRlc09uTGlzdCBcIiArIGFtb3VudFNsaWRlc09uTGlzdCk7XG5cbiAgICAvLyBJbml0aWFsaXplIHNsaWRlciBzdGFydCBwb3NpdGlvbiAtMTAwJVxuICAgIC8vc2xpZGVzV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtvZmZzZXR9cHgpYDtcbiAgICAvL3RvZG8g0YPRh9C40YLRi9Cy0LDRgtGMIGdhcCFcbiAgICAvL3RvZG8g0LrQsNC6INCy0YvRgdGH0LjRgtCw0YLRjCDRgdC60L7Qu9GM0LrQviDQu9C40YHRgtC+0LI/ICjRiNC40YDQuNC90YMg0L7QutC90LAg0LTQtdC70LjRgtGMINC90LAg0YjQuNGA0LjQvdGDINC60LDRgNGC0L7Rh9C60Lgg0LHQtdC3INC+0YHRgtCw0YLQutCwINC4INC/0L7RgtC+0Lwg0LLRi9GB0YfQuNGC0YvQstCw0YLRjCDRgdC60L7Qu9GM0LrQviDQutCw0YDRgtC+0YfQtdC6INC90LAg0YHQutC+0LvRjNC60L4g0LvQuNGB0YLQvtCyPylcbiAgICAvL3RvZG8g0LrRgNGD0YLQuNGC0Ywgc2xpZGVMaXN0c0Ftb3VudCDQutCw0LogaW5kZXgg0YEg0L/QtdGA0LXRgdC60L7QutC+0Lwg0L/RgNC4INC00L7RgdGC0LjQttC10L3QuNC4INC60YDQsNGPIGluZGV4ID0gKytpbmRleCAlIHNsaWRlcy5sZW5ndGg7XG5cbiAgICAvLyBJbml0aWFsaXplIHNsaWRlciBzdGFydCBwb3NpdGlvblxuICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstb2Zmc2V0fXB4KWA7XG5cbiAgICBmdW5jdGlvbiBtb3ZMZWZ0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCkge1xuICAgICAgc2xpZGVzV3JhcHBlci5vbnRyYW5zaXRpb25lbmQgPSAoXykgPT4ge1xuICAgICAgICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW1vdW50U2xpZGVzT25MaXN0OyBpKyspIHtcbiAgICAgICAgICBzbGlkZXNXcmFwcGVyLmFwcGVuZChzbGlkZXNbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstb2Zmc2V0fXB4KWA7XG5cbiAgICAgICAgaW5BY3Rpb24gPSBmYWxzZTtcbiAgICAgIH07XG4gICAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHstb2Zmc2V0ICogMiAtIGdhcFZhbHVlfXB4KWA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1vdlJpZ2h0KHNsaWRlc1dyYXBwZXIsIG9mZnNldCkge1xuICAgICAgc2xpZGVzV3JhcHBlci5vbnRyYW5zaXRpb25lbmQgPSAoXykgPT4ge1xuICAgICAgICBzbGlkZXNXcmFwcGVyLm9udHJhbnNpdGlvbmVuZCA9IG51bGw7XG4gICAgICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW1vdW50U2xpZGVzT25MaXN0OyBpKyspIHtcbiAgICAgICAgICBzbGlkZXNXcmFwcGVyLnByZXBlbmQoc2xpZGVzV3JhcHBlci5sYXN0RWxlbWVudENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LW9mZnNldH1weClgO1xuXG4gICAgICAgIGluQWN0aW9uID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBzbGlkZXNXcmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uVGltZTtcbiAgICAgIHNsaWRlc1dyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtnYXBWYWx1ZX1weClgO1xuICAgIH1cblxuICAgIHJpZ2h0Lm9uY2xpY2sgPSAoXykgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJyaWdodFwiKTtcbiAgICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuICAgICAgaW5BY3Rpb24gPSB0cnVlO1xuICAgICAgbW92TGVmdChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpO1xuICAgIH07XG4gICAgbGVmdC5vbmNsaWNrID0gKF8pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwibGVmdFwiKTtcbiAgICAgIGlmIChpbkFjdGlvbikgcmV0dXJuO1xuXG4gICAgICBpbkFjdGlvbiA9IHRydWU7XG4gICAgICBtb3ZSaWdodChzbGlkZXNXcmFwcGVyLCBvZmZzZXQpO1xuICAgIH07XG4gIH0pKCk7XG59XG5cbmlmIChtYWluV2lkdGggPD0gMTI1MCkge1xuICBjb25zdCBidXJnZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2UtaGVhZGVyX19idXJnZXItYnV0dG9uXCIpLFxuICAgIGhlYWRlckhlaWd0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJcIikub2Zmc2V0SGVpZ2h0O1xuXG4gIGNvbnNvbGUubG9nKFwiaGVhZGVySGVpZ3RoIFwiICsgaGVhZGVySGVpZ3RoKTtcblxuICBidXJnZXJCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICBidXJnZXJCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcInBhZ2UtaGVhZGVyX19idXJnZXItYnV0dG9uX29wZW5cIik7XG5cbiAgICBpZiAobWFpbldpZHRoIDw9IDY4MCkge1xuICAgICAgY29uc3QgaGVhZGVyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX21lbnVcIik7XG4gICAgICBoZWFkZXJNZW51LnN0eWxlLnRvcCA9IGAke2hlYWRlckhlaWd0aH1weGA7XG4gICAgICBoZWFkZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoXCJwYWdlLWhlYWRlcl9fbWVudV9vcGVuXCIpO1xuXG4gICAgICBoZWFkZXJNZW51LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhXCIpLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgICAgbGluay5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgIGhlYWRlck1lbnUuY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyX19tZW51X29wZW5cIik7XG4gICAgICAgICAgYnVyZ2VyQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJwYWdlLWhlYWRlcl9fYnVyZ2VyLWJ1dHRvbl9vcGVuXCIpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICAvLyB0b2RvINGD0LHQuNGA0LDRgtGMINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0L/RgNC4INC30LDQutGA0YvRgtC40Lgg0LzQtdC90Y4/XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGhlYWRlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFnZS1oZWFkZXJfX25hdlwiKTtcbiAgICAgIGhlYWRlck5hdi5zdHlsZS50b3AgPSBgJHtoZWFkZXJIZWlndGh9cHhgO1xuICAgICAgaGVhZGVyTmF2LmNsYXNzTGlzdC50b2dnbGUoXCJwYWdlLWhlYWRlcl9fbmF2X29wZW5cIik7XG5cbiAgICAgIGhlYWRlck5hdi5xdWVyeVNlbGVjdG9yQWxsKFwiYVwiKS5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICAgIGxpbmsub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICBoZWFkZXJOYXYuY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyX19uYXZfb3BlblwiKTtcbiAgICAgICAgICBidXJnZXJCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcInBhZ2UtaGVhZGVyX19idXJnZXItYnV0dG9uX29wZW5cIik7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=