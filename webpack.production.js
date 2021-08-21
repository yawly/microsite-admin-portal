const common                = require('./webpack.common.js')
const merge                 = require('webpack-merge')
const webpack               = require('webpack')

const path                  = require('path')

const HtmlWebpackPlugin     = require('html-webpack-plugin')
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const UglifyJSPlugin        = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin  = require("mini-css-extract-plugin")
const CopyWebpackPlugin     = require('copy-webpack-plugin')
const CompressionPlugin     = require('compression-webpack-plugin')

const APP_DIR               = path.resolve(__dirname, 'src/');
const DIST_DIR              = path.resolve(__dirname, 'build/');

const environment           = require('./app.config.json')

module.exports = env => {

  return merge.smart(common, {
      output: {
          filename: 'js/[name].[contenthash].min.js',
          publicPath: '/',
          path: DIST_DIR
      },
      plugins: [
           new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 8192,
            minRatio: 0.8
            }),
          new CleanWebpackPlugin([ DIST_DIR ]),
          new HtmlWebpackPlugin({
              template: 'src/static/index.html',
              filename: DIST_DIR + '/index.html'
          }),
          new CopyWebpackPlugin([{ from: 'src/assets/fonts', to: DIST_DIR+'/fonts'}]),
          new CopyWebpackPlugin([{ from: 'src/assets/data', to: DIST_DIR+'/data'}]),
          new CopyWebpackPlugin([{ from: 'src/assets/images', to: DIST_DIR+'/images'}]),
          new UglifyJSPlugin({ test: /\.js($|\?)/i }),
          new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
          new webpack.DefinePlugin({
            APP_ENV: JSON.stringify(environment[env.CONFIG_ENV || 'production'])
          }),
      ],
  });
};
