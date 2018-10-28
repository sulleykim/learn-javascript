const path = require('path');
const webpack = require('webpack');

module.exports = {
    resolve: {
        alias: {
            Utilities: path.resolve(__dirname, 'src/utilities/')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery'
        })
    ]
}