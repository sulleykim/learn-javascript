const express = require('express');
const app = express();
const path = require('path');

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true},
    lazy: true
}));

app.use(express.static(__dirname));

// view engine setup
// __dirname : root folder
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.send('index');
});

app.listen(3000);
console.log("Server running on port 3000");