'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResultEntryView = function ResultEntryView(props) {
  var handleClick = function handleClick(e) {
    e.preventDefault();
    props.clickSong(props.track);
  };
  var track = props.track;

  var defaultArt = '/styles/imgs/defaultart.png';

  return _react2.default.createElement(
    'div',
    { onClick: handleClick, className: 'resultEntry' },
    _react2.default.createElement(
      'div',
      { className: 'border' },
      _react2.default.createElement('img', { src: track.artwork_url || defaultArt, alt: 'artwork', className: 'resultImg' }),
      _react2.default.createElement(
        'div',
        { className: 'resultDetails' },
        _react2.default.createElement(
          'div',
          { className: 'resultTitle' },
          track.title
        )
      )
    )
  );
};

exports.default = ResultEntryView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1Jlc3VsdEVudHJ5Vmlldy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsS0FBRCxFQUFXO0FBQ2pDLE1BQU0sY0FBYyxTQUFkLFdBQWMsQ0FBQyxDQUFELEVBQU87QUFDekIsTUFBRSxjQUFGO0FBQ0EsVUFBTSxTQUFOLENBQWdCLE1BQU0sS0FBdEI7QUFDRCxHQUhEO0FBRGlDLE1BS3pCLEtBTHlCLEdBS2YsS0FMZSxDQUt6QixLQUx5Qjs7QUFNakMsTUFBTSxhQUFhLDZCQUFuQjs7QUFFQSxTQUNFO0FBQUE7QUFBQSxNQUFLLFNBQVMsV0FBZCxFQUEyQixXQUFVLGFBQXJDO0FBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxRQUFmO0FBQ0UsNkNBQUssS0FBSyxNQUFNLFdBQU4sSUFBcUIsVUFBL0IsRUFBMkMsS0FBSSxTQUEvQyxFQUF5RCxXQUFVLFdBQW5FLEdBREY7QUFFRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGVBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGFBQWY7QUFBOEIsZ0JBQU07QUFBcEM7QUFERjtBQUZGO0FBREYsR0FERjtBQVVELENBbEJEOztrQkFvQmUsZSIsImZpbGUiOiJSZXN1bHRFbnRyeVZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBSZXN1bHRFbnRyeVZpZXcgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBwcm9wcy5jbGlja1NvbmcocHJvcHMudHJhY2spO1xuICB9O1xuICBjb25zdCB7IHRyYWNrIH0gPSBwcm9wcztcbiAgY29uc3QgZGVmYXVsdEFydCA9ICcvc3R5bGVzL2ltZ3MvZGVmYXVsdGFydC5wbmcnO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBvbkNsaWNrPXtoYW5kbGVDbGlja30gY2xhc3NOYW1lPVwicmVzdWx0RW50cnlcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyXCI+XG4gICAgICAgIDxpbWcgc3JjPXt0cmFjay5hcnR3b3JrX3VybCB8fCBkZWZhdWx0QXJ0fSBhbHQ9XCJhcnR3b3JrXCIgY2xhc3NOYW1lPVwicmVzdWx0SW1nXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHREZXRhaWxzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRUaXRsZVwiPnt0cmFjay50aXRsZX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3VsdEVudHJ5VmlldztcbiJdfQ==