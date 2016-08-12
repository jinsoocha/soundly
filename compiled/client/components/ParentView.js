'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParentView = function ParentView(props) {
  return _react2.default.createElement(
    'div',
    { className: 'parentView' },
    _react2.default.createElement(
      'div',
      null,
      props.children
    )
  );
};

exports.default = ParentView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1BhcmVudFZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNLGFBQWEsU0FBYixVQUFhLENBQUMsS0FBRDtBQUFBLFNBQ2pCO0FBQUE7QUFBQSxNQUFLLFdBQVUsWUFBZjtBQUNFO0FBQUE7QUFBQTtBQUFNLFlBQU07QUFBWjtBQURGLEdBRGlCO0FBQUEsQ0FBbkI7O2tCQU1lLFUiLCJmaWxlIjoiUGFyZW50Vmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcblxuY29uc3QgUGFyZW50VmlldyA9IChwcm9wcykgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cInBhcmVudFZpZXdcIj5cbiAgICA8ZGl2Pntwcm9wcy5jaGlsZHJlbn08L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBQYXJlbnRWaWV3O1xuIl19