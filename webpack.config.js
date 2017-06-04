const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: ['./src/server/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
