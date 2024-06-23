import Image from "@11ty/eleventy-img";
import { parse } from "path";
import fs from "fs";
import { settings } from "./settings.js";

function getWidthArr(initialWidth) {
  let widthArr = [];
  settings.dpiValues.forEach((dpi) => {
    widthArr.push(initialWidth * dpi);
  });
  return widthArr;
}

function getImgAttributes(attributesString) {
  return {
    className: attributesString.match(/class="([^"]*)"/)[1],
    src: attributesString.match(/src="([^"]*)"/)[1],
    width: parseInt(attributesString.match(/width="([^"]*)"/)[1]),
    height: parseInt(attributesString.match(/height="([^"]*)"/)[1]),
    alt: attributesString.match(/alt="([^"]*)"/)[1],
  };
}

fs.readFile(settings.preHtmlPath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const updatedHtml = data.replaceAll(/<img([^>]*)>/g, (match, attributes) => {
    const imgAttributes = getImgAttributes(attributes);

    if (
      settings.imageFormats.includes(
        imgAttributes.src.match(/\.([a-z]*)[^\.]*$/)[1].toLowerCase()
      ) //проверяет есть ли расширение в списке, убирая из расширения файла в src возмонжые #,?
    ) {
      return optimizeImage(
        settings.imagesDir + imgAttributes.src,
        getWidthArr(imgAttributes.width),
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

function optimizeImage(src, widthArr, imgAttributes) {
  const options = {
    formats: ["avif", "webp", "jpeg"],
    widths: [settings.placeholderWidth, ...widthArr],
    urlPath: settings.urlPath,
    outputDir: settings.imagesDir + settings.urlPath,
    //dryRun: true,
    filenameFormat: (id, src, width, format) => {
      // console.log(id, src, width, format);
      return `${parse(src).name}-${width}.${format}`; //todo id это hash можно добавить его если не получится через webpack
    },
  };

  Image(src, options); // создаем изображения
  const stats = Image.statsSync(src, options); // собираем о них данные
  console.log(stats);
  const html = Image.generateHTML(stats, {
    class: imgAttributes.className,
    alt: imgAttributes.alt,
    sizes: "100vw",
  });
  return html.replaceAll(
    /(<picture)(.*width=")\d*(" height=")\d*(".*>)/g,
    `$1 class="${imgAttributes.className}"$2${imgAttributes.width}$3${imgAttributes.height}$4`
  );
}