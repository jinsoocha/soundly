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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1NpZ251cFZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7K2VBVEE7QUFDQTtBQUNBO0FBQ0E7O0lBU3FCLFU7OztBQUNuQixzQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEseUZBQ1gsS0FEVztBQUVsQjs7OztpQ0FFWSxDLEVBQUc7QUFDZCxRQUFFLGNBQUY7QUFDQSxXQUFLLFlBQUwsQ0FBa0IsS0FBSyxhQUF2QjtBQUNEOzs7a0NBRWEsTSxFQUFRO0FBQ3BCLFVBQU0sU0FBUyxPQUFPLElBQVAsQ0FBWSxNQUEzQjtBQUNBLGtDQUFlLElBQWYsQ0FBb0IsVUFBVSxNQUE5QjtBQUNBO0FBQ0EsYUFBTyxjQUFQLENBQXNCLFdBQXRCLEdBQW9DLE9BQU8sS0FBM0M7QUFDRDs7O2lDQUVZLFEsRUFBVTtBQUNyQixVQUFNLFdBQVc7QUFDZixrQkFBVSxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLEtBRGQ7QUFFZixrQkFBVSxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CO0FBRmQsT0FBakI7QUFJQTtBQUNBLHVCQUFFLElBQUYsQ0FBTztBQUNMLGFBQUssbUJBREE7QUFFTCxxQkFBYSxtQ0FGUjtBQUdMLGNBQU0sTUFIRDtBQUlMLGNBQU0sUUFKRDtBQUtMLGlCQUFTLGlCQUFTLE1BQVQsRUFBaUI7QUFDeEIsbUJBQVMsTUFBVDtBQUNELFNBUEk7QUFRTCxlQUFPLGVBQVMsR0FBVCxFQUFjLE1BQWQsRUFBc0IsR0FBdEIsRUFBMkI7QUFDaEMsa0JBQVEsS0FBUixDQUFjLE1BQWQsRUFBc0IsSUFBSSxRQUFKLEVBQXRCO0FBQ0Q7QUFWSSxPQUFQO0FBWUQ7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQU0sVUFBVSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBaEIsRUFBOEMsV0FBVSxZQUF4RDtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsY0FBZjtBQUNFO0FBQUE7QUFBQSxnQkFBTyxTQUFRLFVBQWYsRUFBMEIsV0FBVSxVQUFwQztBQUFBO0FBQUEsYUFERjtBQUVFLHFEQUFPLFdBQVUsZUFBakIsRUFBaUMsTUFBSyxVQUF0QyxFQUFpRCxLQUFJLFVBQXJELEVBQWdFLGNBQWhFLEVBQXlFLE1BQUssTUFBOUU7QUFGRixXQURGO0FBS0U7QUFBQTtBQUFBLGNBQUssV0FBVSxjQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFPLFNBQVEsVUFBZixFQUEwQixXQUFVLFVBQXBDO0FBQUE7QUFBQSxhQURGO0FBRUUscURBQU8sV0FBVSxlQUFqQixFQUFpQyxNQUFLLFVBQXRDLEVBQWlELEtBQUksVUFBckQsRUFBZ0UsY0FBaEUsRUFBeUUsTUFBSyxVQUE5RTtBQUZGLFdBTEY7QUFTRTtBQUFBO0FBQUEsY0FBSyxXQUFVLGVBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQVEsV0FBVSxjQUFsQjtBQUFBO0FBQUE7QUFERjtBQVRGO0FBREYsT0FERjtBQWlCRDs7OztFQXZEcUMsZ0JBQU0sUzs7a0JBQXpCLFUiLCJmaWxlIjoiU2lnbnVwVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGdldCB1c2VybmFtZVxuLy8gZ2V0IHVzZXIgZW1haWxcbi8vIGdldCB1c2VyIHBhc3N3b3JkXG4vLyBzdG9yZSBpbiB1c2VyIHZhcmlhYmxlLCBhbmQgcGFzcyB0byBkYlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBicm93c2VySGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnbnVwVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgaGFuZGxlU2lnbnVwKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZW5kRm9ybURhdGEodGhpcy5oYW5kbGVTdWNjZXNzKTtcbiAgfVxuXG4gIGhhbmRsZVN1Y2Nlc3MocmVzdWx0KSB7XG4gICAgY29uc3Qgcm9vbUlEID0gcmVzdWx0LnVzZXIucm9vbWlkO1xuICAgIGJyb3dzZXJIaXN0b3J5LnB1c2goJ21haW4vJyArIHJvb21JRCk7XG4gICAgLy8gcHJvZ3JhbW1hdGljYWxseSBhZGQgdGhlIHJvb20gcGFyYW0gdG8gdGhlIHJvb3RcbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuYWNjZXNzVG9rZW4gPSByZXN1bHQudG9rZW47XG4gIH1cblxuICBzZW5kRm9ybURhdGEoY2FsbGJhY2spIHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHtcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnJlZnMudXNlcm5hbWUudmFsdWUsXG4gICAgICBwYXNzd29yZDogdGhpcy5yZWZzLnBhc3N3b3JkLnZhbHVlLFxuICAgIH07XG4gICAgLy8gc2VuZCBkYXRhXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hcGkvdXNlcnMvc2lnbnVwJyxcbiAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVNpZ251cC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJzaWdudXBGb3JtXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VybmFtZUZvcm1cIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwidXNlcm5hbWVcIiBjbGFzc05hbWU9XCJ1c2VybmFtZVwiPlVzZXJuYW1lPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJ1c2VybmFtZUlucHV0XCIgbmFtZT1cInVzZXJuYW1lXCIgcmVmPVwidXNlcm5hbWVcIiByZXF1aXJlZCB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYXNzd29yZEZvcm1cIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGFzc3dvcmRcIiBjbGFzc05hbWU9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJwYXNzd29yZElucHV0XCIgbmFtZT1cInBhc3N3b3JkXCIgcmVmPVwicGFzc3dvcmRcIiByZXF1aXJlZCB0eXBlPVwicGFzc3dvcmRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lnbnVwV3JhcHBlclwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzaWdudXBCdXR0b25cIj5TaWdudXA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19