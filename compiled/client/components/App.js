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

var socket = io.connect();

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
        url: '/server',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sU0FBUyxHQUFHLE9BQUgsRUFBZjs7SUFFcUIsRzs7O0FBQ25CLGVBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLHVGQUNYLEtBRFc7O0FBRWpCLFVBQUssWUFBTCxHQUFvQixNQUFLLFlBQUwsQ0FBa0IsSUFBbEIsT0FBcEI7QUFDQSxVQUFLLGNBQUwsR0FBc0IsTUFBSyxjQUFMLENBQW9CLElBQXBCLE9BQXRCO0FBQ0EsVUFBSyxXQUFMLEdBQW1CLE1BQUssV0FBTCxDQUFpQixJQUFqQixPQUFuQjtBQUNBLFVBQUssZ0JBQUwsR0FBd0IsTUFBSyxnQkFBTCxDQUFzQixJQUF0QixPQUF4QjtBQUNBLFVBQUssWUFBTCxHQUFvQixNQUFLLFlBQUwsQ0FBa0IsSUFBbEIsT0FBcEI7QUFDQSxVQUFLLEtBQUwsR0FBYTtBQUNYLGNBQVEsTUFERztBQUVYLGNBQVEsS0FGRztBQUdYLG9CQUFjLEVBSEg7QUFJWCxhQUFPLEVBSkk7QUFLWCxtQkFBYSxFQUxGO0FBTVgsZUFBUztBQU5FLEtBQWI7QUFQaUI7QUFlbEI7Ozs7eUNBRW9CO0FBQUE7O0FBQ25CLFVBQU0sT0FBTyxPQUFPLFFBQVAsQ0FBZ0IsUUFBaEIsQ0FBeUIsS0FBekIsQ0FBK0IsR0FBL0IsRUFBb0MsQ0FBcEMsQ0FBYjtBQUNBLGNBQVEsR0FBUixDQUFZLGNBQVo7QUFDQSxVQUFNLFVBQVUsSUFBaEI7QUFDQSxjQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW1CLElBQW5CO0FBQ0EsYUFBTyxFQUFQLENBQVUsU0FBVixFQUFxQixZQUFNO0FBQ3pCLGdCQUFRLEdBQVIsQ0FBWSxPQUFaO0FBQ0QsT0FGRDs7QUFJQSxhQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW9C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TyxLQUFLLEtBQUwsQ0FBVztBQUpwQjtBQURGO0FBbEJGLE9BREY7QUE2QkQ7Ozs7RUEvTjhCLGdCQUFNLFM7O2tCQUFsQixHIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VhcmNoVmlldyBmcm9tICcuL1NlYXJjaFZpZXcnO1xuaW1wb3J0IFJlc3VsdFZpZXcgZnJvbSAnLi9SZXN1bHRWaWV3JztcbmltcG9ydCBRdWV1ZVZpZXcgZnJvbSAnLi9RdWV1ZVZpZXcnO1xuaW1wb3J0IFBsYXllclZpZXcgZnJvbSAnLi9QbGF5ZXJWaWV3JztcbmltcG9ydCB7IGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmNvbnN0IHNvY2tldCA9IGlvLmNvbm5lY3QoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5oYW5kbGVVcFZvdGUgPSB0aGlzLmhhbmRsZVVwVm90ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlRG93blZvdGUgPSB0aGlzLmhhbmRsZURvd25Wb3RlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkNsaWNrU29uZyA9IHRoaXMub25DbGlja1NvbmcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZVNvbmcgPSB0aGlzLmhhbmRsZUNoYW5nZVNvbmcuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNvY2tldDogc29ja2V0LFxuICAgICAgbWFzdGVyOiBmYWxzZSxcbiAgICAgIHNlYXJjaFJlc3VsdDogW10sXG4gICAgICBxdWV1ZTogW10sXG4gICAgICBjdXJyZW50U29uZzogJycsXG4gICAgICBrZXl3b3JkOiAnJyxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHJvb20gPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsyXTtcbiAgICBjb25zb2xlLmxvZygnaW5pdGlhbG1vdW50Jyk7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXM7XG4gICAgY29uc29sZS5sb2coXCJyb29tXCIscm9vbSlcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkhFTExPXCIpXG4gICAgfSk7XG5cbiAgICBzb2NrZXQuZW1pdCgncm9vbScsIHJvb20pO1xuXG4gICAgc29ja2V0Lm9uKCdtYXN0ZXInLCAoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2kgYW0gYSBtYXN0ZXInLCBkYXRhKTtcbiAgICAgIGNvbnRleHQuc2V0U3RhdGUoe1xuICAgICAgICBtYXN0ZXI6IGRhdGEsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5vbigncXVldWUnLCAoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJjbGllbnQgZ2V0dGluZyBxdWV1ZVwiLCBkYXRhKVxuICAgICAgaWYgKGRhdGFbMF0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHF1ZXVlOiBkYXRhWzBdLFxuICAgICAgICAgIGN1cnJlbnRTb25nOiAnJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGF0YVsxXSkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IGRhdGFbMF0sXG4gICAgICAgICAgICBjdXJyZW50U29uZzogZGF0YVsxXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXVlOiBkYXRhWzBdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbkNsaWNrU29uZyhzb25nKSB7XG4gICAgLy8gc2V0IHVwIHRoZSBzdGF0ZSBhcyB0aGUgc29uZyB0aGF0IGhhcyBiZWVuIHBhc3NlZCBmcm9tIHNlYXJjaFJlc3VsdFZpZXdcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgZGF0YS5yb29taWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsyXTtcbiAgICBkYXRhLnNvbmcgPSBzb25nO1xuICAgIGNvbnNvbGUubG9nKCdjbGlja2VkJyxkYXRhKTtcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS9xdWV1ZS9hZGRTb25nJyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgc29ja2V0LmVtaXQoJ3VwZGF0ZScsIFtkYXRhLnJvb21pZCwgcmVzdWx0WzBdXSk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50U29uZzogcmVzdWx0WzBdLFxuICAgICAgICAgICAgcXVldWU6IHJlc3VsdCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzb2NrZXQuZW1pdCgndXBkYXRlJywgW2RhdGEucm9vbWlkXSk7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBxdWV1ZTogcmVzdWx0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRpc3BsYXlpbmcgYSBcInNvbmcgaXMgYWRkZWRcIiBtZXNzYWdlXG4gICAgICAgICQoJy5zb25nQWRkZWQnKS5mYWRlVG9nZ2xlKDUwMCkuZmFkZVRvZ2dsZSg1MDApO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIC8vIGRpc3BsYXlpbmcgYSBcInNvbmcgaXMgbm90IGFkZGVkXCIgbWVzc2FnZTtcbiAgICAgICAgJCgnLm5vdEFkZGVkJykuZmFkZVRvZ2dsZSg1MDApLmZhZGVUb2dnbGUoNTAwKTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlcXVlc3RCdWlsZFF1ZXJ5U3RyaW5nKHBhcmFtcykge1xuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gW107XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBwYXJhbXMpIHtcbiAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIHF1ZXJ5U3RyaW5nLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHByb3BlcnR5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNbcHJvcGVydHldKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWVyeVN0cmluZy5qb2luKCcmJyk7XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoa2V5d29yZCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBrZXl3b3JkIH0pO1xuICAgIGNvbnN0IG9iaiA9IHsga2V5d29yZCB9O1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvc2VydmVyJyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIGRhdGE6IHRoaXMucmVxdWVzdEJ1aWxkUXVlcnlTdHJpbmcob2JqKSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgc2VhcmNoUmVzdWx0OiByZXN1bHQuZGF0YSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGRpc3BsYXlpbmcgYSBcInNvbmcgaXMgYWRkZWRcIiBtZXNzYWdlXG4gICAgICAgICQoJy5zb25nQWRkZWQnKS5mYWRlVG9nZ2xlKDUwMCkuZmFkZVRvZ2dsZSg1MDApO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIC8vIGRpc3BsYXlpbmcgYSBcInNvbmcgaXMgbm90IGFkZGVkXCIgbWVzc2FnZTtcbiAgICAgICAgJCgnLm5vdEFkZGVkJykuZmFkZVRvZ2dsZSg1MDApLmZhZGVUb2dnbGUoNTAwKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVNvbmcoc29uZykge1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBkYXRhLnJvb21pZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzJdO1xuICAgIGRhdGEuc29uZyA9IHNvbmc7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJ2FwaS9xdWV1ZS9zb25nRmluaXNoZWQnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBzb2NrZXQuZW1pdCgndXBkYXRlJywgW2RhdGEucm9vbWlkLCByZXN1bHRbMF1dKTtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXVlOiByZXN1bHQsXG4gICAgICAgICAgICBjdXJyZW50U29uZzogJycsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBxdWV1ZTogcmVzdWx0LFxuICAgICAgICAgICAgY3VycmVudFNvbmc6IHJlc3VsdFswXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVVcFZvdGUoc29uZywgaSkge1xuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvYXBpL3F1ZXVlL2luY3JlYXNlUmFuaycsXG4gICAgICBkYXRhOiB7IGluZGV4OiBpLCByb29taWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzJdIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHNvY2tldC5lbWl0KCd1cGRhdGUnLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylbMl1dKTtcbiAgICAgICAgY29uc3QgdGVtcFF1ZXVlID0gcmVzdWx0O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBxdWV1ZTogdGVtcFF1ZXVlLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gdXB2b3RlIGNsaWNrIGFuaW1hdGlvblxuICAgICAgICAkKCcudXB2b3RlTXNnJykuZmFkZVRvZ2dsZSg1MDApLmZhZGVUb2dnbGUoNTAwKTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZURvd25Wb3RlKHNvbmcsIGkpIHtcbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgdXJsOiAnL2FwaS9xdWV1ZS9kZWNyZWFzZVJhbmsnLFxuICAgICAgZGF0YTogeyBpbmRleDogaSwgcm9vbWlkOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsyXSB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBzb2NrZXQuZW1pdCgndXBkYXRlJywgW3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzJdXSk7XG4gICAgICAgIGNvbnN0IHRlbXBRdWV1ZSA9IHJlc3VsdDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgcXVldWU6IHRlbXBRdWV1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGRvd252b3RlIGNsaWNrIGFuaW1hdGlvblxuICAgICAgICAkKCcuZG93bnZvdGVNc2cnKS5mYWRlVG9nZ2xlKDUwMCkuZmFkZVRvZ2dsZSg1MDApO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxTZWFyY2hWaWV3XG4gICAgICAgICAgICBoYW5kbGVTdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFJlc3VsdFZpZXdcbiAgICAgICAgICAgIHRyYWNrcz17dGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHR9XG4gICAgICAgICAgICBjbGlja1Nvbmc9e3RoaXMub25DbGlja1Nvbmd9XG4gICAgICAgICAgICBrZXl3b3JkPXt0aGlzLnN0YXRlLmtleXdvcmR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFF1ZXVlVmlld1xuICAgICAgICAgICAgcXVldWU9e3RoaXMuc3RhdGUucXVldWV9XG4gICAgICAgICAgICB1cFZvdGU9e3RoaXMuaGFuZGxlVXBWb3RlfVxuICAgICAgICAgICAgZG93blZvdGU9e3RoaXMuaGFuZGxlRG93blZvdGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFBsYXllclZpZXdcbiAgICAgICAgICAgIGN1cnJlbnRTb25nPXt0aGlzLnN0YXRlLmN1cnJlbnRTb25nfVxuICAgICAgICAgICAgbWFzdGVyPXt0aGlzLnN0YXRlLm1hc3Rlcn1cbiAgICAgICAgICAgIGNoYW5nZVNvbmc9e3RoaXMuaGFuZGxlQ2hhbmdlU29uZ31cbiAgICAgICAgICAgIHF1ZXVlPXt0aGlzLnN0YXRlLnF1ZXVlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSJdfQ==