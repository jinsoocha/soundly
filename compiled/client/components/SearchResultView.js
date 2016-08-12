'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchView = require('./SearchView');

var _SearchView2 = _interopRequireDefault(_SearchView);

var _ResultView = require('./ResultView');

var _ResultView2 = _interopRequireDefault(_ResultView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //  SearchResultView is a parent view of SearchView and ResultView
//  This view manages the data flow between SearchView and ResultView


var SearchResultView = function (_React$Component) {
  _inherits(SearchResultView, _React$Component);

  function SearchResultView(props) {
    _classCallCheck(this, SearchResultView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchResultView).call(this, props));

    _this.state = {
      tracks: []
    };
    return _this;
  }

  _createClass(SearchResultView, [{
    key: 'handleGetTracks',
    value: function handleGetTracks(tracks) {
      this.setState({ tracks: tracks });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_SearchView2.default, { getTracks: this.handleGetTracks.bind(this) }),
        _react2.default.createElement(_ResultView2.default, { tracks: this.state.tracks, clickSong: this.props.clickSong })
      );
    }
  }]);

  return SearchResultView;
}(_react2.default.Component);

exports.default = SearchResultView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1NlYXJjaFJlc3VsdFZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQixnQjs7O0FBQ25CLDRCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxvR0FDWCxLQURXOztBQUVqQixVQUFLLEtBQUwsR0FBYTtBQUNYLGNBQVE7QUFERyxLQUFiO0FBRmlCO0FBS2xCOzs7O29DQUVlLE0sRUFBUTtBQUN0QixXQUFLLFFBQUwsQ0FBYyxFQUFFLGNBQUYsRUFBZDtBQUNEOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7UUFBQTtRQUNFLHNEQUFZLFdBQVcsS0FBSyxlQUFMLENBQXFCLElBQXJCLENBQTBCLElBQTFCLENBQXZCLEdBREY7UUFFRSxzREFBWSxRQUFRLEtBQUssS0FBTCxDQUFXLE1BQS9CLEVBQXVDLFdBQVcsS0FBSyxLQUFMLENBQVcsU0FBN0Q7QUFGRixPQURGO0FBTUQ7Ozs7RUFuQjJDLGdCQUFNLFM7O2tCQUEvQixnQiIsImZpbGUiOiJTZWFyY2hSZXN1bHRWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIFNlYXJjaFJlc3VsdFZpZXcgaXMgYSBwYXJlbnQgdmlldyBvZiBTZWFyY2hWaWV3IGFuZCBSZXN1bHRWaWV3XG4vLyAgVGhpcyB2aWV3IG1hbmFnZXMgdGhlIGRhdGEgZmxvdyBiZXR3ZWVuIFNlYXJjaFZpZXcgYW5kIFJlc3VsdFZpZXdcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VhcmNoVmlldyBmcm9tICcuL1NlYXJjaFZpZXcnO1xuaW1wb3J0IFJlc3VsdFZpZXcgZnJvbSAnLi9SZXN1bHRWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoUmVzdWx0VmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0cmFja3M6IFtdLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVHZXRUcmFja3ModHJhY2tzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRyYWNrcyB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFNlYXJjaFZpZXcgZ2V0VHJhY2tzPXt0aGlzLmhhbmRsZUdldFRyYWNrcy5iaW5kKHRoaXMpfS8+XG4gICAgICAgIDxSZXN1bHRWaWV3IHRyYWNrcz17dGhpcy5zdGF0ZS50cmFja3N9IGNsaWNrU29uZz17dGhpcy5wcm9wcy5jbGlja1Nvbmd9Lz5cbiAgICAgIDwvZGl2PlxuXHRcdCk7XG4gIH1cbn1cblxuIl19