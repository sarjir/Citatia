var path = require('path');
var baseConfig = require('./webpack.base');

module.exports = Object.assign({}, baseConfig, {
	entry: {
		bundle: path.resolve(__dirname, 'src/app.jsx')
	},
	resolve: Object.assign({}, baseConfig.resolve, {
		root: [path.resolve(__dirname, 'src')]
	})
});
