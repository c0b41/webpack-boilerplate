const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const SRC_DIR = path.resolve(__dirname, 'app');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');


const defaultInclude = [ SRC_DIR ];

module.exports = {
  entry: SRC_DIR + '/assets/js/main.js',
  output: {
    path: OUTPUT_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      	{ 
	      	test: /\.css$/, 
	      	use: [
            'style-loader',
            'css-loader'
          ], 
	      	include: defaultInclude 
      	},
      	{
			test: /\.js?$/, use: [
       		{ loader: 'babel-loader' }
      		], include: defaultInclude 
      	}
      	]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin(),
  ],
  devtool: "cheap-source-map",
  devServer: {
    contentBase: OUTPUT_DIR,
    port: 3030,
    stats: {
      colors: true,
      chunks: false,
      children: false
    }
  }
};