import React from 'react';
import QueueEntryView from './QueueEntryView';

export default class QueueView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const queue = this.props.queue;
    const upvoteArt = '/styles/imgs/upvote.png';
    const downvoteArt = '/styles/imgs/downvote.png';

    console.log('current queue =>', queue);
    return (
      <div>
        <img className="upvoteMsg" src={upvoteArt} alt="upvoteMsg" />
        <img className="downvoteMsg" src={downvoteArt} alt="downvoteMsg" />
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
      </div>
    );
  }
}

