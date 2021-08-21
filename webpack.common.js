
'use strict';

const path                   = require('path');
const webpack                = require('webpack');

// Path constants
const APP_DIR                = path.resolve(__dirname, 'src/js/app');
const STYLE_DIR              = path.resolve(__dirname, 'src/scss');
const DIST_DIR               = path.resolve(__dirname, 'build/');
const NODE_MODULE_DIR        = path.resolve(__dirname, 'node_modules/');

// Plugins
const MiniCssExtractPlugin   = require("mini-css-extract-plugin");
const AutoPrefixer           = require("autoprefixer");


module.exports = {
  entry: {
    app: APP_DIR + "/index.jsx",
  },
  resolve: {
    modules: [NODE_MODULE_DIR, APP_DIR, STYLE_DIR],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  output: {
    filename: "js/[name].min.js",
    path: DIST_DIR,
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jsx)$/,
        include: APP_DIR,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        loader: "file-loader?name=/fonts/[name].[ext]",
      },
      {
        test: /\.scss$/i,
        include: [STYLE_DIR, APP_DIR],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { url: false },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [AutoPrefixer];
              },
            },
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: "webpack-import-glob-loader",
            options: { url: false },
          },
        ],
      },
    ],
  },
};
