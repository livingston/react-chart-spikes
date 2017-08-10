const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

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
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, '../src/styles')],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({ browsers: ['last 2 versions'] })
              ],
            }
          },
          { loader: 'sass-loader', query: { outputStyle: 'expanded' } },
        ],
      },
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
