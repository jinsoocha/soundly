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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1NpZ25pblZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFHcUIsVTs7O0FBQ25CLHNCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx5RkFDWCxLQURXO0FBRWxCOzs7O2lDQUVZLEMsRUFBRztBQUNkLFFBQUUsY0FBRjtBQUNBLFdBQUssWUFBTCxDQUFrQixLQUFLLGFBQXZCO0FBQ0Q7OztrQ0FFYSxNLEVBQVE7QUFDcEIsVUFBTSxTQUFTLE9BQU8sSUFBUCxDQUFZLE1BQTNCO0FBQ0Esa0NBQWUsSUFBZixDQUFvQixVQUFVLE1BQTlCOztBQUVBLGFBQU8sY0FBUCxDQUFzQixXQUF0QixHQUFvQyxPQUFPLEtBQTNDO0FBQ0Q7OztpQ0FFWSxRLEVBQVU7QUFDckIsVUFBTSxXQUFXO0FBQ2Ysa0JBQVUsS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixLQURkO0FBRWYsa0JBQVUsS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQjtBQUZkLE9BQWpCOztBQUtBLHVCQUFFLElBQUYsQ0FBTztBQUNMLGFBQUssbUJBREE7QUFFTCxxQkFBYSxtQ0FGUjtBQUdMLGNBQU0sTUFIRDtBQUlMLGNBQU0sUUFKRDtBQUtMLGlCQUFTLGlCQUFTLE1BQVQsRUFBaUI7QUFDeEIsbUJBQVMsTUFBVDtBQUNELFNBUEk7QUFRTCxlQUFPLGVBQVMsR0FBVCxFQUFjLE1BQWQsRUFBc0IsR0FBdEIsRUFBMkI7QUFDaEMsa0JBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsSUFBSSxRQUFKLEVBQXRCO0FBQ0Q7QUFWSSxPQUFQO0FBWUQ7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtRQUFBO1FBQ0U7QUFBQTtVQUFBLEVBQU0sVUFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBaEIsRUFBOEMsV0FBVSxXQUF4RDtVQUNFO0FBQUE7WUFBQSxFQUFLLFdBQVUsY0FBZjtZQUNFO0FBQUE7Y0FBQSxFQUFPLFNBQVEsVUFBZixFQUEwQixXQUFVLFVBQXBDO2NBQUE7QUFBQSxhQURGO1lBRUUseUNBQU8sV0FBVSxlQUFqQixFQUFpQyxNQUFLLFVBQXRDLEVBQWlELEtBQUksVUFBckQsRUFBZ0UsY0FBaEUsRUFBeUUsTUFBSyxNQUE5RTtBQUZGLFdBREY7VUFLRTtBQUFBO1lBQUEsRUFBSyxXQUFVLGNBQWY7WUFDRTtBQUFBO2NBQUEsRUFBTyxTQUFRLFVBQWYsRUFBMEIsV0FBVSxVQUFwQztjQUFBO0FBQUEsYUFERjtZQUVFLHlDQUFPLFdBQVUsZUFBakIsRUFBaUMsTUFBSyxVQUF0QyxFQUFpRCxLQUFJLFVBQXJELEVBQWdFLGNBQWhFLEVBQXlFLE1BQUssVUFBOUU7QUFGRixXQUxGO1VBU0U7QUFBQTtZQUFBLEVBQUssV0FBVSxjQUFmO1lBQ0U7QUFBQTtjQUFBLEVBQVEsV0FBVSxhQUFsQjtjQUFBO0FBQUE7QUFERjtBQVRGO0FBREYsT0FERjtBQWlCRDs7OztFQXZEcUMsZ0JBQU0sUzs7a0JBQXpCLFUiLCJmaWxlIjoiU2lnbmluVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWduaW5WaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gIH1cblxuICBoYW5kbGVTaWduaW4oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNlbmRGb3JtRGF0YSh0aGlzLmhhbmRsZVN1Y2Nlc3MpO1xuICB9XG5cbiAgaGFuZGxlU3VjY2VzcyhyZXN1bHQpIHtcbiAgICBjb25zdCByb29tSUQgPSByZXN1bHQudXNlci5yb29taWQ7XG4gICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnbWFpbi8nICsgcm9vbUlEKTtcbiAgICAvLyBwcm9ncmFtbWF0aWNhbGx5IGFkZCB0aGUgcm9vbSBwYXJhbSB0byB0aGUgcm9vdFxuICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5hY2Nlc3NUb2tlbiA9IHJlc3VsdC50b2tlbjtcbiAgfVxuXG4gIHNlbmRGb3JtRGF0YShjYWxsYmFjaykge1xuICAgIGNvbnN0IGZvcm1EYXRhID0ge1xuICAgICAgdXNlcm5hbWU6IHRoaXMucmVmcy51c2VybmFtZS52YWx1ZSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnJlZnMucGFzc3dvcmQudmFsdWUsXG4gICAgfTtcbiAgICAvLyBzZW5kIGRhdGFcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FwaS91c2Vycy9zaWduaW4nLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU2lnbmluLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImxvZ2luRm9ybVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXNlcm5hbWVGb3JtXCI+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInVzZXJuYW1lXCIgY2xhc3NOYW1lPVwidXNlcm5hbWVcIj5Vc2VybmFtZTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwidXNlcm5hbWVJbnB1dFwiIG5hbWU9XCJ1c2VybmFtZVwiIHJlZj1cInVzZXJuYW1lXCIgcmVxdWlyZWQgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFzc3dvcmRGb3JtXCI+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwicGFzc3dvcmRJbnB1dFwiIG5hbWU9XCJwYXNzd29yZFwiIHJlZj1cInBhc3N3b3JkXCIgcmVxdWlyZWQgdHlwZT1cInBhc3N3b3JkXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ2luV3JhcHBlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJsb2dpbkJ1dHRvblwiPkxvZ2luPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==