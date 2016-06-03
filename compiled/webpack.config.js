'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  context: _path2.default.resolve(__dirname, 'client'),
  entry: ['./index.js'],
  output: {
    path: _path2.default.resolve(__dirname, 'client'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      }
    }]
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2suY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNmLFdBQVMsZUFBSyxPQUFMLENBQWEsU0FBYixFQUF3QixRQUF4QixDQURNO0FBRWYsU0FBTyxDQUNMLFlBREssQ0FGUTtBQUtmLFVBQVE7QUFDTixVQUFNLGVBQUssT0FBTCxDQUFhLFNBQWIsRUFBd0IsUUFBeEIsQ0FEQTtBQUVOLGNBQVU7QUFGSixHQUxPO0FBU2YsVUFBUTtBQUNOLGFBQVMsQ0FBQztBQUNSLFlBQU0sU0FERTtBQUVSLGVBQVMsaUNBRkQ7QUFHUixjQUFRLGNBSEE7QUFJUixhQUFPO0FBQ0wsaUJBQVMsQ0FBQyxPQUFELEVBQVUsUUFBVjtBQURKLE9BSkM7QUFPUixlQUFTO0FBQ1Asb0JBQVksQ0FBQyxFQUFELEVBQUssS0FBTCxFQUFZLE1BQVo7QUFETDtBQVBELEtBQUQ7QUFESDtBQVRPLENBQWpCIiwiZmlsZSI6IndlYnBhY2suY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb250ZXh0OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnY2xpZW50JyksXG4gIGVudHJ5OiBbXG4gICAgJy4vaW5kZXguanMnLFxuICBdLFxuICBvdXRwdXQ6IHtcbiAgICBwYXRoOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnY2xpZW50JyksXG4gICAgZmlsZW5hbWU6ICdidW5kbGUuanMnLFxuICB9LFxuICBtb2R1bGU6IHtcbiAgICBsb2FkZXJzOiBbe1xuICAgICAgdGVzdDogL1xcLmpzeD8kLyxcbiAgICAgIGV4Y2x1ZGU6IC8obm9kZV9tb2R1bGVzfGJvd2VyX2NvbXBvbmVudHMpLyxcbiAgICAgIGxvYWRlcjogJ2JhYmVsLWxvYWRlcicsXG4gICAgICBxdWVyeToge1xuICAgICAgICBwcmVzZXRzOiBbJ3JlYWN0JywgJ2VzMjAxNSddLFxuICAgICAgfSxcbiAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgZXh0ZW5zaW9uczogWycnLCAnLmpzJywgJy5qc3gnXSxcbiAgICAgIH0sXG4gICAgfV0sXG4gIH0sXG59O1xuIl19