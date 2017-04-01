var path = require('path');

module.exports = {
	entry: './javascripts/main.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
	}
};