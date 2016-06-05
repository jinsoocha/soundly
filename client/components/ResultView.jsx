// ResultView shows the search results

// passing in the key to the childview is mandatory in React
// Without key, you will get a warning in console.
import React from 'react';
import ResultEntryView from './ResultEntryView';

const ResultView = (props) => {
  const tracks = props.result;
  return (
    <div>
			{tracks.map((track) =>
        <ResultEntryView
          key={track.id}
          track={track}
          clickSong={props.clickSong}
        />
			)}
    </div>
	);
};

export default ResultView;
