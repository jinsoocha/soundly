class QueueView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const queue = this.props.queue;
    return (
      <div>
        <h3>Queue</h3>
          <ul>
            {queue.map((song, i) =>
              <QueueEntryView
                key={song.id}
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

window.QueueView = QueueView;
