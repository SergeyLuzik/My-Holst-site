import { getMainWidth } from "./index.js";
if (getMainWidth() > 1200) {
  const slidesWrapper = document.querySelector(".feedback__list"),
    slides = slidesWrapper.children,
    slideWidth = slides[0].offsetWidth,
    slideWindowWidth = slidesWrapper.offsetWidth,
    gapValue =
      (slideWindowWidth / 100) *
      parseFloat(getComputedStyle(slidesWrapper).gap),
    amountSlidesOnList = Math.floor(slideWindowWidth / (slideWidth + gapValue)),
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
}
