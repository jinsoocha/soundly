import React from 'react';
import QueueEntryView from './QueueEntryView';

export default class QueueView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const queue = this.props.queue;
    console.log('current queue =>', queue);
    return (
      <div className="queueBox">
        {queue.map((song, i) =>
          <QueueEntryView
            key={i}
            index={i}
            song={song}
            upVote={this.props.upVote}
            downVote={this.props.downVote} />
        )}
      </div>
    );
  }
}

