window.onload = () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("preloader_hide");
  preloader.addEventListener("transitionend", () => {
    document.documentElement.classList.remove("stop-scroll");
    preloader.remove();
    // Инициализация анимаций
    const animationElements = document.querySelectorAll(".animate");

    animateElements(animationElements);

    let lastScrollPosition = 0;
    let throttledAnimateElements = throttle(animateElements, 200);
    window.addEventListener("scroll", () => {
      animateElements();
      /* animatedElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const targetPosition = window.innerHeight * 0.8;
        if (elementPosition < targetPosition) {
          element.classList.add("scrolled-in");
        }
      });*/
    });
  });
};

function animateElements() {
  const elements = document.querySelectorAll(".animate:not(.scrolled-in)");
  // todo при каждом вызове заново ищутся элементы (обьявить до и передавать, потом проверять в forEach есть ли класс scrolled-in?)
  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const targetPosition = window.innerHeight * 0.8;
    if (elementPosition < targetPosition) {
      element.classList.add("scrolled-in");
    }
  });
}
function animNumber(numObj, duration) {
  //const startTime = performance.now(),
  const num = parseInt(numObj.innerHTML.replace(" ", ""), 10);
  let startTime;

  const step = (timestamp) => {
    if (startTime === undefined) startTime = timestamp;
    const progress = parseFloat(
      Math.min((timestamp - startTime) / duration, 1).toFixed(2)
    );
    numObj.innerHTML =
      Math.floor(progress * num).toLocaleString("ru-RU", {
        useGrouping: true,
      }) + "+";

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
