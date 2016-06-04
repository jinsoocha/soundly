// ResultView shows the search results

// passing in the key to the childview is mandatory in React
// Without key, you will get a warning in console.
import React from 'react';
import ResultEntryView from './ResultEntryView';

export default class ResultView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tracks} = this.props;
    
    return (
      <div className="searchResult">
				{tracks.map((track) =>
          <ResultEntryView
            key={track.id}
            track={track}
            clickSong={this.props.clickSong}
          />
				)}
      </div>
		);
  }
}
