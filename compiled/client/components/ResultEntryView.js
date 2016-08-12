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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1Jlc3VsdEVudHJ5Vmlldy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLENBQUMsS0FBRCxFQUFXO0FBQ2pDLE1BQU0sY0FBYyxTQUFkLFdBQWMsQ0FBQyxDQUFELEVBQU87QUFDekIsTUFBRSxjQUFGO0FBQ0EsVUFBTSxTQUFOLENBQWdCLE1BQU0sS0FBdEI7QUFDRCxHQUhEO0FBRGlDLE1BS3pCLEtBTHlCLEdBS2YsS0FMZSxDQUt6QixLQUx5Qjs7QUFNakMsTUFBTSxhQUFhLDZCQUFuQjs7QUFFQSxTQUNFO0FBQUE7SUFBQSxFQUFLLFNBQVMsV0FBZCxFQUEyQixXQUFVLGFBQXJDO0lBQ0U7QUFBQTtNQUFBLEVBQUssV0FBVSxRQUFmO01BQ0UsdUNBQUssS0FBSyxNQUFNLFdBQU4sSUFBcUIsVUFBL0IsRUFBMkMsS0FBSSxTQUEvQyxFQUF5RCxXQUFVLFdBQW5FLEdBREY7TUFFRTtBQUFBO1FBQUEsRUFBSyxXQUFVLGVBQWY7UUFDRTtBQUFBO1VBQUEsRUFBSyxXQUFVLGFBQWY7VUFBOEIsTUFBTTtBQUFwQztBQURGO0FBRkY7QUFERixHQURGO0FBVUQsQ0FsQkQ7O2tCQW9CZSxlIiwiZmlsZSI6IlJlc3VsdEVudHJ5Vmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFJlc3VsdEVudHJ5VmlldyA9IChwcm9wcykgPT4ge1xuICBjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHByb3BzLmNsaWNrU29uZyhwcm9wcy50cmFjayk7XG4gIH07XG4gIGNvbnN0IHsgdHJhY2sgfSA9IHByb3BzO1xuICBjb25zdCBkZWZhdWx0QXJ0ID0gJy9zdHlsZXMvaW1ncy9kZWZhdWx0YXJ0LnBuZyc7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IG9uQ2xpY2s9e2hhbmRsZUNsaWNrfSBjbGFzc05hbWU9XCJyZXN1bHRFbnRyeVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXJcIj5cbiAgICAgICAgPGltZyBzcmM9e3RyYWNrLmFydHdvcmtfdXJsIHx8IGRlZmF1bHRBcnR9IGFsdD1cImFydHdvcmtcIiBjbGFzc05hbWU9XCJyZXN1bHRJbWdcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlc3VsdERldGFpbHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlc3VsdFRpdGxlXCI+e3RyYWNrLnRpdGxlfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0RW50cnlWaWV3O1xuIl19