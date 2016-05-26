class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    	searchKeywords: ''
    }
  }

	logging () {
		this.setState({searchKeywords: this.refs.searchInput.value})
		console.log(this.state.searchKeywords)
		return SC.get('/tracks', {
  		q: this.state.searchKeywords,
  		streamable: true
		}).then(function(tracks) {
	  	console.log(tracks)
		});
	}

	render () {
		return (
			<form>
	      <input type="text" name="searchInput" ref="searchInput" placeholder="Keyword" autofocus />
	     	<button onClick={this.logging.bind(this)}>Click</button>
     	</form>
		)
	}





}

window.SearchView = SearchView;