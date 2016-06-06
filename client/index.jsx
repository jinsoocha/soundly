//  Router and Route is a ReactRouter method
//  Route connects a certain url path with a specific component we have set up
//  SearchResultView component becomes a child of the App component with an indentation
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import SignupView from './components/SignupView';
import SigninView from './components/SigninView';
import HomeView from './components/HomeView';
import ParentView from './components/ParentView';


const app = document.getElementById('app');
render((
  <Router history={browserHistory}>
    <Route path="/" component={ParentView}>
      <IndexRoute component={HomeView} />
      <Route path="signin" component={SigninView} />
      <Route path="signup" component={SignupView} />
      <Route path="main/:roomID" component={App} />
    </Route>
  </Router>
), app);
