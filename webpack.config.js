var path = require('path');

module.exports = {
  context: __dirname + "/src",
  entry: "./app.jsx",
  output: {
    path: __dirname + "/build/js/",
    filename: "bundle.js"
  },
  resolve: {
    root: [
      path.resolve('./src')
    ],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".less"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'
      }
    ]
  }};
