import React from 'react';
import QueueEntryView from './QueueEntryView';

const QueueView = (props) => {
  const queue = props.queue;
  console.log('current queue =>', queue);
  return (
    <div>
      <h3>Queue</h3>
      <ul>
        {queue.map((song, i) =>
          <QueueEntryView
            key={i}
            song={song}
            index={i}
            upVote={props.upVote}
            downVote={props.downVote}
          />
          )}
      </ul>
    </div>
  );
};

export default QueueView;
