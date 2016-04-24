var webpack = require("webpack");

module.exports = {
  entry: "./app.js",
  output: {
    filename: 'bundle.js',
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory=true'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
