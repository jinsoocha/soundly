'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueueEntryView = function QueueEntryView(props) {
  var song = props.song;

  var time = song.duration / 1000;
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  var defaultArt = '/styles/imgs/defaultart.png';
  var upvoteArt = '/styles/imgs/upvote.png';
  var downvoteArt = '/styles/imgs/downvote.png';
  var handleUpvote = function handleUpvote() {
    return props.upVote(song, props.index);
  };
  var handleDownvote = function handleDownvote() {
    return props.downVote(song, props.index);
  };

  return _react2.default.createElement(
    'div',
    { className: 'queueEntry' },
    _react2.default.createElement('img', { src: song.artwork_url || defaultArt, alt: 'artwork', className: 'queueImg' }),
    _react2.default.createElement(
      'div',
      { className: 'queueDetails' },
      _react2.default.createElement(
        'div',
        { className: 'queueTitle' },
        song.title
      ),
      _react2.default.createElement(
        'div',
        { className: 'queueDuration' },
        minutes,
        ':',
        seconds > 9 ? seconds : "0" + seconds
      ),
      _react2.default.createElement(
        'div',
        { className: 'voting' },
        _react2.default.createElement(
          'div',
          { onClick: handleUpvote, className: 'upvote' },
          _react2.default.createElement('img', { src: upvoteArt, alt: 'Upvote' }),
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'voteNum' },
            song.upvotes
          )
        ),
        _react2.default.createElement(
          'div',
          { onClick: handleDownvote, className: 'downvote' },
          _react2.default.createElement('img', { src: downvoteArt, alt: 'Downvote' }),
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'voteNum' },
            song.downvotes
          )
        )
      )
    )
  );
};

exports.default = QueueEntryView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1F1ZXVlRW50cnlWaWV3LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTSxpQkFBaUIsU0FBakIsY0FBaUIsQ0FBQyxLQUFELEVBQVc7QUFBQSxNQUN4QixJQUR3QixHQUNmLEtBRGUsQ0FDeEIsSUFEd0I7O0FBRWhDLE1BQU0sT0FBTyxLQUFLLFFBQUwsR0FBZ0IsSUFBN0I7QUFDQSxNQUFNLFVBQVUsS0FBSyxLQUFMLENBQVcsT0FBTyxFQUFsQixDQUFoQjtBQUNBLE1BQU0sVUFBVSxLQUFLLEtBQUwsQ0FBVyxPQUFPLEVBQWxCLENBQWhCO0FBQ0EsTUFBTSxhQUFhLDZCQUFuQjtBQUNBLE1BQU0sWUFBWSx5QkFBbEI7QUFDQSxNQUFNLGNBQWMsMkJBQXBCO0FBQ0EsTUFBTSxlQUFlLFNBQWYsWUFBZTtBQUFBLFdBQU0sTUFBTSxNQUFOLENBQWEsSUFBYixFQUFtQixNQUFNLEtBQXpCLENBQU47QUFBQSxHQUFyQjtBQUNBLE1BQU0saUJBQWlCLFNBQWpCLGNBQWlCO0FBQUEsV0FBTSxNQUFNLFFBQU4sQ0FBZSxJQUFmLEVBQXFCLE1BQU0sS0FBM0IsQ0FBTjtBQUFBLEdBQXZCOztBQUVBLFNBQ0U7QUFBQTtBQUFBLE1BQUssV0FBVSxZQUFmO0FBQ0UsMkNBQUssS0FBSyxLQUFLLFdBQUwsSUFBb0IsVUFBOUIsRUFBMEMsS0FBSSxTQUE5QyxFQUF3RCxXQUFVLFVBQWxFLEdBREY7QUFFRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGNBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFlBQWY7QUFBNkIsYUFBSztBQUFsQyxPQURGO0FBRUU7QUFBQTtBQUFBLFVBQUssV0FBVSxlQUFmO0FBQWdDLGVBQWhDO0FBQUE7QUFBMEMsa0JBQVUsQ0FBVixHQUFjLE9BQWQsR0FBd0IsTUFBTTtBQUF4RSxPQUZGO0FBR0U7QUFBQTtBQUFBLFVBQUssV0FBVSxRQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssU0FBUyxZQUFkLEVBQTRCLFdBQVUsUUFBdEM7QUFBK0MsaURBQUssS0FBSyxTQUFWLEVBQXFCLEtBQUksUUFBekIsR0FBL0M7QUFBQTtBQUFtRjtBQUFBO0FBQUEsY0FBTSxXQUFVLFNBQWhCO0FBQTJCLGlCQUFLO0FBQWhDO0FBQW5GLFNBREY7QUFFRTtBQUFBO0FBQUEsWUFBSyxTQUFTLGNBQWQsRUFBOEIsV0FBVSxVQUF4QztBQUFtRCxpREFBSyxLQUFLLFdBQVYsRUFBdUIsS0FBSSxVQUEzQixHQUFuRDtBQUFBO0FBQTJGO0FBQUE7QUFBQSxjQUFNLFdBQVUsU0FBaEI7QUFBMkIsaUJBQUs7QUFBaEM7QUFBM0Y7QUFGRjtBQUhGO0FBRkYsR0FERjtBQWFELENBeEJEOztrQkEwQmUsYyIsImZpbGUiOiJRdWV1ZUVudHJ5Vmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4gIFxuY29uc3QgUXVldWVFbnRyeVZpZXcgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBzb25nIH0gPSBwcm9wcztcbiAgY29uc3QgdGltZSA9IHNvbmcuZHVyYXRpb24gLyAxMDAwO1xuICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lIC8gNjApO1xuICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcih0aW1lICUgNjApO1xuICBjb25zdCBkZWZhdWx0QXJ0ID0gJy9zdHlsZXMvaW1ncy9kZWZhdWx0YXJ0LnBuZyc7XG4gIGNvbnN0IHVwdm90ZUFydCA9ICcvc3R5bGVzL2ltZ3MvdXB2b3RlLnBuZyc7XG4gIGNvbnN0IGRvd252b3RlQXJ0ID0gJy9zdHlsZXMvaW1ncy9kb3dudm90ZS5wbmcnO1xuICBjb25zdCBoYW5kbGVVcHZvdGUgPSAoKSA9PiBwcm9wcy51cFZvdGUoc29uZywgcHJvcHMuaW5kZXgpO1xuICBjb25zdCBoYW5kbGVEb3dudm90ZSA9ICgpID0+IHByb3BzLmRvd25Wb3RlKHNvbmcsIHByb3BzLmluZGV4KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWVFbnRyeVwiPlxuICAgICAgPGltZyBzcmM9e3NvbmcuYXJ0d29ya191cmwgfHwgZGVmYXVsdEFydH0gYWx0PVwiYXJ0d29ya1wiIGNsYXNzTmFtZT1cInF1ZXVlSW1nXCIvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZURldGFpbHNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWV1ZVRpdGxlXCI+e3NvbmcudGl0bGV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVldWVEdXJhdGlvblwiPnttaW51dGVzfTp7c2Vjb25kcyA+IDkgPyBzZWNvbmRzIDogXCIwXCIgKyBzZWNvbmRzfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZvdGluZ1wiPlxuICAgICAgICAgIDxkaXYgb25DbGljaz17aGFuZGxlVXB2b3RlfSBjbGFzc05hbWU9XCJ1cHZvdGVcIj48aW1nIHNyYz17dXB2b3RlQXJ0fSBhbHQ9XCJVcHZvdGVcIi8+IDxzcGFuIGNsYXNzTmFtZT1cInZvdGVOdW1cIj57c29uZy51cHZvdGVzfTwvc3Bhbj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e2hhbmRsZURvd252b3RlfSBjbGFzc05hbWU9XCJkb3dudm90ZVwiPjxpbWcgc3JjPXtkb3dudm90ZUFydH0gYWx0PVwiRG93bnZvdGVcIi8+IDxzcGFuIGNsYXNzTmFtZT1cInZvdGVOdW1cIj57c29uZy5kb3dudm90ZXN9PC9zcGFuPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUXVldWVFbnRyeVZpZXc7Il19