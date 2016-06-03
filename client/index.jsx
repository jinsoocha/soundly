//  Router and Route is a ReactRouter method
//  Route connects a certain url path with a specific component we have set up
//  SearchResultView component becomes a child of the App component with an indentation
const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'queue',
     component: QueueView },
    { path: 'search',
     component: SearchView },
    { path: 'signup',
     component: SignupView },
  ],
};

ReactDOM.render((
  <Router routes={routes} />
), document.getElementById("app"));

      // <Route path="signup" component={SignupView} />
      // <Route path="login" component={LoginView} />

