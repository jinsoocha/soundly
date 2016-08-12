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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1Jlc3VsdFZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7OztBQUxBOztBQUVBO0FBQ0E7QUFLQSxJQUFNLGFBQWEsU0FBYixVQUFhLENBQUMsS0FBRCxFQUFXO0FBQUEsTUFDcEIsTUFEb0IsR0FDVyxLQURYLENBQ3BCLE1BRG9CO0FBQUEsTUFDWixPQURZLEdBQ1csS0FEWCxDQUNaLE9BRFk7QUFBQSxNQUNILFNBREcsR0FDVyxLQURYLENBQ0gsU0FERzs7QUFFNUIsTUFBTSxlQUFlLFVBQVU7QUFBQTtBQUFBLE1BQUssV0FBVSxlQUFmO0FBQStCO0FBQUE7QUFBQSxRQUFNLFdBQVUsWUFBaEI7QUFBQTtBQUFBLEtBQS9CO0FBQUE7QUFBeUYsV0FBekY7QUFBQTtBQUFBLEdBQVYsR0FBc0gsRUFBM0k7QUFDQSxTQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsV0FBZjtBQUFBO0FBQUEsS0FERjtBQUVFO0FBQUE7QUFBQSxRQUFLLFdBQVUsVUFBZjtBQUFBO0FBQUEsS0FGRjtBQUdFO0FBQUE7QUFBQSxRQUFLLFdBQVUsV0FBZjtBQUNHLGtCQURIO0FBRUQsYUFBTyxHQUFQLENBQVcsVUFBQyxLQUFEO0FBQUEsZUFDTjtBQUNFLGVBQUssTUFBTSxFQURiO0FBRUUsaUJBQU8sS0FGVDtBQUdFLHFCQUFXO0FBSGIsVUFETTtBQUFBLE9BQVg7QUFGQztBQUhGLEdBREY7QUFnQkQsQ0FuQkQ7O2tCQXFCZSxVIiwiZmlsZSI6IlJlc3VsdFZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBSZXN1bHRWaWV3IHNob3dzIHRoZSBzZWFyY2ggcmVzdWx0c1xuXG4vLyBwYXNzaW5nIGluIHRoZSBrZXkgdG8gdGhlIGNoaWxkdmlldyBpcyBtYW5kYXRvcnkgaW4gUmVhY3Rcbi8vIFdpdGhvdXQga2V5LCB5b3Ugd2lsbCBnZXQgYSB3YXJuaW5nIGluIGNvbnNvbGUuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlc3VsdEVudHJ5VmlldyBmcm9tICcuL1Jlc3VsdEVudHJ5Vmlldyc7XG5cblxuY29uc3QgUmVzdWx0VmlldyA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHRyYWNrcywga2V5d29yZCwgY2xpY2tTb25nIH0gPSBwcm9wcztcbiAgY29uc3Qgc2VhcmNoUmVzdWx0ID0ga2V5d29yZCA/IDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoS2V5d29yZFwiPjxzcGFuIGNsYXNzTmFtZT1cInNlYXJjaFNwYW5cIj5TZWFyY2ggcmVzdWx0cyBmb3I8L3NwYW4+IFwieyBrZXl3b3JkIH1cIjwvZGl2PiA6ICcnO1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNvbmdBZGRlZFwiPlNvbmcgaXMgYWRkZWQgdG8gdGhlIHF1ZXVlPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdEFkZGVkXCI+U29uZyBpcyBhbHJlYWR5IGluIHRoZSBxdWV1ZTwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRCb3hcIj5cbiAgICAgICAge3NlYXJjaFJlc3VsdH1cblx0XHRcdFx0e3RyYWNrcy5tYXAoKHRyYWNrKSA9PlxuICAgICAgICAgIDxSZXN1bHRFbnRyeVZpZXdcbiAgICAgICAgICAgIGtleT17dHJhY2suaWR9XG4gICAgICAgICAgICB0cmFjaz17dHJhY2t9XG4gICAgICAgICAgICBjbGlja1Nvbmc9e2NsaWNrU29uZ31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cdCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXN1bHRWaWV3O1xuIl19