ReactDOM.render((
	<Router>
  	<Route path="/" component={App} />
    	<Route path="queue" component={QueueView} />
			<Route path="search" component={SearchView} />	
		</Route>	
	</Router>
), document.getElementById("app"));