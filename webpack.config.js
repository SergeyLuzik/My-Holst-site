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
  entry: path.resolve("src/scripts/index.js"),
  output: {
    filename: "build.[contenthash].js",
    path: path.resolve("dist"),
    assetModuleFilename: "assets/images/[name].[hash][ext]",
    /*publicPath: "/",*/
    clean: true,
  },
  module: {
    rules: [
      {
        test: /favicon|apple-touch|safari-pinned-tab*/i,
        type: "asset/resource",
        generator: {
          filename: "assets/favicons/[name].[hash][ext]",
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
        test: /icons\.svg/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[hash][ext]",
        },
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
      template: path.resolve("src/index.html"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("android-chrome-192x192.png"),
          to: path.resolve("dist/assets/images/favicons/[name].[hash][ext]"),
        },
        {
          from: path.resolve("src/assets/fonts/Nunito-VariableFont_wght.woff2"),
          to: path.resolve("dist/assets/fonts/Nunito-VariableFont_wght.woff2"),
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
