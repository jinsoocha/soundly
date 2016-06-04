import React from 'react';
import QueueEntryView from './QueueEntryView';

export default class QueueView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const queue = this.props.queue;
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
              upVote={this.props.upVote}
              downVote={this.props.downVote}
            />
            )}
        </ul>
      </div>
    );
  }
}

