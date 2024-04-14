import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "./webpack.config.js"; // Путь к вашему webpack.config.js
const compiler = webpack(config);

const app = express();

// Указываем webpack-dev-middleware использовать нашу конфигурацию Webpack
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// Указываем серверу использовать пользовательский индексный файл
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "dist", "index.[contenthash].html"))
);

// Остальная часть вашего сервера
// ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
