
module.exports = {
    entry: "./index.js",
    output: {
      path: './build',
      publicPath: "/",
      filename: 'bundle.js'
    },
    module: {
        preLoaders: [
            { test : /index.js$/,loader : 'rukus-loader?["./components"]' }
        ],
        loaders : [
            { test : /\.js$/, loader : 'babel-loader' }
        ]
    },
    devServer: {
      contentBase: './build'
    }
};
