const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
    filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:3000/dist' // 어느 위치에서 번들링된 결과를 가져올 것인가?
  },

};