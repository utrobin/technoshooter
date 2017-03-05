var ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const alias = require('whs/tools/alias');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './public/index.js',
    game: './public/game/index.js',
  },
  output: {
    path: "./public/built",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|physics\-module\-ammonext)/,
        plugins: ['transform-runtime'],
        loader: 'babel-loader',
        query: {presets: ['es2015', 'react', 'stage-2']}
      },
      {
        test: /\.jsx?$/,
        include: /whs/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: [
            'add-module-exports',
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss!resolve-url!sass-loader?sourceMap')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: alias
  },
  sassLoader: {
    includePaths: ['./**/*.sass']
  },
  postcss: [
    autoPrefixer({
      browsers: ['last 3 version', '> 1%', 'ie 9', 'Opera 12.1']
    })
  ],
  plugins: [
    new ExtractTextPlugin("style.css",  {allChunks: true})
  ],
  devServer: {
    contentBase: './public/',
    publicPath: '/built/'
  }
};
