import React from 'react';

const QueueEntryView = (props) => (
  <div>
    <div>{props.song.title} {props.song.duration / 1000}</div>
    <div onClick={props.upVote.bind(this, props.song, props.index)}>
      Upvote {props.song.upvotes}
    </div>
    <div onClick={props.downVote.bind(this, props.song, props.index)}>
      Downvote {props.song.downvotes}
    </div>
  </div>
);

export default QueueEntryView;
