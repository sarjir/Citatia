var path = require('path');
var nodeExternals = require('webpack-node-externals');
var baseConfig = require('../webpack.base');

module.exports = Object.assign({}, baseConfig, {
	context: path.resolve(__dirname, '..'),
	entry: {
		server: __dirname
	},
	target: 'node',
  externals: [nodeExternals()],
	resolve: Object.assign({}, baseConfig.resolve, {
		root: [__dirname]
	})
});
