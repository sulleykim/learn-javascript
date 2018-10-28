const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        verdor: [
            'moment',
            'lodash'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        // webpack version 4 미만 작동
        // new webpack.optimize.CommonsChunkPlugin({
        //     //   name: 'vendor' // Specify the common bundle's name.
        //     names: ['vendor', 'manifest']
        // }),
        // new ManifestPlugin({
        //     fileName: 'manifest.json',
        //     basePath: './dist/'
        // })
    ]
}