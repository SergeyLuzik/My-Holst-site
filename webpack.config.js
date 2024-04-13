const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  devtool: "inline-source-map",
  entry: "./index.js",
  output: {
    filename: "build.[contenthash].js",
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "build.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],

  module: {
    rules: [
      /*{
        test: /\.html$/,
        loader: "html-loader",
      },*/
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
