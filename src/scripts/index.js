/* todo прелоадер
отключать обработку события скролл?
или просто по умолчанию вешать в html класс stop-scroll?
*/

import "./initial-animations.js";

import { getMainWidth } from "./utils.js";
import { imgThumbnailsHandler } from "./img-thumbnails.js";
import { burgerMenuHandler } from "./burger-menu.js";
import { heroSliderHandler } from "./hero-slider.js";
import { feedbackSliderHandler } from "./feedback-slider.js";

imgThumbnailsHandler();

const mainWidth = getMainWidth();

if (mainWidth <= 1250) {
  burgerMenuHandler(mainWidth);
}
if (mainWidth > 1200) {
  feedbackSliderHandler();
}
if (mainWidth > 800) {
  heroSliderHandler();
}
