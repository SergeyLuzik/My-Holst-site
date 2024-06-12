import fs from "fs";
import { settings } from './pre-build.js';

fs.readFile(/*"./src/new.html"*/settings.htmlPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const updatedHtml = data.replaceAll("sizes", "data-sizes")
    .replaceAll(
      /srcset="(.*?), (.*?)"/g,
      (match, placeholder, restImgVersions) => {
        return `srcset="${placeholder}" data-srcset="${restImgVersions}"`;
      }
    );
  
    fs.writeFile(/*"./src/new.html"*/settings.htmlPath, updatedHtml, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("srcSet and sizes moved to data attributes!");
    });
  });
