import React from 'react';
  
const QueueEntryView = (props) => {
  const { song } = props;
  const time = song.duration / 1000;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const defaultArt = '/styles/imgs/defaultart.png';
  const upvoteArt = '/styles/imgs/upvote.png';
  const downvoteArt = '/styles/imgs/downvote.png';

  return (
    <div className="queueEntry">
      <img src={song.artwork_url || defaultArt} alt="artwork" className="queueImg"/>
      <div className="queueDetails">
        <div className="queueTitle">{song.title}</div>
        <div className="queueDuration">{minutes}:{seconds > 9 ? seconds : "0" + seconds}</div>
        <div className="voting">
          <div onClick={props.upVote.bind(this, song, props.index)} className="upvote"><img src={upvoteArt} alt="Upvote"/> <span className="voteNum">{song.upvotes}</span></div>
          <div onClick={props.downVote.bind(this, song, props.index)} className="downvote"><img src={downvoteArt} alt="Downvote"/> <span className="voteNum">{song.downvotes}</span></div>
        </div>
      </div>
    </div>
  );
};

export default QueueEntryView;