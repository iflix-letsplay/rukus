
module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        preLoaders: [
            { test : /index.js$/,loader : 'rukus-loader?["./components"]' }
        ],
        loaders : [
            { test : /\.js$/, loader : 'babel-loader' }
        ]
    }
};
