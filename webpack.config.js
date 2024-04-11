import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
export default {
  entry: "./index.js",
  output: {
    filename: "build.[contenthash].js",
    path: path.resolve("dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "build.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "build.[contenthash].html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
