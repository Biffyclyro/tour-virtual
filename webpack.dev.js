const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: './src/main.ts',
	mode: 'development',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node-modules/
			}
		]
	},
	resolve: {
		alias: {
			three: path.resolve('./node_modules/three')
		},
		extensions: ['.ts', '.js']
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html'
		}),
		new CopyPlugin({
			patterns: [
				{
					from: './assets',
					to: './assets',
					force: true
				},
				{
					from: './style.css',
					to: './style.css',
					force: true
				}
			]
		}),
		new ESLintPlugin()
	]
}