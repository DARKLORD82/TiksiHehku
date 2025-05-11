const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './App.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'web-build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
plugins: [
  new HtmlWebpackPlugin({
    template: 'index.html',
  }),
],
