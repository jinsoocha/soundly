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

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // get username
// get user email
// get user password
// store in user variable, and pass to db

var SignupView = function (_React$Component) {
  _inherits(SignupView, _React$Component);

  function SignupView(props) {
    _classCallCheck(this, SignupView);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SignupView).call(this, props));
  }

  _createClass(SignupView, [{
    key: 'handleSignup',
    value: function handleSignup(e) {
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
        url: '/api/users/signup',
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
          { onSubmit: this.handleSignup.bind(this), className: 'signupForm' },
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
            { className: 'signupWrapper' },
            _react2.default.createElement(
              'button',
              { className: 'signupButton' },
              'Signup'
            )
          )
        )
      );
    }
  }]);

  return SignupView;
}(_react2.default.Component);

exports.default = SignupView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1NpZ251cFZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztJQUdxQixVOzs7QUFDbkIsc0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLHlGQUNYLEtBRFc7QUFFbEI7Ozs7aUNBRVksQyxFQUFHO0FBQ2QsUUFBRSxjQUFGO0FBQ0EsV0FBSyxZQUFMLENBQWtCLEtBQUssYUFBdkI7QUFDRDs7O2tDQUVhLE0sRUFBUTtBQUNwQixVQUFNLFNBQVMsT0FBTyxJQUFQLENBQVksTUFBM0I7QUFDQSxrQ0FBZSxJQUFmLENBQW9CLFVBQVUsTUFBOUI7O0FBRUEsYUFBTyxjQUFQLENBQXNCLFdBQXRCLEdBQW9DLE9BQU8sS0FBM0M7QUFDRDs7O2lDQUVZLFEsRUFBVTtBQUNyQixVQUFNLFdBQVc7QUFDZixrQkFBVSxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLEtBRGQ7QUFFZixrQkFBVSxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CO0FBRmQsT0FBakI7O0FBS0EsdUJBQUUsSUFBRixDQUFPO0FBQ0wsYUFBSyxtQkFEQTtBQUVMLHFCQUFhLG1DQUZSO0FBR0wsY0FBTSxNQUhEO0FBSUwsY0FBTSxRQUpEO0FBS0wsaUJBQVMsaUJBQVMsTUFBVCxFQUFpQjtBQUN4QixtQkFBUyxNQUFUO0FBQ0QsU0FQSTtBQVFMLGVBQU8sZUFBUyxHQUFULEVBQWMsTUFBZCxFQUFzQixHQUF0QixFQUEyQjtBQUNoQyxrQkFBUSxLQUFSLENBQWMsTUFBZCxFQUFzQixJQUFJLFFBQUosRUFBdEI7QUFDRDtBQVZJLE9BQVA7QUFZRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO1FBQUE7UUFDRTtBQUFBO1VBQUEsRUFBTSxVQUFVLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFoQixFQUE4QyxXQUFVLFlBQXhEO1VBQ0U7QUFBQTtZQUFBLEVBQUssV0FBVSxjQUFmO1lBQ0U7QUFBQTtjQUFBLEVBQU8sU0FBUSxVQUFmLEVBQTBCLFdBQVUsVUFBcEM7Y0FBQTtBQUFBLGFBREY7WUFFRSx5Q0FBTyxXQUFVLGVBQWpCLEVBQWlDLE1BQUssVUFBdEMsRUFBaUQsS0FBSSxVQUFyRCxFQUFnRSxjQUFoRSxFQUF5RSxNQUFLLE1BQTlFO0FBRkYsV0FERjtVQUtFO0FBQUE7WUFBQSxFQUFLLFdBQVUsY0FBZjtZQUNFO0FBQUE7Y0FBQSxFQUFPLFNBQVEsVUFBZixFQUEwQixXQUFVLFVBQXBDO2NBQUE7QUFBQSxhQURGO1lBRUUseUNBQU8sV0FBVSxlQUFqQixFQUFpQyxNQUFLLFVBQXRDLEVBQWlELEtBQUksVUFBckQsRUFBZ0UsY0FBaEUsRUFBeUUsTUFBSyxVQUE5RTtBQUZGLFdBTEY7VUFTRTtBQUFBO1lBQUEsRUFBSyxXQUFVLGVBQWY7WUFDRTtBQUFBO2NBQUEsRUFBUSxXQUFVLGNBQWxCO2NBQUE7QUFBQTtBQURGO0FBVEY7QUFERixPQURGO0FBaUJEOzs7O0VBdkRxQyxnQkFBTSxTOztrQkFBekIsVSIsImZpbGUiOiJTaWdudXBWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZ2V0IHVzZXJuYW1lXG4vLyBnZXQgdXNlciBlbWFpbFxuLy8gZ2V0IHVzZXIgcGFzc3dvcmRcbi8vIHN0b3JlIGluIHVzZXIgdmFyaWFibGUsIGFuZCBwYXNzIHRvIGRiXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWdudXBWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBoYW5kbGVTaWdudXAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNlbmRGb3JtRGF0YSh0aGlzLmhhbmRsZVN1Y2Nlc3MpO1xuICB9XG5cbiAgaGFuZGxlU3VjY2VzcyhyZXN1bHQpIHtcbiAgICBjb25zdCByb29tSUQgPSByZXN1bHQudXNlci5yb29taWQ7XG4gICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnbWFpbi8nICsgcm9vbUlEKTtcbiAgICAvLyBwcm9ncmFtbWF0aWNhbGx5IGFkZCB0aGUgcm9vbSBwYXJhbSB0byB0aGUgcm9vdFxuICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5hY2Nlc3NUb2tlbiA9IHJlc3VsdC50b2tlbjtcbiAgfVxuXG4gIHNlbmRGb3JtRGF0YShjYWxsYmFjaykge1xuICAgIGNvbnN0IGZvcm1EYXRhID0ge1xuICAgICAgdXNlcm5hbWU6IHRoaXMucmVmcy51c2VybmFtZS52YWx1ZSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnJlZnMucGFzc3dvcmQudmFsdWUsXG4gICAgfTtcbiAgICAvLyBzZW5kIGRhdGFcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS91c2Vycy9zaWdudXAnLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU2lnbnVwLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cInNpZ251cEZvcm1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVzZXJuYW1lRm9ybVwiPlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJ1c2VybmFtZVwiIGNsYXNzTmFtZT1cInVzZXJuYW1lXCI+VXNlcm5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInVzZXJuYW1lSW5wdXRcIiBuYW1lPVwidXNlcm5hbWVcIiByZWY9XCJ1c2VybmFtZVwiIHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhc3N3b3JkRm9ybVwiPlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInBhc3N3b3JkSW5wdXRcIiBuYW1lPVwicGFzc3dvcmRcIiByZWY9XCJwYXNzd29yZFwiIHJlcXVpcmVkIHR5cGU9XCJwYXNzd29yZFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzaWdudXBXcmFwcGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInNpZ251cEJ1dHRvblwiPlNpZ251cDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=