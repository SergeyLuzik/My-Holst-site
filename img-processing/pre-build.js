import Image from "@11ty/eleventy-img";
import { parse } from "path";
import fs from "fs";

const settings = {
  htmlPath: "./src/index.html",
  imagesDir: "./src/",
  outputDir: "./src/assets/optimized-images/",
  imageFormats: ["jpg", "png", "jpeg"],
  placeholderWidth: 24,
  dpiValues: [1, 1.5, 2, 2.5, 3],
};
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
    alt: attributesString.match(/alt="([^"]*)"/)[1],
  };
}

fs.readFile(settings.htmlPath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const updatedHtml = data.replace(
    /<img([^>]*class="slider__slide-img"[^>]*)>/,
    (match, attributes) => {
      //  <img([^>]*)>
      const img = getImgAttributes(attributes);

      if (
        settings.imageFormats.includes(
          img.src.match(/\.([a-z]*)[^\.]*$/)[1].toLowerCase()
        ) //проверяет есть ли расширение в списке, убирая из расширения файла в src возмонжые #,?
      ) {
        return optimizeImage(
          settings.imagesDir + img.src,
          getWidthArr(img.width),
          img.className,
          img.alt
        );
      }
    }
  );

  fs.writeFile("./src/new.html", updatedHtml, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Picture tags generated successfully!");
  });
});
// todo переписать на asinc? надо оно, работает все в синхронном режиме
// todo как поставить класс в picture
function optimizeImage(src, widthArr, imgClass, imgAlt) {
  const options = {
    class: imgClass,
    formats: ["avif", "webp", "jpeg"],
    widths: [settings.placeholderWidth, ...widthArr],
    urlPath: settings.outputDir,
   // outputDir: settings.outputDir,
    dryRun: true,
    filenameFormat: (id, src, width, format) => {
     // console.log(id, src, width, format);
      return `${parse(src).name}-${width}.${format}`; //todo id это hash можно добавить его если не получится через webpack
    },
  };

  Image(src, options); // создаем изображения
  const stats = Image.statsSync(src, options); // собираем о них данные
console.log(stats);
  const html = Image.generateHTML(stats, {
    class: imgClass,
    alt: imgAlt,
    sizes: "100vw",
  });
  return html;
}
