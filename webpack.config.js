/*import { fileURLToPath } from "url";*/
import path from "path";
/*const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);*/
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
/*let test = path.resolve("dist", "assets");
console.log(test);**/
export default {
  /*  node: {
    __dirname: true,
  },*/
  mode: "development",
  devtool: "inline-source-map",
  entry: path.resolve("index.js"),
  output: {
    filename: "build.[contenthash].js",
    path: path.resolve("dist"),
    assetModuleFilename: "images/[name].[hash][ext]",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /favicon|apple-touch|safari-pinned-tab*/i,
        type: "asset/resource",
        generator: {
          filename: "favicons/[name].[hash][ext]",
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "build.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("android-chrome-192x192.png"),
          to: path.resolve("dist/favicons/[name].[hash][ext]"),
        },
      ],
    }),
  ],
  devServer: {
    static: {
      /*directory: path.join(__dirname, "dist"),*/
      directory: path.resolve("dist"),
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
