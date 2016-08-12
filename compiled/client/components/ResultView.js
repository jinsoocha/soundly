'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ResultEntryView = require('./ResultEntryView');

var _ResultEntryView2 = _interopRequireDefault(_ResultEntryView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ResultView shows the search results

// passing in the key to the childview is mandatory in React
// Without key, you will get a warning in console.


var ResultView = function ResultView(props) {
  var tracks = props.tracks;
  var keyword = props.keyword;
  var clickSong = props.clickSong;

  var searchResult = keyword ? _react2.default.createElement(
    'div',
    { className: 'searchKeyword' },
    _react2.default.createElement(
      'span',
      { className: 'searchSpan' },
      'Search results for'
    ),
    ' "',
    keyword,
    '"'
  ) : '';
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'songAdded' },
      'Song is added to the queue'
    ),
    _react2.default.createElement(
      'div',
      { className: 'notAdded' },
      'Song is already in the queue'
    ),
    _react2.default.createElement(
      'div',
      { className: 'resultBox' },
      searchResult,
      tracks.map(function (track) {
        return _react2.default.createElement(_ResultEntryView2.default, {
          key: track.id,
          track: track,
          clickSong: clickSong
        });
      })
    )
  );
};

exports.default = ResultView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1Jlc3VsdFZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUdBLElBQU0sYUFBYSxTQUFiLFVBQWEsQ0FBQyxLQUFELEVBQVc7QUFBQSxNQUNwQixNQURvQixHQUNXLEtBRFgsQ0FDcEIsTUFEb0I7QUFBQSxNQUNaLE9BRFksR0FDVyxLQURYLENBQ1osT0FEWTtBQUFBLE1BQ0gsU0FERyxHQUNXLEtBRFgsQ0FDSCxTQURHOztBQUU1QixNQUFNLGVBQWUsVUFBVTtBQUFBO0lBQUEsRUFBSyxXQUFVLGVBQWY7SUFBK0I7QUFBQTtNQUFBLEVBQU0sV0FBVSxZQUFoQjtNQUFBO0FBQUEsS0FBL0I7SUFBQTtJQUF5RixPQUF6RjtJQUFBO0FBQUEsR0FBVixHQUFzSCxFQUEzSTtBQUNBLFNBQ0U7QUFBQTtJQUFBO0lBQ0U7QUFBQTtNQUFBLEVBQUssV0FBVSxXQUFmO01BQUE7QUFBQSxLQURGO0lBRUU7QUFBQTtNQUFBLEVBQUssV0FBVSxVQUFmO01BQUE7QUFBQSxLQUZGO0lBR0U7QUFBQTtNQUFBLEVBQUssV0FBVSxXQUFmO01BQ0csWUFESDtNQUVELE9BQU8sR0FBUCxDQUFXLFVBQUMsS0FBRDtBQUFBLGVBQ047QUFDRSxlQUFLLE1BQU0sRUFEYjtBQUVFLGlCQUFPLEtBRlQ7QUFHRSxxQkFBVztBQUhiLFVBRE07QUFBQSxPQUFYO0FBRkM7QUFIRixHQURGO0FBZ0JELENBbkJEOztrQkFxQmUsVSIsImZpbGUiOiJSZXN1bHRWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUmVzdWx0VmlldyBzaG93cyB0aGUgc2VhcmNoIHJlc3VsdHNcblxuLy8gcGFzc2luZyBpbiB0aGUga2V5IHRvIHRoZSBjaGlsZHZpZXcgaXMgbWFuZGF0b3J5IGluIFJlYWN0XG4vLyBXaXRob3V0IGtleSwgeW91IHdpbGwgZ2V0IGEgd2FybmluZyBpbiBjb25zb2xlLlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZXN1bHRFbnRyeVZpZXcgZnJvbSAnLi9SZXN1bHRFbnRyeVZpZXcnO1xuXG5cbmNvbnN0IFJlc3VsdFZpZXcgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyB0cmFja3MsIGtleXdvcmQsIGNsaWNrU29uZyB9ID0gcHJvcHM7XG4gIGNvbnN0IHNlYXJjaFJlc3VsdCA9IGtleXdvcmQgPyA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaEtleXdvcmRcIj48c3BhbiBjbGFzc05hbWU9XCJzZWFyY2hTcGFuXCI+U2VhcmNoIHJlc3VsdHMgZm9yPC9zcGFuPiBcInsga2V5d29yZCB9XCI8L2Rpdj4gOiAnJztcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzb25nQWRkZWRcIj5Tb25nIGlzIGFkZGVkIHRvIHRoZSBxdWV1ZTwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3RBZGRlZFwiPlNvbmcgaXMgYWxyZWFkeSBpbiB0aGUgcXVldWU8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0Qm94XCI+XG4gICAgICAgIHtzZWFyY2hSZXN1bHR9XG5cdFx0XHRcdHt0cmFja3MubWFwKCh0cmFjaykgPT5cbiAgICAgICAgICA8UmVzdWx0RW50cnlWaWV3XG4gICAgICAgICAgICBrZXk9e3RyYWNrLmlkfVxuICAgICAgICAgICAgdHJhY2s9e3RyYWNrfVxuICAgICAgICAgICAgY2xpY2tTb25nPXtjbGlja1Nvbmd9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0VmlldztcbiJdfQ==