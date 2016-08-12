'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SigninView = function (_React$Component) {
  _inherits(SigninView, _React$Component);

  function SigninView(props) {
    _classCallCheck(this, SigninView);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SigninView).call(this, props));
  }

  _createClass(SigninView, [{
    key: 'handleSignin',
    value: function handleSignin(e) {
      e.preventDefault();
      this.sendFormData(this.handleSuccess);
    }
  }, {
    key: 'handleSuccess',
    value: function handleSuccess(result) {
      var roomID = result.user.roomid;
      _reactRouter.browserHistory.push('main/' + roomID);
      // programmatically add the room param to the root
      window.sessionStorage.accessToken = result.token;
    }
  }, {
    key: 'sendFormData',
    value: function sendFormData(callback) {
      var formData = {
        username: this.refs.username.value,
        password: this.refs.password.value
      };
      // send data
      _jquery2.default.ajax({
        url: '/api/users/signin',
        contentType: 'application/x-www-form-urlencoded',
        type: 'POST',
        data: formData,
        success: function success(result) {
          callback(result);
        },
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
          'form',
          { onSubmit: this.handleSignin.bind(this), className: 'loginForm' },
          _react2.default.createElement(
            'div',
            { className: 'usernameForm' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'username', className: 'username' },
              'Username'
            ),
            _react2.default.createElement('input', { className: 'usernameInput', name: 'username', ref: 'username', required: true, type: 'text' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'passwordForm' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'password', className: 'password' },
              'Password'
            ),
            _react2.default.createElement('input', { className: 'passwordInput', name: 'password', ref: 'password', required: true, type: 'password' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'loginWrapper' },
            _react2.default.createElement(
              'button',
              { className: 'loginButton' },
              'Login'
            )
          )
        )
      );
    }
  }]);

  return SigninView;
}(_react2.default.Component);

exports.default = SigninView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1NpZ25pblZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFHcUIsVTs7O0FBQ25CLHNCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx5RkFDWCxLQURXO0FBRWxCOzs7O2lDQUVZLEMsRUFBRztBQUNkLFFBQUUsY0FBRjtBQUNBLFdBQUssWUFBTCxDQUFrQixLQUFLLGFBQXZCO0FBQ0Q7OztrQ0FFYSxNLEVBQVE7QUFDcEIsVUFBTSxTQUFTLE9BQU8sSUFBUCxDQUFZLE1BQTNCO0FBQ0Esa0NBQWUsSUFBZixDQUFvQixVQUFVLE1BQTlCO0FBQ0E7QUFDQSxhQUFPLGNBQVAsQ0FBc0IsV0FBdEIsR0FBb0MsT0FBTyxLQUEzQztBQUNEOzs7aUNBRVksUSxFQUFVO0FBQ3JCLFVBQU0sV0FBVztBQUNmLGtCQUFVLEtBQUssSUFBTCxDQUFVLFFBQVYsQ0FBbUIsS0FEZDtBQUVmLGtCQUFVLEtBQUssSUFBTCxDQUFVLFFBQVYsQ0FBbUI7QUFGZCxPQUFqQjtBQUlBO0FBQ0EsdUJBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxtQkFEQTtBQUVMLHFCQUFhLG1DQUZSO0FBR0wsY0FBTSxNQUhEO0FBSUwsY0FBTSxRQUpEO0FBS0wsaUJBQVMsaUJBQVMsTUFBVCxFQUFpQjtBQUN4QixtQkFBUyxNQUFUO0FBQ0QsU0FQSTtBQVFMLGVBQU8sZUFBUyxHQUFULEVBQWMsTUFBZCxFQUFzQixHQUF0QixFQUEyQjtBQUNoQyxrQkFBUSxLQUFSLENBQWMsTUFBZCxFQUFzQixJQUFJLFFBQUosRUFBdEI7QUFDRDtBQVZJLE9BQVA7QUFZRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsWUFBTSxVQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFoQixFQUE4QyxXQUFVLFdBQXhEO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFPLFNBQVEsVUFBZixFQUEwQixXQUFVLFVBQXBDO0FBQUE7QUFBQSxhQURGO0FBRUUscURBQU8sV0FBVSxlQUFqQixFQUFpQyxNQUFLLFVBQXRDLEVBQWlELEtBQUksVUFBckQsRUFBZ0UsY0FBaEUsRUFBeUUsTUFBSyxNQUE5RTtBQUZGLFdBREY7QUFLRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGNBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQU8sU0FBUSxVQUFmLEVBQTBCLFdBQVUsVUFBcEM7QUFBQTtBQUFBLGFBREY7QUFFRSxxREFBTyxXQUFVLGVBQWpCLEVBQWlDLE1BQUssVUFBdEMsRUFBaUQsS0FBSSxVQUFyRCxFQUFnRSxjQUFoRSxFQUF5RSxNQUFLLFVBQTlFO0FBRkYsV0FMRjtBQVNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsY0FBZjtBQUNFO0FBQUE7QUFBQSxnQkFBUSxXQUFVLGFBQWxCO0FBQUE7QUFBQTtBQURGO0FBVEY7QUFERixPQURGO0FBaUJEOzs7O0VBdkRxQyxnQkFBTSxTOztrQkFBekIsVSIsImZpbGUiOiJTaWduaW5WaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgYnJvd3Nlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZ25pblZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIGhhbmRsZVNpZ25pbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc2VuZEZvcm1EYXRhKHRoaXMuaGFuZGxlU3VjY2Vzcyk7XG4gIH1cblxuICBoYW5kbGVTdWNjZXNzKHJlc3VsdCkge1xuICAgIGNvbnN0IHJvb21JRCA9IHJlc3VsdC51c2VyLnJvb21pZDtcbiAgICBicm93c2VySGlzdG9yeS5wdXNoKCdtYWluLycgKyByb29tSUQpO1xuICAgIC8vIHByb2dyYW1tYXRpY2FsbHkgYWRkIHRoZSByb29tIHBhcmFtIHRvIHRoZSByb290XG4gICAgd2luZG93LnNlc3Npb25TdG9yYWdlLmFjY2Vzc1Rva2VuID0gcmVzdWx0LnRva2VuO1xuICB9XG5cbiAgc2VuZEZvcm1EYXRhKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB7XG4gICAgICB1c2VybmFtZTogdGhpcy5yZWZzLnVzZXJuYW1lLnZhbHVlLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMucmVmcy5wYXNzd29yZC52YWx1ZSxcbiAgICB9O1xuICAgIC8vIHNlbmQgZGF0YVxuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvYXBpL3VzZXJzL3NpZ25pbicsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTaWduaW4uYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwibG9naW5Gb3JtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VybmFtZUZvcm1cIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwidXNlcm5hbWVcIiBjbGFzc05hbWU9XCJ1c2VybmFtZVwiPlVzZXJuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ1c2VybmFtZUlucHV0XCIgbmFtZT1cInVzZXJuYW1lXCIgcmVmPVwidXNlcm5hbWVcIiByZXF1aXJlZCB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXNzd29yZEZvcm1cIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGFzc3dvcmRcIiBjbGFzc05hbWU9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJwYXNzd29yZElucHV0XCIgbmFtZT1cInBhc3N3b3JkXCIgcmVmPVwicGFzc3dvcmRcIiByZXF1aXJlZCB0eXBlPVwicGFzc3dvcmRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9naW5XcmFwcGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImxvZ2luQnV0dG9uXCI+TG9naW48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19