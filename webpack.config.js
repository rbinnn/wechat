var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: './src/app.js',
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
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.(jpg|png)$/,
        loader: "url?limit=40000"
      },
      {
        test: /\.(woff|svg|ttf|eot)/,
        loader: "file"
      }
    ]
  }
}
