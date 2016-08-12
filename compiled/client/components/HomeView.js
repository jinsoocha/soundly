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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0hvbWVWaWV3LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRkE7QUFLQSxJQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsS0FBRCxFQUFXO0FBQzFCLE1BQU0sZUFBZSxTQUFmLFlBQWUsQ0FBQyxDQUFELEVBQU87QUFDMUIsTUFBRSxjQUFGO0FBQ0EsZ0NBQWUsSUFBZixDQUFvQixVQUFVLFNBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQyxLQUFoRTtBQUNELEdBSEQ7O0FBS0EsU0FDRTtBQUFBO0FBQUEsTUFBSyxXQUFVLFdBQWY7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLFlBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSSxXQUFVLFNBQWQ7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGFBQWY7QUFDRTtBQUFBO0FBQUEsWUFBTSxJQUFHLFFBQVQsRUFBa0IsV0FBVSxRQUE1QjtBQUFBO0FBQUEsU0FERjtBQUVFO0FBQUE7QUFBQSxZQUFNLElBQUcsR0FBVCxFQUFhLFdBQVUsVUFBdkI7QUFBQTtBQUFBLFNBRkY7QUFHRTtBQUFBO0FBQUEsWUFBTSxJQUFHLFFBQVQsRUFBa0IsV0FBVSxRQUE1QjtBQUFBO0FBQUE7QUFIRjtBQUZGLEtBREY7QUFTRTtBQUFBO0FBQUEsUUFBTSxVQUFVLGFBQWEsSUFBYixXQUFoQixFQUF5QyxXQUFVLFVBQW5EO0FBQ0UsK0NBQU8sTUFBSyxRQUFaLEVBQXFCLElBQUcsUUFBeEIsRUFBaUMsYUFBWSxtQkFBN0MsRUFBaUUsV0FBVSxXQUEzRTtBQURGO0FBVEYsR0FERjtBQWVELENBckJEOztrQkF1QmUsUSIsImZpbGUiOiJIb21lVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGRhc2hib2FyZCB2aWV3IHRvIGJlIHVzZWQgd2hlbiBhIHVzZXIgbmF2aWdhdGVzIHRvIG91ciBwYWdlLlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmssIGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJztcblxuXG5jb25zdCBIb21lVmlldyA9IChwcm9wcykgPT4ge1xuICBjb25zdCBoYW5kbGVTdWJtaXQgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBicm93c2VySGlzdG9yeS5wdXNoKCdtYWluLycgKyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vbWlkJykudmFsdWUpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJoZXJvLXVuaXRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFyZW50Vmlld1wiPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwid2VsY29tZVwiPldlbGNvbWUgdG8gU291bmRseSE8L2gxPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbWVPcHRpb25zXCI+XG4gICAgICAgICAgPExpbmsgdG89XCJzaWduaW5cIiBjbGFzc05hbWU9XCJzaWduSW5cIj5zaWduIGluPC9MaW5rPlxuICAgICAgICAgIDxMaW5rIHRvPVwiL1wiIGNsYXNzTmFtZT1cImpvaW5Sb29tXCI+am9pbiBhIHJvb208L0xpbms+XG4gICAgICAgICAgPExpbmsgdG89XCJzaWdudXBcIiBjbGFzc05hbWU9XCJzaWdudXBcIj5zaWduIHVwPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJyb29tRm9ybVwiPlxuICAgICAgICA8aW5wdXQgbmFtZT1cInJvb21pZFwiIGlkPVwicm9vbWlkXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB0aGUgcm9vbSBJRFwiIGNsYXNzTmFtZT1cInJvb21JbnB1dFwiIC8+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lVmlldztcblxuIl19