import path from 'path';

import webpack from 'webpack';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import 'webpack-dev-server';

const prod = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? false : 'source-map', // source-map bloats bundle size

  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // nested routes in react-router
    filename: '[name].js?id=[chunkhash]', // fast deployment
    clean: true,
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
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    // dotenv + Webpack.DefinePlugin = dotenv-webpack
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
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
    historyApiFallback: true, // react-router
    open: true,
  },
};

export default config;
