module.exports = {
  output: {
    path: __dirname + "/build/js/",
    filename: "[name].js"
  },
  resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".less", ".json"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'
      },
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader'
			}
    ]
  }
};
