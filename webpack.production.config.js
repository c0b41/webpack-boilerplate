const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'app');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');


const defaultInclude = [ SRC_DIR ];

module.exports = {
  entry: SRC_DIR + '/assets/js/main.js',
  output: {
    path: OUTPUT_DIR,
    publicPath: '/',
    filename: '[hash].js'
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
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new BabiliPlugin(),
    new ExtractTextPlugin('[hash].css'),
    new CleanWebpackPlugin([OUTPUT_DIR])
  ],
  stats: false,
};