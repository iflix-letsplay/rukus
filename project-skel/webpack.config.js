'use strict';
var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
      path: './build',
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            { test : path.resolve(__dirname, 'index.js'),  loader : 'rukus-loader?["./components"]&css' }
        ],
        loaders : [
            { test : /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/build')
    }
};
