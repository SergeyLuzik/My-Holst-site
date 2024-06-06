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

const imagesDir = "./src/assets/images/steps/4/"; //path.resolve("src", "assets", "images", "steps", "4"); //"./public/";
// all the image formats we're willing to optimize
const imageFormats = [".jpg", ".png", ".jpeg"];

async function optimizeImage(file) {
  const stats = await Image(imagesDir + file, {
    widths: [null, 600], // edit to your heart's content
    outputDir: imagesDir + "img",
    filenameFormat: (id, src, width, format) => {
      // make the filename something we can recognize.
      // in this case, it's just:
      // [original file name] - [image width] . [file format]
      return `${parse(file).name}-${width}.${format}`;
    },
  });
  console.log(stats); // remove this if you don't want the logs
}

(async () => {
  const files = await readdir(imagesDir);
  for (const file of files) {
    const fileExtension = parse(file).ext.toLowerCase();
    if (imageFormats.includes(fileExtension)) {
      await optimizeImage(file);
    }
  }
})();

// in development, let's watch for any new image files in our assets directory
/*if (process.env.ENV === "dev") {
  watch(imagesDir, async (event, file) => {
    const fileExtension = parse(file).ext.toLowerCase();
    // the watcher fires for file deletion events too. We need to filter those out
    const fileWasNotDeleted = existsSync(imagesDir + file);
    if (imageFormats.includes(fileExtension) && fileWasNotDeleted) {
      await optimizeImage(file);
    }
  });
}*/
