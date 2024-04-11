import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
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
