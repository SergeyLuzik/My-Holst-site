//todo
// листает задом наперед от обычных
// не увеличивает при наведении первый слайд
// баг при пролистывании вправо

const slidesWrapper = document.querySelector(".slider__slides-list"),
  gapValue = parseInt(getComputedStyle(slidesWrapper).gap),
  slides = slidesWrapper.children,
  slideWidth = slides[0].offsetWidth,
  offset = slideWidth + gapValue,
  transitionTime = "0.3s",
  left = document.querySelector(".slider-button_left"),
  right = document.querySelector(".slider-button_right");

let inAction = false;

// Initialize slider start position
slidesWrapper.style.transform = `translateX(${-offset}px)`;
slides[0].style.opacity = 0;
//slides[0].style.transform = "translate(0) scale(0.3)";
slides[1].style.transform = "translate(-8.75%,8.75%) scale(1.175)";
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
  slides[2].style.transform = "translate(-8.75%,8.75%) scale(1.175)";
  slides[2].style.transitionTimingFunction = "ease-in";
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
  slides[0].style.transform = "translate(-8.75%,8.75%) scale(1.175)";
  slides[0].style.transitionTimingFunction = "ease-in";

  slides[1].style.transition = transitionTime;
  slides[1].style.transform = "translate(0) scale(1)";
  slides[1].style.transitionTimingFunction = "cubic-bezier(0,0,.17,1)";
}

left.onclick = (_) => {
  if (inAction) return;
  inAction = true;
  movLeft(slidesWrapper, offset);
};
right.onclick = async (_) => {
  if (inAction) return;
  inAction = true;
  movRight(slidesWrapper);
};
