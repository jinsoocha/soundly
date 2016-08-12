'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QueueEntryView = require('./QueueEntryView');

var _QueueEntryView2 = _interopRequireDefault(_QueueEntryView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueueView = function QueueView(props) {
  var queue = props.queue;
  var upvoteArt = '/styles/imgs/upvote.png';
  var downvoteArt = '/styles/imgs/downvote.png';

  console.log('current queue =>', queue);
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('img', { className: 'upvoteMsg', src: upvoteArt, alt: 'upvoteMsg' }),
    _react2.default.createElement('img', { className: 'downvoteMsg', src: downvoteArt, alt: 'downvoteMsg' }),
    _react2.default.createElement(
      'div',
      { className: 'queueBox' },
      queue.map(function (song, i) {
        return _react2.default.createElement(_QueueEntryView2.default, {
          key: i,
          index: i,
          song: song,
          upVote: props.upVote,
          downVote: props.downVote
        });
      })
    )
  );
};

exports.default = QueueView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1F1ZXVlVmlldy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxZQUFZLFNBQVosU0FBWSxDQUFDLEtBQUQsRUFBVztBQUMzQixNQUFNLFFBQVEsTUFBTSxLQUFwQjtBQUNBLE1BQU0sWUFBWSx5QkFBbEI7QUFDQSxNQUFNLGNBQWMsMkJBQXBCOztBQUVBLFVBQVEsR0FBUixDQUFZLGtCQUFaLEVBQWdDLEtBQWhDO0FBQ0EsU0FDRTtBQUFBO0lBQUE7SUFDRSx1Q0FBSyxXQUFVLFdBQWYsRUFBMkIsS0FBSyxTQUFoQyxFQUEyQyxLQUFJLFdBQS9DLEdBREY7SUFFRSx1Q0FBSyxXQUFVLGFBQWYsRUFBNkIsS0FBSyxXQUFsQyxFQUErQyxLQUFJLGFBQW5ELEdBRkY7SUFHRTtBQUFBO01BQUEsRUFBSyxXQUFVLFVBQWY7TUFDRyxNQUFNLEdBQU4sQ0FBVSxVQUFDLElBQUQsRUFBTyxDQUFQO0FBQUEsZUFDVDtBQUNFLGVBQUssQ0FEUDtBQUVFLGlCQUFPLENBRlQ7QUFHRSxnQkFBTSxJQUhSO0FBSUUsa0JBQVEsTUFBTSxNQUpoQjtBQUtFLG9CQUFVLE1BQU07QUFMbEIsVUFEUztBQUFBLE9BQVY7QUFESDtBQUhGLEdBREY7QUFpQkQsQ0F2QkQ7O2tCQXlCZSxTIiwiZmlsZSI6IlF1ZXVlVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUXVldWVFbnRyeVZpZXcgZnJvbSAnLi9RdWV1ZUVudHJ5Vmlldyc7XG5cbmNvbnN0IFF1ZXVlVmlldyA9IChwcm9wcykgPT4ge1xuICBjb25zdCBxdWV1ZSA9IHByb3BzLnF1ZXVlO1xuICBjb25zdCB1cHZvdGVBcnQgPSAnL3N0eWxlcy9pbWdzL3Vwdm90ZS5wbmcnO1xuICBjb25zdCBkb3dudm90ZUFydCA9ICcvc3R5bGVzL2ltZ3MvZG93bnZvdGUucG5nJztcblxuICBjb25zb2xlLmxvZygnY3VycmVudCBxdWV1ZSA9PicsIHF1ZXVlKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGltZyBjbGFzc05hbWU9XCJ1cHZvdGVNc2dcIiBzcmM9e3Vwdm90ZUFydH0gYWx0PVwidXB2b3RlTXNnXCIgLz5cbiAgICAgIDxpbWcgY2xhc3NOYW1lPVwiZG93bnZvdGVNc2dcIiBzcmM9e2Rvd252b3RlQXJ0fSBhbHQ9XCJkb3dudm90ZU1zZ1wiIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1ZXVlQm94XCI+XG4gICAgICAgIHtxdWV1ZS5tYXAoKHNvbmcsIGkpID0+XG4gICAgICAgICAgPFF1ZXVlRW50cnlWaWV3XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBpbmRleD17aX1cbiAgICAgICAgICAgIHNvbmc9e3Nvbmd9XG4gICAgICAgICAgICB1cFZvdGU9e3Byb3BzLnVwVm90ZX1cbiAgICAgICAgICAgIGRvd25Wb3RlPXtwcm9wcy5kb3duVm90ZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFF1ZXVlVmlldztcbiJdfQ==