import React from 'react';

const ResultEntryView = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.clickSong(props.track);
  };
  const { track } = props;
  const defaultArt = '/styles/imgs/defaultart.png';

  return (
    <div onClick={handleClick} className="resultEntry">
      <div className="border">
        <img src={track.artwork_url || defaultArt} alt="artwork" className="resultImg" />
        <div className="resultDetails">
          <div className="resultTitle">{track.title}</div>
        </div>
      </div>
    </div>
	);
};

export default ResultEntryView;
