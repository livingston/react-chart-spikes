const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const merge = require('webpack-merge');
const common = require('./webpack.config.common');

const prodConfig = {
  entry: {
    app: ['./src/app.js']
  },

  output: {
    path: path.join(__dirname, '../dist/assets'),
    filename: '[name]-[hash].bundle.js',
    publicPath: '/assets/',
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,
        output: {
          comments: false,
          beautify: false
        }
      }
    }),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};

module.exports = merge(common, prodConfig);
