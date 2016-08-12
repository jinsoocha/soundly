"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DownView = function (_React$Component) {
  _inherits(DownView, _React$Component);

  function DownView(props) {
    _classCallCheck(this, DownView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DownView).call(this, props));

    _this.state = {
      // do I want to declare the state in here, and set the change
      count: 0
    };
    return _this;
  }

  _createClass(DownView, [{
    key: "handleDownClick",
    value: function handleDownClick(e) {
      e.preventDefault();
      this.setState({
        count: count + 1
      });
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        { onDownClick: this.handleDownClick.bind(this) },
        this.state.count
      );
    }
  }]);

  return DownView;
}(React.Component);

window.DownView = DownView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL0Rvd25WaWV3LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU0sUTs7O0FBQ0osb0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBLDRGQUNYLEtBRFc7O0FBRWpCLFVBQUssS0FBTCxHQUFhOztBQUVYLGFBQU87QUFGSSxLQUFiO0FBRmlCO0FBTWxCOzs7O29DQUVlLEMsRUFBRztBQUNqQixRQUFFLGNBQUY7QUFDQSxXQUFLLFFBQUwsQ0FBYztBQUNaLGVBQU8sUUFBUTtBQURILE9BQWQ7QUFHRDs7OzZCQUVTOztBQUVSLGFBQ0U7QUFBQTtRQUFBLEVBQUssYUFBYSxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsQ0FBMEIsSUFBMUIsQ0FBbEI7UUFDRyxLQUFLLEtBQUwsQ0FBVztBQURkLE9BREY7QUFNRDs7OztFQXhCb0IsTUFBTSxTOztBQTJCN0IsT0FBTyxRQUFQLEdBQWtCLFFBQWxCIiwiZmlsZSI6IkRvd25WaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRG93blZpZXcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gZG8gSSB3YW50IHRvIGRlY2xhcmUgdGhlIHN0YXRlIGluIGhlcmUsIGFuZCBzZXQgdGhlIGNoYW5nZVxuICAgICAgY291bnQ6IDBcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlRG93bkNsaWNrKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjb3VudDogY291bnQgKyAxXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIgKCkge1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgb25Eb3duQ2xpY2s9e3RoaXMuaGFuZGxlRG93bkNsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICB7dGhpcy5zdGF0ZS5jb3VudH1cbiAgICAgIDwvZGl2PlxuXG4gICAgKTtcbiAgfVxufVxuXG53aW5kb3cuRG93blZpZXcgPSBEb3duVmlldzsiXX0=