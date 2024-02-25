/* todo реализация слайдера 

использовать translate3d для сдвига без доп перерисовки https://habr.com/ru/articles/501258/#3

Чтобы не делать overflow: hidden на ленте слайдов перекидывать уходящий влево слайд в конец (а при листании обратно?)
    или можно задать margin/padding со всех сторон чтобы было место для увеличения при наведении и тогда навесить overflow: hidden

Одновременно с пролистыванием увеличение до активного слайда

Уход активного слайда растворением, т.е opasity: 0
    или scale(0) чтобы он уменьшался до нуля, если можно анимировать 







*/

const slider = document.querySelector(".slider__slides-list");
const slides = document.querySelectorAll(".slider__slide-item");
const activeSlideWidth = document.querySelector(
  ".slider__slide-item_active"
).offsetWidth;
let currentIndex = 0;

function updateSlider() {
  slider.style.transform = `translateX(${-currentIndex * activeSlideWidth}px)`;
  slides.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.classList.add("slider__slide-item_active");
    } else {
      slide.classList.remove("slider__slide-item_active");
    }
  });
}

document.querySelector(".slider-button_left").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
  console.log("left");
});

document.querySelector(".slider-button_right").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
  console.log("right");
});



document
  .getElementById("moveFirstToEnd")
  .addEventListener("click", moveFirstToEnd);
document
  .getElementById("moveLastToStart")
  .addEventListener("click", moveLastToStart);

  /* todo 1я реализация*/
function moveFirstToEnd() {
  const list = document.getElementById("myList");
  const firstItem = list.firstElementChild;
  list.removeChild(firstItem);
  list.appendChild(firstItem);
}

function moveLastToStart() {
  const list = document.getElementById("myList");
  const lastItem = list.lastElementChild;
  list.removeChild(lastItem);
  list.insertBefore(lastItem, list.firstElementChild);
}

/* todo 2я реализация*/
<style>
  #myList li {
    transition: transform 0.3s ease-in-out;
  }
  .move {
    transform: translateX(100%);
  }
</style>

function moveFirstToEnd() {
  const list = document.getElementById('myList');
  const firstItem = list.firstElementChild;
  firstItem.classList.add('move');
  list.removeChild(firstItem);
  list.appendChild(firstItem);
  setTimeout(() => {
    firstItem.classList.remove('move');
  }, 300);
}

function moveLastToStart() {
  const list = document.getElementById('myList');
  const lastItem = list.lastElementChild;
  lastItem.classList.add('move');
  list.removeChild(lastItem);
  list.insertBefore(lastItem, list.firstElementChild);
  setTimeout(() => {
    lastItem.classList.remove('move');
  }, 300);
}

/* todo 2я реализация*/

<style>
  #myList li {
    transition: transform 0.3s ease-in-out;
  }
</style>

function moveFirstToEnd() {
  const list = document.getElementById('myList');
  const firstItem = list.firstElementChild;
  const clone = firstItem.cloneNode(true);
  firstItem.style.transform = 'translateX(100%)';
  firstItem.addEventListener('transitionend', () => {
    list.removeChild(firstItem);
    list.appendChild(clone);
    clone.style.transform = 'translateX(0)';
  });
}

function moveLastToStart() {
  const list = document.getElementById('myList');
  const lastItem = list.lastElementChild;
  const clone = lastItem.cloneNode(true);
  lastItem.style.transform = 'translateX(-100%)';
  lastItem.addEventListener('transitionend', () => {
    list.removeChild(lastItem);
    list.insertBefore(clone, list.firstElementChild);
    clone.style.transform = 'translateX(0)';
  });
}