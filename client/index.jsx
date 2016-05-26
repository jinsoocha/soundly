ReactDOM.render((
	<Router>
		<Route path="/" component={App}>
			<Route path="search" component={SearchView} />	
		</Route>	
	</Router>
), document.getElementById("app"));