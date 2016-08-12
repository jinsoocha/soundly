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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9jb21wb25lbnRzL1NlYXJjaFZpZXcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGFBQWEsU0FBYixVQUFhLENBQUMsS0FBRCxFQUFXO0FBQzVCLE1BQU0sZUFBZSxTQUFmLFlBQWUsQ0FBQyxDQUFELEVBQU87QUFDMUIsTUFBRSxjQUFGO0FBQ0EsVUFBTSxZQUFOLENBQW1CLFNBQVMsY0FBVCxDQUF3QixhQUF4QixFQUF1QyxLQUExRDtBQUNELEdBSEQ7QUFJQSxNQUFNLGFBQWEsNkJBQW5CO0FBQ0EsU0FDRTtBQUFBO0lBQUEsRUFBTSxVQUFVLFlBQWhCLEVBQThCLFdBQVUsV0FBeEM7SUFDRSx5Q0FBTyxNQUFLLE1BQVosRUFBbUIsSUFBRyxhQUF0QixFQUFvQyxhQUFZLDhDQUFoRCxFQUErRixXQUFVLGFBQXpHLEVBQXVILGNBQXZILEdBREY7SUFFRSx5Q0FBTyxNQUFLLE9BQVosRUFBb0IsS0FBSyxVQUF6QixFQUFxQyxXQUFVLFlBQS9DO0FBRkYsR0FERjtBQU1ELENBWkQsQzs7O2tCQWNlLFUiLCJmaWxlIjoiU2VhcmNoVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICBTZWFyY2hWaWV3IHJlbmRlcnMgdGhlIGlucHV0IGJhciBhbmQgc2VuZHMgdGhlIHNlYXJjaCBpbnB1dCB0byB0aGUgc2VydmVyIG9uIHN1Ym1pdC5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IFNlYXJjaFZpZXcgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcHJvcHMuaGFuZGxlU3VibWl0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoSW5wdXRcIikudmFsdWUpO1xuICB9O1xuICBjb25zdCBzZWFyY2hMb2dvID0gJy9zdHlsZXMvaW1ncy9zZWFyY2hMb2dvLnN2Zyc7XG4gIHJldHVybiAoXG4gICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwic2VhcmNoQm94XCI+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInNlYXJjaElucHV0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZnJvbSBhcnRpc3RzLCBiYW5kcywgdHJhY2tzLCBwb2RjYXN0c1wiIGNsYXNzTmFtZT1cInNlYXJjaElucHV0XCIgcmVxdWlyZWQgLz5cbiAgICAgIDxpbnB1dCB0eXBlPVwiaW1hZ2VcIiBzcmM9e3NlYXJjaExvZ299IGNsYXNzTmFtZT1cInNlYXJjaExvZ29cIiAvPlxuICAgIDwvZm9ybT5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFZpZXc7XG4iXX0=