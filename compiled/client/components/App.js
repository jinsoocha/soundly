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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0FwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sU0FBUyxHQUFHLE9BQUgsQ0FBVyx1QkFBWCxDQUFmOztJQUVxQixHOzs7QUFDbkIsZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFFakIsVUFBSyxZQUFMLEdBQW9CLE1BQUssWUFBTCxDQUFrQixJQUFsQixPQUFwQjtBQUNBLFVBQUssY0FBTCxHQUFzQixNQUFLLGNBQUwsQ0FBb0IsSUFBcEIsT0FBdEI7QUFDQSxVQUFLLFdBQUwsR0FBbUIsTUFBSyxXQUFMLENBQWlCLElBQWpCLE9BQW5CO0FBQ0EsVUFBSyxnQkFBTCxHQUF3QixNQUFLLGdCQUFMLENBQXNCLElBQXRCLE9BQXhCO0FBQ0EsVUFBSyxZQUFMLEdBQW9CLE1BQUssWUFBTCxDQUFrQixJQUFsQixPQUFwQjtBQUNBLFVBQUssS0FBTCxHQUFhO0FBQ1gsY0FBUSxNQURHO0FBRVgsY0FBUSxLQUZHO0FBR1gsb0JBQWMsRUFISDtBQUlYLGFBQU8sRUFKSTtBQUtYLG1CQUFhLEVBTEY7QUFNWCxlQUFTO0FBTkUsS0FBYjtBQVBpQjtBQWVsQjs7Ozt5Q0FFb0I7QUFBQTs7QUFDbkIsVUFBTSxPQUFPLE9BQU8sUUFBUCxDQUFnQixRQUFoQixDQUF5QixLQUF6QixDQUErQixHQUEvQixFQUFvQyxDQUFwQyxDQUFiO0FBQ0EsY0FBUSxHQUFSLENBQVksY0FBWjtBQUNBLFVBQU0sVUFBVSxJQUFoQjtBQUNBLGNBQVEsR0FBUixDQUFZLE1BQVosRUFBbUIsSUFBbkI7QUFDQSxhQUFPLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQU07QUFDekIsZ0JBQVEsR0FBUixDQUFZLE9BQVo7QUFDRCxPQUZEOztBQUlBLGFBQU8sSUFBUCxDQUFZ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bkI7QUFJRSxtQkFBTyxLQUFLLEtBQUwsQ0FBVztBQUpwQjtBQURGO0FBbEJGLE9BREY7QUE2QkQ7Ozs7RUEvTjhCLGdCQUFNLFM7O2tCQUFsQixHIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VhcmNoVmlldyBmcm9tICcuL1NlYXJjaFZpZXcnO1xuaW1wb3J0IFJlc3VsdFZpZXcgZnJvbSAnLi9SZXN1bHRWaWV3JztcbmltcG9ydCBRdWV1ZVZpZXcgZnJvbSAnLi9RdWV1ZVZpZXcnO1xuaW1wb3J0IFBsYXllclZpZXcgZnJvbSAnLi9QbGF5ZXJWaWV3JztcbmltcG9ydCB7IGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmNvbnN0IHNvY2tldCA9IGlvLmNvbm5lY3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6NDU2OCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmhhbmRsZVVwVm90ZSA9IHRoaXMuaGFuZGxlVXBWb3RlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVEb3duVm90ZSA9IHRoaXMuaGFuZGxlRG93blZvdGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQ2xpY2tTb25nID0gdGhpcy5vbkNsaWNrU29uZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlU29uZyA9IHRoaXMuaGFuZGxlQ2hhbmdlU29uZy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc29ja2V0OiBzb2NrZXQsXG4gICAgICBtYXN0ZXI6IGZhbHNlLFxuICAgICAgc2VhcmNoUmVzdWx0OiBbXSxcbiAgICAgIHF1ZXVlOiBbXSxcbiAgICAgIGN1cnJlbnRTb25nOiAnJyxcbiAgICAgIGtleXdvcmQ6ICcnLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3Qgcm9vbSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzJdO1xuICAgIGNvbnNvbGUubG9nKCdpbml0aWFsbW91bnQnKTtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyhcInJvb21cIixyb29tKVxuICAgIHNvY2tldC5vbignY29ubmVjdCcsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSEVMTE9cIilcbiAgICB9KTtcblxuICAgIHNvY2tldC5lbWl0KCdyb29tJywgcm9vbSk7XG5cbiAgICBzb2NrZXQub24oJ21hc3RlcicsIChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnaSBhbSBhIG1hc3RlcicsIGRhdGEpO1xuICAgICAgY29udGV4dC5zZXRTdGF0ZSh7XG4gICAgICAgIG1hc3RlcjogZGF0YSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc29ja2V0Lm9uKCdxdWV1ZScsIChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImNsaWVudCBnZXR0aW5nIHF1ZXVlXCIsIGRhdGEpXG4gICAgICBpZiAoZGF0YVswXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgcXVldWU6IGRhdGFbMF0sXG4gICAgICAgICAgY3VycmVudFNvbmc6ICcnLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkYXRhWzFdKSB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBxdWV1ZTogZGF0YVswXSxcbiAgICAgICAgICAgIGN1cnJlbnRTb25nOiBkYXRhWzFdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IGRhdGFbMF0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2xpY2tTb25nKHNvbmcpIHtcbiAgICAvLyBzZXQgdXAgdGhlIHN0YXRlIGFzIHRoZSBzb25nIHRoYXQgaGFzIGJlZW4gcGFzc2VkIGZyb20gc2VhcmNoUmVzdWx0Vmlld1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBkYXRhLnJvb21pZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzJdO1xuICAgIGRhdGEuc29uZyA9IHNvbmc7XG4gICAgY29uc29sZS5sb2coJ2NsaWNrZWQnLGRhdGEpO1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3F1ZXVlL2FkZFNvbmcnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBzb2NrZXQuZW1pdCgndXBkYXRlJywgW2RhdGEucm9vbWlkLCByZXN1bHRbMF1dKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRTb25nOiByZXN1bHRbMF0sXG4gICAgICAgICAgICBxdWV1ZTogcmVzdWx0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNvY2tldC5lbWl0KCd1cGRhdGUnLCBbZGF0YS5yb29taWRdKTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXVlOiByZXN1bHQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGlzcGxheWluZyBhIFwic29uZyBpcyBhZGRlZFwiIG1lc3NhZ2VcbiAgICAgICAgJCgnLnNvbmdBZGRlZCcpLmZhZGVUb2dnbGUoNTAwKS5mYWRlVG9nZ2xlKDUwMCk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgLy8gZGlzcGxheWluZyBhIFwic29uZyBpcyBub3QgYWRkZWRcIiBtZXNzYWdlO1xuICAgICAgICAkKCcubm90QWRkZWQnKS5mYWRlVG9nZ2xlKDUwMCkuZmFkZVRvZ2dsZSg1MDApO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIH0pO1xuICB9XG5cbiAgcmVxdWVzdEJ1aWxkUXVlcnlTdHJpbmcocGFyYW1zKSB7XG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHBhcmFtcykge1xuICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgcXVlcnlTdHJpbmcucHVzaChlbmNvZGVVUklDb21wb25lbnQocHJvcGVydHkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1twcm9wZXJ0eV0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5U3RyaW5nLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdChrZXl3b3JkKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGtleXdvcmQgfSk7XG4gICAgY29uc3Qgb2JqID0geyBrZXl3b3JkIH07XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NDU2OC9zZXJ2ZXInLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgZGF0YTogdGhpcy5yZXF1ZXN0QnVpbGRRdWVyeVN0cmluZyhvYmopLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBzZWFyY2hSZXN1bHQ6IHJlc3VsdC5kYXRhLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gZGlzcGxheWluZyBhIFwic29uZyBpcyBhZGRlZFwiIG1lc3NhZ2VcbiAgICAgICAgJCgnLnNvbmdBZGRlZCcpLmZhZGVUb2dnbGUoNTAwKS5mYWRlVG9nZ2xlKDUwMCk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgLy8gZGlzcGxheWluZyBhIFwic29uZyBpcyBub3QgYWRkZWRcIiBtZXNzYWdlO1xuICAgICAgICAkKCcubm90QWRkZWQnKS5mYWRlVG9nZ2xlKDUwMCkuZmFkZVRvZ2dsZSg1MDApO1xuICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlU29uZyhzb25nKSB7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIGRhdGEucm9vbWlkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylbMl07XG4gICAgZGF0YS5zb25nID0gc29uZztcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnYXBpL3F1ZXVlL3NvbmdGaW5pc2hlZCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIHNvY2tldC5lbWl0KCd1cGRhdGUnLCBbZGF0YS5yb29taWQsIHJlc3VsdFswXV0pO1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcXVldWU6IHJlc3VsdCxcbiAgICAgICAgICAgIGN1cnJlbnRTb25nOiAnJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHF1ZXVlOiByZXN1bHQsXG4gICAgICAgICAgICBjdXJyZW50U29uZzogcmVzdWx0WzBdLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVVwVm90ZShzb25nLCBpKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIHVybDogJy9hcGkvcXVldWUvaW5jcmVhc2VSYW5rJyxcbiAgICAgIGRhdGE6IHsgaW5kZXg6IGksIHJvb21pZDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylbMl0gfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoJ3VwZGF0ZScsIFt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKVsyXV0pO1xuICAgICAgICBjb25zdCB0ZW1wUXVldWUgPSByZXN1bHQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHF1ZXVlOiB0ZW1wUXVldWUsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyB1cHZvdGUgY2xpY2sgYW5pbWF0aW9uXG4gICAgICAgICQoJy51cHZvdGVNc2cnKS5mYWRlVG9nZ2xlKDUwMCkuZmFkZVRvZ2dsZSg1MDApO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlRG93blZvdGUoc29uZywgaSkge1xuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICB1cmw6ICcvYXBpL3F1ZXVlL2RlY3JlYXNlUmFuaycsXG4gICAgICBkYXRhOiB7IGluZGV4OiBpLCByb29taWQ6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpWzJdIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHNvY2tldC5lbWl0KCd1cGRhdGUnLCBbd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylbMl1dKTtcbiAgICAgICAgY29uc3QgdGVtcFF1ZXVlID0gcmVzdWx0O1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBxdWV1ZTogdGVtcFF1ZXVlLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gZG93bnZvdGUgY2xpY2sgYW5pbWF0aW9uXG4gICAgICAgICQoJy5kb3dudm90ZU1zZycpLmZhZGVUb2dnbGUoNTAwKS5mYWRlVG9nZ2xlKDUwMCk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFNlYXJjaFZpZXdcbiAgICAgICAgICAgIGhhbmRsZVN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8UmVzdWx0Vmlld1xuICAgICAgICAgICAgdHJhY2tzPXt0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdH1cbiAgICAgICAgICAgIGNsaWNrU29uZz17dGhpcy5vbkNsaWNrU29uZ31cbiAgICAgICAgICAgIGtleXdvcmQ9e3RoaXMuc3RhdGUua2V5d29yZH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8UXVldWVWaWV3XG4gICAgICAgICAgICBxdWV1ZT17dGhpcy5zdGF0ZS5xdWV1ZX1cbiAgICAgICAgICAgIHVwVm90ZT17dGhpcy5oYW5kbGVVcFZvdGV9XG4gICAgICAgICAgICBkb3duVm90ZT17dGhpcy5oYW5kbGVEb3duVm90ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8UGxheWVyVmlld1xuICAgICAgICAgICAgY3VycmVudFNvbmc9e3RoaXMuc3RhdGUuY3VycmVudFNvbmd9XG4gICAgICAgICAgICBtYXN0ZXI9e3RoaXMuc3RhdGUubWFzdGVyfVxuICAgICAgICAgICAgY2hhbmdlU29uZz17dGhpcy5oYW5kbGVDaGFuZ2VTb25nfVxuICAgICAgICAgICAgcXVldWU9e3RoaXMuc3RhdGUucXVldWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59Il19