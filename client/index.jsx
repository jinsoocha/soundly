ReactDOM.render((
	<Router>
  	<Route path="/" component={App} />
    <Route path="queue" component={QueueView} />
	</Router>
), document.getElementById("app"));