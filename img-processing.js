// Реализация
/*
1) Получить файл HTML
2) Забрать тег img 
3) Собрать из него атрибуты
4) получить из 11ty готовые фото
5) заменить img на picture
*/

import Image from "@11ty/eleventy-img";
//import { watch, existsSync } from "fs";
import { readdir } from "fs/promises";
import { parse } from "path";
import fs from "fs";

const settings = {
  htmlPath: "./src/index.html",
  imagesDir: "./src/",
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

function getImgAttribures(attributesString) {
  return {
    className: attributesString.match(/class="([^"]*)"/)[1],
    src: attributesString.match(/src="([^"]*)"/)[1],
    width: parseInt(attributesString.match(/width="([^"]*)"/)[1]),
    alt: attributesString.match(/alt="([^"]*)"/)[1],
  };
}

//https://dev.to/ycmjason/stringprototypereplace-asynchronously-28k9 async replase
fs.readFile(settings.htmlPath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const updatedData = data.replace(
    /<img([^>]*class="slider__slide-img"[^>]*)>/,
    (match, attributes) => {
      //  <img([^>]*)>
      const img = getImgAttribures(attributes);
      console.log(
        settings.imageFormats.includes(
          img.src.match(/\.([a-z]*)[^\.]*$/)[1].toLowerCase()
        )
      );

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
        /*console.log("replasment");
        console.log(replasment);
        return replasment;*/
      }

      /* 
    return `<picture>
      <source srcset="${src}" media="${sizes}">
      <img src="${src}" alt="${alt}" title="${title}"${attributes.replace(
      /src="[^"]*"|alt="[^"]*"|title="[^"]*"|sizes="[^"]*"/g,
      ""
    )}>
    </picture>`;*/
    }
  );

  fs.writeFile("./src/new.html", updatedData, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("HTML file updated successfully!");
  });
});
// todo переписать на asinc? надо оно, работает все в синхронном режиме
// todo как поставить класс в picture
/*async*/ function optimizeImage(src, widthArr, imgClass, imgAlt) {
  const options = {
    class: imgClass,
    formats: ["avif", "webp", "jpeg"],
    widths: [settings.placeholderWidth, ...widthArr],
    //outputDir: settings.imagesDir + "img",
    dryRun: true,
    filenameFormat: (id, src, width, format) => {
      //console.log(id, src, width, format);
      return `${parse(src).name}-${width}.${format}`; //todo id это hash можно добавить его если не получится через webpack
    },
  };
  const stats = Image.statsSync(src, options);
  /*await*/ Image(src, options);
  // console.log(stats);
  const html = Image.generateHTML(stats, {
    class: imgClass,
    alt: imgAlt,
    sizes: "100vw",
  });
  //console.log(html);
  return html
    .replaceAll("sizes", "data-sizes")
    .replaceAll(
      /srcset="(.*?), (.*?)"/g,
      (match, placeholder, restImgVersions) => {
        return `srcset="${placeholder}" data-srcset="${restImgVersions}"`;
      }
    );
}

async function OLDoptimizeImage(file) {
  const stats = await Image(settings.imagesDir + file, {
    widths: [null, 600], // edit to your heart's content
    outputDir: settings.imagesDir + "img",
    dryRun: true,
    filenameFormat: (id, src, width, format) => {
      // make the filename something we can recognize.
      // in this case, it's just:
      // [original file name] - [image width] . [file format]
      return `${parse(file).name}-${width}.${format}`;
    },
  });
  console.log(stats); // remove this if you don't want the logs
}

/*(async () => {
  const files = await readdir(settings.imagesDir);
  for (const file of files) {
    const fileExtension = parse(file).ext.toLowerCase();
    if (imageFormats.includes(fileExtension)) {
      await optimizeImage(file);
    }
  }
})();*/

// in development, let's watch for any new image files in our assets directory
/*if (process.env.ENV === "dev") {
  watch(settings.imagesDir, async (event, file) => {
    const fileExtension = parse(file).ext.toLowerCase();
    // the watcher fires for file deletion events too. We need to filter those out
    const fileWasNotDeleted = existsSync(settings.imagesDir + file);
    if (imageFormats.includes(fileExtension) && fileWasNotDeleted) {
      await optimizeImage(file);
    }
  });
}*/

/*
  Заменить sizes на data-sizes
  заменить в sourse srсSet на data, но в img что делать с srcset?

<picture
  ><source
    type="image/avif"
    srcset="/img/dream-24.avif 24w, /img/dream-288.avif 288w, /img/dream-400.avif 400w"
    sizes="100vw" />
  <source
    type="image/webp"
    srcset="/img/dream-24.webp 24w, /img/dream-288.webp 288w, /img/dream-400.webp 400w"
    sizes="100vw" />
  <img
    alt="A blue and purple galaxy of stars"
    src="/img/dream-24.jpeg"
    width="400"
    height="600"
    srcset="/img/dream-24.jpeg 24w, /img/dream-288.jpeg 288w, /img/dream-400.jpeg 400w"
    sizes="100vw"
/></picture>

*/
