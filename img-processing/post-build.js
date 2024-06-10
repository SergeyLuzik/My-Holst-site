import fs from "fs";

fs.readFile(/*settings.htmlPath*/"./src/new.html", "utf8", (err, data) => {
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
  
    fs.writeFile("./src/new.html", updatedHtml, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("srcSet and sizes moved to data attributes!");
    });
  });
