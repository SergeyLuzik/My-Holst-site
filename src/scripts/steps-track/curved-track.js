import { addTriangle, moveTriangleAlongCurve } from "./triangle.js";
import { stepsLine } from "./steps-line-vars.js";

export function addCurvedTrack() {
  const stepsSection = document.querySelector(".steps");
  const initialX = stepsSection.getBoundingClientRect().x;
  const initialY = stepsSection.getBoundingClientRect().y + window.scrollY;
  const controlPointOffsetY = 533;
  const markers = document.querySelectorAll(".marker");
  const markersCenterCoords = [];

  markers.forEach((marker) => {
    const markerRect = marker.getBoundingClientRect();
    markersCenterCoords.push({
      x: markerRect.x - initialX + markerRect.width / 2,
      y: markerRect.y - initialY + markerRect.height / 2 + window.scrollY,
    });
  });
  stepsLine.startY = markersCenterCoords[0].y + initialY;
  stepsLine.endY =
    markersCenterCoords[markersCenterCoords.length - 1].y + initialY;

  const NSstring = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NSstring, "svg");
  svg.setAttribute("class", "steps__track");
  const path = document.createElementNS(NSstring, "path");
  path.setAttribute("class", "steps__main-track");
  let d = `M ${markersCenterCoords[0].x} ${markersCenterCoords[0].y}`;
  for (let i = 1; i < markersCenterCoords.length; i++) {
    d += `C${markersCenterCoords[i - 1].x} ${
      markersCenterCoords[i - 1].y + controlPointOffsetY
    } ${markersCenterCoords[i].x} ${
      markersCenterCoords[i].y - controlPointOffsetY
    } ${markersCenterCoords[i].x} ${markersCenterCoords[i].y}`;
  }
  path.setAttribute("d", d);
  path.setAttribute("fill", "none");
  stepsLine.pathLength = Math.round(path.getTotalLength());
  path.setAttribute("stroke-dasharray", stepsLine.pathLength);
  path.setAttribute("stroke-dashoffset", stepsLine.pathLength);
  svg.appendChild(path);
  svg.appendChild(
    addTriangle(
      markersCenterCoords[0].x,
      markersCenterCoords[0].y,
      15 /*, svg*/
    )
  );

  stepsSection.appendChild(svg);
}

export function animateCurvedStepsTrack(
  startScrollPosition,
  startPoint,
  endPoint,
  pathLength
) {
  const trackPath = document.querySelector(".steps__main-track");
  const lineHeight = endPoint - startPoint;
  const lineScrollProgress =
    (window.scrollY - startScrollPosition) / lineHeight;

  let offset = pathLength * (1 - lineScrollProgress);

  if (offset < 0) {
    offset = 0;
  }
  trackPath.setAttribute("stroke-dashoffset", offset);
  moveTriangleAlongCurve(
    document.querySelector(".steps__track-arrow"),
    trackPath,
    pathLength,
    offset
  );
}
