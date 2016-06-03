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
  },
  watch: true
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2suY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBLE9BQU8sT0FBUCxHQUFpQjtBQUNmLFdBQVMsZUFBSyxPQUFMLENBQWEsU0FBYixFQUF3QixRQUF4QixDQURNO0FBRWYsU0FBTyxDQUNMLFlBREssQ0FGUTtBQUtmLFVBQVE7QUFDTixVQUFNLGVBQUssT0FBTCxDQUFhLFNBQWIsRUFBd0IsUUFBeEIsQ0FEQTtBQUVOLGNBQVU7QUFGSixHQUxPO0FBU2YsVUFBUTtBQUNOLGFBQVMsQ0FBQztBQUNSLFlBQU0sU0FERTtBQUVSLGVBQVMsaUNBRkQ7QUFHUixjQUFRLGNBSEE7QUFJUixhQUFPO0FBQ0wsaUJBQVMsQ0FBQyxPQUFELEVBQVUsUUFBVjtBQURKLE9BSkM7QUFPUixlQUFTO0FBQ1Asb0JBQVksQ0FBQyxFQUFELEVBQUssS0FBTCxFQUFZLE1BQVo7QUFETDtBQVBELEtBQUQ7QUFESCxHQVRPO0FBc0JmLFNBQU87QUF0QlEsQ0FBakIiLCJmaWxlIjoid2VicGFjay5jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbnRleHQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdjbGllbnQnKSxcbiAgZW50cnk6IFtcbiAgICAnLi9pbmRleC5qcycsXG4gIF0sXG4gIG91dHB1dDoge1xuICAgIHBhdGg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdjbGllbnQnKSxcbiAgICBmaWxlbmFtZTogJ2J1bmRsZS5qcycsXG4gIH0sXG4gIG1vZHVsZToge1xuICAgIGxvYWRlcnM6IFt7XG4gICAgICB0ZXN0OiAvXFwuanN4PyQvLFxuICAgICAgZXhjbHVkZTogLyhub2RlX21vZHVsZXN8Ym93ZXJfY29tcG9uZW50cykvLFxuICAgICAgbG9hZGVyOiAnYmFiZWwtbG9hZGVyJyxcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIHByZXNldHM6IFsncmVhY3QnLCAnZXMyMDE1J10sXG4gICAgICB9LFxuICAgICAgcmVzb2x2ZToge1xuICAgICAgICBleHRlbnNpb25zOiBbJycsICcuanMnLCAnLmpzeCddLFxuICAgICAgfSxcbiAgICB9XSxcbiAgfSxcbiAgd2F0Y2g6IHRydWUsXG59O1xuIl19