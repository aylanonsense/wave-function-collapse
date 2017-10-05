var path = require('path');

module.exports = {
	entry: './app/main.js',
	output: {
		filename: 'bundle.js',
		publicPath: '/games/wave-function-collapse/proxy/',
		path: path.join(__dirname, 'dist')
	},
	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: 'mustache-loader'
				// loader: 'mustache?minify'
				// loader: 'mustache?{ minify: { removeComments: false } }'
				// loader: 'mustache?noShortcut'
			}
		]
	},
	resolve: {
		alias: {
			GIF: "./lib/gifjs/gif.js"
		}
	}
};