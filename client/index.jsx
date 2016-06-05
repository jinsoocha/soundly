//  Router and Route is a ReactRouter method
//  Route connects a certain url path with a specific component we have set up
//  SearchResultView component becomes a child of the App component with an indentation
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import SignupView from './components/SignupView';
import SigninView from './components/SigninView';


const app = document.getElementById('app');
ReactDOM.render((
<Router history={ hashHistory }>
  <Route path="/" component={ SignupView } >
    <Route path="/main" name="main" component={ App } />
    <Route path="/signin" name="signup" component={ SigninView } />
  </Route>
</Router>
), app);
