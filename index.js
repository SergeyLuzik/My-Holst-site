/* todo реализация слайдера 

использовать translate3d для сдвига без доп перерисовки https://habr.com/ru/articles/501258/#3

Чтобы не делать overflow: hidden на ленте слайдов перекидывать уходящий влево слайд в конец (а при листании обратно?)
    или можно задать margin/padding со всех сторон чтобы было место для увеличения при наведении и тогда навесить overflow: hidden

Одновременно с пролистыванием увеличение до активного слайда

Уход активного слайда растворением, т.е opasity: 0
    или scale(0) чтобы он уменьшался до нуля, если можно анимировать 



при движении влево  сначала opacity: 0, потом scale(0) чтобы он уменьшался до нуля, если можно анимировать
потом убрать его в конец

когда вправо то наоборот появление из opacity 0 и scale(1)

вместо класса active делать смещение самого слайда и scale одновременно, чтобы получить тот же эффект



*/

const slider = document.querySelector(".slider__slides-list");
const slides = document.querySelectorAll(".slider__slide-item");
const activeSlideWidth = document.querySelector(
  ".slider__slide-item_active"
).offsetWidth;
let currentIndex = 0;

function updateSlider(direction) {
  const fadingSlide =
    direction === "left" ? slider.firstElementChild : slider.lastElementChild;
  fadingSlide.style.opacity = 0;
  fadingSlide.style.transform = "scale(0.3)";
  // todo реализовать матрицей? (она совмещает разные свойства)
  slider.style.transform = `translateX(${-currentIndex * activeSlideWidth}px)`;
  fadingSlide.classList.remove("slider__slide-item_active");
  slides[1].classList.add("slider__slide-item_active");

  /*todo requestAnimationFrame 
  https://learn.javascript.ru/js-animation?ysclid=lt2m3fks4k156106724
  https://habr.com/ru/companies/timeweb/articles/587908/
  
TODO!!!!!!!
  Ставить translate 0 при удалении слайда 
  https://stackoverflow.com/questions/73764110/how-to-create-infinite-carousel-in-javascript

  что такое событие transitionend?

  https://medium.com/@claudiaconceic/infinite-plain-javascript-slider-click-and-touch-events-540c8bd174f2
  https://dev.to/arindam1997007/creating-an-infinite-looping-image-carousel-with-css-and-javascript-4pao
  

  Еще варианты:
  https://itecnote.com/tecnote/javascript-an-infinite-carousel-with-vanilla-javascript/
  https://stackblitz.com/edit/js-pwu9v8?file=index.js
  https://forum.freecodecamp.org/t/how-to-infinite-loop-auto-carousel/543830  carousel.scrollTo
  https://dev.to/technikhil314/an-infinite-circular-with-css-flex-and-little-js-2a44 mandatory
  https://www.cssscript.com/demo/minimal-infinite-carousel/ left

  https://www.youtube.com/watch?v=iiFB6oDTdm8 animation
  https://www.youtube.com/watch?v=3Z780EOzIQs градиентные тени и transformZ!
  https://www.youtube.com/watch?v=0YMntQg-WIk непонятная хрень


  /*
  slider.style.transform = `translateX(${-currentIndex * activeSlideWidth}px)`;


  slides.forEach((slide, index) => {
    if (slide !== fadingSlide && index === currentIndex) {
      slide.classList.add("slider__slide-item_active");
      slide.style.opacity = 1;
    } else {
      slide.classList.remove("slider__slide-item_active");
    }
  });*/
}

function moveFirstToEnd() {
  const firstItem = slider.firstElementChild;
  console.log(firstItem);
  slider.removeChild(firstItem);
  slider.appendChild(firstItem);
}

function moveLastToStart() {
  const lastItem = slider.lastElementChild;
  console.log(lastItem);
  slider.removeChild(lastItem);
  slider.insertBefore(lastItem, slider.firstElementChild);
}

document.querySelector(".slider-button_left").addEventListener("click", () => {
  currentIndex++;
  updateSlider("left");
  /* setTimeout(() => {
    moveLastToStart();
  }, 350);*/
});

document.querySelector(".slider-button_right").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider("right");
  moveFirstToEnd();
});

/*function updateSlider() {
  slider.style.transform = `translateX(${-currentIndex * activeSlideWidth}px)`;
  slides.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.classList.add("slider__slide-item_active");
    } else {
      slide.classList.remove("slider__slide-item_active");
    }
  });
}*/

/*
function updateSlider(direction) {
  const fadingSlide =
    direction === "left" ? slider.firstElementChild : slider.lastElementChild;

  slider.style.transform = `translateX(${-currentIndex * activeSlideWidth}px)`;
  fadingSlide.style.opacity = 0;

  slides.forEach((slide, index) => {
    if (slide !== fadingSlide && index === currentIndex) {
      slide.classList.add("slider__slide-item_active");
      slide.style.opacity = 1;
    } else {
      slide.classList.remove("slider__slide-item_active");
    }
  });
}
*/

/*
document
  .getElementById("moveFirstToEnd")
  .addEventListener("click", moveFirstToEnd);
document
  .getElementById("moveLastToStart")
  .addEventListener("click", moveLastToStart);
*/
/* todo 1я реализация
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
*/
/* todo 2я реализация
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
*/
/* todo 2я реализация

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
*/
