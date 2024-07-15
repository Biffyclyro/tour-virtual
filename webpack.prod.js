const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
	entry: './src/main.ts',
	mode: 'production',
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
		extensions: ['.ts', '.js']
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'docs')
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
				}
			]
		}),
		new ESLintPlugin()
	]
}