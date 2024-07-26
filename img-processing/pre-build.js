import Image from "@11ty/eleventy-img";
import { parse } from "path";
import fs from "fs";
import { settings } from "./settings.js";
import { log } from "console";

function calcWidthArr(initialWidth) {
  let widthArr = [];
  settings.dpiValues.forEach((dpi) => {
    widthArr.push(initialWidth * dpi);
  });
  return widthArr;
}

function getImageAttribute(attributeName, attributeString, returnType) {
  console.log(attributeName);
  console.log(attributeString);
  const attribute = attributeString.match(
    new RegExp(`${attributeName}="([^"]*)"`)
  )[1];
  if (returnType === "number") {
    return parseInt(attribute);
  } else return attribute;
}

fs.readFile(settings.preHtmlPath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const updatedHtml = data.replaceAll(/<img([^>]*)>/g, (match, attributes) => {
    const imgSrc = getImageAttribute("src", attributes);
    if (
      settings.imageFormats.includes(
        imgSrc.match(/\.([a-z]*)[^\.]*$/)[1].toLowerCase()
      ) //проверяет есть ли расширение в списке, убирая из расширения файла в src возможные #,?
    ) {
      const imgAttributes = {
        className: getImageAttribute("class", attributes),
        src: imgSrc,
        width: getImageAttribute("width", attributes, "number"),
        height: getImageAttribute("height", attributes, "number"),
        sizes: getImageAttribute("sizes", attributes),
        alt: getImageAttribute("alt", attributes),
      };
      return optimizeImage(
        settings.imagesDir + imgAttributes.src,
        calcWidthArr(imgAttributes.width),
        imgAttributes
      );
    } else {
      return match;
    }
  });

  fs.writeFile(settings.preHtmlPath, updatedHtml, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Picture tags generated successfully!");
  });
});
// todo переписать на asinc? надо оно, работает все в синхронном режиме

function optimizeImage(src, widthArr, imgAttributes) { // todo вынести выходные форматы в settings
  const options = {
    formats: ["avif", "webp", "jpeg", "png"],
    widths: [settings.placeholderWidth, ...widthArr],
    urlPath: settings.urlPath,
    outputDir: settings.imagesDir + settings.urlPath,
    //dryRun: true,
    filenameFormat: (id, src, width, format) => {
      // console.log(id, src, width, format);
      return `${parse(src).name}-${width}.${id}.${format}`; //todo id это hash можно добавить его если не получится через webpack
    },
  };

  Image(src, options); // создаем изображения
  const stats = Image.statsSync(src, options); // собираем о них данные
  console.log(stats);
  const html = Image.generateHTML(stats, {
    class: imgAttributes.className,
    alt: imgAttributes.alt,
    sizes: imgAttributes.sizes,
  });
  return html.replaceAll(
    /(<picture)(.*width=")\d*(" height=")\d*(".*>)/g,
    `$1 class="${imgAttributes.className}"$2${imgAttributes.width}$3${imgAttributes.height}$4`
  );
}
