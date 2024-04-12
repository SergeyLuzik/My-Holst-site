import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
export default {
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
    new CleanWebpackPlugin(),
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
