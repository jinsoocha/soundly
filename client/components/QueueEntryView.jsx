import React from 'react';
  
const QueueEntryView = (props) => {
  const { song } = props;
  const time = song.duration / 1000;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const defaultArt = '/styles/imgs/defaultart.png';
  const upvoteArt = '/styles/imgs/upvote.png';
  const downvoteArt = '/styles/imgs/downvote.png';
  const handleUpvote = () => props.upVote(song, props.index);
  const handleDownvote = () => props.downVote(song, props.index);

  return (
    <div className="queueEntry">
      <img src={song.artwork_url || defaultArt} alt="artwork" className="queueImg"/>
      <div className="queueDetails">
        <div className="queueTitle">{song.title}</div>
        <div className="queueDuration">{minutes}:{seconds > 9 ? seconds : "0" + seconds}</div>
        <div className="voting">
          <div onClick={handleUpvote} className="upvote"><img src={upvoteArt} alt="Upvote"/> <span className="voteNum">{song.upvotes}</span></div>
          <div onClick={handleDownvote} className="downvote"><img src={downvoteArt} alt="Downvote"/> <span className="voteNum">{song.downvotes}</span></div>
        </div>
      </div>
    </div>
  );
};

export default QueueEntryView;