var ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');

module.exports = {
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
        exclude: /node_modules/,
        plugins: ['transform-runtime'],
        loader: 'babel-loader',
        query: {presets: ['es2015', 'react', 'stage-2']}
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
    extensions: ['', '.js', '.jsx']
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
    new webpack.NormalModuleReplacementPlugin(/inline\-worker/, 'webworkify-webpack'),
    new ExtractTextPlugin("style.css",  {allChunks: true}),
  ]
};