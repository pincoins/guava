const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? undefined : 'source-map',

  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/',
    publicPath: '/', // react-router 중첩라우팅 설정
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(ts|tsx)$/i,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: process.env.SITE_TITLE,
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
    open: true,
  },
};
