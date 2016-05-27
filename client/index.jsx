ReactDOM.render((
	<Router>
		<Route path="/" component={App}>
			<Route path="search" component={SearchResultView} />	
		</Route>	
	</Router>
), document.getElementById("app"));