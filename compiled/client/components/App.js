'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchView = require('./SearchView');

var _SearchView2 = _interopRequireDefault(_SearchView);

var _ResultView = require('./ResultView');

var _ResultView2 = _interopRequireDefault(_ResultView);

var _QueueView = require('./QueueView');

var _QueueView2 = _interopRequireDefault(_QueueView);

var _PlayerView = require('./PlayerView');

var _PlayerView2 = _interopRequireDefault(_PlayerView);

var _reactRouter = require('react-router');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var socket = io.connect('http://localhost:4568');

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this.handleUpVote = _this.handleUpVote.bind(_this);
    _this.handleDownVote = _this.handleDownVote.bind(_this);
    _this.onClickSong = _this.onClickSong.bind(_this);
    _this.handleChangeSong = _this.handleChangeSong.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.state = {
      socket: socket,
      master: false,
      searchResult: [],
      queue: [],
      currentSong: '',
      keyword: ''
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var room = window.location.pathname.split('/')[2];
      console.log('initialmount');
      var context = this;
      console.log("room", room);
      socket.on('connect', function () {
        console.log("HELLO");
      });

      socket.emit('room', room);

      socket.on('master', function (data) {
        console.log('i am a master', data);
        context.setState({
          master: data
        });
      });

      socket.on('queue', function (data) {
        console.log("client getting queue", data);
        if (data[0].length === 0) {
          _this2.setState({
            queue: data[0],
            currentSong: ''
          });
        } else {
          if (data[1]) {
            _this2.setState({
              queue: data[0],
              currentSong: data[1]
            });
          } else {
            _this2.setState({
              queue: data[0]
            });
          }
        }
      });
    }
  }, {
    key: 'onClickSong',
    value: function onClickSong(song) {
      // set up the state as the song that has been passed from searchResultView
      var data = {};
      data.roomid = window.location.pathname.split('/')[2];
      data.song = song;
      console.log('clicked', data);
      _jquery2.default.ajax({
        url: '/api/queue/addSong',
        contentType: 'application/x-www-form-urlencoded',
        type: 'POST',
        data: data,
        success: function (result) {
          if (result.length === 1) {
            socket.emit('update', [data.roomid, result[0]]);
            this.setState({
              currentSong: result[0],
              queue: result
            });
          } else {
            socket.emit('update', [data.roomid]);
            this.setState({
              queue: result
            });
          }
          // displaying a "song is added" message
          (0, _jquery2.default)('.songAdded').fadeToggle(500).fadeToggle(500);
        }.bind(this),
        error: function (xhr, status, err) {
          // displaying a "song is not added" message;
          (0, _jquery2.default)('.notAdded').fadeToggle(500).fadeToggle(500);
        }.bind(this)
      });
    }
  }, {
    key: 'requestBuildQueryString',
    value: function requestBuildQueryString(params) {
      var queryString = [];
      for (var property in params) {
        if (params.hasOwnProperty(property)) {
          queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
        }
      }
      return queryString.join('&');
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(keyword) {
      this.setState({ keyword: keyword });
      var obj = { keyword: keyword };
      _jquery2.default.ajax({
        url: 'http://localhost:4568/server',
        contentType: 'application/x-www-form-urlencoded',
        type: 'POST',
        data: this.requestBuildQueryString(obj),
        success: function (result) {
          this.setState({
            searchResult: result.data
          });
          // displaying a "song is added" message
          (0, _jquery2.default)('.songAdded').fadeToggle(500).fadeToggle(500);
        }.bind(this),
        error: function (xhr, status, err) {
          // displaying a "song is not added" message;
          (0, _jquery2.default)('.notAdded').fadeToggle(500).fadeToggle(500);
          console.error(status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: 'handleChangeSong',
    value: function handleChangeSong(song) {
      var data = {};
      data.roomid = window.location.pathname.split('/')[2];
      data.song = song;
      _jquery2.default.ajax({
        url: 'api/queue/songFinished',
        contentType: 'application/x-www-form-urlencoded',
        type: 'POST',
        data: data,
        success: function (result) {
          socket.emit('update', [data.roomid, result[0]]);
          if (result.length === 0) {
            this.setState({
              queue: result,
              currentSong: ''
            });
          } else {
            this.setState({
              queue: result,
              currentSong: result[0]
            });
          }
        }.bind(this),
        error: function (xhr, status, err) {}.bind(this)
      });
    }
  }, {
    key: 'handleUpVote',
    value: function handleUpVote(song, i) {
      _jquery2.default.ajax({
        type: 'POST',
        url: '/api/queue/increaseRank',
        data: { index: i, roomid: window.location.pathname.split('/')[2] },
        success: function (result) {
          socket.emit('update', [window.location.pathname.split('/')[2]]);
          var tempQueue = result;
          this.setState({
            queue: tempQueue
          });
          // upvote click animation
          (0, _jquery2.default)('.upvoteMsg').fadeToggle(500).fadeToggle(500);
        }.bind(this),
        error: function error(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    }
  }, {
    key: 'handleDownVote',
    value: function handleDownVote(song, i) {
      _jquery2.default.ajax({
        type: 'POST',
        url: '/api/queue/decreaseRank',
        data: { index: i, roomid: window.location.pathname.split('/')[2] },
        success: function (result) {
          socket.emit('update', [window.location.pathname.split('/')[2]]);
          var tempQueue = result;
          this.setState({
            queue: tempQueue
          });
          // downvote click animation
          (0, _jquery2.default)('.downvoteMsg').fadeToggle(500).fadeToggle(500);
        }.bind(this),
        error: function error(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_SearchView2.default, {
            handleSubmit: this.handleSubmit
          }),
          _react2.default.createElement(_ResultView2.default, {
            tracks: this.state.searchResult,
            clickSong: this.onClickSong,
            keyword: this.state.keyword
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_QueueView2.default, {
            queue: this.state.queue,
            upVote: this.handleUpVote,
            downVote: this.handleDownVote
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_PlayerView2.default, {
            currentSong: this.state.currentSong,
            master: this.state.master,
            changeSong: this.handleChangeSong,
            queue: this.state.queue
          })
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sU0FBUyxHQUFHLE9BQUgsQ0FBVyx1QkFBWCxDQUFmOztJQUVxQixHOzs7QUFDbkIsZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFFakIsVUFBSyxZQUFMLEdBQW9CLE1BQUssWUFBTCxDQUFrQixJQUFsQixPQUFwQjtBQUNBLFVBQUssY0FBTCxHQUFzQixNQUFLLGNBQUwsQ0FBb0IsSUFBcEIsT0FBdEI7QUFDQSxVQUFLLFdBQUwsR0FBbUIsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBQ0EsVUFBSyxZQUFMLEdBQW9CLE1BQUssWUFBTCxDQUFrQixJQUFsQixPQUFwQjtBQUNBLFVBQUssS0FBTCxHQUFhO0FBQ1gsY0FBUSxNQURHO0FBRVgsY0FBUSxLQUZHO0FBR1gsb0JBQWMsRUFISDtBQUlYLGFBQU8sRUFKSTtBQUtYLG1CQUFhLEVBTEY7QUFNWCxlQUFTO0FBTkUsS0FBYjtBQVBpQjtBQWVsQjs7Ozt5Q0FFb0I7QUFBQTs7QUFDbkIsVUFBTSxPQUFPLE9BQU8sUUFBUCxDQUFnQixRQUFoQixDQUF5QixLQUF6QixDQUErQixHQUEvQixFQUFvQyxDQUFwQyxDQUFiO0FBQ0EsY0FBUSxHQUFSLENBQVksY0FBWjtBQUNBLFVBQU0sVUFBVSxJQUFoQjtBQUNBLGNBQVEsR0FBUixDQUFZLE1BQVosRUFBbUIsSUFBbkI7QUFDQSxhQUFPLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQU07QUFDekIsZ0JBQVEsR0FBUixDQUFZLE9BQVo7QUFDRCxPQUZEOztBQUlBLGFBQU8sSUFBUCxDQUFZ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O0FBSnBCO0FBREY7QUFsQkYsT0FERjtBQTZCRDs7OztFQS9OOEIsZ0JBQU0sUzs7a0JBQWxCLEciLCJmaWxlIjoiQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWFyY2hWaWV3IGZyb20gJy4vU2VhcmNoVmlldyc7XG5pbXBvcnQgUmVzdWx0VmlldyBmcm9tICcuL1Jlc3VsdFZpZXcnO1xuaW1wb3J0IFF1ZXVlVmlldyBmcm9tICcuL1F1ZXVlVmlldyc7XG5pbXBvcnQgUGxheWVyVmlldyBmcm9tICcuL1BsYXllclZpZXcnO1xuaW1wb3J0IHsgYnJvd3Nlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuY29uc3Qgc29ja2V0ID0gaW8uY29ubmVjdCgnaHR0cDovL2xvY2FsaG9zdDo0NTY4Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaGFuZGxlVXBWb3RlID0gdGhpcy5oYW5kbGVVcFZvdGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZURvd25Wb3RlID0gdGhpcy5oYW5kbGVEb3duVm90ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25DbGlja1NvbmcgPSB0aGlzLm9uQ2xpY2tTb25nLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDaGFuZ2VTb25nID0gdGhpcy5oYW5kbGVDaGFuZ2VTb25nLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzb2NrZXQ6IHNvY2tldCxcbiAgICAgIG1hc3RlcjogZmFsc2UsXG4gICAgICBzZWFyY2hSZXN1bHQ6IFtdLFxuICAgICAgcXVldWU6IFtdLFxuICAgICAgY3VycmVudFNvbmc6ICcnLFxuICAgICAga2V5d29yZDogJycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICBjb25zdCByb29tID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylbMl07XG4gICAgY29uc29sZS5sb2coJ2luaXRpYWxtb3VudCcpO1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgIGNvbnNvbGUubG9nKFwicm9vbVwiLHJvb20pXG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJIRUxMT1wiKVxuICAgIH0pO1xuXG4gICAgc29ja2V0LmVtaXQoJ3Jvb20nLCByb29tKTtcblxuICAgIHNvY2tldC5vbignbWFzdGVyJywgKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdpIGFtIGEgbWFzdGVyJywgZGF0YSk7XG4gICAgICBjb250ZXh0LnNldFN0YXRlKHtcbiAgICAgICAgbWFzdGVyOiBkYXRhLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub24oJ3F1ZXVlJywgKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2xpZW50IGdldHRpbmcgcXVldWVcIiwgZGF0YSlcbiAgICAgIGlmIChkYXRhWzBdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBxdWV1ZTogZGF0YVswXSxcbiAgICAgICAgICBjdXJyZW50U29uZzogJycsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRhdGFbMV0pIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXVlOiBkYXRhWzBdLFxuICAgICAgICAgICAgY3VycmVudFNvbmc6IGRhdGFbMV0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBxdWV1ZTogZGF0YVswXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25DbGlja1Nvbmcoc29uZykge1xuICAgIC8vIHNldCB1cCB0aGUgc3RhdGUgYXMgdGhlIHNvbmcgdGhhdCBoYXMgYmVlbiBwYXNzZWQgZnJvbSBzZWFyY2hSZXN1bHRWaWV3XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGRhdGEucm9vbWlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylbMl07XG4gICAgZGF0YS5zb25nID0gc29uZztcbiAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcsZGF0YSk7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvcXVldWUvYWRkU29uZycsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHNvY2tldC5lbWl0KCd1cGRhdGUnLCBbZGF0YS5yb29taWQsIHJlc3VsdFswXV0pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudFNvbmc6IHJlc3VsdFswXSxcbiAgICAgICAgICAgIHF1ZXVlOiByZXN1bHQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc29ja2V0LmVtaXQoJ3VwZGF0ZScsIFtkYXRhLnJvb21pZF0pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IHJlc3VsdCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkaXNwbGF5aW5nIGEgXCJzb25nIGlzIGFkZGVkXCIgbWVzc2FnZVxuICAgICAgICAkKCcuc29uZ0FkZGVkJykuZmFkZVRvZ2dsZSg1MDApLmZhZGVUb2dnbGUoNTAwKTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAvLyBkaXNwbGF5aW5nIGEgXCJzb25nIGlzIG5vdCBhZGRlZFwiIG1lc3NhZ2U7XG4gICAgICAgICQoJy5ub3RBZGRlZCcpLmZhZGVUb2dnbGUoNTAwKS5mYWRlVG9nZ2xlKDUwMCk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSk7XG4gIH1cblxuICByZXF1ZXN0QnVpbGRRdWVyeVN0cmluZyhwYXJhbXMpIHtcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IFtdO1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gcGFyYW1zKSB7XG4gICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICBxdWVyeVN0cmluZy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwcm9wZXJ0eSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW3Byb3BlcnR5XSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlcnlTdHJpbmcuam9pbignJicpO1xuICB9XG5cbiAgaGFuZGxlU3VibWl0KGtleXdvcmQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsga2V5d29yZCB9KTtcbiAgICBjb25zdCBvYmogPSB7IGtleXdvcmQgfTtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo0NTY4L3NlcnZlcicsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBkYXRhOiB0aGlzLnJlcXVlc3RCdWlsZFF1ZXJ5U3RyaW5nKG9iaiksXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHNlYXJjaFJlc3VsdDogcmVzdWx0LmRhdGEsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBkaXNwbGF5aW5nIGEgXCJzb25nIGlzIGFkZGVkXCIgbWVzc2FnZVxuICAgICAgICAkKCcuc29uZ0FkZGVkJykuZmFkZVRvZ2dsZSg1MDApLmZhZGVUb2dnbGUoNTAwKTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICAvLyBkaXNwbGF5aW5nIGEgXCJzb25nIGlzIG5vdCBhZGRlZFwiIG1lc3NhZ2U7XG4gICAgICAgICQoJy5ub3RBZGRlZCcpLmZhZGVUb2dnbGUoNTAwKS5mYWRlVG9nZ2xlKDUwMCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTb25nKHNvbmcpIHtcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgZGF0YS5yb29taWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsyXTtcbiAgICBkYXRhLnNvbmcgPSBzb25nO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICdhcGkvcXVldWUvc29uZ0ZpbmlzaGVkJyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoJ3VwZGF0ZScsIFtkYXRhLnJvb21pZCwgcmVzdWx0WzBdXSk7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBxdWV1ZTogcmVzdWx0LFxuICAgICAgICAgICAgY3VycmVudFNvbmc6ICcnLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IHJlc3VsdCxcbiAgICAgICAgICAgIGN1cnJlbnRTb25nOiByZXN1bHRbMF0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlVXBWb3RlKHNvbmcsIGkpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2FwaS9xdWV1ZS9pbmNyZWFzZVJhbmsnLFxuICAgICAgZGF0YTogeyBpbmRleDogaSwgcm9vbWlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsyXSB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBzb2NrZXQuZW1pdCgndXBkYXRlJywgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzJdXSk7XG4gICAgICAgIGNvbnN0IHRlbXBRdWV1ZSA9IHJlc3VsdDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgcXVldWU6IHRlbXBRdWV1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHVwdm90ZSBjbGljayBhbmltYXRpb25cbiAgICAgICAgJCgnLnVwdm90ZU1zZycpLmZhZGVUb2dnbGUoNTAwKS5mYWRlVG9nZ2xlKDUwMCk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVEb3duVm90ZShzb25nLCBpKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIHVybDogJy9hcGkvcXVldWUvZGVjcmVhc2VSYW5rJyxcbiAgICAgIGRhdGE6IHsgaW5kZXg6IGksIHJvb21pZDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylbMl0gfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoJ3VwZGF0ZScsIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsyXV0pO1xuICAgICAgICBjb25zdCB0ZW1wUXVldWUgPSByZXN1bHQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHF1ZXVlOiB0ZW1wUXVldWUsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBkb3dudm90ZSBjbGljayBhbmltYXRpb25cbiAgICAgICAgJCgnLmRvd252b3RlTXNnJykuZmFkZVRvZ2dsZSg1MDApLmZhZGVUb2dnbGUoNTAwKTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U2VhcmNoVmlld1xuICAgICAgICAgICAgaGFuZGxlU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxSZXN1bHRWaWV3XG4gICAgICAgICAgICB0cmFja3M9e3RoaXMuc3RhdGUuc2VhcmNoUmVzdWx0fVxuICAgICAgICAgICAgY2xpY2tTb25nPXt0aGlzLm9uQ2xpY2tTb25nfVxuICAgICAgICAgICAga2V5d29yZD17dGhpcy5zdGF0ZS5rZXl3b3JkfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxRdWV1ZVZpZXdcbiAgICAgICAgICAgIHF1ZXVlPXt0aGlzLnN0YXRlLnF1ZXVlfVxuICAgICAgICAgICAgdXBWb3RlPXt0aGlzLmhhbmRsZVVwVm90ZX1cbiAgICAgICAgICAgIGRvd25Wb3RlPXt0aGlzLmhhbmRsZURvd25Wb3RlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxQbGF5ZXJWaWV3XG4gICAgICAgICAgICBjdXJyZW50U29uZz17dGhpcy5zdGF0ZS5jdXJyZW50U29uZ31cbiAgICAgICAgICAgIG1hc3Rlcj17dGhpcy5zdGF0ZS5tYXN0ZXJ9XG4gICAgICAgICAgICBjaGFuZ2VTb25nPXt0aGlzLmhhbmRsZUNoYW5nZVNvbmd9XG4gICAgICAgICAgICBxdWV1ZT17dGhpcy5zdGF0ZS5xdWV1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0iXX0=