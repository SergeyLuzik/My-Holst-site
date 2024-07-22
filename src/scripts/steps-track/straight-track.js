import { addTriangle, moveTriangleAlongStraight } from "./triangle.js";
import { stepsLine } from "./steps-line-vars.js";
export function addStraightTrack() {
    const stepsSection = document.querySelector(".steps");
    const gap = parseInt(
      window
        .getComputedStyle(stepsSection.querySelector(".steps__list"))
        .getPropertyValue("gap")
    );
    const initialX = stepsSection.getBoundingClientRect().x;
    const initialY = stepsSection.getBoundingClientRect().y + window.scrollY;
    //console.log(stepsSection.getBoundingClientRect(), window.scrollY);
    let markersRect = [];
    const markersCoords = [];
  
    const firstMarkerRect = document
      .querySelector(".marker")
      .getBoundingClientRect();
    markersRect.push(firstMarkerRect);
  
    const linePadding = firstMarkerRect.height / 2 - 5; // todo отнимание 5 убирает зазор между линией и маркером (костыльно)
  
    /*const firstMarkerCoords = {
      x: firstMarkerRect.x - initialX + firstMarkerRect.width / 2,
      y: firstMarkerRect.y - initialY,
    };
    firstMarkerCoords.push(markersCoords);*/
  
    const lastMarkerRect = document
      .querySelector(".steps__item:last-child >.marker")
      .getBoundingClientRect();
    markersRect.push(lastMarkerRect);
  
    /* const lastMarkerCoords = {
      x: lastMarkerRect.x - initialX + lastMarkerRect.width / 2,
      y: lastMarkerRect.y - initialY,
    };
    lastMarkerCoords.push(markersCoords);*/
  
    markersRect.forEach((markerRect) => {
      /*const markerRect = marker.getBoundingClientRect();
      let centerCoords = {};
  
      centerCoords.x = markerRect.x - initialX + markerRect.width / 2;
      centerCoords.y = markerRect.y - initialY + markerRect.height / 2;
  */
      markersCoords.push({
        x: markerRect.x - initialX + markerRect.width / 2,
        y: markerRect.y - initialY + markerRect.height / 2 + window.scrollY,
      });
    });
    stepsLine.startY = markersCoords[0].y + initialY;
    stepsLine.endY = markersCoords[markersCoords.length - 1].y + initialY;
    console.log(initialX, initialY, markersRect, markersCoords);
    const NSstring = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NSstring, "svg");
    svg.setAttribute("class", "steps__track");
    const mainTrack = document.createElementNS(NSstring, "path");
    let d = `M ${markersCoords[0].x} ${markersCoords[0].y} L ${markersCoords[1].x} ${markersCoords[1].y}`;
    /* for (let i = 1; i < markersCoords.length; i++) {
      d += `C${markersCoords[i - 1].x} ${
        markersCoords[i - 1].y + controlPointOffsetY
      } ${markersCoords[i].x} ${
        markersCoords[i].y - controlPointOffsetY
      } ${markersCoords[i].x} ${markersCoords[i].y}`;
    }*/
    const stepsItems = document.querySelectorAll(".steps__item");
    let offsetArray = [0];
    const dashLenght = gap - linePadding;
    // todo округлять значения dashLenght и itemHeight в большую сторону?
    stepsItems.forEach((item, i) => {
      const itemHeight = parseInt(
        window.getComputedStyle(item).getPropertyValue("height")
      );
      if (i === 0) {
        offsetArray.push(itemHeight);
      } else {
        offsetArray.push(itemHeight + linePadding);
      }
      offsetArray.push(dashLenght);
    });
    mainTrack.setAttribute("class", "steps__main-track");
    mainTrack.setAttribute("d", d);
    mainTrack.setAttribute("fill", "none");
    stepsLine.pathLength = Math.round(mainTrack.getTotalLength());
    mainTrack.setAttribute("stroke-dasharray", offsetArray.join(" "));
    // path.setAttribute("stroke-dashoffset", stepsLine.pathLength);
    svg.appendChild(mainTrack);
    const trackMask = document.createElementNS(NSstring, "path");
    trackMask.setAttribute("class", "steps__track-mask");
    trackMask.setAttribute("d", d);
    trackMask.setAttribute("fill", "none");
    trackMask.setAttribute("stroke-dasharray", stepsLine.pathLength);
    trackMask.setAttribute("stroke-dashoffset", 0);
  
    svg.appendChild(trackMask);
  
    /*use.setAttribute("class", "steps__track--mask");
    use.setAttribute("stroke-dasharray", stepsLine.pathLength);
    use.setAttribute("stroke-dashoffset", 0);
    svg.appendChild(use);*/
    svg.appendChild(
      addTriangle(markersCoords[0].x, markersCoords[0].y, 15 /*, svg*/)
    );
    const triangleMask = document.createElementNS(NSstring, "path");
    triangleMask.setAttribute("class", "steps__triangle-mask");
    triangleMask.setAttribute("d", d);
    triangleMask.setAttribute("fill", "none");
    triangleMask.setAttribute(
      "stroke-width",
      "20px"
    ); /* 20px для перекрытия треугольника в 15px */
    triangleMask.setAttribute("stroke-dasharray", offsetArray.slice(1).join(" "));
    triangleMask.setAttribute("stroke-dashoffset", 0);
    svg.appendChild(triangleMask);
  
    stepsSection.appendChild(svg);
  }

  export function animateStraightStepsTrack(
    startScrollPosition,
    startPoint,
    endPoint,
    pathLenght,
    handlerFunc
  ) {
    const trackPath = document.querySelector(".steps__track-mask");
    const lineHeight = endPoint - startPoint;
    const lineScrollProgres = (window.scrollY - startScrollPosition) / lineHeight;
    let offset = -pathLenght * lineScrollProgres;
  
    if (offset < -pathLenght) {
      offset = -pathLenght;
      window.removeEventListener("scroll", handlerFunc);
    }
    trackPath.setAttribute("stroke-dashoffset", offset);
    moveTriangleAlongStraight(
      document.querySelector(".steps__track-arrow"),
      trackPath,
      offset,
      document.querySelector(".steps__main-track")
    );
  }