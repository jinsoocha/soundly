class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
			<div>
				<h1>
				AppView
				</h1>
				<div>
				<Link to="/">Home</Link>
				</div>
				<div>
				<Link to="search">Search</Link>
				</div>
				<div>
				{this.props.children}
				</div>
			</div>
		)
	}		
}

window.App = App;