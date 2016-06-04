import React from 'react';

const QueueEntryView = (props) => {
  const { song } = props;
  const time = song.duration / 1000;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const defaultArt = 'http://www.dardensmith.com/wp-content/themes/soundcheck/images/default-artwork.png';

  return (
    <div className="queueEntry">
      <img src={song.artwork_url || defaultArt} alt="artwork" className="queueImg"/>
      <div className="queueDetails">
        <div className="queueTitle">{song.title}</div>
        <div className="queueDuration">{minutes}:{seconds > 9 ? seconds : "0" + seconds}</div>
        <div className="voting">
          <div onClick={props.upVote.bind(this, song, props.index)} className="upvote">Upvote {song.upvotes}</div>
          <div onClick={props.downVote.bind(this, song, props.index)} className="downvote">Downvote</div>
        </div>
      </div>
    </div>
  );
};

export default QueueEntryView;