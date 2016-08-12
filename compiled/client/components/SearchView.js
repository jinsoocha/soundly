'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchView = function SearchView(props) {
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmit(document.getElementById("searchInput").value);
  };
  var searchLogo = '/styles/imgs/searchLogo.svg';
  return _react2.default.createElement(
    'form',
    { onSubmit: handleSubmit, className: 'searchBox' },
    _react2.default.createElement('input', { type: 'text', id: 'searchInput', placeholder: 'Search from artists, bands, tracks, podcasts', className: 'searchInput', required: true }),
    _react2.default.createElement('input', { type: 'image', src: searchLogo, className: 'searchLogo' })
  );
}; //  SearchView renders the input bar and sends the search input to the server on submit.
exports.default = SearchView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1NlYXJjaFZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGFBQWEsU0FBYixVQUFhLENBQUMsS0FBRCxFQUFXO0FBQzVCLE1BQU0sZUFBZSxTQUFmLFlBQWUsQ0FBQyxDQUFELEVBQU87QUFDMUIsTUFBRSxjQUFGO0FBQ0EsVUFBTSxZQUFOLENBQW1CLFNBQVMsY0FBVCxDQUF3QixhQUF4QixFQUF1QyxLQUExRDtBQUNELEdBSEQ7QUFJQSxNQUFNLGFBQWEsNkJBQW5CO0FBQ0EsU0FDRTtBQUFBO0FBQUEsTUFBTSxVQUFVLFlBQWhCLEVBQThCLFdBQVUsV0FBeEM7QUFDRSw2Q0FBTyxNQUFLLE1BQVosRUFBbUIsSUFBRyxhQUF0QixFQUFvQyxhQUFZLDhDQUFoRCxFQUErRixXQUFVLGFBQXpHLEVBQXVILGNBQXZILEdBREY7QUFFRSw2Q0FBTyxNQUFLLE9BQVosRUFBb0IsS0FBSyxVQUF6QixFQUFxQyxXQUFVLFlBQS9DO0FBRkYsR0FERjtBQU1ELENBWkQsQyxDQUhBO2tCQWlCZSxVIiwiZmlsZSI6IlNlYXJjaFZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgU2VhcmNoVmlldyByZW5kZXJzIHRoZSBpbnB1dCBiYXIgYW5kIHNlbmRzIHRoZSBzZWFyY2ggaW5wdXQgdG8gdGhlIHNlcnZlciBvbiBzdWJtaXQuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBTZWFyY2hWaWV3ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHByb3BzLmhhbmRsZVN1Ym1pdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaElucHV0XCIpLnZhbHVlKTtcbiAgfTtcbiAgY29uc3Qgc2VhcmNoTG9nbyA9ICcvc3R5bGVzL2ltZ3Mvc2VhcmNoTG9nby5zdmcnO1xuICByZXR1cm4gKFxuICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cInNlYXJjaEJveFwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJzZWFyY2hJbnB1dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGZyb20gYXJ0aXN0cywgYmFuZHMsIHRyYWNrcywgcG9kY2FzdHNcIiBjbGFzc05hbWU9XCJzZWFyY2hJbnB1dFwiIHJlcXVpcmVkIC8+XG4gICAgICA8aW5wdXQgdHlwZT1cImltYWdlXCIgc3JjPXtzZWFyY2hMb2dvfSBjbGFzc05hbWU9XCJzZWFyY2hMb2dvXCIgLz5cbiAgICA8L2Zvcm0+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hWaWV3O1xuIl19