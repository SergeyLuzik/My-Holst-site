/*import { fileURLToPath } from "url";*/
import path from "path";
/*const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);*/
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
/*let test = path.resolve("docs", "assets");
console.log(test);**/
export default {
  /*  node: {
    __dirname: true,
  },*/
  mode: "development",
  devtool: "inline-source-map",
  entry: path.resolve("src/scripts/index.js"),
  output: {
    filename: "build.[contenthash].js",
    path: path.resolve("docs"),
    /*assetModuleFilename: "assets/images/[name].[hash][ext]",*/
    /*publicPath: "/",*/
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[hash][ext]",
        },
      },
      {
        test: /favicon|apple-touch|safari-pinned-tab*/i,
        type: "asset/resource",
        generator: {
          filename: "assets/favicons/[name].[hash][ext]",
        },
      },
      {
        test: /icons\.svg/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[hash][ext]",
        },
      },
      {
        test: /\.woff2$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.ico$/i,
        type: "asset/resource",
        generator: {
          filename: "favicon.ico",
        },
      },
      {
        test: /\.webmanifest$/i,
        type: "asset/resource",
        generator: {
          filename: "[name].[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "build.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("src/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/assets/favicons/android-chrome-192x192.png"),
          to: path.resolve("docs/assets/favicons/[name].[hash][ext]"),
        },
        {
          from: path.resolve("src/assets/favicons/android-chrome-512x512.png"),
          to: path.resolve("docs/assets/favicons/[name].[hash][ext]"),
        },
      ],
    }),
  ],
  stats: {
    children: true,
    errorDetails: true,
  },
  devServer: {
    static: {
      /*directory: path.join(__dirname, "docs"),*/
      directory: path.resolve("docs"),
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
