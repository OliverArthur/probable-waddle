const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src/app.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[name].js',
    publicPath: devMode === 'prodoction'
      ? 'http://localhost:3000'
      : 'https://naughty-poitras-68bdf9.netlify.com'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: devMode !== 'production' ? false : true,
    port: 3000,
    open: false,
    proxy: {
      context: () => true,
      target: 'https://api.punkapi.com/v2/'
    }
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'Components': path.resolve(__dirname, './src/components'),
      'Config': path.resolve(__dirname, './src/config'),
      'Helpers': path.resolve(__dirname, './src/helpers'),
      'Services': path.resolve(__dirname, './src/services'),
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.(css|scss)/,
      exclude: '/node_modules/',
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    }],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: devMode !== 'production' ? true : false,
        parallel: devMode !== 'production' ? true : false,
        sourceMap: devMode !== 'production' ? true : false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Accordion',
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
};
