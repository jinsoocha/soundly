import path from 'path';

module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
    }],
  },
  watch: true,
};
