import { resolve, join } from 'path';
import webpack from 'webpack';

const PATHS = {
	app: join(__dirname, 'public')
};

module.exports = {
	entry: PATHS.app + '/client.js',
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist')
	},
	watch: true,
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015', 'stage-1']
			}
		}]
	}

};