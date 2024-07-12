import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
//import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";

export default merge(common, {
  mode: "production",
  output: {
    clean: true,
  },

  // devtool: false,
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      /*new ImageMinimizerPlugin({
        minimizer: [
          {
            // `sharp` will handle all bitmap formats (JPG, PNG, GIF, ...)
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                // Your options for `sharp`
                // https://sharp.pixelplumbing.com/api-output
              },
            },
          },
          {
            // `svgo` will handle vector images (SVG)
            implementation: ImageMinimizerPlugin.svgoMinify,
            options: {
              encodeOptions: {
                // Pass over SVGs multiple times to ensure all optimizations are applied. False by default
                multipass: true,
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        collapseGroups: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
        generator: [
          {
            preset: "webp",
            // Преобразование в формат webp с использованием sharp
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 80,
                },
              },
            },
          },
        ],
      })*/
      ,
    ],
  },
});
