//import "../styles/index.css";
//const mainWidth = document.querySelector(".page-main")?.offsetWidth;
//export { mainWidth };
function getMainWidth() {
  return document.querySelector(".page-main").offsetWidth;
}

export { getMainWidth };

/* todo прелоадер
отключать обработку события скролл?
или просто по умолчанию вешать в html класс stop-scroll?
*/

//console.log("mainWidth в index.js " + getMainWidth());
import "./hero-slider.js";
//console.log("hero-slider.js");
import "./feedback-slider.js";
//console.log("feedback-slider.js");
import "./burger-menu.js";
//console.log("burger-menu.js");
import "./initial-animations.js";
//console.log("initial-animations.js");
