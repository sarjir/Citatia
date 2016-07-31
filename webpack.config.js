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
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
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
      }
    ]
  }};
