var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: path.join(__dirname,"dist"),
    filename: 'bundle.js',
    publicPath: "/static/"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
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
