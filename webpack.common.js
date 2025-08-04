import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export default {
  entry: [
    path.resolve("src", "scripts", "index.js"),
    path.resolve("src", "styles", "index.scss"),
  ],
  output: {
    filename: "build.[contenthash].js",
    path: path.resolve("docs"),
    //clean: true,
  },
  target: "web",
  stats: {
    depth: true,
    children: true,
    errorDetails: true,
    logging: "log",
    loggingDebug: ["ImageMinimizerPlugin"],
    assetsSpace: 60,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(scss|sass)$/i,
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
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|avif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]" /*.[contenthash:8] */,
        },
      },
      {
        test: /favicon|apple-touch|safari-pinned-tab*/i,
        type: "asset/resource",
        generator: {
          filename: "assets/favicons/[name].[contenthash][ext]",
        },
      },
      {
        test: /icons\.svg/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[contenthash][ext]",
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
          filename: "[name].[contenthash][ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "build.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("src", "index.html"),
      minify: true,
    }),
    new CopyPlugin({
      patterns: [
        /*{
          from: path.resolve("src", "assets", "optimized-images"),
          to: path.resolve("docs", "assets", "optimized-images", "[base]"),
        },*/
        {
          from: path.resolve(
            "src",
            "assets",
            "favicons",
            "android-chrome-192x192.png"
          ),
          to: path.resolve(
            "docs",
            "assets",
            "favicons",
            "[name].[contenthash][ext]"
          ),
        },
        {
          from: path.resolve(
            "src",
            "assets",
            "favicons",
            "android-chrome-512x512.png"
          ),
          to: path.resolve(
            "docs",
            "assets",
            "favicons",
            "[name].[contenthash][ext]"
          ),
        },
      ],
    }),
  ],
};
