const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
    })
  ]
};
