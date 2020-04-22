const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.tsx'),
    BooksPage: path.resolve(__dirname, 'src/books/Books.tsx'),
    OrdersPage: path.resolve(__dirname, 'src/orders/Orders.tsx'),
    UsersPage: path.resolve(__dirname, 'src/users/Users.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      include: path.resolve(__dirname, 'src'),
      use: ['babel-loader']
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['src', 'node_modules']
  },
  devServer: {
    contentBase:  path.resolve(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', //source html
      filename: './index.html',
      favicon: 'public/favicon.ico'
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  }
};
