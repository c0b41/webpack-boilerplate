const webpack = require('webpack');
const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
	      	use: ExtractTextPlugin.extract({
	          	use: "css-loader"
	        }), 
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
    new ExtractTextPlugin("styles.css"),
    new DashboardPlugin()
  ],
  devtool: "cheap-source-map",
};