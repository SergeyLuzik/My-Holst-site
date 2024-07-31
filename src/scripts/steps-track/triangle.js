export function addTriangle(initialX, initialY, sideLenght /*, parentNode*/) {
    const triangle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    triangle.setAttribute("class", "steps__track-arrow");
    //(Math.sqrt(3) / 2) = 0,866
    triangle.setAttribute("style", "opacity: 0;");
    triangle.setAttribute(
      "points",
      `${initialX - sideLenght / 2},${initialY} ${initialX},${
        initialY + (Math.sqrt(3) / 2) * sideLenght
      } ${initialX + sideLenght / 2},${initialY}`
    );
    //  parentNode.appendChild(triangle);
    return triangle;
  }
  
  export function moveTriangleAlongCurve(triangle, path, totalPathLenght, offset) {
    const currentLenght = totalPathLenght - offset;
    const initialPoint = path.getPointAtLength(0);
    const currentPoint = path.getPointAtLength(currentLenght);
    const triangleHeightPoints = triangle
      .getAttribute("points")
      .match(/\S+,(\S+)\s.\S+,(\S+)/);
    const futurePoint = path.getPointAtLength(
      currentLenght + (triangleHeightPoints[2] - triangleHeightPoints[1])
    );
    const angle =
      (Math.atan2(
        futurePoint.y - currentPoint.y,
        futurePoint.x - currentPoint.x
      ) -
        Math.atan2(0, currentPoint.x + 1)) *
        (180 / Math.PI) -
      90;
  
    triangle.setAttribute(
      "transform",
      `translate(${currentPoint.x - initialPoint.x}, ${
        currentPoint.y - initialPoint.y
      }) rotate(${angle} ${initialPoint.x} ${initialPoint.y})`
    );
    triangle.setAttribute("style", "opacity: 1;");
  }
  
  export function moveTriangleAlongStraight(triangle, maskTrack, offset, mainTrack) {
    const currentLenght = -offset;
    const initialPoint = maskTrack.getPointAtLength(0);
    const currentPoint = maskTrack.getPointAtLength(currentLenght);
    triangle.setAttribute(
      "transform",
      `translate(${currentPoint.x - initialPoint.x}, ${
        currentPoint.y - initialPoint.y
      })`
    );
    triangle.setAttribute("style", "opacity: 1;");
  }