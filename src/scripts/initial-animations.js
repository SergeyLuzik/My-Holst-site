window.onload = () => {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("preloader_hide");
  preloader.addEventListener("transitionend", () => {
    document.documentElement.classList.remove("stop-scroll");
    preloader.remove();
    // Инициализация анимаций
    // document.querySelector(".page-header").classList.add("hide");
    document.querySelector(".page-header").classList.remove("hide");
    document.querySelector(".promo__header").classList.remove("hide");
    const services = document.querySelectorAll(".promo__services-item");
    services.forEach((service, index) => {
      setTimeout(() => {
        service.classList.remove("hide");
        service.classList.remove("translate-left-20");
      }, index * 200);
    });
    document.querySelector(".promo__advantage").classList.remove("hide");
    document.querySelector(".promo__statistics").classList.remove("hide");
    document.querySelector(".promo_footer").classList.remove("hide");
    document.querySelector(".hero__slider").classList.remove("hide");
    document
      .querySelector(".hero__slider")
      .classList.remove("translate-right-110");

    let numbers = document.querySelectorAll(".promo__statistics-description");
    numbers.forEach((num) => {
      animNumber(num, 1500);
    });
    const advantages = document.querySelectorAll(".advantages__item");
    advantages.forEach((advantage, index) => {
      setTimeout(() => {
        advantage.classList.remove("hide");
        advantage.classList.remove("translate-up-20");
      }, index * 200);
    });
  });
};
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
