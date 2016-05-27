class SearchResultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	tracks: [] 	
    }
  }

  handleGetTracks (tracks) {
  	this.setState({tracks: tracks});
  }

	render () {
		return (
			<div>
				<SearchView getTracks={this.handleGetTracks.bind(this)}/>
				<ResultView tracks={this.state.tracks}/>
     	</div>

		);
	}
}

window.SearchResultView = SearchResultView;