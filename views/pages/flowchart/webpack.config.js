const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, './src'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/index.jsx')
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
        "presets": ["react", "es2015", "stage-0"]
        }
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
