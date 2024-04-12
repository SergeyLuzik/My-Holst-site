const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  node: {
    __dirname: true,
  },
  mode: "development",
  devtool: "inline-source-map",
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
  ],
  devServer: {
    allowedHosts: "all",
    historyApiFallback: true,
    static: path.join(__dirname, "dist"),
    open: true, // Автоматически открывать браузер
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
