const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');

const devConfig = {
  entry: {
    app: ['./src/app.js']
  },
  devtool: false
};

module.exports = merge(common, devConfig);
