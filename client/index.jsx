//  Router and Route is a ReactRouter method
//  Route connects a certain url path with a specific component we have set up
//  SearchResultView component becomes a child of the App component with an indentation
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import QueueView from './components/QueueView';
import SearchView from './components/SearchView';

const app = document.getElementById('app');
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <Route path="queue" component={QueueView} />
      <Route path="search" component={SearchView} />
    </Route>
  </Router>
), app);
