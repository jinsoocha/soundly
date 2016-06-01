class QueueView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleUpVote() {
    this.setState ({
      count: this.state.count + 1,
    });
  }

  handleDownVote() {
    this.setState ({
      count: this.state.count - 1,
    });
  }

  render() {
    const queue = this.props.queue;
    return (
      <div>
        <h3>Queue</h3>
          <ul>
            {queue.map((song) =>
              <QueueEntryView
                key={song.id}
                song={song}
                count={this.state.count}
                handleUpVote={this.handleUpVote.bind(this)}
                handleDownVote={this.handleDownVote.bind(this)}
              />
              )}
          </ul>
      </div>
    );
  }
}

window.QueueView = QueueView;
