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
    key: "handleUpClick",
    value: function handleUpClick(e) {
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
        { onUpClick: this.handleUpClick.bind(this) },
        this.state.count
      );
    }
  }]);

  return DownView;
}(React.Component);

window.UpView = UpView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1VwVmlldy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNLFE7OztBQUNKLG9CQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw0RkFDWCxLQURXOztBQUVqQixVQUFLLEtBQUwsR0FBYTs7QUFFWCxhQUFPO0FBRkksS0FBYjtBQUZpQjtBQU1sQjs7OztrQ0FFYSxDLEVBQUc7QUFDZixRQUFFLGNBQUY7QUFDQSxXQUFLLFFBQUwsQ0FBYztBQUNaLGVBQU8sUUFBUTtBQURILE9BQWQ7QUFHRDs7OzZCQUVTOztBQUVSLGFBQ0U7QUFBQTtRQUFBLEVBQUssV0FBVyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBaEI7UUFDRyxLQUFLLEtBQUwsQ0FBVztBQURkLE9BREY7QUFNRDs7OztFQXhCb0IsTUFBTSxTOztBQTJCN0IsT0FBTyxNQUFQLEdBQWdCLE1BQWhCIiwiZmlsZSI6IlVwVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIERvd25WaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC8vIGRvIEkgd2FudCB0byBkZWNsYXJlIHRoZSBzdGF0ZSBpbiBoZXJlLCBhbmQgc2V0IHRoZSBjaGFuZ2VcbiAgICAgIGNvdW50OiAwXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZVVwQ2xpY2soZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGNvdW50OiBjb3VudCArIDFcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBvblVwQ2xpY2s9e3RoaXMuaGFuZGxlVXBDbGljay5iaW5kKHRoaXMpfT5cbiAgICAgICAge3RoaXMuc3RhdGUuY291bnR9XG4gICAgICA8L2Rpdj5cblxuICAgICk7XG4gIH1cbn1cblxud2luZG93LlVwVmlldyA9IFVwVmlldzsiXX0=