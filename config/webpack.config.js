const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../src/index.html'),
  filename: '../index.html',
  inject: 'body',
  publicPath: '/',
});

const common = {
  output: {
    path: path.join(__dirname, '../build/assets'),
    filename: '[name]-[hash].bundle.js',
    publicPath: '/assets/',
  },

  resolve: {
    modules: [
      path.join(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
  },

  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.html$/, loader: 'html-loader' },
    ]
  },

  plugins: [HtmlWebpackPluginConfig],

  target: 'web',

  performance: {
    hints: 'warning',
  }
};

const environmentConfig = {
  entry: {
    app: ['./src/app.js']
  }
};

module.exports = merge(common, environmentConfig);
