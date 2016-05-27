class ResultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


	render () {

		var tracks = this.props.tracks

		return (
			<div>
				{tracks.map((track) => 
					<ResultEntryView
				    key={track.id}
				    track={track}
				  />
				)}
     	</div>

		);
	}
}

window.ResultView = ResultView;