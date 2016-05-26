ReactDOM.render((
	<Router>
  	<Route path="/" component={App} />
    <Route path="queue" component={Queue} />
	</Router>
), document.getElementById("app"));