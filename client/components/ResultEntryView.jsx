import React from 'react';

const ResultEntryView = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.clickSong(props.track);
  };

  return (
    <div onClick={handleClick}>
			{props.track.title} {props.track.duration / 1000}
    </div>
	);
};

export default ResultEntryView;
