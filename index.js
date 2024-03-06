// HERO FEEDBACK SLIDER

//todo
// листает задом наперед от обычных
(() => {
  const slidesWrapper = document.querySelector(".slider__slides-list"),
    gapValue = parseInt(getComputedStyle(slidesWrapper).gap),
    slides = slidesWrapper.children,
    slideWidth = slides[0].offsetWidth,
    offset = slideWidth + gapValue,
    transitionTime = "0.3s",
    slideScale = "translate(-10%, 6.5%) scale(1.2)",
    left = document.querySelector(".slider-button_left"),
    right = document.querySelector(".slider-button_right");

  let inAction = false;

  // Initialize slider start position
  slidesWrapper.style.transform = `translateX(${-offset}px)`;
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
      slidesWrapper.style.transform = `translateX(${-offset}px)`;

      inAction = false;
    };
    slidesWrapper.style.transition = transitionTime; //todo задавать transition через запятую всем сразу?
    slidesWrapper.style.transform = `translateX(${-offset * 2}px)`;

    slides[1].style.transition = transitionTime;
    slides[1].style.opacity = 0;
    slides[1].style.transform = "translate(0)"; // scale(0.3)

    slides[2].style.transition = transitionTime;
    slides[2].style.transform = slideScale;
    slides[2].style.transitionTimingFunction = "cubic-bezier(.72,.07,.95,.7)"; //.75,0,1,.02 ease-in
  }
  function movRight(slidesWrapper) {
    slidesWrapper.ontransitionend = (_) => {
      slidesWrapper.ontransitionend = null;
      slidesWrapper.style.transition = "none";
      slides[1].removeAttribute("style");

      slidesWrapper.lastElementChild.style.opacity = 0;
      slidesWrapper.prepend(slidesWrapper.lastElementChild);
      slidesWrapper.style.transform = `translateX(${-offset}px)`;

      inAction = false;
    };
    slidesWrapper.style.transition = transitionTime;
    slidesWrapper.style.transform = `translateX(0px)`;

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
    movRight(slidesWrapper);
  };
  right.onclick = (_) => {
    if (inAction) return;
    inAction = true;
    movLeft(slidesWrapper, offset);
  };
})();

// FEEDBACK SLIDER
(() => {
  const slidesWrapper = document.querySelector(".feedback__list"),
    gapValue = parseInt(getComputedStyle(slidesWrapper).gap),
    slides = slidesWrapper.children,
    slideWidth = slides[0].offsetWidth,
    offset = slideWidth + gapValue,
    transitionTime = "1s",
    slideScale = "translate(-10%, 6.5%) scale(1.2)",
    left = document.querySelector(".feedback >.slider-button_left"),
    right = document.querySelector(".feedback > .slider-button_right");
  //todo переименовать кнопки слайдера, или в селекторе использовать вложенность?
  let inAction = false;

  // Initialize slider start position -100%
  slidesWrapper.style.transform = `translateX(-100%)`;
  //todo учитывать gap!
  //todo как высчитать сколько листов? (ширину окна делить на ширину карточки без остатка и потом высчитывать сколько карточек на сколько листов?)
  right.onclick = (_) => {
    console.log("left");
    if (inAction) return;
    // inAction = true;
    // movLeft(slidesWrapper, offset);
    slidesWrapper.style.transition = transitionTime;
    slidesWrapper.style.transform = `translateX(-100%)`;
  };
  left.onclick = (_) => {
    console.log("right");
    if (inAction) return;
    slidesWrapper.style.transition = transitionTime;
    slidesWrapper.style.transform = `translateX(0px)`;

    //inAction = true;
    // movRight(slidesWrapper);
  };
})();
