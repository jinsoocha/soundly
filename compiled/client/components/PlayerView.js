'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _soundcloud = require('soundcloud');

var _soundcloud2 = _interopRequireDefault(_soundcloud);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_soundcloud2.default.initialize({
  client_id: window.SCId
});

var PlayerView = function (_React$Component) {
  _inherits(PlayerView, _React$Component);

  function PlayerView() {
    _classCallCheck(this, PlayerView);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerView).apply(this, arguments));
  }

  _createClass(PlayerView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.log("thisprops", this.props.currentSong, "nextprops", nextProps.currentSong, nextProps.queue);
      if (nextProps.currentSong) {
        if (this.props.currentSong) {
          if (this.props.currentSong.id !== nextProps.currentSong.id) {
            if (this.props.master) {
              this.streamTrack(nextProps.currentSong);
            }
          }
        } else {
          if (this.props.master) {
            this.streamTrack(nextProps.currentSong);
          }
        }
      }
    }
  }, {
    key: 'streamTrack',
    value: function streamTrack(track) {
      var _this2 = this;

      return _soundcloud2.default.stream('/tracks/' + track.id).then(function (player) {
        var currentPlayer = void 0;
        if (currentPlayer) {
          currentPlayer.pause();
        }
        currentPlayer = player;
        currentPlayer.play();
        currentPlayer.on('play-start', function () {
          console.log('playing');
        });
        currentPlayer.on('finish', function () {
          console.log('finished');
          _this2.props.changeSong(track);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var title = this.props.currentSong.title;

      var currentSong = title ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          { className: 'nowPlaying' },
          'Now playing'
        ),
        _react2.default.createElement(
          'span',
          { className: 'playingTitle' },
          title
        )
      ) : '';

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'playerBox' },
          _react2.default.createElement(
            'div',
            { className: 'songPlaying' },
            currentSong
          )
        ),
        _react2.default.createElement('div', { className: 'footer' })
      );
    }
  }]);

  return PlayerView;
}(_react2.default.Component);

exports.default = PlayerView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1BsYXllclZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxxQkFBRyxVQUFILENBQWM7QUFDWixhQUFXLE9BQU87QUFETixDQUFkOztJQUlxQixVOzs7Ozs7Ozs7Ozs4Q0FFTyxTLEVBQVc7QUFDbkMsY0FBUSxHQUFSLENBQVksV0FBWixFQUF3QixLQUFLLEtBQUwsQ0FBVyxXQUFuQyxFQUFnRCxXQUFoRCxFQUE0RCxVQUFVLFdBQXRFLEVBQW1GLFVBQVUsS0FBN0Y7QUFDQSxVQUFJLFVBQVUsV0FBZCxFQUEyQjtBQUN6QixZQUFJLEtBQUssS0FBTCxDQUFXLFdBQWYsRUFBNEI7QUFDMUIsY0FBSSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEVBQXZCLEtBQThCLFVBQVUsV0FBVixDQUFzQixFQUF4RCxFQUE0RDtBQUMxRCxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFmLEVBQXVCO0FBQ3JCLG1CQUFLLFdBQUwsQ0FBaUIsVUFBVSxXQUEzQjtBQUNEO0FBQ0Y7QUFDRixTQU5ELE1BTU87QUFDTCxjQUFJLEtBQUssS0FBTCxDQUFXLE1BQWYsRUFBdUI7QUFDckIsaUJBQUssV0FBTCxDQUFpQixVQUFVLFdBQTNCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7OztnQ0FFVyxLLEVBQU87QUFBQTs7QUFDakIsYUFBTyxxQkFBRyxNQUFILENBQVUsYUFBYSxNQUFNLEVBQTdCLEVBQ04sSUFETSxDQUNELGtCQUFVO0FBQ2QsWUFBSSxzQkFBSjtBQUNBLFlBQUksYUFBSixFQUFtQjtBQUNqQix3QkFBYyxLQUFkO0FBQ0Q7QUFDRCx3QkFBZ0IsTUFBaEI7QUFDQSxzQkFBYyxJQUFkO0FBQ0Esc0JBQWMsRUFBZCxDQUFpQixZQUFqQixFQUErQixZQUFNO0FBQ25DLGtCQUFRLEdBQVIsQ0FBWSxTQUFaO0FBQ0QsU0FGRDtBQUdBLHNCQUFjLEVBQWQsQ0FBaUIsUUFBakIsRUFBMkIsWUFBTTtBQUMvQixrQkFBUSxHQUFSLENBQVksVUFBWjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxVQUFYLENBQXNCLEtBQXRCO0FBQ0QsU0FIRDtBQUlELE9BZk0sRUFnQk4sS0FoQk0sQ0FnQkEsZUFBTztBQUNaLGdCQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0QsT0FsQk0sQ0FBUDtBQW1CRDs7OzZCQUVRO0FBQUEsVUFDQyxLQURELEdBQ1csS0FBSyxLQUFMLENBQVcsV0FEdEIsQ0FDQyxLQUREOztBQUVQLFVBQU0sY0FBYyxRQUFRO0FBQUE7UUFBQTtRQUFLO0FBQUE7VUFBQSxFQUFNLFdBQVUsWUFBaEI7VUFBQTtBQUFBLFNBQUw7UUFBb0Q7QUFBQTtVQUFBLEVBQU0sV0FBVSxjQUFoQjtVQUFnQztBQUFoQztBQUFwRCxPQUFSLEdBQWtILEVBQXRJOztBQUVBLGFBQ0U7QUFBQTtRQUFBO1FBQ0U7QUFBQTtVQUFBLEVBQUssV0FBVSxXQUFmO1VBQ0U7QUFBQTtZQUFBLEVBQUssV0FBVSxhQUFmO1lBQThCO0FBQTlCO0FBREYsU0FERjtRQUlFLHVDQUFLLFdBQVUsUUFBZjtBQUpGLE9BREY7QUFRRDs7OztFQXJEcUMsZ0JBQU0sUzs7a0JBQXpCLFUiLCJmaWxlIjoiUGxheWVyVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU0MgZnJvbSAnc291bmRjbG91ZCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy9jb25maWcnO1xuXG5TQy5pbml0aWFsaXplKHtcbiAgY2xpZW50X2lkOiB3aW5kb3cuU0NJZCxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnNvbGUubG9nKFwidGhpc3Byb3BzXCIsdGhpcy5wcm9wcy5jdXJyZW50U29uZywgXCJuZXh0cHJvcHNcIixuZXh0UHJvcHMuY3VycmVudFNvbmcsIG5leHRQcm9wcy5xdWV1ZSk7XG4gICAgaWYgKG5leHRQcm9wcy5jdXJyZW50U29uZykge1xuICAgICAgaWYgKHRoaXMucHJvcHMuY3VycmVudFNvbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY3VycmVudFNvbmcuaWQgIT09IG5leHRQcm9wcy5jdXJyZW50U29uZy5pZCkge1xuICAgICAgICAgIGlmICh0aGlzLnByb3BzLm1hc3Rlcikge1xuICAgICAgICAgICAgdGhpcy5zdHJlYW1UcmFjayhuZXh0UHJvcHMuY3VycmVudFNvbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubWFzdGVyKSB7XG4gICAgICAgICAgdGhpcy5zdHJlYW1UcmFjayhuZXh0UHJvcHMuY3VycmVudFNvbmcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RyZWFtVHJhY2sodHJhY2spIHtcbiAgICByZXR1cm4gU0Muc3RyZWFtKCcvdHJhY2tzLycgKyB0cmFjay5pZClcbiAgICAudGhlbihwbGF5ZXIgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQbGF5ZXI7XG4gICAgICBpZiAoY3VycmVudFBsYXllcikge1xuICAgICAgICBjdXJyZW50UGxheWVyLnBhdXNlKCk7XG4gICAgICB9XG4gICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyO1xuICAgICAgY3VycmVudFBsYXllci5wbGF5KCk7XG4gICAgICBjdXJyZW50UGxheWVyLm9uKCdwbGF5LXN0YXJ0JywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncGxheWluZycpO1xuICAgICAgfSk7XG4gICAgICBjdXJyZW50UGxheWVyLm9uKCdmaW5pc2gnLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmaW5pc2hlZCcpO1xuICAgICAgICB0aGlzLnByb3BzLmNoYW5nZVNvbmcodHJhY2spO1xuICAgICAgfSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB0aXRsZSB9ID0gdGhpcy5wcm9wcy5jdXJyZW50U29uZztcbiAgICBjb25zdCBjdXJyZW50U29uZyA9IHRpdGxlID8gPGRpdj48c3BhbiBjbGFzc05hbWU9XCJub3dQbGF5aW5nXCI+Tm93IHBsYXlpbmc8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwicGxheWluZ1RpdGxlXCI+e3RpdGxlfTwvc3Bhbj48L2Rpdj4gOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsYXllckJveFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic29uZ1BsYXlpbmdcIj57Y3VycmVudFNvbmd9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvb3RlclwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSJdfQ==