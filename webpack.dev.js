import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  cache: true,

  /* devServer: {
    allowedHosts: "all",
    open: true,
    hot: true,
    historyApiFallback: true,
  },*/
});
