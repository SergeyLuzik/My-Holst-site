function modifyImgTagsToPicture(htmlContent) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  const imgTags = doc.querySelectorAll("img");

  imgTags.forEach((imgTag) => {
    const pictureTag = doc.createElement("picture");

    // Добавляем srcset и sizes в picture
    const srcset = imgTag.getAttribute("srcset");
    const sizes = imgTag.getAttribute("sizes");
    if (srcset) {
      const srcsetAttr = doc.createAttribute("srcset");
      srcsetAttr.value = srcset;
      pictureTag.setAttributeNode(srcsetAttr);
    }
    if (sizes) {
      const sizesAttr = doc.createAttribute("sizes");
      sizesAttr.value = sizes;
      pictureTag.setAttributeNode(sizesAttr);
    }

    // Создаем новый элемент source с src
    const sourceTag = doc.createElement("source");
    const src = imgTag.getAttribute("src");
    if (src) {
      const srcAttr = doc.createAttribute("src");
      srcAttr.value = src;
      sourceTag.setAttributeNode(srcAttr);
    }

    // Добавляем source в picture
    pictureTag.appendChild(sourceTag);

    // Заменяем img на picture
    const parentNode = imgTag.parentNode;
    parentNode.replaceChild(pictureTag, imgTag);
  });

  return doc.documentElement.innerHTML;
}

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // ...other webpack configuration options
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      // Добавляем функцию beforeAssetTagGeneration
      beforeAssetTagGeneration: (_, pluginArgs) => {
        const { assets, outputName, plugin } = pluginArgs;
        const htmlContent = plugin.childCompilation.chunks.reduce(
          (acc, chunk) => acc + chunk.origins[0].source.source().toString(),
          ""
        );
        const modifiedHtml = modifyImgTagsToPicture(htmlContent);
        assets.html = {
          source: () => modifiedHtml,
          size: () => modifiedHtml.length,
        };
        outputName.html = "index.html";
      },
    }),
  ],
};

/*
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...other webpack configuration options
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      templateParameters: (compilation, assets, assetTags, options) => {
        // This function can be used to modify the HTML template before it's rendered
        // You can access the images processed by html-loader here and modify the img tags to picture tags

*/
