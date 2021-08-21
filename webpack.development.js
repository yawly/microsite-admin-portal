'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin')
const common            = require('./webpack.common.js')
const { merge }         = require('webpack-merge')
const webpack           = require('webpack')
const path              = require('path')
const environment       = require('./app.config.json')

const SOURCE_ROOT = __dirname + '/src';
const APP_DIR = path.resolve(__dirname, 'src')

module.exports = env => {

  return merge(common, {
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/static/index.html"
      }),
      new webpack.EnvironmentPlugin({ NODE_ENV: "development" }),
      new webpack.DefinePlugin({
          APP_ENV: JSON.stringify(environment[env.CONFIG_ENV || 'local'])
      })
    ],
    devServer: {
      inline: true,
      port: 9002,
      historyApiFallback: true,
    },
  });
};
