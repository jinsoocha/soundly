'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _SignupView = require('./components/SignupView');

var _SignupView2 = _interopRequireDefault(_SignupView);

var _SigninView = require('./components/SigninView');

var _SigninView2 = _interopRequireDefault(_SigninView);

var _HomeView = require('./components/HomeView');

var _HomeView2 = _interopRequireDefault(_HomeView);

var _ParentView = require('./components/ParentView');

var _ParentView2 = _interopRequireDefault(_ParentView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  Router and Route is a ReactRouter method
//  Route connects a certain url path with a specific component we have set up
//  SearchResultView component becomes a child of the App component with an indentation


var app = document.getElementById('app');
(0, _reactDom.render)(_react2.default.createElement(
  _reactRouter.Router,
  null,
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _ParentView2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _HomeView2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'signin', component: _SigninView2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'signup', component: _SignupView2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'main/:roomID', component: _App2.default })
  )
), app);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxNQUFNLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUFaO0FBQ0Esc0JBQ0U7QUFBQTtFQUFBO0VBQ0U7QUFBQTtJQUFBLEVBQU8sTUFBSyxHQUFaLEVBQWdCLCtCQUFoQjtJQUNFLHlEQUFZLDZCQUFaLEdBREY7SUFFRSxvREFBTyxNQUFLLFFBQVosRUFBcUIsK0JBQXJCLEdBRkY7SUFHRSxvREFBTyxNQUFLLFFBQVosRUFBcUIsK0JBQXJCLEdBSEY7SUFJRSxvREFBTyxNQUFLLGNBQVosRUFBMkIsd0JBQTNCO0FBSkY7QUFERixDQURGLEVBU0csR0FUSCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICBSb3V0ZXIgYW5kIFJvdXRlIGlzIGEgUmVhY3RSb3V0ZXIgbWV0aG9kXG4vLyAgUm91dGUgY29ubmVjdHMgYSBjZXJ0YWluIHVybCBwYXRoIHdpdGggYSBzcGVjaWZpYyBjb21wb25lbnQgd2UgaGF2ZSBzZXQgdXBcbi8vICBTZWFyY2hSZXN1bHRWaWV3IGNvbXBvbmVudCBiZWNvbWVzIGEgY2hpbGQgb2YgdGhlIEFwcCBjb21wb25lbnQgd2l0aCBhbiBpbmRlbnRhdGlvblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBicm93c2VySGlzdG9yeSwgSW5kZXhSb3V0ZSwgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJztcbmltcG9ydCBTaWdudXBWaWV3IGZyb20gJy4vY29tcG9uZW50cy9TaWdudXBWaWV3JztcbmltcG9ydCBTaWduaW5WaWV3IGZyb20gJy4vY29tcG9uZW50cy9TaWduaW5WaWV3JztcbmltcG9ydCBIb21lVmlldyBmcm9tICcuL2NvbXBvbmVudHMvSG9tZVZpZXcnO1xuaW1wb3J0IFBhcmVudFZpZXcgZnJvbSAnLi9jb21wb25lbnRzL1BhcmVudFZpZXcnO1xuXG5cbmNvbnN0IGFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcbnJlbmRlcigoXG4gIDxSb3V0ZXI+XG4gICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtQYXJlbnRWaWV3fT5cbiAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17SG9tZVZpZXd9IC8+XG4gICAgICA8Um91dGUgcGF0aD1cInNpZ25pblwiIGNvbXBvbmVudD17U2lnbmluVmlld30gLz5cbiAgICAgIDxSb3V0ZSBwYXRoPVwic2lnbnVwXCIgY29tcG9uZW50PXtTaWdudXBWaWV3fSAvPlxuICAgICAgPFJvdXRlIHBhdGg9XCJtYWluLzpyb29tSURcIiBjb21wb25lbnQ9e0FwcH0gLz5cbiAgICA8L1JvdXRlPlxuICA8L1JvdXRlcj5cbiksIGFwcCk7XG4iXX0=