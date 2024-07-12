import { getMainWidth } from "./index.js";

if (getMainWidth() > 1200) {

  let MutObserver = new MutationObserver (MutRecords => {
    console.log("Вывод обсервера мутаций" );
    console.log(MutRecords);
    const slidesList = document.querySelector(".feedback__list"),
    slides = slidesList.children,
    slideWidth = slides[0].offsetWidth, // parseFloat(getComputedStyle(slides[0]).width), //slides[0].offsetWidth,
    slidesListWidth = slidesList.offsetWidth, //parseFloat(getComputedStyle(slidesList).width), // slidesList.offsetWidth,
    gapValue =
      (slidesListWidth / 100) *
      parseFloat(getComputedStyle(slidesList).gap),
    amountSlidesOnList = Math.floor(slidesListWidth / (slideWidth + gapValue)),
    slideListsAmount = Math.ceil(slides.length / amountSlidesOnList),
    offset = 4 * slideWidth + 3 * gapValue, //slidesListWidth + gapValue, //  amountSlidesOnList * (slideWidth + gapValue) // slidesListWidth - 2 * gapValue, 
    transitionTime = "1s",
    leftButton = document.querySelector(".feedback >.slider-button_left"),
    rightButton = document.querySelector(".feedback > .slider-button_right");

  let inAction = false;

  console.log("gapValue " + gapValue);
  console.log("slideWidth " + slideWidth);
  console.log("slidesListWidth " + slidesListWidth);
  console.log(slides);
  console.log("slides.length " + slides.length);
  console.log("slideListsAmount " + slideListsAmount);
  console.log("amountSlidesOnList " + amountSlidesOnList);

  // Initialize slider start position -100%
  //slidesList.style.transform = `translateX(-${offset}px)`;
  //todo учитывать gap!
  //todo как высчитать сколько листов? (ширину окна делить на ширину карточки без остатка и потом высчитывать сколько карточек на сколько листов?)
  //todo крутить slideListsAmount как index с перескоком при достижении края index = ++index % slides.length;

  // Initialize slider start position
  slidesList.style.transform = `translateX(${-offset}px)`;

  function movLeft(slidesList, offset) {
    slidesList.ontransitionend = (_) => {
      slidesList.ontransitionend = null;
      slidesList.style.transition = "none";

      for (let i = 0; i < amountSlidesOnList; i++) {
        slidesList.append(slides[0]);
      }
      slidesList.style.transform = `translateX(${-offset}px)`;

      inAction = false;
    };
    slidesList.style.transition = transitionTime;
    slidesList.style.transform = `translateX(${-offset * 2 - gapValue}px)`;
  }
  function movRight(slidesList, offset) {
    slidesList.ontransitionend = (_) => {
      slidesList.ontransitionend = null;
      slidesList.style.transition = "none";

      for (let i = 0; i < amountSlidesOnList; i++) {
        slidesList.prepend(slidesList.lastElementChild);
      }
      slidesList.style.transform = `translateX(${-offset}px)`;

      inAction = false;
    };

    slidesList.style.transition = transitionTime;
    slidesList.style.transform = `translateX(${gapValue}px)`;
  }

  rightButton.onclick = (_) => {
    console.log("right");
    if (inAction) return;
    inAction = true;
    movLeft(slidesList, offset);
  };
  leftButton.onclick = (_) => {
    console.log("left");
    if (inAction) return;

    inAction = true;
    movRight(slidesList, offset);
  };
  })
  
  MutObserver.observe(document.documentElement, {attributeFilter: ["class"]});


}
