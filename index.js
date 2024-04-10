const mainWidth = document.querySelector(".page-main").offsetWidth;

// HERO  SLIDER
if (mainWidth > 800) {
  (() => {
    const slidesWrapper = document.querySelector(".slider__slides-list"),
      activSlideWidth = parseInt(
        getComputedStyle(
          document.querySelector(".hero__slider"),
        ).gridTemplateColumns.split(" ")[0],
        10,
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
      slidesWrapper.style.transform = `translateX(50px)`;

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
        slideWindowWidth / (slideWidth + gapValue),
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

if (mainWidth <= 1200) {
  const burgerButton = document.querySelector(".page-header__burger-button"),
    headerHeigth = document.querySelector(".page-header").offsetHeight,
    headerNav = document.querySelector(".page-header__nav"),
    contactList = document.querySelector(".page-header__contacts-list");

  console.log("headerHeigth " + headerHeigth);

  burgerButton.onclick = () => {
    burgerButton.classList.toggle("page-header__burger-button_active");
    headerNav.style.top = `${headerHeigth}px`;
    headerNav.classList.toggle("page-header__nav_active");
    contactList.classList.toggle("page-header__contacts-list_active");
  };
}
