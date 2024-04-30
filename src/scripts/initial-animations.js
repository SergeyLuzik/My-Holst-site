function animNumber(numObj, duration) {
  const startTime = performance.now(),
    num = parseInt(numObj.innerHTML.replace(" ", ""), 10);

  const step = (timestamp) => {
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

let numbers = document.querySelectorAll(".promo__statistics-description");
numbers.forEach((num) => {
  animNumber(num, 1500);
});
