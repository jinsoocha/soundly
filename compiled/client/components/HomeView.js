'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dashboard view to be used when a user navigates to our page.


var HomeView = function HomeView(props) {
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    _reactRouter.browserHistory.push('main/' + document.getElementById('roomid').value);
  };

  return _react2.default.createElement(
    'div',
    { className: 'hero-unit' },
    _react2.default.createElement(
      'div',
      { className: 'parentView' },
      _react2.default.createElement(
        'h1',
        { className: 'welcome' },
        'Welcome to Soundly!'
      ),
      _react2.default.createElement(
        'div',
        { className: 'homeOptions' },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: 'signin', className: 'signIn' },
          'sign in'
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/', className: 'joinRoom' },
          'join a room'
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { to: 'signup', className: 'signup' },
          'sign up'
        )
      )
    ),
    _react2.default.createElement(
      'form',
      { onSubmit: handleSubmit.bind(undefined), className: 'roomForm' },
      _react2.default.createElement('input', { name: 'roomid', id: 'roomid', placeholder: 'Enter the room ID', className: 'roomInput' })
    )
  );
};

exports.default = HomeView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0hvbWVWaWV3LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7O0FBR0EsSUFBTSxXQUFXLFNBQVgsUUFBVyxDQUFDLEtBQUQsRUFBVztBQUMxQixNQUFNLGVBQWUsU0FBZixZQUFlLENBQUMsQ0FBRCxFQUFPO0FBQzFCLE1BQUUsY0FBRjtBQUNBLGdDQUFlLElBQWYsQ0FBb0IsVUFBVSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBaEU7QUFDRCxHQUhEOztBQUtBLFNBQ0U7QUFBQTtJQUFBLEVBQUssV0FBVSxXQUFmO0lBQ0U7QUFBQTtNQUFBLEVBQUssV0FBVSxZQUFmO01BQ0U7QUFBQTtRQUFBLEVBQUksV0FBVSxTQUFkO1FBQUE7QUFBQSxPQURGO01BRUU7QUFBQTtRQUFBLEVBQUssV0FBVSxhQUFmO1FBQ0U7QUFBQTtVQUFBLEVBQU0sSUFBRyxRQUFULEVBQWtCLFdBQVUsUUFBNUI7VUFBQTtBQUFBLFNBREY7UUFFRTtBQUFBO1VBQUEsRUFBTSxJQUFHLEdBQVQsRUFBYSxXQUFVLFVBQXZCO1VBQUE7QUFBQSxTQUZGO1FBR0U7QUFBQTtVQUFBLEVBQU0sSUFBRyxRQUFULEVBQWtCLFdBQVUsUUFBNUI7VUFBQTtBQUFBO0FBSEY7QUFGRixLQURGO0lBU0U7QUFBQTtNQUFBLEVBQU0sVUFBVSxhQUFhLElBQWIsV0FBaEIsRUFBeUMsV0FBVSxVQUFuRDtNQUNFLHlDQUFPLE1BQUssUUFBWixFQUFxQixJQUFHLFFBQXhCLEVBQWlDLGFBQVksbUJBQTdDLEVBQWlFLFdBQVUsV0FBM0U7QUFERjtBQVRGLEdBREY7QUFlRCxDQXJCRDs7a0JBdUJlLFEiLCJmaWxlIjoiSG9tZVZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBkYXNoYm9hcmQgdmlldyB0byBiZSB1c2VkIHdoZW4gYSB1c2VyIG5hdmlnYXRlcyB0byBvdXIgcGFnZS5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rLCBicm93c2VySGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XG5cblxuY29uc3QgSG9tZVZpZXcgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYnJvd3Nlckhpc3RvcnkucHVzaCgnbWFpbi8nICsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb21pZCcpLnZhbHVlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVyby11bml0XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhcmVudFZpZXdcIj5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cIndlbGNvbWVcIj5XZWxjb21lIHRvIFNvdW5kbHkhPC9oMT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob21lT3B0aW9uc1wiPlxuICAgICAgICAgIDxMaW5rIHRvPVwic2lnbmluXCIgY2xhc3NOYW1lPVwic2lnbkluXCI+c2lnbiBpbjwvTGluaz5cbiAgICAgICAgICA8TGluayB0bz1cIi9cIiBjbGFzc05hbWU9XCJqb2luUm9vbVwiPmpvaW4gYSByb29tPC9MaW5rPlxuICAgICAgICAgIDxMaW5rIHRvPVwic2lnbnVwXCIgY2xhc3NOYW1lPVwic2lnbnVwXCI+c2lnbiB1cDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXQuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwicm9vbUZvcm1cIj5cbiAgICAgICAgPGlucHV0IG5hbWU9XCJyb29taWRcIiBpZD1cInJvb21pZFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGhlIHJvb20gSURcIiBjbGFzc05hbWU9XCJyb29tSW5wdXRcIiAvPlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZVZpZXc7XG5cbiJdfQ==